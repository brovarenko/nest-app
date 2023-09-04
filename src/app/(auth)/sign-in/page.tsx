import { FC } from "react";
import Link from "next/link";
import SignIn from "@/app/components/SignIn";

const page: FC = ({}) => {
  return (
    <div className='absolute inset-0'>
      <div className='h-full max-w-2xl flex flex-col items-center justify-center gap-20'>
        <Link href='/'>Home</Link>
        <SignIn />
      </div>
    </div>
  );
};

export default page;
