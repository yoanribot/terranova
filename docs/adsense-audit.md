# AdSense low-value-content audit and implementation

Date: 2026-10-28. Site: https://www.terranovaclinicadental.es/.

## Assessment

Google's message is a whole-site quality assessment, not evidence of a missing
AdSense tag. The public site and the local production build showed promotional
treatment pages with shared homepage metadata, limited visible source/clinical
responsibility information, no practical patient-preparation resource, and soft
404s for unknown service/legal URLs. These are observed gaps; Google does not
disclose which specific page or signal produced this rejection.

The site's original service pages are not empty: most contain roughly 400–770
words. Adding a target word count, automatically generated articles, fake reviews,
traffic, clinician identities or dates would not address the underlying problem.
See the [official Google-source research](research/adsense-google-guidance.md).

## Changes implemented

| Observed gap | Implementation | Limit |
| --- | --- | --- |
| Treatment/legal pages reused homepage titles, descriptions and canonicals | Page-specific metadata and social previews | Discovery fixes do not establish original clinical expertise |
| Unknown service/legal slugs returned HTTP 200 | `notFound()` in metadata and page resolution; useful 404 page | The host must preserve Next's status responses |
| Treatment copy emphasized benefits and conversion | Eleven treatment-specific decision guides: limitations, questions, sources and related options | A real clinic professional must validate both retained and new medical text |
| Bruxism page promoted selective tooth grinding for jaw disorders and overstated splint benefits | Replaced that section with conservative, evidence-limited explanation aligned with NIDCR; linked source | No claim of signed clinical review |
| Insurance page largely promoted appointments | Concrete checks for panel membership, covered acts, excesses, authorizations and written estimates | Retained insurer names came from the existing site and are unverified |
| No original functional patient resource | `/pacientes`: first visit, estimate or follow-up checklist, optional insurance checks, printing and text download | Administrative organization only; no diagnosis, booking or coverage certification |
| Unclear publication responsibility and sources | `/informacion-editorial`: links to existing legal identity, source limitations, AI-assistance disclosure and correction contact | Existing business information has not been independently certified |
| New information needed discoverability | Treatment index, homepage entry, header/footer links, breadcrumbs and sitemap entries | Real traffic and ongoing use require actual operation |
| Global ad loader could run on utility, legal or invalid pages | Exact content-route allowlist; full document internal navigation so Auto ads do not persist across destinations | Also configure account-level page/placement exclusions, especially around contact forms |
| Google tag enablement was independent of demonstrated CMP setup | Explicit CMP deployment gate for Analytics/AdSense; denied defaults run before interactive tags | This does not supply a CMP, validate consent or resolve inaccurate existing policies |
| Contact form encouraged clinical details without a privacy link | Administrative-only prompt, no-medical-data instruction and link to existing privacy notice | Full legal/data-flow wording awaits confirmed facts |
| Duplicate main headings and restricted zoom | One main heading per public page; zoom allowed; closed mobile navigation inert | Existing image/font lint warnings remain |

## Validation

Before fixes, `node landing/scripts/verify-site.mjs` against the original local
production build reproduced shared titles and HTTP 200 responses for invalid
service/legal slugs. The same defects were confirmed against the public site.

After fixes:

- `npm run build` in `landing/`: production build and TypeScript pass; new pages
  are statically generated.
- `npm run lint`: zero errors; seven existing image/custom-font warnings.
- `npm run test:ads`: eligibility tests pass for explicit enablement, CMP
  declaration, publisher format, valid routes, utility routes and unknown URLs.
- `node landing/scripts/verify-site.mjs`: 19 public pages pass unique-title,
  self-canonical and main-heading checks; all 37 internal destinations/linked
  assets pass; three invalid-route probes return 404 and noindex; sitemap and
  robots checks pass. A content-encoding guard catches replacement characters
  and question marks inserted inside Spanish words; the corrected snapshot passes.
- All eleven clinical guide slugs and related-service destinations match the
  actual content snapshot. Sources are linked in the server-rendered pages.
