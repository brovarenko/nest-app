"use client";
import { FC, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import Button from "./common/Button";
import { useToast } from "@chakra-ui/react";
import Image from "next/image";
interface AuthFormProps {}

const AuthForm: FC<AuthFormProps> = ({}) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const LoginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className='flex justify-center'>
      <Button onClick={LoginWithGoogle} variant='secondary'>
        <Image src='/icons/google.png' alt='google' width={15} height={15} />
        <div className='pl-2'>Google</div>
      </Button>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default AuthForm;
