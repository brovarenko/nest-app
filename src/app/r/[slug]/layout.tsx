import { getAuthSession } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/app/lib/db";
import Button from "@/app/components/common/Button";
import { format } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import SubscribeLeaveToggle from "@/app/components/SubscribeLeaveToggle";

const Layout = async ({
  children,
  params: { slug },
}: {
  children: ReactNode;
  params: { slug: string };
}) => {
  const session = await getAuthSession();

  const subreddit = await db.group.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  });

  const subscription = !session?.user
    ? undefined
    : await db.subscription.findFirst({
        where: {
          group: {
            name: slug,
          },
          user: {
            id: session.user.id,
          },
        },
      });

  const isSubscribed = !!subscription;

  if (!subreddit) return notFound();

  const memberCount = await db.subscription.count({
    where: {
      group: {
        name: slug,
      },
    },
  });

  return (
    <div className='flex justify-center bg-gray-300 h-screen'>
      <div className='m-5 w-full md:max-w-screen-md'>{children}</div>

      <div className='overflow-hidden h-fit rounded-md border border-gray-400 xl:w-80 m-5 hidden xl:block'>
        <div className='px-6 py-4 bg-gray-400'>
          <p className='font-semibold py-3'>About r/{subreddit.name}</p>
        </div>
        <dl className='divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white'>
          <div className='flex justify-between gap-x-4 py-3'>
            <dt className='text-gray-500'>Created</dt>
            <dd className='text-gray-700'>
              <time dateTime={subreddit.createdAt.toDateString()}>
                {format(subreddit.createdAt, "MMMM d, yyyy")}
              </time>
            </dd>
          </div>
          <div className='flex justify-between gap-x-4 py-3'>
            <dt className='text-gray-500'>Members</dt>
            <dd className='flex items-start gap-x-2'>
              <div className='text-gray-900'>{memberCount}</div>
            </dd>
          </div>
          {subreddit.creatorId === session?.user?.id ? (
            <div className='flex justify-between gap-x-4 py-3'>
              <dt className='text-gray-500'>You created this community</dt>
            </div>
          ) : null}

          {subreddit.creatorId !== session?.user?.id ? (
            <SubscribeLeaveToggle
              isSubscribed={isSubscribed}
              subredditId={subreddit.id}
              subredditName={subreddit.name}
            />
          ) : null}
          <Button>
            <Link href={`r/${slug}/submit`}>Create Post</Link>
          </Button>
        </dl>
      </div>
    </div>
  );
};

export default Layout;
