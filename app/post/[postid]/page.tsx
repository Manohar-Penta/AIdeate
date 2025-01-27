import { prisma } from "@/utils/prisma";
import { ShowEditorPage } from "../../../components/ShowEditor";
import { Comments } from "@/components/Comments";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { FollowButton } from "./FollowButton";

export default async function page({
  params,
}: {
  params: Promise<{ postid: string }>;
}) {
  const session = await auth();
  const { postid: id } = await params;

  const data = await prisma.post.findFirst({
    where: { id },
    include: { user: true },
  });

  let follow: boolean = false;
  if (session && session.user.id != data.user.id) {
    const temp = await prisma.following.findUnique({
      where: {
        userId_followingId: {
          userId: session.user.id,
          followingId: data.userId,
        },
      },
    });

    if (temp?.id) follow = true;
  }

  if (!data) {
    throw new Error("Post not found");
  }
  return (
    <>
      <ShowEditorPage data={{ title: data.title, content: data.content }} />
      {session?.user.id != data.user.id ? (
        <div>
          <div
            className="flex flex-nowrap justify-between items-center rounded-lg border border-border p-3 m-2 hover:bg-secondary hover:text-secondary-foreground hover:p-4 transition-all ease-in-out"
            id={data.user.id}
          >
            <Link
              href={`/user/${data.user.id}/posts`}
              className="flex items-center"
            >
              <img
                src={data.user.image as string}
                alt=""
                className="border border-primary rounded-full h-10 w-10 mx-2"
              />
              <div>
                <h3 className="text-lg md:text-2xl whitespace-nowrap overflow-hidden text-ellipsis">
                  {data.user.name}
                </h3>
                <p className="text-sm md:text-lg whitespace-nowrap overflow-hidden text-ellipsis">
                  {data.user.email}
                </p>
              </div>
            </Link>
            <div>
              <FollowButton
                followeeId={data.userId}
                followerId={session.user.id}
                follow={follow}
              ></FollowButton>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <Comments postid={id} />
    </>
  );
}
