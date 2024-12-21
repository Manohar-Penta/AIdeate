import { auth } from "@/lib/auth";
import { prisma } from "@/utils/prisma";

async function handler(req: Request) {
  const { userid, postid } = await req.json();
  const postData = await prisma.post.findFirst({
    where: {
      userId: userid,
      id: postid,
    },
  });
  const status = postData ? 200 : 404;
  return new Response(JSON.stringify({ status: status, data: postData }));
}

async function getPosts(req: Request) {
  const { searchParams } = new URL(req.url);
  let page = Number(searchParams.get("page"));
  if (!page) page = 1;
  const postsCount = await prisma.post.count();
  const pages =
    Number((postsCount / 10).toFixed(0)) + (postsCount % 10 > 0 ? 1 : 0);
  const postData = await prisma.post.findMany({
    skip: (page - 1) * 10,
    take: 10,
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      _count: true,
    },
  });
  return new Response(
    JSON.stringify({ data: postData, pages, currPage: page })
  );
}

async function deletePost(req: Request) {
  const session = await auth();
  const { postid } = await req.json();
  const postData = await prisma.post.delete({
    where: {
      id: postid,
      userId: session?.user?.id,
    },
  });
  const status = postData ? 200 : 404;
  return new Response(JSON.stringify({ status: status, data: postData }));
}

export { handler as POST, getPosts as GET, deletePost as DELETE };
