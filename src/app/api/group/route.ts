import { db } from "@/app/lib/db";
import { z } from "zod";
import { getAuthSession } from "../auth/[...nextauth]/route";
import { GroupValidator } from "@/app/lib/validations/group";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { name } = GroupValidator.parse(body);

    const groupExists = await db.group.findFirst({
      where: {
        name,
      },
    });

    if (groupExists) {
      return new Response("Group already exists", { status: 409 });
    }

    const group = await db.group.create({
      data: {
        name,
        creatorId: session.user.id,
      },
    });

    await db.subscription.create({
      data: {
        userId: session.user.id,
        groupId: group.id,
      },
    });

    return new Response(group.name);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response("Could not create subreddit", { status: 500 });
  }
}
