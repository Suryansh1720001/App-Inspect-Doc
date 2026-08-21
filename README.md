# AppInspect Website

Documentation and marketing website for **AppInspect** — an Android in-app inspector
library published on Maven Central (`io.github.suryansh1720001.appinspect`).

Live at <https://app-inspect-doc.vercel.app/>.

> **Maintenance rule:** this README is the single source of truth about the website.
> Update it after **every** change to the site (content, structure, design, or policy),
> in the same commit as the change.

## Source of facts

All library claims on the website must match the library repository:

- **Library repo:** `/Users/suryansh.prajapati/Documents/Learning/App-Inspect`
- **Primary reference:** the library's `README.md` (panel features, security model,
  configuration shapes, integration snippets), plus `docs/public-api.md` for exact
  field names and defaults. Note the README's "Current Status" version line lags
  behind — trust `version = "…"` in the library's root `build.gradle.kts`, and confirm
  against Maven Central before publishing a version number to the site.
- Check `git status` / `git diff` in the library repo too: features often land as
  uncommitted work.
- When the library changes, sync the website and then update this file.

Last synced with library: **version 0.7.0, library commit `0bda474` plus local
uncommitted changes (2026-08-21)**.

## Architecture

Plain static HTML, CSS and JS. **No build step, no dependencies, no framework.** Two
kinds of page:

1. **`index.html`** — the marketing landing page. Its own layout (`.landing`), styled
   entirely by `styles.css`.
2. **Fifteen documentation pages** — each one a real HTML file with a three-column
   docs shell (`.docs`): page nav on the left, the article in the middle, "On this
   page" on the right.

Every documentation page contains **only its `<article class="prose">` content** that
is unique. Navigation is generated at runtime from one nav tree, so pages never repeat
each other's structure:

| Rendered by `docs.js` from the `NAV` tree | Where it appears |
|---|---|
| Left sidebar, grouped, with the active page marked | `#docs-nav` |
| Sub-section links under the active page, built from its own `h2`s | inside `#docs-nav` |
| "On this page" rail and the collapsed mobile version, from `h2` + `h3` | every `[data-toc]` |
| Heading anchor links and auto-generated heading ids | the article |
| Previous / next links | `#page-nav` |
| Search index (⌘K / `/`) | `#search-dialog` |
| Contact + per-page feedback line | `[data-contact-slot]`, `[data-feedback-line]` |

**To add a documentation page:** create the HTML file (copy the chrome from any
existing docs page), then add an entry to `NAV` in `docs.js` and a `<url>` to
`sitemap.xml`. Nothing else needs touching.

**The chrome is duplicated per page** — `<head>`, top bar, footer and the search
dialog are real HTML on every page, deliberately, so the site works without JS and
crawls properly. A change to the top bar or footer therefore has to be applied to
`index.html` plus the fifteen docs pages.

### Contact address — one place

`docs.js` defines `CONTACT_EMAIL` at the top (currently
`itssuryanshprajapati@gmail.com`). It drives both the footer link and the per-page
feedback line; leave it empty and they fall back to GitHub. Do not hard-code the
address into HTML.

**One deliberate exception:** `privacy.html` has a literal `mailto:` in its Questions
section, because a privacy policy's contact route must work with JavaScript disabled.
If the address changes, update `docs.js` *and* `privacy.html`.

## File structure

| File | Purpose |
|---|---|
| `index.html` | Landing page: hero + phone mockup, how it works, feature cards, audiences, release safety, quick start, FAQ, CTA, maintainer, support |
| `docs.html` | Docs home — **Introduction** (keeps the historical `/docs.html` URL) |
| `install.html` | Gradle setup, OkHttp interceptor, verification, host-controlled `install()` |
| `open-inspector.html` | Every entry point, shake tuning, own-task behaviour, moving between panels |
| `network.html` | Network panel |
| `mocks.html` | Response mocking |
| `storage.html` | Storage panel |
| `workmanager.html` | WorkManager panel |
| `crashes.html` | Crashes and ANRs panel |
| `runtime.html` | Runtime panel |
| `value-viewer.html` | Shared value viewer |
| `configuration.html` | Configuration reference |
| `notifications.html` | Network notifications + Android 13 permission |
| `security.html` | Security model |
| `data-handling.html` | What the library stores on a device, and what leaves it |
| `qa-checklist.html` | Export-handling checklist |
| `privacy.html` | Privacy policy — **the website only** |
| `styles.css` | Tokens (light + dark), reset, top bar, buttons, code blocks, footer, search dialog, landing page |
| `docs.css` | Docs shell only: sidebar, TOC, prose typography, callouts, tables, prev/next, mobile drawer |
| `script.js` | Theme toggle, syntax highlighting, copy buttons, support modal, mobile drawer |
| `docs.js` | The `NAV` tree and everything generated from it (see above) |
| `fevicon/` | Favicons and the wordmark logo (note the folder spelling: `fevicon`) — see "The logo" below |
| `Qr_code.jpeg` | UPI payment QR for the Support section |
| `sitemap.xml` | Search-engine sitemap; bump `lastmod` when a listed page changes |
| `robots.txt` | Crawler rules (allows all crawlers, including AI crawlers) |
| `llms.txt` | Plain-text summary for AI crawlers |
| `docs/superpowers/specs/` | Design specs for site changes |

