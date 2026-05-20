import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/session/SignOutButton";
import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <section className="mx-auto w-full max-w-4xl">
        <div className="flex flex-col gap-4 border-b border-zinc-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-zinc-500">
              Dashboard
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-zinc-950">
              Signed in as {session.user.email}
            </h1>
          </div>
          <SignOutButton />
        </div>

        <div className="grid gap-4 py-8 sm:grid-cols-3">
          <div className="rounded-md border border-zinc-200 p-5">
            <p className="text-sm text-zinc-500">User ID</p>
            <p className="mt-2 break-all text-sm font-medium text-zinc-950">
              {session.user.id}
            </p>
          </div>
          <div className="rounded-md border border-zinc-200 p-5">
            <p className="text-sm text-zinc-500">Name</p>
            <p className="mt-2 text-sm font-medium text-zinc-950">
              {session.user.name || "Not set"}
            </p>
          </div>
          <div className="rounded-md border border-zinc-200 p-5">
            <p className="text-sm text-zinc-500">Session</p>
            <p className="mt-2 text-sm font-medium text-zinc-950">Active</p>
          </div>
        </div>
      </section>
    </main>
  );
}
