import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const site = JSON.parse(await readFile(new URL('../content/site.json', import.meta.url), 'utf8'));
function checkTextEncoding(value) {
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    if (['text', 'title', 'description', 'heading', 'subHeading'].includes(key) && typeof child === 'string') {
      assert.ok(!/\p{L}\?\p{L}|\uFFFD/u.test(child), `Corrupted content encoding: ${child}`);
    }
    if (typeof child === 'object') checkTextEncoding(child);
  }
}
checkTextEncoding(site);
checkTextEncoding(JSON.parse(await readFile(new URL('../content/service-guides.json', import.meta.url), 'utf8')));
console.log('PASS Spanish content encoding');
const base = process.argv[2] || 'http://localhost:3100';
const canonicalBase = process.env.EXPECTED_SITE_URL || 'https://www.terranovaclinicadental.es';
const legal = new Set(['aviso-legal', 'politica-privacidad', 'politica-cookies']);
const paths = ['/', ...site.blogs.map(p => `/${legal.has(p.slug) ? 'terminos' : 'servicios'}/${p.slug}`), '/pacientes', '/informacion-editorial', '/servicios', '/terminos'];
let failures = 0;
const titles = new Set();
const internalLinks = new Set();
for (const path of paths) {
  try {
    const response = await fetch(new URL(path, base));
    assert.equal(response.status, 200, `${path}: HTTP status`);
    const html = await response.text();
    for (const match of html.matchAll(/href="(\/(?!\/)[^"#]*)/g)) {
      if (match[1] && !match[1].startsWith('/_next/') && !match[1].startsWith('/api/')) internalLinks.add(match[1].replaceAll('&amp;', '&'));
    }
    const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
    assert.ok(title && !titles.has(title), `${path}: missing or duplicated title (${title})`);
    titles.add(title);
    const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
    assert.equal(canonical && new URL(canonical).href, new URL(path, canonicalBase).href, `${path}: canonical must identify this page`);
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${path}: one main heading`);
    if (path === '/pacientes') {
      const exportText = html.match(/href="data:text\/plain;charset=utf-8,([^"]+)"/)?.[1];
      assert.ok(exportText, 'planner download must be a native local text link');
      const checklist = decodeURIComponent(exportText);
      assert.ok(checklist.includes('Tipo de visita: primera'), 'default export has the wrong visit');
      assert.equal((checklist.match(/\[ \]/g) || []).length, 6, 'default export must include the six initial steps');
    }
    if (path.startsWith('/servicios/') && !path.endsWith('/aseguradora')) {
      assert.ok(html.includes('Fuentes y alcance de esta información'), `${path}: sources and scope absent from server HTML`);
      assert.ok(html.includes('/informacion-editorial'), `${path}: publisher information missing`);
    }
    console.log(`PASS ${path}`);
  } catch (error) { failures++; console.error(`FAIL ${error.message}`); }
}
for (const path of internalLinks) {
  try {
    const response = await fetch(new URL(path, base));
    assert.equal(response.status, 200, `${path}: internal link or linked asset is broken`);
  } catch (error) { failures++; console.error(`FAIL ${error.message}`); }
}
console.log(`Checked ${internalLinks.size} internal destinations and linked assets`);
for (const path of ['/servicios/no-existe', '/terminos/no-existe', '/no-existe']) {
  try {
    const response = await fetch(new URL(path, base));
    assert.equal(response.status, 404, `${path}: must return 404, not a soft error`);
    assert.ok((await response.text()).includes('noindex'), `${path}: noindex missing`);
    console.log(`PASS ${path} (404)`);
  } catch (error) { failures++; console.error(`FAIL ${error.message}`); }
}
try {
  const sitemap = await fetch(new URL('/sitemap.xml', base)).then(r => r.text());
  for (const path of paths) assert.ok(sitemap.includes(`<loc>${new URL(path, canonicalBase)}</loc>`), `${path}: absent from sitemap`);
  const robots = await fetch(new URL('/robots.txt', base)).then(r => r.text());
  assert.ok(robots.includes('Allow: /') && robots.includes('/sitemap.xml'), 'crawler access and sitemap');
  console.log('PASS sitemap and robots');
} catch (error) { failures++; console.error(`FAIL ${error.message}`); }
assert.equal(failures, 0, `${failures} site checks failed`);
