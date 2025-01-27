import { auth } from "@/lib/auth";
import { prisma } from "@/utils/prisma";
import { HttpStatusCode } from "axios";

async function handler(req: Request) {
  const session = await auth();
  if (!session) {
    return Response.json(
      { message: "Not authorised" },
      { status: HttpStatusCode.Unauthorized }
    );
  }

  const data = (
    await prisma.user.findMany({
      where: {
        id: {
          in: (
            await prisma.followers.findMany({
              where: { userId: session.user.id },
            })
          ).map((follower) => follower.followerId),
        },
      },
    })
  ).map((user) => {
    let { id, email, name, image, createdAt, ...rest } = user;
    return { id, email, name, image, createdAt };
  });

  return Response.json({ message: data }, { status: 200 });
}

export { handler as GET };
