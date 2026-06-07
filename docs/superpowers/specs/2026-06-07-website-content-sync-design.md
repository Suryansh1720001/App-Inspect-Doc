# Website Content Sync with AppInspect 0.3.1 README — Design

**Date:** 2026-06-07
**Approach:** Option A — in-place enrichment (approved by user)

## Goal

Bring the AppInspect website (`index.html`, `privacy.html`) in line with the updated
library README at `/Users/suryansh.prajapati/Documents/Learning/Project/AppInspect/README.md`,
remove duplicated content, and keep the presentation attractive for both companies and
developers. Additionally, add a root `README.md` (single source of truth about the website)
and a `CLAUDE.md` that points to it.

## What changed in the library since the last website update

1. **Runtime defense-in-depth (Jun 2):** library self-disables completely in production
   builds — never creates `appinspect_storage.db`, never installs the crash handler,
   refuses `open()`, interceptor becomes pass-through. Re-enabling in production requires
   both `allowInNonDebugBuilds = true` and `allowInProductionBuilds = true`.
2. **ANR + native crash detection (Jun 7):** via `ApplicationExitInfo` on Android 11+,
   reported on next launch with the OS ANR thread dump, zero runtime overhead. Crashes
   persisted across restarts (50 most recent), export all as .txt.
3. **Search everywhere:** Preferences/DataStore search across files, keys, values;
   WorkManager search by worker class, ID, state, tag, unique name; network find-in-body
   plus full-screen content search.
4. **UI revamp:** swipeable detail tabs, long-press quick actions on network calls,
   chunked rendering of large bodies, tap-to-copy rows in Runtime.
5. **WorkManager metadata:** last stop reason (2.9+), completed period count,
   periodic/expedited indicators.
6. **New config shape:** `AppInspectConfiguration(enablement, entryPoints, panels, powerTools)`
   with `AppInspectPanels(crashesEnabled)` and `AppInspectEnablement(allowedBuildTiers)`.

## Section-by-section design (index.html)

1. **Hero / About** — mention ANR detection and "zero inspection code in production".
   Trust row: "Published on Maven Central" / "100% on-device, zero telemetry" /
   "No-op safe for release builds". Inspector mockup unchanged.
2. **Audiences** — light refresh; add ANR/crash evidence to dev/QA card; remove hero-pitch
   duplication.
3. **Features (six cards, kept)** —
   - Network: + find-in-body & full-screen content search, long-press quick actions,
     swipeable tabs, HAR 1.2.
   - Storage: + search across files/keys/values; DataStore via custom protobuf parser
     (no DataStore dependency).
   - WorkManager: + search, last stop reason, periodic/expedited indicators,
     completed period count.
   - Crashes (biggest rewrite): uncaught exceptions + ANR & native crash detection
     (Android 11+), persisted across restarts (50), export as .txt.
   - Runtime: + tap-to-copy rows, share full summary.
   - Inspector UI: + notification tap-to-jump.
4. **Integration (3 steps, kept)** — keep `<latest-version>` placeholder (user decision).
   Mention staging/internal-test variant pattern. Note AndroidX Startup auto-init; keep
   the no-op-mirrors-only-OkHttp caveat.
5. **Configure** — update QA-profile snippet to new config shape. This is the only
   section that explains config levers.
6. **Security (biggest rework)** — two-layer model: Layer 1 compile-time no-op,
   Layer 2 runtime self-disable. Hardening list: no exported components, zero telemetry,
   no Logcat logging, sanitized notifications, scoped FileProvider. Remove config-lever
   and export-advice duplication.
7. **QA checklist** — keep; add debug-build backup-rules note; drop the
   `showRawSensitiveValues` duplication (point to Configure).
8. **CTA / Developer / Support** — unchanged. Footer: mention ANR detection.
9. **privacy.html** — consistency check; claims may be reinforced (production never
   writes any file) but no structural change.

## De-duplication rules

- `showRawSensitiveValues` explained once → Configure.
- Export-credential warnings once → QA checklist.
- No-op deep explanation once → Security; Integration links to it in one line.

Section order (unchanged): About → Audiences → Features → Integration → Configure →
Security → QA → CTA → Developer → Support.

## New repo files

- **README.md (root):** documents site purpose, file structure, section order and each
  section's job, design system (teal `#145f5b`, Manrope + JetBrains Mono), version-placeholder
  policy, the library repo as the source of facts, and the rule that README.md must be
  updated after every website change.
- **CLAUDE.md (root):** short; points to README.md as the source of truth and instructs
  updating README.md after every change.

## Non-goals

- No layout/design-system changes; `styles.css` touched only if a new element needs a
  minor style (e.g., two-layer security treatment).
- No new pages, no JS changes.

## Testing

- Serve locally, click through nav anchors, verify copy buttons still target valid IDs,
  visually check new/edited sections at desktop and mobile widths.
