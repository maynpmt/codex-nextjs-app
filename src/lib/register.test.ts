import { PrismaClient } from "@prisma/client";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { verifyPassword } from "./password";
import { registerUser } from "./register";

let prisma: PrismaClient;
let testDir: string;

function createTestDatabase() {
  testDir = mkdtempSync(join(tmpdir(), "learn-codex-auth-"));
  const dbPath = join(testDir, "test.db");
  const sqlPath = join(testDir, "migration.sql");
  const migrationSql = readFileSync(
    join(process.cwd(), "prisma/migrations/20260519153000_init/migration.sql"),
    "utf8",
  );

  writeFileSync(sqlPath, migrationSql);
  execFileSync("sqlite3", [dbPath, `.read ${sqlPath}`]);

  return `file:${dbPath}`;
}

describe("registerUser", () => {
  beforeEach(() => {
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: createTestDatabase(),
        },
      },
    });
  });

  afterEach(async () => {
    await prisma.$disconnect();
    rmSync(testDir, { force: true, recursive: true });
  });

  it("creates a user with normalized email and a hashed password", async () => {
    const result = await registerUser(prisma, {
      name: "  Test User  ",
      email: "  TEST@example.COM  ",
      password: "password123",
    });

    expect(result).toEqual({ ok: true, status: 201 });

    const user = await prisma.user.findUniqueOrThrow({
      where: { email: "test@example.com" },
    });

    expect(user.name).toBe("Test User");
    expect(user.passwordHash).not.toBe("password123");
    expect(user.passwordHash).toBeTruthy();
    await expect(verifyPassword("password123", user.passwordHash!)).resolves.toBe(
      true,
    );
  });

  it("rejects missing email or password without creating a user", async () => {
    await expect(registerUser(prisma, null)).resolves.toEqual({
      ok: false,
      status: 400,
      error: "Email and password are required.",
    });

    await expect(prisma.user.count()).resolves.toBe(0);
  });

  it("rejects passwords shorter than 8 characters", async () => {
    await expect(
      registerUser(prisma, {
        email: "short@example.com",
        password: "short",
      }),
    ).resolves.toEqual({
      ok: false,
      status: 400,
      error: "Password must be at least 8 characters.",
    });

    await expect(prisma.user.count()).resolves.toBe(0);
  });

  it("rejects duplicate email addresses", async () => {
    await registerUser(prisma, {
      email: "duplicate@example.com",
      password: "password123",
    });

    await expect(
      registerUser(prisma, {
        email: "DUPLICATE@example.com",
        password: "password456",
      }),
    ).resolves.toEqual({
      ok: false,
      status: 409,
      error: "An account with this email already exists.",
    });

    await expect(prisma.user.count()).resolves.toBe(1);
  });
});