## Page structure

### Landing page (`index.html`) — keep this order

Show what it does before how to install it; deep-dive content lives in the docs.

| # | Section | Anchor | Job |
|---|---|---|---|
| 1 | Hero | — | Pitch, two CTAs, trust line, and the interactive phone mockup (see below) |
| 2 | How it works | — | Three steps: add a dependency, open it on the device, evidence leaves as a file |
| 3 | What you can inspect | `#features` | Seven cards, each linking to its docs page |
| 4 | Who it is for | — | Two panels: developers/testers, and companies/platform teams |
| 5 | Release safety | — | The "this must never ship" objection, answered, links to `security.html`. Uses `.band-split` |
| 6 | Quick start | `#quick-start` | `.band-split` intro + links, then a **full-width** Gradle snippet |
| 7 | FAQ | `#faq` | 13 questions, mirrored by the JSON-LD `FAQPage` schema. Uses `.band-split` |
| 8 | CTA | — | Install / Maven Central |
| 9 | Maintainer | `#developer` | Suryansh Prajapati, GitHub + LinkedIn |
| 10 | Support | `#support` | Tier cards → UPI QR modal |

### The interactive phone mockup (hero)

The mockup is a working tab interface, not a picture — it doubles as the feature tour,
so it is the main path from the landing page into the panel docs.

- **Six panels**, all in the markup: five `role="tab"` buttons on the bottom bar
  (Network, Mocks, Storage, Work, Crashes) plus the **Runtime pill in the top bar**,
  which is how Runtime actually opens in the app. Arrow keys move along the bottom bar,
  mirroring the swipe gesture.
- **Wiring**, all data attributes, handled by the `[data-mock]` block in `script.js`:

  | Attribute | On | Purpose |
  |---|---|---|
  | `data-mock-tab="network"` | a tab button | Which view it shows |
  | `data-mock-label="Network"` | a tab button | The top-bar title. **Required** — do not derive it from `textContent`, because the badge span comes first in the DOM |
  | `data-mock-doc="network.html"` | a tab button | The docs page the caption links to |
  | `data-mock-note="…"` | a tab button | The caption sentence for that panel |
  | `data-mock-view="network"` | a panel | The view itself; `.is-on` shows it |
  | `data-mock-title` / `data-mock-caption` | bar title / caption | Targets that get updated |

- **Adding a panel** means adding one `[data-mock-view]` block and one tab button with
  those five attributes. No JS change.
- **The phone has its own colour scale** (`--p-bg`, `--p-card`, `--p-teal`, …) declared
  locally on `.phone-screen`. It is a device screen, so it stays dark in both site
  themes — do not wire it to the site tokens.
- **Content must stay plausible and consistent.** The counts in a panel's `.phone-meta`
  line should match the rows shown, badges should use real vocabulary
  (`SHORT_CIRCUIT`, `OVERRIDDEN`, `ENQUEUED`, `ANR`), and nothing should claim a
  capability the library does not have. Hosts are `example.co`, never a real one.
- `.phone-scroll` clips overflow, so a view that grows past roughly 470px silently
  loses its last row. Check each panel after editing.

### Documentation sidebar order

Defined by `NAV` in `docs.js`. Groups and pages:

- **Getting started** — Introduction, Install, Opening the inspector
- **Panels** — Network, Mocks, Storage, WorkManager, Crashes and ANRs, Runtime, Value viewer
- **Configuration** — Configuration reference, Network notifications
- **Safety and privacy** — Security model, Data handling, QA checklist, Privacy policy

### De-duplication rules — one canonical home per topic

Other pages may summarise a topic in a line or two **with a link**, never re-explain it.

