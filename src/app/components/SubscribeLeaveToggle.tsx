"use client";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { FC, startTransition } from "react";
import { SubscribeToSubredditPayload } from "../lib/validations/group";
import { useRouter } from "next/navigation";
import Button from "./common/Button";

interface SubscribeLeaveToggleProps {
  isSubscribed: boolean;
  subredditId: string;
  subredditName: string;
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({
  isSubscribed,
  subredditId,
  subredditName,
}) => {
  const toast = useToast();
  const router = useRouter();
  const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
    mutationFn: () => {
      const payload: SubscribeToSubredditPayload = {
        subredditId,
      };
      return axios.post("/api/subreddit/subscribe", payload);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return toast({
            title: "Login required.",
            description: "You need to be logged in to do that.",
            status: "error",
          });
        }
      }
      return toast({
        title: "There was a problem.",
        description: "Something went wrong. Please try again.",
        status: "error",
      });
    },
    onSuccess: () => {
      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh();
      });
      toast({
        title: "Subscribed!",
        description: `You are now subscribed to r/${subredditName}`,
      });
    },
  });

  const { mutate: unsubscribe, isLoading: isUnsubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditPayload = {
        subredditId,
      };

      const { data } = await axios.post("/api/subreddit/unsubscribe", payload);
      return data as string;
    },
    onError: (err: AxiosError) => {
      toast({
        title: "Error",
        description: err.response?.data as string,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh();
      });
      toast({
        title: "Unsubscribed!",
        description: `You are now unsubscribed from/${subredditName}`,
      });
    },
  });

  return isSubscribed ? (
    <Button
      variant='secondary'
      isLoading={isUnsubLoading}
      onClick={() => unsubscribe()}
    >
      Leave community
    </Button>
  ) : (
    <Button
      variant='secondary'
      isLoading={isSubLoading}
      onClick={() => subscribe()}
    >
      Join
    </Button>
  );
};

export default SubscribeLeaveToggle;
