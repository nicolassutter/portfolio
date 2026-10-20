FROM ghcr.io/pnpm/pnpm:12 AS build
RUN pnpm runtime set node 24 -g

WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @example/basics build
RUN pnpm deploy --filter=@example/basics --prod /prod

FROM node:24-alpine AS release
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /prod ./
CMD ["node", "./dist/server/entry.mjs"]
