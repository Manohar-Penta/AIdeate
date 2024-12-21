import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";
import { ShowEditorPage } from "../../../components/ShowEditor";
import { Comments } from "@/components/Comments";

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
  const { postid: id } = await params;
  const data = await prisma.post.findFirst({ where: { id } });
  if (!data) redirect("/404");
  return (
    <>
      <ShowEditorPage data={{ title: data.title, content: data.content }} />
      <Comments postid={id} />
    </>
  );
}
