import { BackgroundLines } from "@/components/ui/background-lines";
import Link from "next/link";

export default function NewUserHome() {
  return (
    <div className="flex flex-col min-h-screen max-h-full">
      <main className="relative flex-1 flex items-center justify-center overflow-hidden text-center">
        <BackgroundLines className="flex justify-center items-center">
          <div className="p-4 z-10 bg-[rgba(255,255,255,0.4)] rounded-md max-w-content dark:bg-[rgb(0,0,0,0)]">
            <h2 className="text-4xl md:text-6xl font-serif md:italic max-w-screen-sm]">
              Stories & Ideas across the world
            </h2>
            <br></br>
            <p className="text-xl md:text-2xl text-ellipsis]">
              Stories with the power of AI
            </p>
            <br />
            <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                <Link href={"/api/auth/signin"}>Start Reading</Link>
              </span>
            </button>
          </div>
        </BackgroundLines>
      </main>
    </div>
  );
}
