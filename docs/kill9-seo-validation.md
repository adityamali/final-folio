# Kill9 SEO, GEO, and discoverability implementation

Implemented on the existing `/cafe/[slug]` route for Kill9. No new landing URL was created. Changes are in the local checkout and have not been deployed.

## Content and conversion

- Preserved the cream, charcoal, orange, teal, typography, borders, and retro shadows.
- Added a server component for Kill9 so the full product description, workflow, installation, Terminal guide, and all eight requested FAQs are in the initial HTML.
- Made Download Kill9 for macOS the first action, above the longer introduction, with a second download action at the end.
- Explained audience, TCP listener discovery, project identification limits, process termination, EADDRINUSE, and macOS compatibility.
- Replaced unsupported fastest/safest and zero-CPU claims with factual descriptions.
- Corrected automatic force-kill claims: Stop sends SIGTERM; Force sends SIGKILL only when clicked after the process remains.
- Replaced the broken github.com/theadityamali/kill9 link with the verified public github.com/adityamali/kill9 repository.
- Added crawlable internal links to Software Café and the developer’s About page, plus section navigation.
- Removed the icon-as-screenshot gallery for Kill9. The component supports real gallery assets and an optional demo URL, but neither is currently available in the product data.
- Updated the pre-existing llms.txt and llms-full.txt to agree with verified product information. These files are supplementary; they do not guarantee search or AI visibility.

## Metadata

Title: Kill9 for macOS — Find & Kill Processes Using Local Ports

Description: Find and stop processes using local TCP ports on macOS. Kill9 by Aditya Mali identifies development projects and helps resolve port conflicts and EADDRINUSE.

Canonical: https://www.adityamali.com/cafe/kill9

The live non-www address returns a 307 redirect to www. Canonical, Open Graph URL, entity URLs, sitemap links, and robots sitemap reference now use www. Open Graph and X large-image metadata are populated. The title avoids the inherited portfolio title suffix.

## Structured data

- SoftwareApplication: name, description, DeveloperApplication category, macOS developer utility subcategory, macOS 13.0+ requirements, version from the product record, download URL from the product record, installation section URL, icon, feature list, public repository, developer and publisher references, and main page reference.
- WebPage: canonical identity, title, description, language, main application entity, author, and parent website.
- WebSite: shared identity, official root URL, name, language, and publisher; emitted in the root layout, including the homepage.
- Person: Aditya Mali, connected consistently using an @id.
- No ratings, reviews, download counts, endorsements, or inferred pricing offers.
- FAQPage and HowTo omitted. The full FAQ remains visible. Google retired FAQ rich results on May 7, 2026 and removed that feature’s documentation in June 2026.

Local assertions check JSON parsing, entity references, expected fields and values, and agreement with the page. This is not a certification from Schema.org Validator or Google Rich Results Test. Valid Schema.org markup does not establish eligibility for Google software-app rich results; this page does not provide the reviews/ratings and offer fields used for those enhancements.

## Search intents addressed

- How to kill a process on port 3000 on Mac/macOS.
- How to free an occupied localhost/development port.
- EADDRINUSE / address already in use on macOS.
- Find which process or application is listening on port 8080.
- Graphical alternative to lsof and kill on Mac.
- macOS port management utility for developers.
- Identify the development project occupying a TCP port.

The page avoids unsupported comparative rankings and keyword stuffing. Search engines and AI assistants independently determine indexing, citations, and recommendations.

## Validation completed

- `npm run build`: passed, including the production TypeScript stage.
- `node scripts/validate-kill9-seo.mjs http://localhost:3100`: passed against the final production preview.
- HTTP 200 for the product page, sitemap, robots.txt, and generated Open Graph image.
- Unique expected title, meta description, canonical, Open Graph, and X metadata.
- Full product description, Terminal commands, and all eight FAQs in initial HTML.
- Exactly one h1. Shared sidebar branding now uses a paragraph with the same styling.
- JSON-LD parses; SoftwareApplication, WebPage, WebSite, and Person exist with resolved local @id references.
- Kill9 canonical occurs once in the sitemap; omitted misleading page modification timestamp derived from binary release information.
- `index, follow, max-image-preview:large`; product route allowed by robots.txt, admin routes remain excluded.
- Social preview is a valid 1200×630 PNG.
- Mobile (403px) and desktop (1440px) browser checks: no document or article horizontal overflow; download CTA visible in the mobile first viewport.
- Direct download fetched successfully; archived Info.plist specifies macOS 13.0, and lipo confirms x86_64 and arm64 binaries.
- Public repository README agrees with the documented Stop/Force behavior and compatibility.
- Focused lint passes for product content, metadata, layout, sitemap, robots, and the validator using the installed Next.js 16 flat config.
- `git diff --check`: passed.

## Existing repository issues

- `npm run lint` uses removed `next lint` and fails under Next.js 16.
- The existing ESLint FlatCompat configuration errors with a circular-structure exception. Focused lint used an untracked temporary native Next.js flat config.
- Adding the shared Sidebar to focused lint exposes its pre-existing react-hooks/set-state-in-effect error at the route-change effect; this change only alters branding heading semantics.
- Standalone `npx tsc --noEmit` fails in existing tests due to missing @testing-library/react and test-runner globals. Production build type checking passes.
- The build still warns about the existing deprecated images.domains configuration.

## Remaining improvements

1. Deploy through the existing hosting workflow; no production deployment was performed here.
2. Add genuine product screenshots showing listeners/project names and Stop/Force, and a short recorded demo. Current product images contain only the icon. Native app screenshot capture timed out; no substitute or fabricated screenshot was published.
3. After deployment run `node scripts/validate-kill9-seo.mjs https://www.adityamali.com`, then verify with Schema.org Validator and Google’s live URL Inspection/Rich Results tools.
4. Submit or refresh the sitemap and request indexing in Google Search Console and Bing Webmaster Tools; monitor impressions, target queries, clicks, and download conversions over time.
5. Review the older generic product description/features in the content store separately if they are reused in listing cards; this task corrects the Kill9 detail page and local AI summary files without changing database records.
6. Repair the existing lint/test tooling in a separate maintenance change.

## Primary references

- Product behavior: https://github.com/adityamali/kill9
- Schema vocabulary: https://schema.org/SoftwareApplication
- Google software-app guidance: https://developers.google.com/search/docs/appearance/structured-data/software-app
- FAQ retirement: https://developers.google.com/search/updates
- Google AI features guidance: https://developers.google.com/search/docs/appearance/ai-features
