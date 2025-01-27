import { auth } from "@/lib/auth";
import { prisma } from "@/utils/prisma";
import Link from "next/link";

export async function UserFollowing({
  userid,
  personal,
}: {
  userid: string;
  personal: boolean;
}) {
  const session = await auth();
  const followings = (
    await prisma.user.findMany({
      where: {
        id: {
          in: (
            await prisma.following.findMany({
              where: { userId: userid },
            })
          ).map((data) => data.followingId),
        },
      },
    })
  ).map((user) => {
    let { id, email, name, image, createdAt, ...rest } = user;
    return { id, email, name, image, createdAt };
  });

  return (
    <div
      className="min-h-[60vh] flex flex-col items-stretch max-w-screen-sm min-w-[40vw]"
      id="user-following-unique-id"
    >
      {followings.length > 0 ? (
        followings.map((following) => {
          return (
            <Link href={`/user/${following.id}/posts`} id={following.id}>
              <div className="flex flex-nowrap justify-start gap-2 items-center rounded-lg border-2 border-border p-3 m-2 hover:bg-secondary hover:text-secondary-foreground hover:p-4 transition-all ease-in-out">
                <img
                  src={following?.image as string}
                  alt=""
                  className="border border-border rounded-full h-10 w-10 mx-2"
                />
                <div>
                  <h3 className="text-lg md:text-2xl whitespace-nowrap overflow-hidden text-ellipsis">
                    {following.name}
                  </h3>
                  <p className="text-sm md:text-lg whitespace-nowrap overflow-hidden text-ellipsis">
                    {following.email}
                  </p>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <p className="p-4 md:p-4 text-lg md:text-2xl text-secondary-foreground text-center">
          Start following others..
        </p>
      )}
    </div>
  );
}