| Topic | Canonical home |
|---|---|
| Gradle setup, variants, the OkHttp interceptor, why it goes last, wire headers | `install.html` |
| Entry points (shake, shortcut, long press, notification tap, `open()`), own-task behaviour, panel navigation | `open-inspector.html` |
| Per-panel behaviour | that panel's own page |
| The shared JSON tree viewer | `value-viewer.html` |
| How mocking works: sources, modes, matching, `mocks.json` shape, rule actions, priority, the five gates, `adb pull` | `mocks.html` |
| Every configuration field and its default; the two ready-made profiles | `configuration.html` |
| `POST_NOTIFICATIONS` on Android 13+ | `notifications.html` |
| Release safety (both layers), hardening, what debug builds expose, mocking's security posture | `security.html` |
| What the library stores on a device, retention, encryption, the mirror file, exports, backups, deletion, Play Data Safety answers | `data-handling.html` |
| Export credential hygiene for humans | `qa-checklist.html` |
| **The website's** own data practices — cookies, analytics, hosting, `localStorage` | `privacy.html` |

Note the split on mocking: **how it works and how to switch it on** is `mocks.html`
(including the gate table, because that is what you consult when a rule will not
fire); **why the design is safe** — rules are not redacted, the mirror file is
external storage, `src/debug/assets`, `allowResponseMocking = false` on non-debuggable
builds — is `security.html#mocking`.

### Privacy vs. data handling — keep these separate

Two different questions, deliberately on two pages:

- **`privacy.html` is about the website only** — cookies, analytics, hosting,
  `localStorage`. That is what a privacy policy is: a statement by whoever runs a
  service about how they handle *your* personal data. Do not put library behaviour back
  on this page. Its "Last updated" date is meaningful precisely because library
  releases no longer touch it.
- **`data-handling.html` is about the library** — what it writes to a device, retention,
  encryption, the mirror file, exports, backups, deletion, and the answers an adopter
  needs for a Google Play Data Safety form or a vendor questionnaire. This is a
  technical disclosure, **not** a privacy policy: AppInspect never receives the data, so
  it is neither controller nor processor. The host app developer is.

`security.html` keeps only the release-safety framing of the same facts — "when the
library is disabled, none of this is written" — and links here for the rest. The one
claim that intentionally appears on both is *no network calls / zero telemetry*, because
it is the answer to a security question **and** a data question; on `security.html` it
is a one-line summary with a link.

## Content policies

- **Version in snippets:** use the `<latest-version>` placeholder, never a pinned
  version. Deliberate: the site never goes stale. The current version appears once as
  the `brand-version` pill, in the Introduction note, and in the JSON-LD
  `softwareVersion`.
- **Write for three readers at once** — a developer integrating it, a tester using it,
  and someone deciding whether it is safe to adopt. Lead each page with what the thing
  is for in plain language, then the specifics.
- **Prose over bullet dumps.** Explain *why* a behaviour exists, not just that it
  exists. Tables are for genuine matrices (gates, actions, field references), not for
  hiding sentences.
- **Security claims** must mirror the library README's "Security Model": Layer 1 =
  compile-time no-op, Layer 2 = runtime self-disable. Never overstate.
- **`privacy.html`** covers the website only; bump its "Last updated" date when its
  content changes. **`data-handling.html`** is the page that must stay in sync with
  actual library behaviour.
- Never invent a configuration field name. If the library repo does not document it,
  do not put it on the site.

## Design system

- **Accent:** teal — `#145f5b` in light, `#4fd1c5` in dark. One amber for warnings.
  No gradients beyond the faint hero grid.
- **The light theme is warm cream, not white.** `--bg` is `#fdfbf5`, bands are
  `#f7f2e7`, cards `#fffdf8`, borders warm (`#e7dfcd`). Deep teal on paper-cream reads
  better than teal on clinical white and is easier over a long page. Shadows are
  warm-toned (`rgba(48, 38, 20, …)`) so nothing casts grey onto cream, and `--warn-soft`
  is a deeper amber than it needs to be on white, because a pale amber fill disappears
  against cream. Two things deliberately stay pure white: `--accent-on` (label on a
  teal button) and `.modal-qr` (a QR needs maximum camera contrast).
- **Contrast is a constraint, not a preference.** Every text token must clear WCAG AA
  (4.5:1) against **all three** light surfaces — page, band and card. `--text-faint` is
  the tight one: it sits at 4.82:1 on `--bg-soft`, so lightening it any further breaks
  AA. Re-check after changing any neutral.
