# Terranova landing

This is a standalone Next.js site. Its published site content is stored locally:

- `content/site.json` contains the homepage, services, legal pages, and rich-text blocks.
- `public/content/media/` contains every media asset referenced by that content.
- `lib/content.ts` is the app's local content access layer.

## Getting started

From this directory, install dependencies and start the site:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validate a production build

```bash
pnpm build
```

All service and legal pages are statically generated from the local content snapshot. No CMS process, API URL, or separate local project is required to run or deploy the site.
