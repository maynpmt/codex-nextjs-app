# Codex Next.js App

This repository is a small Next.js application with an email/password authentication flow built with NextAuth, Prisma, and SQLite.

## What Is Included

- Next.js App Router with TypeScript and Tailwind CSS
- Register and login pages
- NextAuth Credentials provider
- Prisma schema for users, accounts, sessions, and verification tokens
- SQLite local development database
- Protected dashboard page
- Middleware protection for authenticated routes
- Vitest coverage for the registration flow

## Main Paths

- `src/app/page.tsx` - home page with auth entry points
- `src/app/register/page.tsx` - register page
- `src/app/login/page.tsx` - login page
- `src/app/dashboard/page.tsx` - protected dashboard
- `src/app/api/auth/[...nextauth]/route.ts` - NextAuth API route
- `src/app/api/auth/register/route.ts` - register API route
- `src/lib/auth.ts` - NextAuth configuration
- `src/lib/register.ts` - register business logic
- `src/lib/prisma.ts` - shared Prisma client
- `prisma/schema.prisma` - database schema
- `prisma/migrations/20260519153000_init/migration.sql` - initial migration

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Update `.env` if needed. For local SQLite development:

```env
DATABASE_URL="file:/absolute/path/to/this/repo/prisma/dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="replace-with-a-generated-secret"
```

Generate Prisma Client and apply migrations:

```bash
npm run db:migrate
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Auth Flow

1. Create an account at `/register`.
2. The register API validates input, normalizes email, hashes the password, and creates a user with Prisma.
3. Login uses NextAuth Credentials provider.
4. `/dashboard` is protected and redirects unauthenticated users to `/login`.

## Scripts

```bash
npm run dev        # Start development server
npm run build      # Build production app
npm run start      # Start production server
npm run lint       # Run ESLint
npm run test       # Run Vitest tests
npm run db:generate
npm run db:migrate
npm run db:push
npm run db:studio
```

## Local Files

The following are intentionally ignored:

- `.env` and other local environment files
- `prisma/dev.db`
- SQLite runtime files such as `prisma/dev.db-wal` and `prisma/dev.db-shm`

Use `.env.example` as the committed template.