- **Themes:** light and dark are both first-class. The default follows the OS; the
  toggle persists to `localStorage` under `appinspect-theme`. An inline script in every
  `<head>` applies the stored choice before first paint, so there is no flash.
- **Code surfaces are dark in both themes** — deliberate, and it makes the light theme
  look like the tooling the readers already use.
- **Fonts:** Manrope (UI) and JetBrains Mono (code), via Google Fonts.
- **Syntax highlighting** is a ~60-line tokenizer in `script.js`, driven by
  `<code data-lang="kotlin|json|bash|xml">`. Every rule regex must use non-capturing
  groups only — the token-class lookup depends on one capture group per rule.
- **Snippet markup:** `.snippet` > `.snippet-head` (file label + `.copy-button`) >
  `<pre><code data-lang="…">`. The copy button finds its `code` through
  `closest('.snippet')`, so no ids are needed.
- **Callouts:** `.note` (neutral), `.warn` (amber), `.tip` (teal), each with a
  `.note-title`.
- **The logo.** The mark is two-tone ink with a see-through lens, so **one asset
  cannot serve both themes** — the original black-on-transparent version vanishes on
  dark. There are two variants with identical geometry:

  | File | Ink | Used by |
  |---|---|---|
  | `fevicon/logo.svg` | `#0e1a19` | Light theme |
  | `fevicon/logo-dark.svg` | `#4fd1c5` (brand teal) | Dark theme |
  | `fevicon/favicon.svg` | Both, via its own `@media` block | Browser tab only |

  In the page it is a **CSS background on `<span class="brand-mark">`**, not an
  `<img>` — CSS cannot swap an `img` `src`, and the mark is decorative anyway since
  the word "AppInspect" sits beside it. The swap is driven by `data-theme` **and** the
  `prefers-color-scheme` fallback, so it follows the site toggle rather than the OS.
  The favicon is the one exception: browser chrome cannot see our toggle, so
  `favicon.svg` carries an internal `@media (prefers-color-scheme: dark)` and follows
  the OS. The `.ico` and `.png` fallbacks stay light-only.
  **Both lens centres are transparent** (the ring is a stroke, not two stacked
  circles), so the mark sits correctly on the page, a panel or the footer.
- **Landing-page band layouts — pick by what is underneath.** A narrow `.band-head`
  (62ch) is only correct when a **full-width grid follows it**, as in "How it works",
  "What you can inspect" and "Who it is for". When a band is text-only or has one
  narrow child, wrap it in `.band-split` (heading left, `.band-body` right) so the
  right half is not an empty hole. Anything that must not scroll horizontally — a
  Gradle snippet with 100-character lines — goes full width in the `.wrap`, not into a
  side-by-side column.
- **Everything on the landing page and both footers align to 1180px** (`.wrap`,
  `.hero-inner`, `.site-footer-inner`). `--page-max` (1400px) is for the docs shell
  only, and mixing the two is what made the footer look wider than the page.
- **Docs code column:** the prose column is 760px and code is `0.82rem`, which fits
  about 92 characters. Break longer lines in the snippet source instead of letting
  them scroll — a `val group = "…"` local in a Gradle block reads better anyway.
- **Other prose components:** `.table-scroll` (wraps every table so wide ones scroll
  instead of breaking the page), `<dl>` field references with `.dt-default`,
  `.card-grid` + `.doc-card`, `.chip-row` + `.chip`.
- Wide content must scroll inside its own container; the page body never scrolls
  horizontally.
- No CSS framework, no build step, plain static files.

## Working locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Check both themes and at least one narrow width — the docs sidebar becomes a drawer
below 940px and the right-hand TOC collapses into a `<details>` below 1180px.

## URL compatibility

`docs.html`, `security.html` and `privacy.html` kept their original paths through the
2026-08-21 restructure, so no inbound link broke. `docs.html` is now the docs home
(Introduction) rather than a single long integration guide. The old
`docs.html#install`, `#mocks`, `#notifications` and `#configure` anchors became their
own pages — if inbound links to those anchors ever matter, add redirects.

## External links used

- Maven Central artifact: <https://central.sonatype.com/artifact/io.github.suryansh1720001.appinspect/appinspect/overview>
- Maven Central versions: <https://central.sonatype.com/artifact/io.github.suryansh1720001.appinspect/appinspect/versions>
- GitHub: <https://github.com/Suryansh1720001>
- LinkedIn: <https://www.linkedin.com/in/itssuryansh/>

