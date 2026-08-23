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

Last synced with library: **version 0.7.0, library commit `5346b5d` plus local
uncommitted changes (2026-08-23)**.

> **Caveat on that sync.** The Logcat panel (`:appinspect-logs`, `AppInspectLogsConfig`,
> `panels.logsEnabled`) and the `appinspect_enabled_in_non_debuggable_build` resource
> opt-in were **uncommitted local work** in the library repo when this pass was written.
> They are documented here because the site carries no version number and describes the
> current library, but if a reader resolves an older artifact from Maven Central those two
> features may not be in it. Confirm they are published before treating this as settled.

## Architecture

Plain static HTML, CSS and JS. **No build step, no dependencies, no framework.** Two
kinds of page:

1. **`index.html`** — the marketing landing page. Its own layout (`.landing`), styled
   entirely by `styles.css`.
2. **Nineteen documentation pages** — each one a real HTML file with a three-column
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
`index.html` plus the nineteen docs pages. The practical way to do that is a throwaway
Python pass over `glob("*.html")` that replaces the exact old block with the new one and
reports which files changed; a new page is easiest to create the same way, by taking an
existing docs page and swapping its `<article>` plus the four head fields that name the
page (`<title>`, description, canonical, og/twitter).

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
| `install.html` | Gradle setup per variant, `matchingFallbacks`, OkHttp interceptor, verification, `updateConfiguration` |
| `environments.html` | The three build tiers, the scenario table, the staging opt-in resource, release-like testing, R8 |
| `compatibility.html` | minSdk/AndroidX, why Compose and Kotlin are not required, Java hosts, the three `compileOnly` integrations, API-level degradation |
| `open-inspector.html` | Every entry point, shake tuning, own-task behaviour, moving between panels |
| `network.html` | Network panel |
| `mocks.html` | Response mocking |
| `storage.html` | Storage panel |
| `workmanager.html` | WorkManager panel |
| `crashes.html` | Crashes and ANRs panel |
| `runtime.html` | Runtime panel |
| `logs.html` | Logcat panel — the on-device log tail |
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
| 3 | What you can inspect | `#features` | Eight cards, each linking to its docs page |
| 4 | Who it is for | — | Two panels: developers/testers, and companies/platform teams |
| 5 | Release safety | — | The "this must never ship" objection, answered, links to `security.html`. Uses `.band-split` |
| 6 | Quick start | `#quick-start` | `.band-split` intro + links, then a **full-width** Gradle snippet |
| 7 | FAQ | `#faq` | 16 questions, mirrored by the JSON-LD `FAQPage` schema. Uses `.band-split` |
| 8 | CTA | — | Install / Maven Central |
| 9 | Maintainer | `#developer` | Suryansh Prajapati, GitHub + LinkedIn |
| 10 | Support | `#support` | Tier cards → UPI QR modal |

### The interactive phone mockup (hero)

The mockup is a working tab interface, not a picture — it doubles as the feature tour,
so it is the main path from the landing page into the panel docs.

- **Seven panels**, all in the markup: five `role="tab"` buttons on the bottom bar
  (Network, Mocks, Storage, Work, Crashes) plus two **top-bar buttons** — the worded
  **Runtime pill** and the icon-only **Logcat button** (`.phone-pill-icon`) — which is how
  both actually open in the app. Arrow keys and swipes move along the bottom bar only, as
  in the app; the two top-bar buttons are click targets.
- **Only one of the two top-bar buttons can be worded.** The bar is a width budget: at a
  280px frame it holds roughly 240px of content, and `RUNTIME` + a second worded pill +
  the close glyph leaves nothing for the title. Logcat is therefore an icon (a terminal
  glyph, with an `aria-label`, which also matches the real app), the subtitle reads
  "AppInspect · debug" rather than "debug build", and `.phone-bar-title` /
  `.phone-bar-sub` both truncate rather than wrap — a wrapped title would push the panel
  content down by a whole line.
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
- **The Logcat view is a terminal, so it does not reuse `.phone-card`.** Its rows are
  `.phone-log` — monospace, one line, ellipsised, with a coloured **left stripe** for the
  level instead of a badge. Only warnings and above tint the message text (`.l-w`,
  `.l-e`); `.l-i` and `.l-d` keep neutral text and colour only the stripe, which is what
  the real panel does and what keeps colour meaningful when you scan. The level chips are
  `.phone-chiprow`. All of it uses `--p-*` tokens, like every other phone rule.
