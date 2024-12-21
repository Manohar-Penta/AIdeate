import Link from "next/link";
import React from "react";

export default function ProfileNav({
  userid,
  category,
}: {
  userid: string;
  category: string;
}) {
  return (
    <nav className="flex p-2 border-b-2 border-border">
      <ul className="flex gap-2 justify-around w-full max-w-xl mx-auto">
        <li className="hover:underline">
          <Link
            href={`/user/${userid}/posts`}
            className={
              category == "posts"
                ? "text-primary-foreground bg-primary px-2 py-1 rounded"
                : ""
            }
          >
            Posts
          </Link>
        </li>
        <li className="hover:underline">
          <Link
            href={`/user/${userid}/following`}
            className={
              category == "following"
                ? "text-primary-foreground bg-primary px-2 py-1 rounded"
                : ""
            }
          >
            Following
          </Link>
        </li>
        <li className="hover:underline">
          <Link
            href={`/user/${userid}/followers`}
            className={
              category == "followers"
                ? "text-primary-foreground bg-primary px-2 py-1 rounded"
                : ""
            }
          >
            Followers
          </Link>
        </li>
      </ul>
    </nav>
  );
}
