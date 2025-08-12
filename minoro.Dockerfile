FROM oven/bun:1 as base

WORKDIR /app

FROM base as build
COPY . .
RUN bun install --frozen-lockfile
# COPY packages/minoro ./packages/minoro
RUN cd packages/minoro && bun run build

# prod
FROM base as prod
COPY --from=build /app/bun.lock ./bun.lock
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/packages/database/package.json ./packages/database/package.json
COPY --from=build /app/packages/minoro/package.json ./packages/minoro/package.json
COPY --from=build /app/packages/minoro/dist ./packages/minoro/dist
RUN bun install --omit dev 

CMD ["bun", "run", "run:minoro"]