- **The phone has its own colour scale** (`--p-bg`, `--p-card`, `--p-ok-bg`, …) declared
  locally on `.phone-screen`, because a device screen has its own semantics: badge
  tints, status colours, a nav bar. **It follows the site theme** — light values are the
  defaults, dark overrides sit under `:root[data-theme="dark"] .phone-screen` plus the
  `prefers-color-scheme` fallback. The real library has a light mode, so a dark phone on
  a light page would misrepresent it. Every colour inside the phone must be a `--p-*`
  token; there are no hardcoded hexes in the component rules, and a check asserts it.
- **The Network list cycles** — see "The live capture feed" below.
- **The frame is its own small system**, keyed off `--f-*` tokens on `.phone`. Three
  things stop it reading as an old handset, and all three are easy to undo by accident:
  a **7px bezel** (not 10), **concentric corners** — the screen radius is
  `calc(var(--f-radius) - var(--f-bezel))`, so changing one keeps the other in step —
  and a **gradient rail** rather than a flat fill, so the edge catches light. Side
  buttons and the punch-hole camera are pseudo-elements (`.phone::before/::after`,
  `.phone-screen::after`), so they cost no markup — don't claim those pseudos for
  anything else.
- **The side buttons need their own `--f-btn-*` tones.** Reusing the rail gradient makes
  them vanish into the frame — they stop reading as hardware, which is the whole point of
  having them. Each carries an inset top highlight and an outward shadow so it looks
  raised.
- **`.phone-status` shares `--p-navbar` with `.phone-bar`**, the way a real app tints the
  status bar. Give them different surfaces and the screen's rounded top corners end up
  one colour with the bar below another, which reads as the bar escaping the frame.
- **Content must stay plausible and consistent.** The counts in a panel's `.phone-meta`
  line should match the rows shown, badges should use real vocabulary
  (`SHORT_CIRCUIT`, `OVERRIDDEN`, `ENQUEUED`, `ANR`), and nothing should claim a
  capability the library does not have. Hosts are `example.co`, never a real one.
- `.phone-scroll` clips overflow, so a view that grows past roughly 470px silently
  loses its last row. Check each panel after editing.

### The live capture feed

The Network list cycles: the oldest card moves to the top every second, so the hero
shows what the panel actually does rather than a frozen screenshot. Implemented by the
`[data-feed]` block in `script.js`, and it is the only JavaScript-driven animation on
the site.

**Cadence is one constant** — `TICK_MS` in that block. The slide (`.phone-feed`
transition, 0.38s), the arrival fade (`feed-in`, 0.32s) and the `is-new` cleanup (450ms)
must all stay comfortably below it, or a tick lands mid-slide and the list jumps. The
current values hold at both 1000ms and 750ms.

How it stays cheap:

- **One DOM move per tick.** The last card is inserted before the first — no rebuilding,
  no cloning.
- **Only a transform is animated.** The wrapper jumps up by exactly one card height, then
  eases back to `translateY(0)`, so the new row appears to slide in from behind the
  section header. Nothing reflows mid-animation.
- **All six cards must stay structurally identical** (top / path / host / foot). The slide
  distance is `offsetHeight + 6`, so a card of a different height would make the list
  visibly jump. There is a check for this.
- **The arriving card is re-stamped** from a rolling clock, because cards recycle: left
  alone, a re-used row keeps its original time and after one rotation the list reads
  oldest-first. The ticker rewrites the card's **first** `.phone-tag` — keep the time tag
  first in `.phone-card-foot`.
- **It stops whenever it would be wasted work**: `prefers-reduced-motion`, the phone
  scrolled out of view (`IntersectionObserver`), another panel selected, or a
  backgrounded tab. `sync()` is the single place that decides.

Six cards exist but only about four are visible, which is deliberate — the rotation
window changes each tick instead of looping four identical rows.

### Documentation sidebar order

Defined by `NAV` in `docs.js`. Groups and pages:

- **Getting started** — Introduction, Install, Builds and environments, Compatibility,
  Opening the inspector
