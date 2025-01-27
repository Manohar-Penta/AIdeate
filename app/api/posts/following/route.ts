import { auth } from "@/lib/auth";
import { prisma } from "@/utils/prisma";
import { HttpStatusCode } from "axios";

async function getFollowingPosts(req: Request) {
  const session = await auth();

  if (!session) {
    return Response.json(
      { message: "Not authorised" },
      { status: HttpStatusCode.Unauthorized }
    );
  }

  const { searchParams } = new URL(req.url);
  let page = Number(searchParams.get("page"));
  if (!page) page = 1;

  const following = (
    await prisma.user.findMany({
      where: {
        id: {
          in: (
            await prisma.following.findMany({
              where: {
                userId: session.user.id,
              },
            })
          ).map((data) => data.followingId),
        },
      },
    })
  ).map((user) => user.id);

  if (!following) {
    return new Response(JSON.stringify({ data: [], pages: 0, currPage: 1 }));
  }

  const postsCount = await prisma.post.count({
    where: { userId: { in: following } },
  });

  const pages =
    Number((postsCount / 10).toFixed(0)) + (postsCount % 10 > 0 ? 1 : 0);

  const postData = await prisma.post.findMany({
    where: { userId: { in: following } },
    skip: (page - 1) * 10,
    take: 10,
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      _count: true,
    },
  });

  console.log(postData);

  return new Response(
    JSON.stringify({ data: postData, pages, currPage: page })
  );
}

export { getFollowingPosts as GET };
