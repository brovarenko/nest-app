import { FC } from "react";
import Link from "next/link";
import AuthForm from "./AuthForm";
import { getAuthSession } from "../api/auth/[...nextauth]/route";
interface SignInProps {}

const SignIn: FC<SignInProps> = async ({}) => {
  const session = await getAuthSession();

  return (
    <div className='container mx-auto flex  flex-col justify-center space-y-6 sm:w-[400px]'>
      <div className='flex flex-col space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>Welcom back</h1>
        <AuthForm />

        <Link href='/sing-up' className='hover:text-zinc-400 text-sm '>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
