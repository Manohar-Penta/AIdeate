import { z } from "zod";

export const PostSchema = z.object({
  title: z.string(),
  content: z.object({
    time: z.number(),
    blocks: z.array(z.any()),
  }),
});
