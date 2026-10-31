# EU/Spain privacy and Google AdSense review

Review date: 2026-10-03  
Scope: `landing/` application, Google Analytics/AdSense integration, contact form, and published privacy/cookie content.  
Out of scope: dependency vulnerabilities. Those are intentionally deferred to a separate PR.

## Executive conclusion

The site is **not ready to claim EU/Spain compliance or to enable production AdSense**.

The AdSense component is disabled by default and the code establishes a denied Google Consent Mode default. Those are useful safeguards, but they do not collect, prove, or manage user consent. The repository currently has no implemented CMP/banner, no visible consent-revocation control, and the Analytics component is enabled by an environment variable rather than by a consent decision.

The legal pages also describe a cookie banner and consent flow that are not present in the repository. The contact form collects personal data and can invite appointment/health information, but it currently has no first-layer privacy notice or explicit warning not to submit clinical details.

This is a technical compliance review, not legal advice. The controller should have Spanish counsel or its DPO validate the final notices, vendor contracts, retention periods, international-transfer position, and health-data processing.

## Findings

| Priority | Finding | Evidence | Required outcome |
| --- | --- | --- | --- |
| High | No effective CMP/banner is implemented | `GoogleConsentMode` only sets denied defaults; no consent UI or consent storage/receipt was found | Deploy a Google-certified CMP, configured for the applicable European consent requirements, before enabling Analytics or AdSense in production |
| High | Analytics is not actually consent-gated | `landing/app/layout.tsx` renders `GoogleAnalytics` whenever `NEXT_PUBLIC_GOOGLE_ANALYTICS` is set | Load Analytics only after an affirmative analytics-consent signal from the CMP, or use the CMP's supported Google integration |
| High | The cookie policy claims a banner and revocation flow that are absent | `landing/content/site.json` says users can accept/reject/configure through a banner and withdraw consent | Make the UI match the policy; provide a persistent, equally visible "Privacy and cookie settings" link |
| High | Contact form lacks first-layer privacy information | `landing/components/ContactForm/ContactForm.tsx` has no privacy-policy link, notice, or consent/acknowledgement control | Add concise notice covering controller, purpose, legal basis, recipients, retention, rights, and a link to the full notice before submission |
| High | Health-data exposure is possible | The message field asks for the purpose of an appointment and the site contains dental/odontopediatric content | Tell visitors not to submit medical histories or other health data; if the business intentionally collects health data, document the Article 9 condition, necessity, security, access, retention, and patient notice separately |
| High | DPO status must be verified | The privacy page names a DPO, and AEPD guidance generally requires a DPO for private health centres, while individual private professionals can be exempt | Confirm that the named DPO appointment and contact details are real, current, and contractually in place; do not publish unverified details |
| Medium | Privacy notice is too generic for the actual Google/Brevo flows | The notice mentions providers but does not clearly map Google AdSense, Google Analytics, Brevo, recipients, retention, international transfers, or safeguards by purpose | Update the notice from the real data-flow inventory and vendor terms/DPA; remove contradictory "no third-party communication" wording |
| Medium | AdSense personalization must not use health information | Google treats health-related information as sensitive for personalized advertising | Prefer contextual/non-personalized ads; do not use clinic-page visits, appointment submissions, or health interests for remarketing or audience building |
| Medium | Child-directed content needs an ads review | The site has an `odontopediatria` service page | Review child-directed/under-18 settings and ensure personalized advertising is not used on pages or experiences directed to children |
| Medium | Consent proof and withdrawal need operational ownership | The code does not show consent records, versioning, or a way to verify withdrawal | Configure the CMP/account, define retention/access for consent records, test accept/reject/withdraw on a clean browser, and document the evidence |
| Medium | Contact endpoint has privacy/security process gaps | `landing/app/api/contact/route.ts` sends submitted data to Brevo and has no visible rate limit, anti-abuse control, or application retention policy | Remove the source-code recipient fallback, require server configuration, add abuse controls, and document Brevo retention/DPA and the incident process |

## Applicable rules and guidance

### Cookies, storage, and consent

