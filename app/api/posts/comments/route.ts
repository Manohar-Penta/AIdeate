import { prisma } from "@/utils/prisma";

async function getComments(req: Request) {
  const { searchParams } = new URL(req.url);
  const postid = searchParams.get("postid") ?? "monkey";
  const page = Number(searchParams.get("page") ?? 1);

  const data = await prisma.comment.findMany({
    where: {
      postId: postid,
    },
    include: {
      user: true,
    },
    skip: (page - 1) * 5,
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  const count = await prisma.comment.count({
    where: {
      postId: postid,
    },
  });

  return new Response(
    JSON.stringify({ data, currPage: page, pages: Math.ceil(count / 5) })
  );
}

async function postComment(req: Request) {
  const { userid, postid, comment } = await req.json();
  if (!userid || !postid || !comment)
    return new Response(JSON.stringify({ status: 400 }));
  const data = await prisma.comment.create({
    data: {
      userId: userid,
      postId: postid,
      message: comment,
    },
  });
  return new Response(JSON.stringify({ ...data }));
}

export { getComments as GET, postComment as POST };
