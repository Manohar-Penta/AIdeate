import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./modeToggle";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { LuPenLine } from "react-icons/lu";
import { NavProfile } from "./NavProfile";

export async function NavComponent() {
  const session = await auth();

  return (
    <div className="w-full">
      <nav className="border-b-4">
        <div className="flex justify-between p-3 md:p-4 max-w-screen-xl mx-auto">
          <div>
            <h1 className="text-2xl md:text-4xl font-semibold md:font-bold">
              <Link href={"/"}>AIdeate</Link>
            </h1>
          </div>
          <div className="flex gap-2 items-center">
            <ul className="flex gap-4 items-center">
              <li className="md:flex md:items-center">
                <Link
                  href={session ? "/post/create" : "/api/auth/signin"}
                  className="hover:underline"
                >
                  <>
                    <LuPenLine className="inline" />
                    Write
                  </>
                </Link>
              </li>
              {session ? (
                <>
                  <NavProfile session={session} />
                </>
              ) : (
                <>
                  <li>
                    <Link href={"/api/auth/signin"}>
                      <Button>Get Started</Button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <ModeToggle className="sm:block right-4 hidden" />
          </div>
        </div>
      </nav>
    </div>
  );
}