- GDPR consent must be informed, specific, freely given, unambiguous, demonstrable, and as easy to withdraw as to give. See [GDPR Articles 5-7 and 13](https://eur-lex.europa.eu/eli/reg/2016/679/).
- The ePrivacy rule requires prior informed consent for storing or accessing information on a user's device unless an exception applies. See [ePrivacy Directive Article 5(3)](https://eur-lex.europa.eu/legal-content/ENG/ALL/?uri=celex:32002L0058).
- Spain's [LSSI Article 22](https://boe.es/buscar/act.php?id=BOE-A-2002-13758&p=20220713&tn=0) requires consent and clear information for non-essential storage/access and requires an easy, free way to revoke commercial consent.
- AEPD guidance says non-essential cookies need valid consent and that "accept" and "reject" must be available at the same level of visibility. See the [AEPD cookie FAQ](https://www.aepd.es/preguntas-frecuentes/17-internet-y-redes-sociales/FAQ-1707-importancia-de-las-cookies-en-la-proteccion-de-datos).

### Google AdSense

- Google requires publishers serving ads to EEA/UK/Switzerland users to use a Google-certified CMP integrated with the current IAB TCF requirements. See [Google's CMP requirements](https://support.google.com/adsense/answer/13554116?hl=en) and [TCF integration guidance](https://support.google.com/adsense/answer/9804260?hl=en).
- Google says the publisher's privacy policy must disclose data collection, use, sharing, cookies, web beacons, IP addresses, identifiers, and third parties that may place or read cookies. See [Google Publisher Policies](https://support.google.com/adsense/answer/10502938?hl=en).
- Google requires a visible consent-revocation mechanism. See [Google's revocation guidance](https://support.google.com/adsense/answer/10959060?hl=en-GB).
- [Google's health advertising policy](https://support.google.com/adspolicy/answer/16701855?hl=en-GB) treats health as a sensitive interest category. The site must not turn health-related browsing or contact information into a personalized advertising audience.

### Health data and healthcare transparency

- Health data is a specially protected category under GDPR Article 9. See the [AEPD health-data rights guidance](https://www.aepd.es/areas-de-actuacion/salud/tus-derechos-en-relacion-con-tus-datos-de-salud).
- AEPD explains that a private health centre generally needs a DPO, while an individual private health professional may be exempt. See [AEPD's DPO FAQ for health centres](https://www.aepd.es/preguntas-frecuentes/16-salud/1-usuarios-sanidad/FAQ-1630-estan-obligados-los-centros-sanitarios-a-tener-un-delegado-de-proteccion-de-datos).
- AEPD distinguishes the duty to inform from consent: a privacy notice is required when collecting personal data, while consent is only one possible legal basis. See [AEPD's information-duty FAQ](https://www.aepd.es/preguntas-frecuentes/2-tus-obligaciones-como-responsable-del-tratamiento/6-el-deber-de-informacion/FAQ-0248-sobre-si-el-usuario-tiene-que-dar-consentimiento-a-clausula-de-privacidad).

## What is already in good shape

- AdSense is disabled by default with `NEXT_PUBLIC_ADSENSE_ENABLED=false`.
- The AdSense client ID is validated before being inserted into the script URL.
- `ads.txt`, `robots.txt`, and `sitemap.xml` are present and were verified during the application smoke test.
- Google Consent Mode starts with ad and analytics storage denied.
- The privacy and cookie pages are discoverable from the footer.
- The contact route validates input and escapes values before putting them into HTML email content.
- No SMTP credentials or other secret values were added to the public AdSense configuration.

These controls reduce risk but do not replace a real CMP, accurate notices, consent evidence, or the controller's legal/vendor documentation.

## Required release gate

Before setting `NEXT_PUBLIC_ADSENSE_ENABLED=true` or enabling production Analytics:

1. Configure and publish the Google-certified CMP/Privacy & Messaging message for the site's EEA audience. Use equal-visibility choices for consent, refusal, and settings.
2. Ensure the CMP blocks non-essential Google tags until the relevant consent exists and that withdrawal actually stops/restricts them.
3. Add and test a persistent "Privacy and cookie settings" link on every page.
4. Add the contact-form first-layer notice and an explicit "do not send medical information" instruction.
5. Inventory actual cookies/storage and vendors, including Google, Brevo, hosting, fonts, analytics, durations, purposes, recipients, and transfers; update the legal pages from that inventory.
6. Verify the DPO/controller details, vendor DPAs, retention periods, access controls, and breach-response process.
7. Configure AdSense for contextual/non-personalized behavior where appropriate, exclude sensitive/unsuitable categories, and review child-directed pages.
8. Re-test with a clean browser for: reject all, accept analytics only, accept ads, withdraw later, no pre-consent network calls, and no consent-cookie bypass.

## Deferred dependency work

Dependency vulnerability remediation is intentionally not included in this review or file. It should be handled in the separate PR the user identified, with its own test/build and regression review.
