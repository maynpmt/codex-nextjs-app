import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { registerUser, type RegisterInput } from "@/lib/register";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as RegisterInput | null;
  const result = await registerUser(prisma, body);

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error },
      { status: result.status },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
