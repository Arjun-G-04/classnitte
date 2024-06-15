# ClassNITTe

Attendance management website.

## Technologies Used

#### Next.js (React)

Next.js is an open-source web development framework providing React-based web applications with server-side rendering and static website generation. [Docs](https://nextjs.org/docs)

#### Tailwind CSS

Tailwind CSS is an open-source CSS framework with styling using general classes. [Docs](https://tailwindcss.com/docs/installation)

#### tRPC

tRPC (TypeScript Remote Procedure Call) is an implementation of RPC, designed for TypeScript monorepos. [Docs](https://trpc.io/docs)

##### Other development tools:

-   [ESLint](https://eslint.org/docs/latest/)
-   [Prettier](https://prettier.io/docs/en/)
-   [Husky](https://typicode.github.io/husky/)
-   [lint-staged](https://www.npmjs.com/package/lint-staged)
-   [commitlint](https://commitlint.js.org/guides/getting-started.html)

## Pre-requisites

-   Node.js
-   PostgreSQL

## Setup

1. Fork and clone the repo

2. Enable corepack and download pnpm

```bash
corepack enable pnpm
```

3. Install necessary packages

```bash
pnpm install
```

4. Copy .env.example and fill it up

```bash
cp .env.example .env
```

5. If it is your first time setting up or if any migrations are pending, migrate latest schema to db

```bash
pnpm db:migrate
```

6. Seed the db

```bash
pnpm db:seed
```

7. Run the developmental server

```bash
pnpm dev
```

_The website will be up and running at http://localhost:3000_

## Notes

**Formatting code**

-   Format the code with prettier using

```bash
pnpm format
```

**Generate migrations**

-   Generate migrations using

```bash
pnpm db:generate
```

**Drizzle Studio**

-   Use Drizzle Studio for playing around with db

```bash
pnpm db:studio
```
