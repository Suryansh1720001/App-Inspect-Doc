# AppInspect Website

Documentation and marketing website for **AppInspect** — an Android in-app inspector
library published on Maven Central (`io.github.suryansh1720001.appinspect`).

> **Maintenance rule:** this README is the single source of truth about the website.
> Update it after **every** change to the site (content, structure, design, or policy),
> in the same commit as the change.

## Source of facts

All library claims on the website must match the library repository:

- **Library repo:** `/Users/suryansh.prajapati/Documents/Learning/Project/AppInspect`
- **Primary reference:** the library's `README.md` (panel features, security model,
  configuration shapes, integration snippets)
- When the library README changes, sync the website and then update this file.

Last synced with library: **version 0.3.1, library commit `849610e` (2026-06-07)** —
ANR/native crash detection, search across panels, swipeable tabs, runtime
self-disable defense layer.

## File structure

| File | Purpose |
|---|---|
| `index.html` | Single-page main site (all sections below) |
| `privacy.html` | Privacy policy: website collects nothing; library is on-device only |
| `styles.css` | Full design system (no framework) |
| `script.js` | Copy buttons, mobile nav toggle, reveal animations |
| `fevicon/` | Favicons (note folder spelling: `fevicon`) |
| `Qr_code.jpeg` | UPI payment QR for the Support section |
| `docs/superpowers/specs/` | Design specs for site changes |

## Page structure (index.html) — keep this order

The order is deliberate: show what it does before how to install it.

| # | Section | Anchor | Job (one job per section — no duplication) |
|---|---|---|---|
| 1 | Hero / About | `#top` | Pitch + inspector UI mockup + trust row |
| 2 | Audiences | `#audiences` | Who it's for: dev/QA card + company card |
| 3 | Features | `#features` | Six cards: Network, Storage, WorkManager, Crashes & ANRs, Runtime, Inspector UI |
| 4 | Integration | `#install` | 3 install steps with copyable Gradle/Kotlin snippets |
| 5 | Configuration | `#configure` | **Only** place that explains config levers (`showRawSensitiveValues`, panels, power tools) |
| 6 | Security | `#security` | **Only** place that explains the two-layer release-safety model + hardening guarantees |
| 7 | QA checklist | `#qa` | **Only** place with export-credential handling advice for humans |
| 8 | CTA | — | Maven Central call-to-action card |
| 9 | Developer | `#developer` | Maintainer card (Suryansh Prajapati, GitHub/LinkedIn) |
| 10 | Support | `#support` | Buy-a-coffee card with UPI QR code |

**Nav order:** About | Features | Integration | Security | Privacy | Support

### De-duplication rules

- `showRawSensitiveValues` and other config levers are explained once, in **Configuration**.
- The no-op artifact is explained in depth once, in **Security** (Layer 1); other
  sections may reference it in one line with a link.
- Export/credential warnings live once, in **QA checklist**.

## Content policies

- **Version in snippets:** use the `<latest-version>` placeholder, never a pinned
  version — the snippet links to Maven Central for the current version. (Deliberate
  decision: the site never goes stale.)
- **Security claims** must mirror the library README's "Security Model" section:
  Layer 1 = compile-time no-op, Layer 2 = runtime self-disable. Never overstate.
- **privacy.html** must stay in sync with actual library behavior (on-device only,
  no telemetry, what is stored, export semantics). Bump its "Last updated" date
  when its content changes.
- Audience is both **companies** (release safety, standardization) and **developers/QA**
  (debugging speed, evidence quality) — keep both represented.

## Design system (styles.css)

- **Primary color:** teal `#145f5b` (also the `theme-color` meta)
- **Fonts:** Manrope (UI) + JetBrains Mono (code), via Google Fonts
- **Patterns:** `.section` + `.section-heading`, `.content-panel`, `.feature-card`,
  `.step-card` + `.snippet-card` (with copy buttons), `.warning-card`, `.check-list`,
  2-column grids (`.audience-grid`, `.security-grid`, `.qa-layout`)
- No CSS framework, no build step — plain static files.

## Working locally

```bash
# Any static server works, e.g.:
python3 -m http.server 8000
# then open http://localhost:8000
```

No build, no dependencies. Edit HTML/CSS/JS directly.

## External links used

- Maven Central artifact: <https://central.sonatype.com/artifact/io.github.suryansh1720001.appinspect/appinspect/overview>
- GitHub: <https://github.com/Suryansh1720001>
- LinkedIn: <https://www.linkedin.com/in/itssuryansh/>

## Changelog

- **2026-06-25** — Reduced section heading h2 from 2.6rem → 2rem (scales: 1.8rem at 900px, 1.6rem at 640px) for a more document-appropriate scale. Trimmed `privacy.html` "Production builds" section to a short summary linking to `security.html`, removing the duplicate two-layer model detail.
- **2026-06-25** — Fixed full-row layout on inner-page hero (removed `max-width: 760px` from `.hero-copy-full`) and Quick Start snippet (removed `max-width: 640px` from `.quickstart-layout`) so both span the full content width.
- **2026-06-25** — Multi-page restructure (Approach B): created `docs.html` (integration + configuration) and `security.html` (security model + QA checklist). Homepage shortened — install/configure/security/qa sections moved to dedicated pages, replaced by a compact Quick Start teaser. Nav updated to 6 items on all pages. `sitemap.xml` updated with new pages. `llms.txt` updated with new URLs.
- **2026-06-25** — SEO & discoverability pass: added `sitemap.xml`, `robots.txt` (allows all crawlers including GPTBot/PerplexityBot/ClaudeBot), `llms.txt` (AI crawler plain-text summary). Added to `index.html`: canonical link, Open Graph tags, Twitter Card tags, meta keywords, JSON-LD `SoftwareApplication` schema, JSON-LD `FAQPage` schema (11 questions). Added canonical to `privacy.html`. Fixed blank `alt` attributes on logo images.
- **2026-06-21** — Added Cloudflare Web Analytics beacon to index.html and privacy.html (cookie-free, free tier). Updated privacy.html to document the beacon as a third-party resource.
- **2026-06-20** — Reworked Support section: QR code now hidden behind tier cards (Coffee ₹240, Sandwich ₹420, Lunch ₹950, Huge ₹2150); clicking a tier opens a modal with the QR. Corrected footer copyright year to 2026; added `launcherShortcutEnabled` and `autoOpenOnLongPressTrigger` to Configure section.
- **2026-06-07** — Synced with library 0.3.1 README: Crashes card now covers ANR +
  native crash detection and persistence; Security rewritten as the two-layer model
  (compile-time no-op + runtime self-disable) with hardening list; search features
  added to Network/Storage/WorkManager cards; Configure snippet updated to new
  `AppInspectConfiguration` shape (`enablement`/`panels`); QA section de-duplicated and
  backup-rules note added; privacy.html updated (ANR records, self-disable layer).
  Added this README and CLAUDE.md.
- **Earlier** — Initial site: hero with inspector mockup, audiences, six feature
  cards, 3-step integration, configure/security/QA sections, privacy policy, support QR.
