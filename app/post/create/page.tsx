import MainEditor from "@/components/MainEditor";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();

  if (!session) {
    redirect("/404");
  }

  return (
    <>
      <MainEditor />
    </>
  );
}
