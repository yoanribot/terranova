# Live AdSense policy audit

Checked 2026-10-31, approximately 09:03–09:07 UTC. Website: https://www.terranovaclinicadental.es/.

## Assessment

**The live site should not be considered fully compliant or ready for another AdSense review.** A reproducible consent implementation defect needs correction. Empty routes with an active advertising loader and the site's current content also create review risks. These findings do not identify Google's private rejection reason or establish that every concern is a confirmed policy violation.

This is a review of the public deployment. The repository contains improvements from 2026-10-28 that are not reflected in the pages tested today. No website code, deployment, AdSense settings or contact submissions were changed during this audit.

## Method and evidence

- Read Google's current program, publisher, inventory-value, privacy, consent and readiness guidance; see the [policy research](research/adsense-policy-requirements-2026-10-31.md).
- Retrieved all 16 URLs in the live sitemap: homepage, 12 service pages and three legal pages. All returned HTTP 200. Read their text and inspected returned metadata, links and contact fields.
- Probed six additional routes: three local improvements missing from production, two nonexistent dynamic slugs and one nonexistent root path.
- Used two separate new browser sessions without accepting consent or submitting forms. Inspected storage names, data-layer order, Google's TCF CMP ping response and resource requests. Also inspected the cookie-policy page and a nonexistent treatment page.
- Visually inspected the full-page desktop homepage screenshot. No visible advertisement was present in the tested pages/sessions; a detected ad slot had zero dimensions. Actual ad density, mobile overlays and accidental-click placements therefore remain unverified.
- Earlier same-session crawler tests returned HTTP 200 to both `Mediapartners-Google` and `Google-Display-Ads-Bot`, with working robots, ads.txt and sitemap access. HTTP and apex-domain redirects resolve to accessible HTTPS/www destinations. These requests imitate user agents; they do not prove an actual crawl from a Google-owned IP.

Raw public-page captures, parsed text, summaries and browser evidence: `artifacts/adsense-policy-2026-10-31/`. Cookie values and patient data were not collected. Browser evidence retains cookie names and redacts Funding Choices request identifiers.

## Findings

### 1. High — Analytics storage occurs before consent

**Confirmed implementation defect and policy concern.** Both clean homepage sessions created `_ga` and `_ga_1MTXE759VZ` cookies before any visitor consent action. An Analytics collection request was observed. The data layer ran in this order:

1. `gtag('js', ...)`
2. `gtag('config', 'G-1MTXE759VZ')`
3. `gtag('consent', 'default', { analytics_storage: 'denied', ... })`

