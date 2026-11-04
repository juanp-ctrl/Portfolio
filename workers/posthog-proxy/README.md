# PostHog proxy (Cloudflare Worker)

Forwards analytics traffic from `e.juanpablojimenez.dev` to PostHog US cloud
so requests are first-party and not blocked by ad blockers.

## Deploy

```bash
cd workers/posthog-proxy
pnpm dlx wrangler login
pnpm dlx wrangler deploy
```

The `juanpablojimenez.dev` zone must be on the same Cloudflare account; the
custom domain (and its DNS record) is created automatically on deploy.

## Wire it up

Set this env var wherever the site is built (Cloudflare Pages → Settings →
Environment variables, and `.env.local` for local builds):

```
NEXT_PUBLIC_POSTHOG_HOST=https://e.juanpablojimenez.dev
```

Then rebuild the site. Check in DevTools → Network that requests go to
`e.juanpablojimenez.dev` and return 200.
