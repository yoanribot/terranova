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

The site banner blocks Analytics and Google Maps until the visitor explicitly
allows each category. Accept and reject have equal prominence; switches start
off. `Configurar cookies` in the footer and cookies policy reopens preferences.
The versioned local record lasts 180 days without sliding renewal. Invalid,
expired or unavailable records deny optional services. Analytics uses basic
Consent Mode (no pre-consent pings), 180-day non-renewing cookies, and disables
Google signals and advertising personalization signals. Revocation disables the
tag, clears accessible first-party tracking cookies and reloads when needed to
stop loaded libraries; changes also synchronize between tabs. If local storage
cannot be updated, the current document uses a memory choice and attempts a
session denial fallback. If all writes fail while a library is already running,
a fresh document consumes a deny-only URL override before restoring preferences;
the bootstrap removes that parameter from the visible URL. A stored grant from
a read-only store is not restored. TCF grants are bound to the current local
consent revision, so a previous grant cannot be reused while waiting for the CMP.
Third-party-domain cookies cannot be removed by this site's JavaScript.

AdSense additionally requires both deployment flags, the site's advertising
permission, and an affirmative settled TCF response for Google vendor 755 and
the required purposes from a genuinely configured certified CMP. This banner
does not create a TC string or install/certify that CMP. The advertising category
is shown only when the AdSense and CMP deployment settings are configured; the
script remains blocked if the actual CMP is missing or denies permission. Publish
and integrate the certified CMP through its official account/tag setup before
setting `NEXT_PUBLIC_GOOGLE_CMP_READY=true`. The TCF API listener waits up to
30 seconds for an externally configured CMP. Leave the flag false until actual
accept/reject/reopen/withdraw behavior has been verified. Analytics no longer
depends on this AdSense-specific deployment flag. Public env values are embedded
at build time: rebuild when changing them.

Fonts are self-hosted in `public/fonts` with their original licenses, so typography
does not contact Google Fonts before consent. The map placeholder uses the local
clinic photo; choosing `Permitir Google Maps` grants only the maps category.

Consent implementation references: [AEPD cookie guide](https://www.aepd.es/guias/guia-cookies.pdf),
[Google basic Consent Mode](https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic),
[Google's certified CMP requirements](https://support.google.com/adsense/answer/13554116?hl=es),
and [W3C modal dialog guidance](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).
The cookie policy describes implemented storage and providers; it does not invent
a legal entity, data protection officer, contractual safeguards or vendor lifetimes.

AdSense is restricted to the homepage and known treatment detail pages. Legal,
insurance, financing, index, patient-planner, editorial, and unknown/error routes are excluded.
Internal page navigation uses full document loads because Auto ads scripts cannot
reliably be unloaded during client-side route changes. Keep those page exclusions
in the AdSense account too, and use placement exclusions around contact forms and
other interactive controls on otherwise eligible pages.

## Content maintenance and review

Homepage reviews live in `content/google-reviews.json`. The current names,
ratings and texts were supplied by the clinic and are preserved verbatim. Missing
`publishedAt`, `dateLabel` and `reviewUrl` values are `null`; the UI omits missing
dates and individual links. Add the actual publication date in ISO format to
`publishedAt` and the original Google review permalink to `reviewUrl` when supplied.
Dates show a Google-style age in Spanish (for example, `hace 3 meses`) computed
from the supplied publication date, with the full date available on hover. Ages
are calculated after hydration and refreshed every minute, avoiding stale static
HTML ages. `dateLabel` can retain an original relative date if that is all the
source provides; prefer the actual date so the age can update. Run `npm run
test:reviews` to check the formatter. Do not invent profile photos,
profile links, publication dates, Google review IDs or aggregate review counts.
The general clinic Google Maps link is independent of the individual review links.
The carousel shows three cards on desktop, two on tablets and one on mobile, with
keyboard controls and expandable full text. No autoplay or third-party review
script is used; remote avatars, if supplied later, require the Maps consent category.

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
npm run test:consent
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
