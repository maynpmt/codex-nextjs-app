import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-4xl flex-col justify-center">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-zinc-500">
          NextAuth + Prisma + SQLite
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight text-zinc-950 sm:text-5xl">
          Authentication is wired into this Next.js app.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-600">
          Register with an email and password, sign in through NextAuth
          Credentials, and access the protected dashboard.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {session ? (
            <Link
              className="inline-flex h-11 items-center justify-center rounded-md bg-zinc-950 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800"
              href="/dashboard"
            >
              Open dashboard
            </Link>
          ) : (
            <>
              <Link
                className="inline-flex h-11 items-center justify-center rounded-md bg-zinc-950 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800"
                href="/register"
              >
                Create account
              </Link>
              <Link
                className="inline-flex h-11 items-center justify-center rounded-md border border-zinc-300 px-5 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100"
                href="/login"
              >
                Sign in
              </Link>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
