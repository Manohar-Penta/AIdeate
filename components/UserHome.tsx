import Link from "next/link";
import { cn } from "@/lib/utils";
import FollowingPosts from "./FollowingPosts";
import AllPosts from "./AllPosts";
import { ToTop } from "./ToTop";

export default function page({
  personal,
  page = 1,
}: {
  personal: boolean;
  page?: number;
}) {
  return (
    <div className="min-h-[90vh]">
      <nav>
        <div className="w-full border border-border md:p-2 p-1 flex items-center">
          <Link
            href={"/"}
            className={cn(
              "text-center mx-auto p-1 px-3 rounded",
              personal ? "" : "text-primary-foreground bg-primary"
            )}
          >
            Discover
          </Link>
          <Link
            href={"/?personal=true"}
            className={cn(
              "text-center mx-auto p-1 px-3 rounded",
              !personal ? "" : "text-primary-foreground bg-primary"
            )}
          >
            Following
          </Link>
        </div>
      </nav>
      {personal ? <FollowingPosts page={page} /> : <AllPosts page={page} />}
      <ToTop />
    </div>
  );
}
