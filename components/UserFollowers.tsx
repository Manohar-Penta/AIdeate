import { auth } from "@/lib/auth";
import { prisma } from "@/utils/prisma";
import Link from "next/link";

type Followers = {
  id: string;
  name: string;
}[];

export async function UserFollowers({
  userid,
  personal,
}: {
  userid: string;
  personal: boolean;
}) {
  const session = await auth();

  const followers = (
    await prisma.user.findMany({
      where: {
        id: {
          in: (
            await prisma.followers.findMany({
              where: { userId: userid },
            })
          ).map((follower) => follower.followerId),
        },
      },
    })
  ).map((user) => {
    let { id, email, name, image, createdAt, ...rest } = user;
    return { id, email, name, image, createdAt };
  });

  return (
    <div className="min-h-[60vh] flex flex-col items-stretch max-w-screen-sm min-w-[40vw]">
      {followers.length > 0 ? (
        followers.map((follower) => {
          return (
            <Link href={`/user/${follower.id}/posts`} id={follower.id}>
              <div className="flex flex-nowrap justify-start gap-2 items-center rounded-lg border border-border p-3 m-2 hover:bg-secondary hover:text-secondary-foreground hover:p-4 transition-all ease-in-out">
                <img
                  src={follower?.image as string}
                  alt=""
                  className="border border-border rounded-full h-10 w-10 mx-2"
                />
                <div>
                  <h3 className="text-lg md:text-2xl whitespace-nowrap overflow-hidden text-ellipsis">
                    {follower.name}
                  </h3>
                  <p className="text-sm md:text-lg whitespace-nowrap overflow-hidden text-ellipsis">
                    {follower.email}
                  </p>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <p className="p-4 md:p-4 text-lg md:text-2xl text-secondary-foreground text-center">
          No followers yet...
        </p>
      )}
    </div>
  );
}
