import { SubredditSubscriptionValidator } from "@/app/lib/validations/group";
import { getAuthSession } from "../../auth/[...nextauth]/route";
import { db } from "@/app/lib/db";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { subredditId } = SubredditSubscriptionValidator.parse(body);
    const subscriptionExists = await db.subscription.findFirst({
      where: {
        groupId: subredditId,
        userId: session.user.id,
      },
    });

    if (!subscriptionExists) {
      return new Response("You've already unsubscribed from this subreddit", {
        status: 400,
      });
    }

    await db.subscription.deleteMany({
      where: {
        groupId: subredditId,
        userId: session.user.id,
      },
    });

    return new Response(subredditId);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not unsubscribe to subreddit at this time. Please try later",
      { status: 500 }
    );
  }
}
