// Run against a production preview or deployed site: node scripts/validate-kill9-seo.mjs <origin>
import assert from 'node:assert/strict';

const origin = process.argv[2] || 'http://localhost:3100';
const canonical = 'https://www.adityamali.com/cafe/kill9';
async function get(path) {
  const response = await fetch(new URL(path, origin));
  assert.equal(response.status, 200, `${path} must return HTTP 200`);
  return response;
}
const [pageResponse, sitemapResponse, robotsResponse, imageResponse] = await Promise.all([
  get('/cafe/kill9'), get('/sitemap.xml'), get('/robots.txt'), get('/cafe/kill9/opengraph-image'),
]);
const html = await pageResponse.text();
const visibleHtml = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
const decode = (value) => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#x27;', "'");
const metas = new Map([...html.matchAll(/<meta\s+([^>]+)>/g)].map(([, attributes]) => {
  const name = attributes.match(/(?:name|property)="([^"]+)"/)?.[1];
  const content = attributes.match(/content="([^"]*)"/)?.[1];
  return [name, content ? decode(content) : content];
}));
assert.equal(decode(html.match(/<title>(.*?)<\/title>/s)?.[1] || ''), 'Kill9 for macOS — Find & Kill Processes Using Local Ports');
assert.equal((visibleHtml.match(/<h1\b/g) || []).length, 1, 'one primary heading');
assert.ok(html.includes(`<link rel="canonical" href="${canonical}"`));
for (const key of ['description', 'og:title', 'og:description', 'og:url', 'og:image', 'og:image:alt', 'twitter:title', 'twitter:description', 'twitter:image']) assert.ok(metas.get(key), key);
assert.equal(metas.get('og:url'), canonical);
assert.equal(metas.get('og:title'), metas.get('twitter:title'));
assert.equal(metas.get('description'), metas.get('og:description'));
assert.equal(metas.get('description'), metas.get('twitter:description'));
assert.equal(metas.get('twitter:card'), 'summary_large_image');
assert.equal(metas.get('robots'), 'index, follow, max-image-preview:large');
const scripts = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
const nodes = scripts.flatMap(([, value]) => { const parsed = JSON.parse(value); return parsed['@graph'] || [parsed]; });
const types = nodes.map((node) => node['@type']);
for (const type of ['SoftwareApplication', 'Person', 'WebPage', 'WebSite']) assert.ok(types.includes(type), type);
assert.ok(!types.includes('FAQPage') && !types.includes('HowTo'));
const ids = new Set(nodes.map((node) => node['@id']));
function checkReferences(value) {
  if (!value || typeof value !== 'object') return;
  if (Object.keys(value).length === 1 && value['@id']) assert.ok(ids.has(value['@id']), `unresolved reference ${value['@id']}`);
  for (const child of Object.values(value)) checkReferences(child);
}
nodes.forEach(checkReferences);
const app = nodes.find((node) => node['@type'] === 'SoftwareApplication');
assert.equal(app.name, 'Kill9');
assert.equal(app.url, canonical);
assert.equal(app.operatingSystem, 'macOS 13.0 or later');
assert.equal(app.applicationCategory, 'DeveloperApplication');
assert.equal(app.sameAs, 'https://github.com/adityamali/kill9');
assert.ok(app.downloadUrl.endsWith('/Kill9_MacOS.zip'));
for (const unsupported of ['aggregateRating', 'review', 'offers', 'interactionStatistic']) assert.ok(!(unsupported in app));
for (const id of ['kill-port-3000', 'find-process', 'eaddrinuse', 'free-localhost-port', 'gui-alternative', 'identify-project', 'termination', 'windows-linux']) assert.ok(visibleHtml.includes(`id="${id}"`), `FAQ ${id} in initial HTML`);
for (const content of ['SwiftUI and AppKit', 'lsof -nP -iTCP:3000 -sTCP:LISTEN', 'Download Kill9 for macOS', 'escalation is not automatic']) assert.ok(visibleHtml.includes(content), content);
assert.ok(!visibleHtml.includes('opacity:0'), 'product content must be visible without animation JS');
assert.ok(!visibleHtml.includes('Kill9 Screenshot 1'), 'do not present icon as screenshot');
const sitemap = await sitemapResponse.text();
assert.equal(sitemap.split(`<loc>${canonical}</loc>`).length - 1, 1, 'one canonical sitemap entry');
const robots = await robotsResponse.text();
assert.ok(robots.includes('Sitemap: https://www.adityamali.com/sitemap.xml'));
assert.ok(!robots.includes('Disallow: /cafe'));
const png = Buffer.from(await imageResponse.arrayBuffer());
assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
assert.equal(png.readUInt32BE(16), 1200);
assert.equal(png.readUInt32BE(20), 630);
console.log('PASS: HTTP 200; initial HTML; 8 FAQs; one h1; canonical; SEO/OG/X metadata; linked JSON-LD; sitemap; robots; 1200×630 social image.');
console.log('Schema.org checks are local assertions, not a Google Rich Results Test certification.');