The denied default arrives too late. Google's consent-mode guidance requires the default before measurement commands such as `config`. Google's EU consent policy requires valid consent for storage where legally required. This is more than the presence of a pre-consent request: the browser actually had Analytics cookies before a choice. [Consent-mode implementation](https://developers.google.com/tag-platform/security/guides/consent), [EU User Consent Policy](https://www.google.com/about/company/user-consent-policy/).

Google's Funding Choices CMP was present, with `cmpId: 300`, `gdprApplies: true`, `cmpLoaded: true`, and `displayStatus: hidden`. No accept/reject/configure interface or persistent settings control was visible in the audited browser state; only links to the legal notices appeared. Do not describe this as a missing CMP library: its runtime loaded, but working consent collection was not demonstrated. Account configuration and approval status were not available.

**Correction:** establish denied defaults before measurement, publish/configure the appropriate consent message, connect choices to the tags, and verify storage and request behavior in clean accept/reject/withdraw flows. Google's certified-CMP requirement specifically applies to personalized European ads; some non-personalized or limited-ad configurations remain possible. That distinction does not cure premature Analytics storage. [CMP requirements](https://support.google.com/adsense/answer/13554116?hl=en).

Evidence: `homepage-browser.json`, `fresh-homepage-browser.json`, `cookies-browser.json`.

### 2. High — Published privacy promises do not match observed behavior

**Confirmed mismatch.** The [cookie policy](https://www.terranovaclinicadental.es/terminos/politica-cookies) promises that Analytics cookies are installed only after express consent through a banner, and describes accepting, rejecting, configuring and withdrawing choices. The clean-browser test contradicts the installation promise and did not expose those controls.

The [privacy policy](https://www.terranovaclinicadental.es/terminos/politica-privacidad) identifies the clinic and includes an AdSense paragraph, but otherwise uses broad commercial-processing language. Its no-third-party-communication wording is difficult to reconcile with the Google paragraph. The notices link or print Google's general privacy URL, but do not give the standard prior-visit advertising-cookie explanation or a direct Ads Settings/advertising opt-out route. Their adequacy depends partly on actual enabled vendors and advertising modes, which must be reconciled with the account configuration. [Google's required privacy content](https://support.google.com/adsense/answer/1348695?hl=en).

**Correction:** describe the actual configured Google and other vendor flows, implement the promised controls, and supply the applicable advertising disclosures and accessible withdrawal instructions. A notice rewrite alone does not fix consent timing.

### 3. High — Empty dynamic routes still load AdSense

**Confirmed routing/loader defect; conditional ad-serving violation.** These nonexistent pages return HTTP 200 with header/footer text and no substantive page content:

- `/servicios/adsense-audit-nonexistent-20261031`
- `/terminos/adsense-audit-nonexistent-20261031`

The nonexistent treatment page also loaded the publisher's `adsbygoogle.js` successfully in a real browser. No visible ad was observed, so this audit does not claim an ad was actually served on that empty screen. The setup nevertheless permits a prohibited placement if ads start filling. Google disallows ads on empty, low-value and dead-end/error screens. [Inventory-value policy](https://support.google.com/publisherpolicies/answer/11112688?hl=en).

**Correction:** return real 404 responses, keep advertising off invalid/empty/utility screens, and verify exact eligible routes in production. The real cookie-policy page also loads AdSense, but a legal page is not automatically prohibited merely because it is legal content; exclusions there are a conservative inventory choice.

Evidence: `pages.json`, `empty-treatment-browser.json`, captured nonexistent-route text/HTML.

### 4. High review risk — Original patient value and clinical responsibility need strengthening

**Editorial assessment, not a confirmed Google decision.** The service pages contain meaningful text; they are not uniformly empty. They explain treatment basics, but largely follow a benefits/local-clinic/appointment template. No signed clinical review or authoritative source links were found on the live service pages. The whitening page repeats its opening explanatory section verbatim. The insurance page primarily lists providers and encourages booking, with little information about coverage verification or exclusions.

Google's readiness guidance stresses distinctive original material, useful specialist contributions and a clear visitor experience. A clinic brochure can have value, but the present site remains vulnerable to a low-value-content assessment. There is no policy-backed universal article, traffic or word-count target. Missing bylines, use of stock photographs, or generic prose alone do not establish copying, AI abuse or a named policy violation. [Readiness guidance](https://support.google.com/adsense/answer/7299563?hl=en), [Inventory-value policy](https://support.google.com/publisherpolicies/answer/11112688?hl=en).

**Correction:** add verified clinic-specific information and useful patient decision support, remove duplication, and obtain genuine clinical review. Do not invent qualifications, patient results, testimonials, review dates or numerical approval targets.

### 5. High clinical-review priority — Bruxism/TMD treatment claims

**Specific medical-content concern; requires clinician assessment.** The live [bruxism page](https://www.terranovaclinicadental.es/servicios/bruxismo) presents selective tooth grinding/bite adjustment as an effective personalized response to bruxism/TMD and makes broad splint-benefit claims.

NIDCR's current TMD information says evidence for pain relief from splints is limited and that occlusal procedures such as grinding teeth lack sufficient evidence for TMD and can worsen it. This directly warrants review of the page's efficacy framing and omissions. It does not establish that a particular patient's treatment was inappropriate or that Google has classified this page as harmful misinformation. [NIDCR TMD guidance](https://www.nidcr.nih.gov/health-info/tmd).

Google's publisher policy prohibits harmful health claims. A qualified clinician should correct overstatements, explain limitations/alternatives, and verify all treatment claims before review. [Publisher Policies](https://support.google.com/publisherpolicies/answer/10502938?hl=en).

### 6. Deployment and implementation differences

**Confirmed deployment gap.** The live `/pacientes`, `/informacion-editorial` and `/servicios` routes return 404 despite existing locally. These paths are not in the live navigation or live sitemap, so their absence alone is not a broken-primary-link violation; it establishes that the earlier local content/navigation improvements are not deployed.

Live pages also share the homepage title and homepage canonical; this is a discovery/metadata flaw, not an automatic AdSense policy violation. Unknown root paths return real 404s, unlike unknown treatment/legal slugs.

The actual AdSense script is inserted into `body` with `data-nscript="afterInteractive"`, rather than residing in `head`; its URL, publisher ID, async and anonymous CORS attributes are correct. The head contains a preload link and `google-adsense-account` metadata. The valid public ads.txt record also matches the publisher. Google's documented verification alternatives include publisher metadata and ads.txt, so script body placement alone does not prove ownership verification fails. [Connection guidance](https://support.google.com/adsense/answer/7584263?hl=en).

## Checks with no public blocker found

- Public page/crawler access, robots permissions, sitemap, publisher metadata and ads.txt are available.
- Homepage service links and legal destinations resolve; normal clinic navigation and contact information are visible.
- No request to click Google ads, disguised ad controls, or visible excess ad density was observed. No filled ad creative was available to judge placement comprehensively.
- The reviewed text did not reveal an obvious illegal/adult/hate/gambling-content issue. Dental/health content itself is not categorically prohibited.
- The clinic's own services/promotional copy is not automatically third-party paid promotion for Google's ad-to-content ratio rule.

## What remains unverified

- AdSense Policy Center decisions, approval status, account history and review waiting periods.
- Auto ads/page exclusions, personalized-ad modes, health-based audiences, restricted categories and child-directed treatment settings. A pediatric-dentistry page aimed at parents does not by itself prove the site is child-directed.
- Traffic sources, own-ad clicks, incentives, bot traffic and invalid-impression history.
- Consent records, all regional/device variants, accept/reject/withdraw behavior after the configuration is repaired.
- Image licenses, actual professional credentials, insurer contracts and claimed clinic equipment/protocols.
- Whether any real contact data reaches Google. Forms were not submitted. The live prompt asks for the purpose of the appointment and lacks the administrative-only/no-medical-data guidance present locally; that is a data-minimization concern, not evidence of a Google PII leak. Patient information must stay out of ad/analytics payloads and health-based audiences. [Identifying users](https://support.google.com/publisherpolicies/answer/10436913?hl=en-GB), [Personalized advertising](https://support.google.com/publisherpolicies/answer/15101728?hl=en).

## Order of work before another review

1. Repair the live consent order and actual CMP/Analytics integration; verify clean-browser storage and choices.
2. Match the notices to real behavior and provide working withdrawal controls.
3. Deploy real 404s and an exact ad-route allowlist; verify that empty screens cannot receive ads.
4. Complete clinical review and original patient-value improvements, then deploy the reviewed content and navigation.
5. Inspect the actual AdSense Policy Center and account controls, confirm real ad placements across screen sizes, and request review only after the public site reflects the corrections.
