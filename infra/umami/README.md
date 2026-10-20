# Umami

## Deploy

1. Copy `.env.example` to `.env`. Generate the first three values with `openssl rand -hex 32`.
2. In Cloudflare Zero Trust, create a remotely managed tunnel and add `analytics.sutter-nicolas.com` as a public hostname. Its service URL is `http://umami:3000`.
3. Put the tunnel token in `.env`, then run `docker compose up -d` from this directory.
4. Open `https://analytics.sutter-nicolas.com`, sign in with `admin` / `umami`, and change the password immediately.
5. Add a website for `sutter-nicolas.com` and allow `sutter-nicolas.com,www.sutter-nicolas.com`. Copy its website ID.
6. In Cloudflare Workers Builds, set `PUBLIC_UMAMI_WEBSITE_ID` and `PUBLIC_UMAMI_HOST_URL=https://analytics.sutter-nicolas.com`, then redeploy the portfolio.

The tracker honors Do Not Track and collects Umami's built-in page-view and referral data. Do not commit `.env`.