## Changelog

- **2026-08-21 (privacy / data-handling split)** — `privacy.html` was covering two
  unrelated things, and an audit showed its library section duplicated `security.html`
  on every single topic (`appinspect_storage.db`, the mirror file, retention,
  `FileProvider`, `EncryptedSharedPreferences`, telemetry). Split them: **`privacy.html`
  is now the website only** — no cookies, no accounts, the three third parties involved
  in serving the site, and the `localStorage` theme key — roughly one screen, and its
  date no longer moves when the library changes. It also now discloses **Vercel
  hosting**, which the old page omitted despite naming Cloudflare and Google Fonts.
  Library data handling moved to a new **`data-handling.html`** in the Safety group:
  what is written where, both retention caps, encrypted-preference decryption, the mock
  rule mirror, export scoping, auto-backup, deletion, and a section answering a Google
  Play **Data Safety** form or vendor questionnaire — the headline being that the
  recommended setup keeps the library out of the production APK entirely, so there is
  nothing to declare. `security.html`'s storage section shrank to the release-safety
  framing plus a link. Also repointed: the homepage FAQ's telemetry answer, both
  footers, `docs.js` `NAV`, `sitemap.xml`, and `llms.txt` (which now separates library
  data handling from website privacy). Rationale for keeping both pages rather than
  deleting the library content is recorded under "Privacy vs. data handling" above.
- **2026-08-21 (cream light theme)** — Replaced pure white in the light theme with a
  warm cream: `--bg` `#ffffff` → `#fdfbf5`, `--bg-soft` `#f4f7f6` → `#f7f2e7`, surfaces
  `#fffdf8`, and the cool grey-green borders and neutrals retoned warm. Shadows moved
  from `rgba(9, 24, 22, …)` to `rgba(48, 38, 20, …)` so nothing casts a grey shadow onto
  cream, and `--warn-soft` was deepened to `#fbeed1` because the old pale amber no
  longer read as a callout against a cream page. The light `theme-color` meta changed
  from brand teal to `#fdfbf5`, matching what the dark theme already did with its own
  background. Verified every text token against all three light surfaces: all pass WCAG
  AA, and `--text-faint` was darkened to `#626d67` because at `#67726c` it landed at
  4.48:1 on `--bg-soft` — just under the 4.5 threshold. The dark theme is unchanged.
- **2026-08-21 (theme-aware logo)** — The logo is black ink on a transparent lens, so
  it disappeared against the dark theme's background. Added `fevicon/logo.svg` (dark
  ink) and `fevicon/logo-dark.svg` (brand teal), same geometry, both with a
  **transparent lens centre** — the ring is now a stroke rather than two stacked
  circles, so the mark works on any surface instead of only on white. The header and
  footer use `<span class="brand-mark">` with a CSS background swap keyed off
  `data-theme` plus the `prefers-color-scheme` fallback, so it follows the site toggle;
  a background is also more correct than an `<img>` here, since the mark is decorative
  next to the wordmark. `favicon.svg` gained its own internal
  `@media (prefers-color-scheme: dark)` block, because browser chrome cannot see the
  site toggle; the `.ico`/`.png` fallbacks are unchanged. Chose a teal reverse lockup
  over a `filter: invert()` hack so the dark logo looks designed and matches the accent
  used by links and the version pill.
- **2026-08-21 (interactive hero mockup)** — The phone mockup became a real tab
  interface instead of a static picture of the Network panel. All six panels are now
  in the markup — Network, Mocks, Storage, Work, Crashes on the bottom bar, Runtime on
  the top-bar pill — and clicking one switches the screen, the bar title, and the
  caption under the phone, which now carries a one-line description plus a link into
  that panel's docs page. That makes the mockup the main route from the landing page
  into the panel documentation. The bottom bar was rebuilt to be informative rather
  than decorative: an icon per panel, plus count badges (`99+` on Network, amber `2`
  on Mocks, `3` on Crashes) and a `4` badge on the Runtime pill, following the real
  library's bottom bar. Rows are richer too — status and method badges, colour-coded
  duration, path, host, and time/size chips, in the shape the app actually renders.
  The phone grew to 344&times;604 (hero column 364px) to fit it, and the screen now
  declares its own local colour scale so it stays dark in both site themes. Arrow-key
  navigation on the bottom bar mirrors the app's swipe gesture. Full markup contract is
  documented under "The interactive phone mockup" above.