- **Panels** — Network, Mocks, Storage, WorkManager, Crashes and ANRs, Runtime, Logcat,
  Value viewer
- **Configuration** — Configuration reference, Network notifications
- **Safety and privacy** — Security model, Data handling, QA checklist, Privacy policy

### De-duplication rules — one canonical home per topic

Other pages may summarise a topic in a line or two **with a link**, never re-explain it.

| Topic | Canonical home |
|---|---|
| Gradle setup, variants, the OkHttp interceptor, why it goes last, wire headers | `install.html` |
| Build tiers, the scenario table, `isDebuggable`, the opt-in resource, `matchingFallbacks`, testing on a release-like build, R8 / consumer rules | `environments.html` |
| Host requirements: minSdk, AndroidX, Compose/Kotlin not required, Java hosts, the `compileOnly` integrations, API-level degradation | `compatibility.html` |
| Entry points (shake, shortcut, long press, notification tap, `open()`), own-task behaviour, panel navigation | `open-inspector.html` |
| Per-panel behaviour | that panel's own page |
| The shared JSON tree viewer | `value-viewer.html` |
| How mocking works: sources, modes, matching, `mocks.json` shape, rule actions, priority, the five gates, `adb pull` | `mocks.html` |
| Every configuration field and its default; `updateConfiguration` vs `install`; the two ready-made profiles | `configuration.html` |
| Logcat capture: filters, pause/follow-tail, the memory budget, the permission and storage model, log redaction | `logs.html` |
| `POST_NOTIFICATIONS` on Android 13+ | `notifications.html` |
| Release safety (both layers), the no-op artifact audit, the whole-library capability audit, hardening, what debug builds expose, mocking's security posture, deliberately enabling it in production | `security.html` |
| What the library stores on a device, retention, encryption, the mirror file, exports, backups, deletion, Play Data Safety answers | `data-handling.html` |
| Export credential hygiene for humans | `qa-checklist.html` |
| **The website's** own data practices — cookies, analytics, hosting, `localStorage` | `privacy.html` |

Note the split on mocking: **how it works and how to switch it on** is `mocks.html`
(including the gate table, because that is what you consult when a rule will not
fire); **why the design is safe** — rules are not redacted, the mirror file is
external storage, `src/debug/assets`, `allowResponseMocking = false` on non-debuggable
builds — is `security.html#mocking`. `mocks.html#in-release` keeps only the two-sentence
version of "and in a release build?" and links to `environments.html`.

And the split between `environments.html` and `security.html`, which is the one most
likely to blur: **environments is the build-configuration page** — tiers, variants,
`isDebuggable`, the opt-in resource, R8, "how do I run this in UAT" — written for someone
editing `build.gradle.kts`. **Security is the assurance page** — why the guarantees hold,
what is in the release artifact, what the library cannot do in any build — written for
someone deciding whether to allow it. Each links to the other once rather than repeating
the tier table.

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

