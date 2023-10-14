"use client";
import Button from "@/app/components/common/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, useToast } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { CreateSubredditPayload } from "@/app/lib/validations/group";

const Page = () => {
  const toast = useToast();
  const router = useRouter();
  const [input, setInput] = useState<string>("");

  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubredditPayload = {
        name: input,
      };

      const { data } = await axios.post("/api/subreddit", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "Group already exists.",
            description: "Please choose a different name.",
            status: "error",
          });
        }

        if (err.response?.status === 422) {
          return toast({
            title: "Invalid group name.",
            description: "Please choose a name between 3 and 21 letters.",
            status: "error",
          });
        }

        if (err.response?.status === 401) {
          return toast({
            title: "Login required.",
            description: "You need to be logged in to do that.",
            status: "error",
          });
        }
      }

      toast({
        title: "There was an error.",
        description: "Could not create group.",
        variant: "error",
      });
    },
    onSuccess: (data) => {
      router.push(`/r/${data}`);
    },
  });

  return (
    <div className='container flex items-center h-full max-w-3xl mx-auto '>
      <div className='relative  w-full h-fit p-4 rounded-lg space-y-6'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl font-semibold'>Create a Community</h1>
        </div>

        <hr className='bg-red-500 h-px' />

        <div>
          <p className='text-lg font-medium'>Name</p>
          <p className='pb-2'>
            Community names including capitalization cannot be changed.
          </p>
          <div className='relative'>
            <Input
              focusBorderColor='orange.400'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </div>

        <div className='flex justify-end gap-4'>
          <Button onClick={() => router.back()}>Cancel</Button>
          <Button
            isLoading={isLoading}
            disabled={input.length === 0}
            onClick={() => createCommunity()}
          >
            Create Community
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
