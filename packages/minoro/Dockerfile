FROM oven/bun:1 AS bun

FROM node:22-bookworm-slim
RUN corepack enable && corepack install --global pnpm@12.14.0
COPY --from=bun /usr/local/bin/bun /usr/local/bin/bun
WORKDIR /workspace
