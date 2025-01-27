import ProfileNav from "@/components/ProfileNav";
import { UserFollowers } from "@/components/UserFollowers";
import { UserFollowing } from "@/components/UserFollowing";
import { UserPosts } from "@/components/UserPosts";
import { auth } from "@/lib/auth";

export default async function page({
  params,
}: {
  params: Promise<{
    userid: string;
    category: string;
  }>;
}) {
  const { userid, category } = await params;
  console.log("category primary page : ", category, userid);
  const session = await auth();
  return (
    <div>
      <ProfileNav userid={userid} category={category} />
      <div className="flex justify-center">
        {category == "posts" && (
          <UserPosts userid={userid} personal={session?.user?.id === userid} />
        )}
        {category == "following" && (
          <UserFollowing
            userid={userid}
            personal={session?.user?.id === userid}
          />
        )}
        {category == "followers" && (
          <UserFollowers
            userid={userid}
            personal={session?.user?.id === userid}
          />
        )}
      </div>
    </div>
  );
}
