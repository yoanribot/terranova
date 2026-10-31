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

For production, copy `.env.example` to `.env.local` (or configure the same
variables in the hosting provider). The site content and media do not require
Strapi. The contact form additionally requires the Brevo SMTP variables; the
rest of the site can be rendered without them.

## Validate a production build

```bash
pnpm build
```

All service and legal pages are statically generated from the local content snapshot. No CMS process, API URL, or separate local project is required to run or deploy the site.

## AdSense deployment checklist

The AdSense integration is opt-in. Configure these production variables before
enabling it:

```env
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-7946606219665004
NEXT_PUBLIC_ADSENSE_ENABLED=true
NEXT_PUBLIC_GOOGLE_CMP_READY=true
```

Before enabling ads in production:

1. Add `www.terranovaclinicadental.es` in AdSense and verify the domain.
2. Select Google's CMP in AdSense Privacy & messaging and publish the European
   regulations message for Spain/EEA traffic.
3. Configure Auto ads with conservative placements and exclude legal/contact
   pages where appropriate.
4. Configure balanced brand-safety controls for dental, health, wellness, and
   lifestyle inventory; review unsuitable creatives in AdSense Brand safety.
5. Confirm `/ads.txt` is publicly available and contains the publisher record
   provided by Google.
6. Request the AdSense site review after the deployed site is crawlable.

The app initializes Google's consent mode with denied defaults before interactive
Google tags. Analytics and AdSense are gated by `NEXT_PUBLIC_GOOGLE_CMP_READY=true`.
This is a deployment declaration: it does not install a CMP, record a visitor's
consent, verify certification, or itself implement consent-based blocking. Leave
it false until the published CMP's actual accept/reject/withdraw behavior has
been verified. These public variables are embedded at build time; rebuild after
changing them. Configure the CMP to manage the actual tags and consent choices.

AdSense is restricted to the homepage and known treatment detail pages. Legal,
insurance, index, patient-planner, editorial, and unknown/error routes are excluded.
Internal page navigation uses full document loads because Auto ads scripts cannot
reliably be unloaded during client-side route changes. Keep those page exclusions
in the AdSense account too, and use placement exclusions around contact forms and
other interactive controls on otherwise eligible pages.

## Content maintenance and review

- `content/site.json`: clinic information and original service copy.
- `content/service-guides.json`: treatment-specific limitations, questions,
  source links and related services. Keep all related slugs valid.
- `/pacientes`: visit-preparation checklist. It stores selections only in React
  memory and never sends them to the contact API, analytics or storage.
- `/informacion-editorial`: truthful publication responsibility, sources,
  AI-assistance disclosure and correction contact. It explicitly does not claim
  signed clinical review where none has been supplied.

Before publishing the medical additions, a qualified clinic professional must
review all medical claims, including retained service copy. Supply verified name,
registration, biography and actual review details before adding clinical
attribution. Do not invent endorsements, patient results or review dates.
Confirm the current insurer list, business details and photo rights with the clinic.

See [the implementation audit](../docs/adsense-audit.md) and
[Google-source research](../docs/research/adsense-google-guidance.md). Technical
checks do not establish AdSense eligibility or guarantee approval.

## Verify the public pages

From `landing/`:

```bash
npm run test:ads
npm run lint
npm run build
node node_modules/next/dist/bin/next start -p 3100
```

In a second terminal:

```bash
npm run test:site
```

To check another deployment, run `node scripts/verify-site.mjs https://your-host`.
The expected canonical origin defaults to the public clinic domain; set
`EXPECTED_SITE_URL` when intentionally testing another canonical origin.
