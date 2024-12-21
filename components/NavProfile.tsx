import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut } from "@/lib/auth";
import Link from "next/link";
import { PiSignOut } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";

export async function NavProfile({ session }: { session: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={`${session.user.image}`} alt="userImage" />
          <AvatarFallback>
            {(session.user.name as string)
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase())}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-center">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/user/${session.user.id}/posts`}>
            <span>
              <CgProfile className="inline m-2" />
              Profile
            </span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={""}>
            <button
              onClick={async () => {
                "use server";
                await signOut();
              }}
            >
              <span>
                <PiSignOut className="inline m-2" />
                Sign Out
              </span>
            </button>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
