import { z } from "zod";

export const GroupValidator = z.object({
  name: z.string().min(3).max(21),
});

export const GroupSubscriptionValidator = z.object({
  GroupId: z.string(),
});

export type CreateGroupPayload = z.infer<typeof GroupValidator>;
export type SubscribeToGroupPayload = z.infer<
  typeof GroupSubscriptionValidator
>;
