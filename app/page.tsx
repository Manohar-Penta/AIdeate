import NewUserHome from "@/components/NewUserHome";
import UserHome from "@/components/UserHome";
import { auth } from "@/lib/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  const session = await auth();
  const { personal, page } = await searchParams;

  return session ? (
    <UserHome personal={personal ?? false} page={page ?? 1} />
  ) : (
    <NewUserHome />
  );
}
