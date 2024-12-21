import { prisma } from "@/utils/prisma";

async function getPosts(req: Request) {
  let { searchParams } = new URL(req.url);
  let page = Number(searchParams.get("page"));
  let userId = searchParams.get("userid") ?? "monkey";
  if (!page) page = 1;
  const postsCount = await prisma.post.count({ where: { userId } });
  const pages =
    Number((postsCount / 10).toFixed(0)) + (postsCount % 10 > 0 ? 1 : 0);
  const postData = await prisma.post.findMany({
    skip: (page - 1) * 10,
    take: 10,
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      _count: true,
    },
  });
  const status = postData ? 200 : 404;
  return new Response(
    JSON.stringify({ data: postData, pages, currPage: page })
  );
}

export { getPosts as GET };