- **No version number anywhere on the site.** Not in snippets, not in the header, not
  in prose, not in JSON-LD `softwareVersion`, not in `llms.txt`. Dependency snippets use
  the `<latest-version>` placeholder and link to Maven Central; anything else that wants
  to name a version links to the
  [versions page](https://central.sonatype.com/artifact/io.github.suryansh1720001.appinspect/appinspect/versions)
  instead — the docs sidebar already carries it as "Released versions". The reason: the
  library releases far more often than this site is edited, so any number here turns
  into a lie. **The only place a version is written down is this README's "Last synced
  with library" line** — that is a maintenance record, not a user-facing claim.
- **Write for three readers at once** — a developer integrating it, a tester using it,
  and someone deciding whether it is safe to adopt. Lead each page with what the thing
  is for in plain language, then the specifics.
- **Prose over bullet dumps.** Explain *why* a behaviour exists, not just that it
  exists. Tables are for genuine matrices (gates, actions, field references), not for
  hiding sentences.
- **Explain the behaviour, not the design decision.** "Why" is worth writing when it
  changes what a reader does — why the interceptor goes last, why a mock body still has
  to parse, why exports need redacting. It is not worth writing to justify a UI choice:
  a reader needs to know *where* the Runtime button is, not why it isn't a bottom-bar
  tab. Product rationale reads as defensive and takes up the space the actual answer
  should occupy.
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
- **Motion is rationed.** It lives in one section at the end of `styles.css` plus a few
  transitions at the end of `docs.css`. Four rules:
  1. **Only `opacity` and `transform`** are ever animated, so everything stays on the
     compositor and nothing reflows. There is an assertion for this in the checks below.
  2. **Motion must explain something.** The phone stages its rows because the real
     inspector fills up as calls arrive; panels fade because an instant swap reads as a
     glitch. "It looks nice" is not a reason.
  3. **Documentation prose is never animated and never scroll-revealed.** It must be
     readable and `Ctrl+F`-able the instant it renders. Docs pages get transitions only —
     no entrance animation, because you navigate between them constantly.
  4. **Looping animation exists only inside the phone mockup**: the 6px `.phone-live`
     dot and the capture feed. Nothing in the reading area moves on its own.

  The `prefers-reduced-motion` block at the end of `styles.css` switches all of it off
  with `!important`, which beats `docs.css` regardless of load order. Keep it last.
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

## Responsive and touch behaviour

The site is one layout that adapts, not a desktop layout with a mobile patch. Five
breakpoints, each shedding what is reachable elsewhere:

| Width | What changes |
|---|---|
| 1180px | Docs "On this page" rail collapses into a `<details>` above the article |
| 1100px | Landing hero stacks; quick start and support cards go single-column |
| 940px | Docs sidebar becomes a drawer behind the hamburger; secondary top-bar links hide; search collapses to an icon |
| 640px | Type scales down; grids single-column; footer to two columns |
| 560px | Maven Central icon and the Support link leave the top bar (both are in the footer) |
| 420px | Top bar keeps only brand, search and theme toggle; phone frame radius shrinks |

Rules worth keeping:

- **The top bar is a width budget.** At full size it holds ~860px of content. It must
  still fit 320px, which is why it sheds items rather than wrapping — a wrapped top bar
  changes the page's sticky offset and breaks `scroll-padding-top`. If you add something
  to it, re-check the narrow end.
- **Never give a grid track a fixed px minimum.** `minmax(272px, 1fr)` cannot shrink
  below 272px and overflows a narrow phone; use `minmax(min(272px, 100%), 1fr)`. A check
  asserts none remain.
- **`100vh` is wrong on mobile** — browser chrome overlaps it, so a sidebar sized that way
  is taller than the visible area. Every use is paired: `100vh` first as a fallback, then
  `100dvh`.
- **Hover lift needs `@media (hover: none)` counterpart.** On a touchscreen `:hover`
  sticks after a tap, leaving cards raised until you tap elsewhere. Touch gets a
  `:active` scale instead. The docs-page override lives in `docs.css`, because that file
  loads later and would otherwise win the cascade.
- **Wide content scrolls in its own container**, never the page: `.table-scroll`, `pre`,
  `.snippet-file`. `body` also carries `overflow-wrap: break-word` for long identifiers
  outside `<code>` — an artifact coordinate is wider than a 320px column.
- **Touch targets** reach 40px under `@media (pointer: coarse)`.
- **The mockup is swipeable** — horizontal swipes move between panels, matching the real
  inspector. Listeners are passive and a gesture only counts when clearly horizontal, so
  vertical page scrolling is never blocked.

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

- **2026-08-23 (library sync: Logcat, environments, compatibility)** — Synced with the
  library after a large round of changes, and answered the two questions the site could
  not previously answer. **New `logs.html`** documents the **Logcat panel** — the new
  `:appinspect-logs` module — a live tail of the host app's own log output, reachable from
  a terminal icon in the top bar. The page leads with why it exists (logcat is the first
  thing a developer reaches for and the last thing a tester can get to), then the three
  properties that make it cheap: no permission, no storage, no idle cost. **New
  `environments.html`** is the page the docs were missing most: two inputs, three tiers, a
  nine-row scenario table, the one decision that matters (`isDebuggable`), the
  `appinspect_enabled_in_non_debuggable_build` opt-in with both ways to declare it,
  `matchingFallbacks`, how to test on a release-like build, the one way to shoot yourself,
  and why R8 needs nothing from you. **New `compatibility.html`** answers "will it fit my
  app": minSdk 24 and AndroidX are the only hard requirements, Compose and Kotlin are
  **not** required, Java hosts work, and OkHttp / WorkManager / security-crypto are
  `compileOnly` so the tested build never runs a different HTTP stack than release. Also:
  `configuration.html` now leads with **`updateConfiguration` rather than `install`**,
  because `install()` replaces the configuration wholesale and silently discards a staging
  variant's resource opt-in — the single most expensive mistake in the new API — and gained
  the `logs` group and `logsEnabled`; `security.html` gained the **no-op artifact audit**
  (8 KB, four classes, no `android.*` reference, and a CI task that fails the build if a
  component, permission, resource or unexpected class appears in the artifact) and a
  **whole-library capability audit**, which is the strongest material the library has for a security
  review and was not on the site at all; `data-handling.html` records that log lines are
  the one thing never persisted; `qa-checklist.html` covers logcat exports, which can carry
  an `Authorization` header that no other panel would show. The landing page gained a
  **Logcat feature card (eight, not seven)**, a **working Logcat panel in the phone
  mockup**, the 8 KB claim in the release-safety band, and three FAQ entries (staging
  builds, Compose/Kotlin, logcat without a cable) mirrored into the JSON-LD. The features
  heading was rewritten from "Seven surfaces, each with its own page in the docs" to
  "Eight surfaces, one for each question a bug tends to raise", which says what the
  panels are *for* and then explains why each gets a page. Copy across the landing page
  was tightened rather than extended, and "everything is on by default, no configuration
  required" is now said once in each place a reader lands.

- **2026-08-21 (cut design rationale)** — Removed the explanation of *why* Runtime is not
  a bottom-bar tab. It appeared in three user-facing places — a whole `<h2>` section on
  `runtime.html`, a paragraph on `open-inspector.html`, and the mockup's Runtime caption —
  and none of them answered a question a reader has. All three now state only where the
  button is, which is the useful part. `runtime.html` drops from three sections to two and
  gets to "What it collects" immediately. Added a content policy above:
  explain the behaviour, not the design decision.

- **2026-08-21 (responsive + touch pass)** — Audited the site at phone, tablet and
  desktop widths and fixed what was actually broken rather than adding breakpoints on
  spec. **The top bar overflowed on phones**: it held roughly 500px of content in a 320px
  bar, so items were being squeezed. It now sheds the Maven Central icon and Support link
  at 560px and the nav and GitHub icon at 420px, leaving ~259px of content with 61px of
  slack at 320px. **Two grid tracks could not shrink** — `minmax(272px, 1fr)` and
  `minmax(228px, 1fr)` overflow any container narrower than their minimum; both are now
  `minmax(min(…, 100%), 1fr)`. **Three `100vh` values** became `100dvh` with a `100vh`
  fallback, since mobile browser chrome overlaps `vh`. **Five hover-lift rules stuck
  after a tap** on touchscreens; they are gated behind `@media (hover: none)` with an
  `:active` press response instead. Added 40px touch targets under
  `@media (pointer: coarse)`, a global `overflow-wrap: break-word` net for long
  identifiers outside `<code>`, a single-column footer below 560px, and a smaller phone
  frame radius below 420px where 46px read as a pebble. **New interaction: the mockup is
  swipeable** — horizontal swipes change panels, matching the real inspector's own swipe
  navigation; listeners are passive so page scrolling is never blocked. Checks were added
  for hover gating, grid minimums and vh/dvh pairing. Details under "Responsive and touch
  behaviour" above.

- **2026-08-21 (frame polish + live-dot fix)** — Three fixes from close inspection of the
  mockup. **The side buttons now read as buttons**: they were drawn with the same
  gradient as the rail, so they had 1.00 contrast against it and looked like scratches.
  They get their own `--f-btn-*` tones (1.49 separation in light, 2.03 in dark), an inset
  top highlight, an outward shadow, and 1px more width. **The status bar now shares the
  app bar's surface** — previously the status strip used `--p-bg` and the bar below used
  `--p-navbar`, so in light mode the screen's rounded top corners were lavender with a
  square white slab underneath, which read as the white bar escaping the frame. Also
  softened the light screen ring from `0.28` to `0.14` alpha, since a strong ring against
  a white app bar looks like a stray border, and lifted the dark rail and hairline
  slightly for separation against the near-black page. **Bug fix:** the live-capture dot
  was rendering on its own line below "API log". `.phone-meta span` (0,1,1) was
  out-specifying `.phone-live` (0,1,0) and forcing `display: block` onto it; the selector
  is now `.phone-meta > span`, which cannot reach the dot nested inside the `<strong>`.

- **2026-08-21 (phone frame)** — Modernised the mockup's frame, which read as a
  mid-2010s handset. The bezel went from 10px to 7px; corner radii are now genuinely
  concentric (outer 46px, screen `calc(46px - 7px)`) instead of 34/26, which was the main
  reason the corners looked wrong; the flat `--surface-raised` fill became a gradient
  rail so the edge catches light; and the single flat shadow became a four-layer stack
  (hairline, top-edge catch, contact shadow, soft drop). Added volume and power buttons
  plus a punch-hole camera, all as pseudo-elements, so no markup changed. The frame has
  its own `--f-*` tokens with light and dark variants — silver-warm on the cream page,
  graphite in dark — and the screen now carries an inset ring so the display sits *in*
  the frame rather than on it. Net effect on the screen: 8px wider, since the bezel and
  border shrank.

- **2026-08-21 (live feed + themed phone)** — Two changes to the hero mockup. **The
  Network list now cycles**: every second the oldest card moves to the top and the list
  slides down, so the hero demonstrates a live capture instead of showing a frozen
  screenshot. The cadence started at 2.6s and was tightened to 1s; the slide was
  shortened to 0.38s to keep clear separation between cycles, and the arriving card is
  re-stamped from a rolling clock — without that, recycled cards kept their original
  timestamps and the list visibly read oldest-first after one rotation, which is obvious
  at a fast cadence. Two more calls were added (six total, ~four visible) so the rotation window
  changes rather than looping the same four rows. It is the only JS-driven animation on
  the site and is heavily gated — see "The live capture feed" above. **The phone screen
  now follows the site theme.** It was hardcoded dark in both themes, which
  misrepresented the library, since the real inspector has a light mode. Its whole
  palette was tokenised — 27 `--p-*` variables including badge fills, card and nav-bar
  surfaces, and the error-card tint — with light as the default and dark overrides under
  the theme selectors. No hardcoded colours remain inside the phone rules. Contrast was
  measured for both themes: every badge clears WCAG AA, and light `--p-dim` was darkened
  from `#7b8595` to `#646f80` to bring secondary text from 3.7:1 up to 5.1:1. This
  reverses the "stays dark in both themes" note from the 2026-08-21 mockup entry.
- **2026-08-21 (restrained motion)** — Added animation, deliberately little: a staggered
  hero entrance on the landing page only (~450ms, runs once), a 180ms fade on phone
  panel switches, staggered rows inside each phone panel — which re-run on every switch,
  so the list restocks the way the real inspector does — a 6px pulsing live-capture dot
  on the API log, pop-in for the search and support dialogs, and cross-fades on the
  sidebar/TOC active states, which used to snap. **Cost: 140 lines of CSS, zero new
  JavaScript, zero new files** (+~1.3 KB gzipped total). Only `opacity` and `transform`
  are animated. Explicitly rejected: scroll-triggered reveals on prose (the pre-2026-08-21
  site had these and they hide content, hurt scanning, and blank the page if JS fails),
  parallax, animated gradients, and a typewriter headline. Documentation pages get
  transitions only. The `prefers-reduced-motion` block at the end of `styles.css` disables
  everything with `!important`. Policy recorded under "Motion is rationed" above.
- **2026-08-21 (no pinned versions)** — Removed every hardcoded version number from
  the site; it had crept in during the docs restructure and contradicted the site's own
  policy. Gone: the `0.7.0` pill next to the wordmark on all 17 pages (and its CSS,
  including a mobile override), `"softwareVersion"` in the homepage JSON-LD, "These
  pages describe 0.7.0" in the Introduction note, and the version line in `llms.txt`.
  Nothing was added to replace the pill — the docs sidebar already links to "Released
  versions" on Maven Central, which is the honest answer. Snippets keep using
  `<latest-version>`. The policy in `README.md` and `CLAUDE.md` was broadened from
  "no pinned version *in snippets*" to no version number anywhere on the site, since the
  narrow wording is what let the pill through.
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
