import { db } from "@/app/lib/db";
import { FC } from "react";
import { notFound } from "next/navigation";
import { Editor } from "@/app/components/Editor";
import Button from "@/app/components/common/Button";

interface PageProps {
  params: {
    slug: string;
  };
}

const page: FC<PageProps> = async ({ params }) => {
  const subreddit = await db.group.findFirst({
    where: {
      name: params.slug,
    },
  });

  if (!subreddit) return notFound();
  return (
    <div>
      <h2>Create Post</h2>
      <p>in r/{params.slug}</p>
      <Editor subredditId={subreddit.id} />
      <div className='w-full flex justify-end'>
        <Button form='subreddit-post-form'>Post</Button>
      </div>
    </div>
  );
};

export default page;
