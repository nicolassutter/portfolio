# portfolio

My personal website, built as a static Astro site.

## Tech stack

- **Frontend** (`packages/frontend`): Astro + Vue 3 + Tailwind CSS v4 + TypeScript.
- **Deployment**: static assets deploy through the `sutter-nicolas-com` Cloudflare Worker.

## Local development

Requires [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/).

```bash
pnpm install
```

### Run

```bash
pnpm dev
```

- Site: <http://localhost:4321>

### Useful commands

```bash
pnpm build # generate packages/frontend/dist
```

## Deploy

Workers Builds deploys the `sutter-nicolas-com` Worker from `main`. Keep the
dashboard build command empty; Wrangler reads `wrangler.jsonc`, builds the
site, and uploads `packages/frontend/dist`.
