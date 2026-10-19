# portfolio

My personal website: an Astro SSR frontend backed by a Minoro CMS instance.

## Tech stack

- **Frontend** (`packages/frontend`): Astro 5 (SSR) + Vue 3 + Tailwind CSS v4 + TypeScript. Deployed on Vercel (Vercel adapter with ISR).
- **CMS** (`packages/minoro`): [Minoro](https://www.npmjs.com/package/minoro) admin panel on Bun + Drizzle + SQLite. Hosted on my VPS via Coolify; the Docker image is built by GitHub Actions and pushed to GHCR.
- **Database** (`packages/database`): shared Drizzle schema. The frontend queries SQLite through the CMS's `/api/db` endpoint using Drizzle's `sqlite-proxy`.
- Bun workspaces monorepo.

## Local development

Requires [Bun](https://bun.sh).

```bash
bun install
```

### Environment variables

`packages/minoro/.env.development` is committed with dev defaults. Create the gitignored `packages/frontend/.env`:

```bash
MINORO_URL=http://localhost:8989
DB_AUTH_TOKEN=test # must match DB_AUTH_TOKEN in packages/minoro/.env.development
```

### Create the database

First run only. Creates the tables in `packages/minoro/data.db`:

```bash
cd packages/minoro && bun run drizzle-push
```

### Run

```bash
bun run dev
```

- Site: <http://localhost:4321>
- Admin: <http://localhost:8989/setup?token=SECRET_ADMIN_TOKEN> (creates the first admin user, once)

### Useful commands

```bash
cd packages/minoro
bun run drizzle-studio # browse the SQLite database
bun run drizzle-push    # apply schema changes to data.db
```
