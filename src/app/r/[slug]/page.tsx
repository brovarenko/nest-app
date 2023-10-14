import { getAuthSession } from "@/app/api/auth/[...nextauth]/route";
import MiniCreatePost from "@/app/components/CreatePost";
import { db } from "@/app/lib/db";
import { notFound } from "next/navigation";
import { FC } from "react";

interface PageProps {
  params: {
    slug: string;
  };
}

const Page: FC<PageProps> = async ({ params }: PageProps) => {
  const { slug } = params;

  const session = await getAuthSession();

  const group = await db.group.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          group: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 2,
      },
    },
  });

  if (!group) return notFound();
  return (
    <div className=''>
      <MiniCreatePost session={session} />
    </div>
  );
};

export default Page;
