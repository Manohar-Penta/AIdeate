import { auth } from "@/lib/auth";
import { PostSchema } from "@/lib/types";
import { prisma } from "@/utils/prisma";

export const POST = async function handler(req: Request) {
  const session = await auth();
  const { title, content } = await req.json();
  let { id } = await req.json();
  if (!id) id = "monkey";
  const result = PostSchema.safeParse({ title, content });
  if (session && session.user && result.success) {
    const userId = session.user?.id;
    const post = await prisma.post.upsert({
      where: { id },
      update: {
        title: title,
        content: JSON.stringify(content),
      },
      create: {
        title: title as string,
        content: JSON.stringify(content) as string,
        userId: userId as string,
      },
    });
    return new Response(JSON.stringify({ status: 200, data: post }));
  } else
    return new Response(
      JSON.stringify({
        status: 401,
        message: result.error?.message || "Unauthorized",
      })
    );
};
