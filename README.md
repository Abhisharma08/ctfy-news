# CTFY News

A static Next.js tribute site.

## Run locally

```bash
npm ci
npm run dev
```

## Deploy to Cloudflare Pages

The app is configured for Next.js static export; it does not need a server or a Pages Functions runtime. `npm run build` generates the deployable site in `out/`. The `wrangler.jsonc` file records the Pages output directory.

To deploy through Cloudflare Pages Git integration:

1. Create a Pages project and connect this repository.
2. Set the build command to `npm run build` and the build output directory to `out`.
3. Use Node.js 20.9 or later for the build environment.

The Next.js image optimizer is disabled because static Pages deployments do not run a Next.js server. Images are served directly by the browser.

This static deployment does not support Next.js features that require a server runtime, such as request-time rendering or API routes.
