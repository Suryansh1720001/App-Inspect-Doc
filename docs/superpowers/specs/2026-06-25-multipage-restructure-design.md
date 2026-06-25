# Multi-Page Restructure Design (Approach B)

**Date:** 2026-06-25
**Goal:** Split the single 886-line index.html into three focused pages — homepage (marketing), docs (technical reference), security (trust page) — for better UX, cleaner SEO signal per page, and production-ready site structure.

---

## Pages After Restructure

| File | Purpose | SEO target queries |
|---|---|---|
| `index.html` | Marketing / evaluation landing page | "android debugging library", "android in-app inspector" |
| `docs.html` | Full integration + configuration reference | "how to install appinspect android", "appinspect gradle setup" |
| `security.html` | Trust and safety page | "appinspect security", "android library release safety", "android sdk no telemetry" |
| `privacy.html` | Privacy policy (unchanged) | — |

---

## `index.html` — Content Map

### Remove
- Full 3-step Installation section (`#install`) — replaced by Quick Start teaser
- Configuration section (`#configure`) — moves to `docs.html`
- Security section (`#security`) — moves to `security.html`
- QA checklist section (`#qa`) — moves to `security.html`

### Add
- **Quick Start teaser** (new, replaces `#install`): compact section with 2 Gradle lines only (`debugImplementation` + `releaseImplementation`), copy button, and a "Full integration guide →" link to `docs.html`. Anchor: `#install` (preserved so existing links don't break).

### Keep (unchanged content, order preserved)
1. Hero / About (`#top`)
2. Audiences (`#audiences`)
3. Features (`#features`)
4. Quick Start teaser (`#install`) ← new compact version
5. FAQ (`#faq`)
6. CTA — update "Copy Install Steps" button label to "Read the Docs", update href to `docs.html`
7. Developer / Maintainer (`#developer`)
8. Support (`#support`)

### Nav
```html
About | Features | Docs | Security | Privacy | Support
```
- "About" → `#top`
- "Features" → `#features`
- "Docs" → `docs.html`
- "Security" → `security.html`
- "Privacy" → `privacy.html`
- "Support" → `#support`

---

## `docs.html` — Full Spec

### Head
- Title: `Docs | AppInspect`
- Meta description: `Step-by-step integration guide for AppInspect — add Maven Central, configure Gradle build variants, attach the OkHttp interceptor, and customize panels for your team.`
- Canonical: `https://app-inspect-doc.vercel.app/docs.html`
- OG + Twitter tags (same pattern as index.html)
- Same fonts, styles.css, script.js

### Nav
Same 6-item nav as index.html. "Docs" gets active/current styling.

### Sections (in order)
1. **Page hero** — eyebrow: "Integration guide", h1: "Integrate AppInspect in three steps.", short paragraph intro, CTA button → Maven Central, secondary button → `security.html`
2. **Step 1 — Add Maven Central** (step-card with `settings.gradle.kts` snippet + copy button)
3. **Step 2 — Add the library** (step-card with `build.gradle.kts` variant deps snippet + copy button + inline notes about custom variants)
4. **Step 3 — Attach OkHttp capture** (step-card with `OkHttpClient` snippet + copy button + inline note)
5. **Configuration** (`#configure`) — section-heading + configure-layout: code snippet panel left + levers definition list right. All 7 levers preserved.
6. **Bottom CTA** — "View on Maven Central" + "Security model →" link to `security.html`

### Footer
Same footer as index.html (copyright, Privacy link).

### Cross-links fixed
- Step 2 inline note: `<a href="security.html">Security</a>` (was `#security`)
- Configuration levers: no internal cross-links needed

---

## `security.html` — Full Spec

### Head
- Title: `Security | AppInspect`
- Meta description: `AppInspect uses two independent layers to keep release builds safe: a compile-time no-op artifact and a runtime self-disable gate. Zero telemetry, no exported components.`
- Canonical: `https://app-inspect-doc.vercel.app/security.html`
- OG + Twitter tags
- Same fonts, styles.css, script.js

### Nav
Same 6-item nav. "Security" gets active/current styling.

### Sections (in order)
1. **Page hero** — eyebrow: "Security and data handling", h1: "Release builds are safe — two independent layers of protection.", intro paragraph (same as current index.html security section intro)
2. **Layer 1 — Compile-time no-op** (content-panel, check-list)
3. **Layer 2 — Runtime self-disable** (content-panel, check-list)
4. **Hardening in every build type** (content-panel, check-list)
5. **Debug and staging builds are intentionally open** (content-panel, check-list) — cross-link "Configuration" → `docs.html#configure`
6. **QA checklist** — section-heading + qa-layout: warning-card left + good habits panel right — cross-link "Configuration" → `docs.html#configure`
7. **Bottom CTA** — "Integration guide →" link to `docs.html`

### Footer
Same footer as index.html.

---

## Shared Shell (nav + footer pattern)

Every page uses the same header/nav and footer. The brand logo links to `index.html` on all pages. Nav links are absolute paths (`docs.html`, `security.html`) not anchors, so they work from any page.

Active page indicator: add `aria-current="page"` to the current page's nav link.

---

## `sitemap.xml` — Updated

Add two new `<url>` entries:
```xml
<url>
  <loc>https://app-inspect-doc.vercel.app/docs.html</loc>
  <lastmod>2026-06-25</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
<url>
  <loc>https://app-inspect-doc.vercel.app/security.html</loc>
  <lastmod>2026-06-25</lastmod>
  <changefreq>yearly</changefreq>
  <priority>0.7</priority>
</url>
```

## `llms.txt` — Updated

Add under Links section:
```
- Docs / Integration guide: https://app-inspect-doc.vercel.app/docs.html
- Security model: https://app-inspect-doc.vercel.app/security.html
```

## `README.md` — Updated

- File structure table: add `docs.html` and `security.html` rows
- Page structure table: update to reflect new 3-page structure
- Nav order line: update
- Changelog: add 2026-06-25 entry

---

## Files Changed / Created

| File | Change |
|---|---|
| `index.html` | Remove install/configure/security/qa sections; add Quick Start teaser; update nav and CTA |
| `docs.html` | New — full integration + configuration page |
| `security.html` | New — security model + QA checklist page |
| `sitemap.xml` | Add docs.html and security.html entries |
| `llms.txt` | Add new page URLs |
| `README.md` | Update file structure, page structure, nav order, changelog |
