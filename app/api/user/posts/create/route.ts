import { auth } from "@/lib/auth";
import { PostSchema } from "@/lib/types";
import { prisma } from "@/utils/prisma";

export const POST = auth(async function handler(req: any) {
  let { title, content, id } = await req.json();
  if (!id) id = "monkey";
  const result = PostSchema.safeParse({ title, content });
  if (req.auth && result.success) {
    const { userId } = req.auth;
    const post = await prisma.post.upsert({
      where: { id },
      update: {
        title: title,
        content: JSON.stringify(content),
      },
      create: {
        title: title,
        content: JSON.stringify(content),
        userId: userId,
      },
    });
    return new Response(JSON.stringify({ status: 200, data: post }));
  } else return new Response(JSON.stringify({ status: 401, message: result.error?.message || "Unauthorized" }));
});
