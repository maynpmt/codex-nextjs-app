import type { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/lib/password";

export type RegisterInput = {
  name?: string;
  email?: string;
  password?: string;
};

type RegisterResult =
  | { ok: true; status: 201 }
  | { ok: false; status: 400 | 409; error: string };

export async function registerUser(
  prisma: PrismaClient,
  input: RegisterInput | null,
): Promise<RegisterResult> {
  const name = input?.name?.trim() || undefined;
  const email = input?.email?.trim().toLowerCase();
  const password = input?.password;

  if (!email || !password) {
    return {
      ok: false,
      status: 400,
      error: "Email and password are required.",
    };
  }

  if (password.length < 8) {
    return {
      ok: false,
      status: 400,
      error: "Password must be at least 8 characters.",
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      ok: false,
      status: 409,
      error: "An account with this email already exists.",
    };
  }

  const passwordHash = await hashPassword(password);

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  });

  return { ok: true, status: 201 };
}
