"use client";

import { MoveUp } from "lucide-react";
import { useEffect } from "react";

export function ToTop() {
  useEffect(() => {
    window.onscroll = function () {
      const mybutton = document.getElementById("myBtn") as HTMLButtonElement;
      if (mybutton === null) return;
      scrollFunction(mybutton);
    };

    function scrollFunction(mybutton: HTMLButtonElement) {
      if (
        document.body.scrollTop > 40 ||
        document.documentElement.scrollTop > 40
      ) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }

    return () => {
      window.onscroll = null;
    };
  }, []);
  return (
    <button
      id="myBtn"
      onClick={() => window.scrollTo(0, 0)}
      className="fixed right-10 md:right-15 bottom-[3rem] size-5 hidden"
    >
      <MoveUp
        className="border-2 border-border shadow-md rounded-md p-1 bg-white text-black"
        size={"3rem"}
      />
    </button>
  );
}