- **2026-08-21 (layout balance + contact)** — Fixed four spacing problems on the
  landing page, all caused by the same thing: a 62ch `.band-head` inside a full-width
  band leaves the right half empty. Added the `.band-split` pattern (heading left,
  body right) and applied it to Release safety, Quick start and FAQ. The Quick start
  Gradle snippet is now full width, so its 99-character lines no longer scroll and get
  visually cut. The footer was wider than the page content (1400px against 1180px) —
  both now align at 1180px, with more generous padding, a larger column gap and
  breathing room under the brand block. Docs code dropped to `0.82rem` and the two
  snippets that still overflowed the 760px prose column (`notifications.html`,
  `security.html`) were reformatted; `install.html` now uses a `val group = "…"` local
  so the dependency lines fit. Wired the contact address: `CONTACT_EMAIL` in `docs.js`
  is set, so the footer link and every page's feedback line are now `mailto:` links;
  GitHub and LinkedIn were added to the footer's More column, and `privacy.html` gained
  a literal `mailto:` in its Questions section.
- **2026-08-21 (docs restructure)** — Rebuilt the site as a real documentation site.
  The single long `docs.html` guide and the combined `security.html` page were split
  into **fifteen documentation pages** in a three-column shell (page nav / article /
  "On this page"), with one page per panel so each feature is explained once, in
  prose, at length. New: `docs.css` (docs shell), `docs.js` (the `NAV` tree plus
  sidebar, sub-section links, TOC, scroll spy, heading anchors, prev/next, ⌘K search,
  contact slots), light **and** dark themes with an OS-following default and a
  persisted toggle, a self-contained syntax highlighter, and a phone-framed inspector
  mockup on the landing page replacing the desktop-window one. `styles.css` and
  `script.js` were rewritten; `index.html` was rewritten as a landing page that hands
  off to the docs. `sitemap.xml` and `llms.txt` updated for the new structure.
  `docs.html`, `security.html` and `privacy.html` kept their URLs. This README's
  Architecture, Page structure, De-duplication and Design system sections were
  rewritten to match.
- **2026-08-21** — Synced with library 0.7.0 (commit `0bda474` + local uncommitted
  changes). Response mocking added across the site (Mocks feature card, mocking
  section with `mocks.json` shape and rule sources/modes/matching, the mirror file and
  `adb pull`, the `src/debug/assets` warning, the five security gates), the Android 13+
  `POST_NOTIFICATIONS` requirement, `addAppInspectInterceptor()` documented as
  "add it last" with the second network-level interceptor for wire headers, Runtime
  moved to a top-bar button in the mockup, `mocksEnabled` / `allowResponseMocking` /
  `panels.runtimeEnabled` added to the configuration levers, FAQ grown to 13 questions
  with the JSON-LD kept in sync, JSON-LD `softwareVersion` bumped to 0.7.0, and
  `privacy.html` updated for mock-rule storage and export.
- **2026-07-28** — Synced with library 0.6.1: long-press multi-select share
  (cURL/text/HAR), read-only decrypted `EncryptedSharedPreferences` viewing, own-task
  opening plus swipe navigation and the shared value viewer, `openInSeparateTask`
  added to the configuration levers, network-event retention corrected from 200 to
  300, JSON-LD `softwareVersion` bumped to 0.6.1. Also fixed this README's structure
  tables, which had never been updated for the 2026-06-25 multi-page restructure.
- **2026-06-25** — Reduced section heading size; trimmed `privacy.html`'s "Production
  builds" section to a summary linking to `security.html`.
- **2026-06-25** — Fixed full-row layout on the inner-page hero and the Quick Start
  snippet.
- **2026-06-25** — Multi-page restructure: created `docs.html` (integration +
  configuration) and `security.html` (security model + QA checklist); homepage
  shortened to a Quick Start teaser; nav grown to 6 items.
- **2026-06-25** — SEO pass: `sitemap.xml`, `robots.txt`, `llms.txt`, canonical and
  Open Graph tags, JSON-LD `SoftwareApplication` and `FAQPage`.
- **2026-06-21** — Added the Cloudflare Web Analytics beacon and documented it in
  `privacy.html`.
- **2026-06-20** — Reworked the Support section into tier cards with a QR modal;
  corrected the footer copyright year.
- **2026-06-07** — Synced with library 0.3.1: ANR and native crash detection, the
  two-layer security model, per-panel search, the `enablement`/`panels` configuration
  shape. Added this README and `CLAUDE.md`.
- **Earlier** — Initial single-page site.
