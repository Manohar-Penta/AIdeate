import MainEditor from "@/components/MainEditor";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return (
    <>
      <MainEditor />
    </>
  );
}
