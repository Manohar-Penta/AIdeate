import MainEditor from "@/components/MainEditor";
import { auth } from "@/lib/auth";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";

async function getPosts(userId: string, postId: string) {
  "use server";
  const data = await prisma.post.findFirst({
    where: {
      userId,
      id: postId,
    },
  });
  return data;
}

export default async function page({
  params,
}: {
  params: Promise<{ postid: string }>;
}) {
  const session = await auth();
  const { postid: id } = await params;
  const data = await prisma.post.findFirst({ where: { id } });

  if (!session || data?.userId != session.user?.id || !data) {
    throw new Error("Unauthorized");
  }

  return (
    <>
      <MainEditor data={{ title: data.title, content: data.content }} />
    </>
  );
}
