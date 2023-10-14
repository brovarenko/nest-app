"use client";

import Button from "./common/Button";
import { Input } from "@chakra-ui/react";
import { Image as ImageIcon, Link2 } from "lucide-react";
import { FC } from "react";
import type { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import { Avatar } from "@chakra-ui/react";

interface MiniCreatePostProps {
  session: Session | null;
}

const MiniCreatePost: FC<MiniCreatePostProps> = ({ session }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className='overflow-hidden rounded-md bg-white shadow border border-gray-400 '>
      <div className='h-full px-4 py-4 flex'>
        <div className='relative'>
          <Avatar
            size='sm'
            src={session?.user.image ? session?.user.image : ""}
          />

          <span className='absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500 outline outline-2 outline-white' />
        </div>
        <Input
          onClick={() => router.push(pathname + "/submit")}
          readOnly
          placeholder='Create post'
          className='mx-4'
        />
        <button
          className='hover:bg-gray-100 p-2 rounded-md '
          onClick={() => router.push(pathname + "/submit")}
        >
          <ImageIcon className='text-zinc-600' />
        </button>
        <button
          className='hover:bg-gray-100 p-2 rounded-md'
          onClick={() => router.push(pathname + "/submit")}
        >
          <Link2 className='text-zinc-600' />
        </button>
      </div>
    </div>
  );
};

export default MiniCreatePost;
