"use client";
import { FC, useState } from "react";
import { signIn } from "next-auth/react";
import Button from "./common/Button";
import { useToast } from "@chakra-ui/react";
interface AuthFormProps {}

const AuthForm: FC<AuthFormProps> = ({}) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const LoginWithGoogle = async () => {
    setIsLoading(true);
    try {
      throw new Error("error");
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
    <div>
      <Button onClick={LoginWithGoogle} variant='secondary'>
        Google
      </Button>
    </div>
  );
};

export default AuthForm;
