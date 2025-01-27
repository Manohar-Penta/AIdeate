"use client";
import { Button } from "@/components/ui/button";
import { followHandler, unFollowHandler } from "./followHandler";
import { useState } from "react";

export function FollowButton({
  followerId,
  followeeId,
  follow,
}: {
  followerId: string;
  followeeId: string;
  follow: boolean;
}) {
  const [ref, setRef] = useState<boolean>(follow);
  return !ref ? (
    <Button
      onClick={async () => {
        followHandler(followerId, followeeId);
        console.log("follow done!!");
        setRef((ref) => !ref);
      }}
    >
      Follow
    </Button>
  ) : (
    <Button
      className="bg-gray-300 p-2 px-3"
      onClick={async () => {
        unFollowHandler(followerId, followeeId);
        console.log("unfollow done!!");
        setRef((ref) => !ref);
      }}
    >
      Following‼️
    </Button>
  );
}
