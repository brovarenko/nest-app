"use client";
import { FC, useState } from "react";
import { signIn } from "next-auth/react";
import Button from "./Button";

interface AuthFormProps {}

const AuthForm: FC<AuthFormProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const LoginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Button variant='secondary'>Google</Button>
    </div>
  );
};

export default AuthForm;
