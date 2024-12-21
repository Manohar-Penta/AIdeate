import Link from "next/link";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <div className="w-full">
      <footer className="bg-black text-white">
        <nav>
          <ul className="flex gap-4 justify-center">
            <li>
              <Link href={"/more/about"}>About</Link>
            </li>
            <li>
              <Dialog>
                <DialogTrigger>
                  <span>Help</span>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-semibold">
                      Help
                    </DialogTitle>
                    <DialogDescription>
                      <span className="text-lg">
                        If you have any questions or need assistance, please
                        contact us. Our support team is here to help you resolve
                        any issues you may encounter.
                      </span>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Link href="mailto:manoharpenta456@gmail.com">
                      <Button>Send a Email</Button>
                    </Link>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </li>
            <li>
              <Link href={"/more/terms"}>Terms</Link>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
}