- Browser checks cover the responsive patient page, selecting a budget visit
  with insurance (11 steps), checklist progress, mobile menu opening, absence of
  horizontal overflow, empty local/session storage, and absence of external
  Google tags with the CMP gate unset. The native text-download link's actual
  payload contains the selected visit, insurance choice, one checked and ten
  unchecked steps. The print button and print stylesheet were checked, and the
  print layout visually inspected. Local screenshots are in `artifacts/adsense/`.
- The browser CLI's file-retrieval operation timed out, including for a native
  download link. The link payload and filename are verified; an automated
  operating-system file-save check is not claimed. No production output is
  replaced by a mock to make this check pass.

These checks validate implementation behavior. They do not predict approval.
The changes have not been deployed or submitted for review.

## Information to provide and confirm — no placeholders or invented data

Missing facts stay missing. Existing values are retained as previously published
information, not treated as verified legal facts. Do not publish fabricated staff,
licenses, clinical review badges, case studies, testimonials or consent claims.

1. **Business/legal identity:** confirm the current legal entity, tax identifier,
   registered/business address and official contact details. These currently
   appear in the existing legal notice; confirm them before reusing or revising
   notices. Supply any required health-centre registration/authorization details
   and the verified professional responsible for the clinic.
2. **Professional identity and clinical review:** provide the responsible
   dentist's real name, registration number/college, verified qualifications,
   approved biography, and permission for any portrait. The clinician must
   review every treatment page, risks/alternatives, source interpretation and
   all clinic-specific claims (including retained digital equipment/protocol
   claims). Only then record the actual review scope and date. No fictional
   reviewer fields have been populated.
3. **Privacy facts:** confirm the controller and rights-contact details, whether
   a DPO applies and the appointed contact, actual purposes/legal bases,
   recipients/providers (hosting, email, Google and other embeds), retention,
   transfers/safeguards, and the clinic's approved notices. The existing cookie
   policy describes controls that were not demonstrated by repository code;
   reconcile the notice with the real setup. This audit does not replace those
   facts with assumptions or claim legal sign-off.
4. **Consent/account configuration:** identify the actual CMP and published
   message, applicable ad mode and consent controls. Supply/test accept,
   reject and withdrawal behavior and the persistent settings mechanism. Keep
   `NEXT_PUBLIC_GOOGLE_CMP_READY=false` until verified. Certification and legal
   compliance are separate questions; follow current Google requirements for
   the traffic and advertising mode used.
5. **Clinic operations and evidence:** verify current insurer agreements,
   appointment hours, fees and what a visit includes before publishing specific
   promises. Supply owned/licensed clinic photographs and genuine details of
   the clinical team and patient process if available. No invented prices,
   appointment guarantees, coverage, cases, results or patient numbers were added.

## Work outside this repository before requesting another review

- Complete the verified information and clinical/legal review above, then deploy
  this implementation. Do not request review while the live site still shows
  the older version.
- Publish/configure the real CMP; test consent decisions and withdrawal on a
  clean browser. Do not enable tags just to satisfy the new environment flag.
- In AdSense, exclude legal, planner, editorial, index, insurance and error/utility
  pages, and exclude placements around forms/buttons on eligible pages. Review
  sensitive-health audience and unsuitable-ad settings; never send form or
  health data to Google or create health-interest audiences.
- Verify public access to `robots.txt`, `sitemap.xml`, `ads.txt`, real status
  codes and the full patient journey on the actual host. Use Search Console to
  examine discovery/indexing issues. Resubmitting the sitemap is an operational
  step, not an approval requirement or guarantee.
- Maintain content from real patient questions, source/clinical corrections,
  current service/insurer information and feedback. Keep a record of substantive
  changes; do not manufacture fresh dates or user engagement. A simple internal
  record can identify owner, page, change, supporting evidence and actual
  clinician review where relevant.
- Confirm genuine use through appropriately consented measurement and real
  feedback. No universal Google minimum for visits, words, articles or waiting
  days was found in the reviewed official guidance. Follow any account-specific
  review restrictions and dates shown by AdSense.

The previous `LEGAL_ADSENSE_REVIEW.md` was pre-existing local work and was not
overwritten. Its older CMP summary should be read alongside the current Google
research, which distinguishes personalized-ad requirements from other ad modes.
