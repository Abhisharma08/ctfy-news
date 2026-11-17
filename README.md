# CTFY News

A static Next.js tribute site.

## Run locally

```bash
npm ci
npm run dev
```

## Deploy to Cloudflare Pages

The app is configured for Next.js static export; it does not need a server or a Pages Functions runtime. `npm run build` generates the deployable site in `out/`. The `wrangler.jsonc` file records the Pages output directory.

`wrangler.jsonc` configures the Pages output directory; it does not configure or run the build command. Set the build command in the Cloudflare dashboard:

1. Open the Pages project and go to **Settings > Builds & deployments > Build configurations**.
2. Set **Build command** to `npm run build` and **Build output directory** to `out`.
3. Ensure the project root directory is the repository root and use Node.js 20.9 or later for the build environment.
4. Retry the deployment.

The Next.js image optimizer is disabled because static Pages deployments do not run a Next.js server. Images are served directly by the browser.

This static deployment does not support Next.js features that require a server runtime, such as request-time rendering or API routes.
