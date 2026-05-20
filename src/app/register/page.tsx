import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { authOptions } from "@/lib/auth";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-12">
      <section className="w-full max-w-md">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-zinc-500">
            Get started
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-950">
            Create your account
          </h1>
        </div>
        <RegisterForm />
      </section>
    </main>
  );
}
