import { auth } from "@/lib/auth";
import { prisma } from "@/utils/prisma";

export default async function page({
  params,
  children,
}: {
  params: Promise<{ userid: string }>;
  children: React.ReactNode;
}) {
  const session = await auth();
  const { userid } = await params;
  const userData = await prisma.user.findFirst({
    where: {
      id: userid,
    },
    include: {
      Posts: {
        where: {},
      },
      Followers: {
        where: {},
        select: { _count: true },
      },
      Following: {
        where: {},
        select: { _count: true },
      },
    },
  });

  return (
    <div className="p-2">
      <div className="flex border-4 border-border rounded-md p-2 m-2 items-center gap-4 justify-center mx-auto max-w-xl">
        <img
          src={userData?.image as string}
          alt=""
          className="border border-border rounded-full h-14 w-14 mx-2"
        />
        <div className="">
          <h2 className="text-center">{userData?.name}</h2>
          <hr />
          <div className="flex gap-4 text-xl font-serif">
            <p className="text-xs text-center">
              Posts
              <br />
              {userData?.Posts.length}
            </p>
            <p className="text-xs text-center">
              Followers
              <br />
              {userData?.Followers?._count.user || 0}
            </p>
            <p className="text-xs text-center">
              Following
              <br />
              {userData?.Following?._count.user || 0}
            </p>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}
