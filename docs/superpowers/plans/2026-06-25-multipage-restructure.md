# Multi-Page Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the single-page AppInspect site into three focused pages — homepage (marketing), `docs.html` (integration reference), `security.html` (trust page) — for better UX and per-page SEO signals.

**Architecture:** Pure static HTML/CSS. Two new HTML files created from scratch using the same shell pattern as `index.html`. Homepage loses four heavy sections and gains a compact Quick Start teaser. All pages share the same `styles.css`, `script.js`, and nav structure.

**Tech Stack:** Plain HTML, CSS custom properties, no build step.

## Global Constraints

- Site canonical base: `https://app-inspect-doc.vercel.app/`
- Brand logo on `index.html` links to `#top`; on all other pages links to `index.html`
- Nav links use paths (`docs.html`, `security.html`) not anchors, so they work from every page
- Active page: add `aria-current="page"` to the current page's nav `<a>` tag
- Footer "Docs" group must reflect new page structure on every page
- Never pin a library version — keep `<latest-version>` placeholder
- CSS variables: `--ink`, `--muted`, `--primary`, `--primary-strong`, `--primary-soft`, `--surface`, `--surface-muted`, `--radius`, `--shadow`, `--line`

---

## Task 1: Create `docs.html`

**Files:**
- Create: `docs.html`

- [ ] **Step 1: Create `docs.html` with full content**

Create `/Users/suryansh.prajapati/Documents/Learning/Project/App-Inspect-Website/docs.html` with this exact content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Docs | AppInspect</title>
    <meta
        name="description"
        content="Step-by-step integration guide for AppInspect — add Maven Central, configure Gradle build variants, attach the OkHttp interceptor, and customize panels for your team."
    >
    <meta name="theme-color" content="#145f5b">
    <meta name="referrer" content="strict-origin-when-cross-origin">
    <link rel="canonical" href="https://app-inspect-doc.vercel.app/docs.html">

    <!-- Open Graph -->
    <meta property="og:type"        content="website">
    <meta property="og:url"         content="https://app-inspect-doc.vercel.app/docs.html">
    <meta property="og:title"       content="Docs — AppInspect Integration Guide">
    <meta property="og:description" content="Step-by-step: add Maven Central, configure Gradle build variants, attach the OkHttp interceptor, and customize AppInspect for your team.">
    <meta property="og:image"       content="https://app-inspect-doc.vercel.app/fevicon/favicon-180.png">

    <!-- Twitter / X Card -->
    <meta name="twitter:card"        content="summary">
    <meta name="twitter:title"       content="Docs — AppInspect Integration Guide">
    <meta name="twitter:description" content="Integrate AppInspect in 3 steps: Maven Central, Gradle build variants, OkHttp interceptor.">
    <meta name="twitter:image"       content="https://app-inspect-doc.vercel.app/fevicon/favicon-180.png">

    <script>
        document.documentElement.classList.add("js");
    </script>
    <link rel="icon" href="fevicon/favicon.ico" sizes="any">
    <link rel="icon" type="image/svg+xml" href="fevicon/favicon.svg">
    <link rel="icon" type="image/png" sizes="32x32" href="fevicon/favicon-32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="fevicon/favicon-16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="fevicon/favicon-180.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&amp;family=JetBrains+Mono:wght@500;700&amp;display=swap"
        rel="stylesheet"
    >
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="page-shell">
        <header class="site-header">
            <a class="brand" href="index.html">
                <img class="brand-logo" src="fevicon/favicon-180.png" alt="AppInspect logo" width="44" height="44">
                <span class="brand-copy">
                    <strong>AppInspect</strong>
                    <span>Android in-app inspector</span>
                </span>
            </a>
            <button
                class="nav-toggle"
                type="button"
                aria-expanded="false"
                aria-controls="site-nav"
                aria-label="Toggle navigation"
            >
                Menu
            </button>
            <nav class="site-nav" id="site-nav" aria-label="Primary">
                <a href="index.html#top">About</a>
                <a href="index.html#features">Features</a>
                <a href="docs.html" aria-current="page">Docs</a>
                <a href="security.html">Security</a>
                <a href="privacy.html">Privacy</a>
                <a href="index.html#support">Support</a>
            </nav>
        </header>

        <main>
            <!-- Hero -->
            <section class="hero hero-page reveal" id="top">
                <div class="hero-copy hero-copy-full">
                    <span class="eyebrow">Integration guide</span>
                    <h1>Integrate AppInspect in three steps.</h1>
                    <p class="hero-text">
                        Add the library by build variant, attach the OkHttp interceptor once,
                        and tune the inspector for your team. AppInspect auto-initializes via
                        AndroidX Startup — no <code>Application</code> class changes needed for basic usage.
                    </p>
                    <div class="hero-actions">
                        <a
                            class="button button-primary"
                            href="https://central.sonatype.com/artifact/io.github.suryansh1720001.appinspect/appinspect/overview"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View on Maven Central
                        </a>
                        <a class="button button-secondary" href="security.html">Security model</a>
                    </div>
                </div>
            </section>

            <!-- Install -->
            <section class="section reveal" id="install">
                <div class="section-heading">
                    <span class="eyebrow">Installation</span>
                    <h2>Install by build variant, not as a blanket dependency.</h2>
                    <p>
                        The recommended setup gives internal builds the full inspector and production
                        builds only the no-op OkHttp counterpart. AppInspect auto-initializes via
                        AndroidX Startup — add the dependency and the inspector is ready, with
                        <code>AppInspect.install()</code> available when you want host-controlled setup.
                    </p>
                </div>

                <div class="steps-grid">
                    <article class="step-card">
                        <div class="step-meta">
                            <span class="step-number">1</span>
                            <h3>Add Maven Central</h3>
                            <p>Resolve AppInspect from a shared repository so every developer and CI runner uses the same artifact.</p>
                        </div>
                        <div class="snippet-card">
                            <div class="snippet-head">
                                <span>settings.gradle.kts</span>
                                <button class="copy-button" type="button" data-copy-target="repo-kts">Copy</button>
                            </div>
                            <pre><code id="repo-kts">dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
    }
}</code></pre>
                        </div>
                    </article>

                    <article class="step-card">
                        <div class="step-meta">
                            <span class="step-number">2</span>
                            <h3>Add the library</h3>
                            <p>
                                Use the full inspector in debug builds. Use the no-op artifact in
                                release builds when you want shared OkHttp setup without inspection behavior.
                            </p>
                        </div>
                        <div class="snippet-card">
                            <div class="snippet-head">
                                <span>build.gradle.kts</span>
                                <button class="copy-button" type="button" data-copy-target="variant-deps">Copy</button>
                            </div>
                            <pre><code id="variant-deps">dependencies {
    debugImplementation("io.github.suryansh1720001.appinspect:appinspect:&lt;latest-version&gt;")
    releaseImplementation("io.github.suryansh1720001.appinspect:appinspect-no-op:&lt;latest-version&gt;")
}</code></pre>
                        </div>
                        <p class="inline-note">
                            For custom variants, add the full <code>appinspect</code> artifact per
                            variant — e.g. <code>add("stagingImplementation", ...)</code> or
                            <code>add("internalTestImplementation", ...)</code>. Check
                            <a
                                href="https://central.sonatype.com/artifact/io.github.suryansh1720001.appinspect/appinspect/versions"
                                target="_blank"
                                rel="noopener noreferrer"
                            >Maven Central</a>
                            for the latest published version. See
                            <a href="security.html">Security</a> for why the no-op artifact keeps release
                            builds clean.
                        </p>
                    </article>

                    <article class="step-card">
                        <div class="step-meta">
                            <span class="step-number">3</span>
                            <h3>Attach OkHttp capture</h3>
                            <p>The same builder code compiles across variants. In release, the no-op returns the builder unchanged.</p>
                        </div>
                        <div class="snippet-card">
                            <div class="snippet-head">
                                <span>OkHttpClient</span>
                                <button class="copy-button" type="button" data-copy-target="okhttp-setup">Copy</button>
                            </div>
                            <pre><code id="okhttp-setup">val client = OkHttpClient.Builder()
    .addAppInspectInterceptor()
    .build()</code></pre>
                        </div>
                        <p class="inline-note">
                            Guard direct <code>AppInspect.open()</code> or <code>AppInspect.install()</code> calls by build variant,
                            because the no-op artifact only mirrors the OkHttp API surface.
                        </p>
                    </article>
                </div>
            </section>

            <!-- Configure -->
            <section class="section reveal" id="configure">
                <div class="section-heading">
                    <span class="eyebrow">Configuration</span>
                    <h2>Customize AppInspect for your team workflow.</h2>
                    <p>
                        The default setup is developer-friendly. When the build is shared with a
                        wider QA or business audience, you can hide raw values, disable editing tools,
                        turn off request notifications, or remove panels that are not needed.
                    </p>
                </div>

                <div class="configure-layout">
                    <article class="content-panel">
                        <h3>Controlled QA profile</h3>
                        <div class="snippet-card">
                            <div class="snippet-head">
                                <span>AppInspectConfiguration</span>
                                <button class="copy-button" type="button" data-copy-target="qa-config">Copy</button>
                            </div>
                            <pre><code id="qa-config">AppInspect.install(
    application = application,
    configuration = AppInspectConfiguration(
        enablement = AppInspectEnablement(
            allowedBuildTiers = linkedSetOf(AppInspectBuildTier.DEBUG),
        ),
        entryPoints = AppInspectEntryPoints(
            shakeToOpenEnabled = true,
            networkNotificationsEnabled = false,
        ),
        panels = AppInspectPanels(
            crashesEnabled = true,
        ),
        powerTools = AppInspectPowerTools(
            showRawSensitiveValues = false,
            allowSharedPreferencesEditing = false,
            allowDatabaseEditing = false,
            allowSqlConsole = false,
        ),
    ),
)</code></pre>
                        </div>
                    </article>

                    <aside class="content-panel side-panel">
                        <h3>Configuration levers</h3>
                        <dl class="definition-list">
                            <div>
                                <dt><code>enablement.allowedBuildTiers</code></dt>
                                <dd>Decide which build tiers can run the inspector at all. Production stays off unless the host explicitly opts in twice.</dd>
                            </div>
                            <div>
                                <dt><code>showRawSensitiveValues</code></dt>
                                <dd>When false, configured headers, query parameters, body fields, cookies, and metadata keys are masked or removed before storage.</dd>
                            </div>
                            <div>
                                <dt><code>allowDatabaseEditing</code>, <code>allowSqlConsole</code>, <code>allowSharedPreferencesEditing</code></dt>
                                <dd>Keep storage inspection read-only for QA builds that do not need mutation tools.</dd>
                            </div>
                            <div>
                                <dt><code>panels.crashesEnabled</code></dt>
                                <dd>Hide the Crashes tab for audiences that should not see stack traces.</dd>
                            </div>
                            <div>
                                <dt><code>networkNotificationsEnabled</code></dt>
                                <dd>Disable per-request notifications when lock-screen visibility or shared testers are a concern.</dd>
                            </div>
                            <div>
                                <dt><code>launcherShortcutEnabled</code></dt>
                                <dd>Show or hide the launcher shortcut that opens the inspector directly from the device home screen.</dd>
                            </div>
                            <div>
                                <dt><code>autoOpenOnLongPressTrigger</code></dt>
                                <dd>Enable the long-press trigger on views and Compose modifiers (<code>AppInspect.attachLongPressTrigger</code> / <code>Modifier.appInspectLongPressTrigger</code>) that opens the inspector.</dd>
                            </div>
                        </dl>
                    </aside>
                </div>
            </section>

            <!-- Bottom CTA -->
            <section class="section section-compact reveal">
                <div class="cta-card">
                    <div>
                        <span class="eyebrow">Ready to add it</span>
                        <h2>Add AppInspect to your Android app from Maven Central.</h2>
                        <p>Copy the two Gradle lines above, wire the OkHttp interceptor, and the inspector is live in your next debug build.</p>
                    </div>
                    <div class="cta-actions">
                        <a
                            class="button button-primary"
                            href="https://central.sonatype.com/artifact/io.github.suryansh1720001.appinspect/appinspect/overview"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Open Maven Central
                        </a>
                        <a class="button button-secondary" href="security.html">Security model</a>
                    </div>
                </div>
            </section>
        </main>

        <footer class="site-footer">
            <div class="footer-brand">
                <a class="footer-brand-link" href="index.html">
                    <img src="fevicon/favicon-180.png" alt="AppInspect logo" width="32" height="32">
                    <span>AppInspect</span>
                </a>
                <p class="footer-brand-desc">
                    Android in-app inspector for developers and QA teams. Drop in one library,
                    inspect network traffic, storage, background work, crashes and ANRs, and
                    runtime metadata from inside the running app. No cloud. No telemetry.
                </p>
                <p class="footer-copy">&#169; 2026 Suryansh Prajapati</p>
            </div>

            <nav class="footer-nav" aria-label="Footer">
                <div class="footer-nav-group">
                    <span class="footer-nav-label">Docs</span>
                    <a href="index.html#features">Features</a>
                    <a href="docs.html">Integration</a>
                    <a href="security.html">Security</a>
                    <a href="privacy.html">Privacy Policy</a>
                </div>
                <div class="footer-nav-group">
                    <span class="footer-nav-label">Links</span>
                    <a
                        href="https://central.sonatype.com/artifact/io.github.suryansh1720001.appinspect/appinspect/overview"
                        target="_blank"
                        rel="noopener noreferrer"
                    >Maven Central</a>
                    <a
                        href="https://github.com/Suryansh1720001"
                        target="_blank"
                        rel="noopener noreferrer"
                    >GitHub</a>
                    <a
                        href="https://www.linkedin.com/in/itssuryansh/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >LinkedIn</a>
                </div>
            </nav>
        </footer>
    </div>

    <script src="script.js"></script>
    <!-- Cloudflare Web Analytics — token is intentionally public, safe to commit -->
    <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "8f2c362a02c54e9a906a77dd868039f7"}'></script>
</body>
</html>
```

- [ ] **Step 2: Verify the file parses as valid HTML**

```bash
python3 -c "
from html.parser import HTMLParser
class V(HTMLParser): pass
V().feed(open('docs.html').read())
print('docs.html: valid HTML structure')
"
```
Expected: `docs.html: valid HTML structure`

- [ ] **Step 3: Commit**

```bash
git add docs.html
git commit -m "feat: add docs.html integration guide page"
```

---

## Task 2: Create `security.html`

**Files:**
- Create: `security.html`

- [ ] **Step 1: Create `security.html` with full content**

Create `/Users/suryansh.prajapati/Documents/Learning/Project/App-Inspect-Website/security.html` with this exact content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Security | AppInspect</title>
    <meta
        name="description"
        content="AppInspect uses two independent layers to keep release builds safe: a compile-time no-op artifact and a runtime self-disable gate. Zero telemetry, no exported components, no network calls."
    >
    <meta name="theme-color" content="#145f5b">
    <meta name="referrer" content="strict-origin-when-cross-origin">
    <link rel="canonical" href="https://app-inspect-doc.vercel.app/security.html">

    <!-- Open Graph -->
    <meta property="og:type"        content="website">
    <meta property="og:url"         content="https://app-inspect-doc.vercel.app/security.html">
    <meta property="og:title"       content="Security — AppInspect">
    <meta property="og:description" content="Two independent layers keep release builds safe: compile-time no-op artifact and runtime self-disable. Zero telemetry, no exported components.">
    <meta property="og:image"       content="https://app-inspect-doc.vercel.app/fevicon/favicon-180.png">

    <!-- Twitter / X Card -->
    <meta name="twitter:card"        content="summary">
    <meta name="twitter:title"       content="Security — AppInspect">
    <meta name="twitter:description" content="AppInspect never runs in production. Compile-time no-op + runtime self-disable. Zero telemetry.">
    <meta name="twitter:image"       content="https://app-inspect-doc.vercel.app/fevicon/favicon-180.png">

    <script>
        document.documentElement.classList.add("js");
    </script>
    <link rel="icon" href="fevicon/favicon.ico" sizes="any">
    <link rel="icon" type="image/svg+xml" href="fevicon/favicon.svg">
    <link rel="icon" type="image/png" sizes="32x32" href="fevicon/favicon-32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="fevicon/favicon-16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="fevicon/favicon-180.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&amp;family=JetBrains+Mono:wght@500;700&amp;display=swap"
        rel="stylesheet"
    >
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="page-shell">
        <header class="site-header">
            <a class="brand" href="index.html">
                <img class="brand-logo" src="fevicon/favicon-180.png" alt="AppInspect logo" width="44" height="44">
                <span class="brand-copy">
                    <strong>AppInspect</strong>
                    <span>Android in-app inspector</span>
                </span>
            </a>
            <button
                class="nav-toggle"
                type="button"
                aria-expanded="false"
                aria-controls="site-nav"
                aria-label="Toggle navigation"
            >
                Menu
            </button>
            <nav class="site-nav" id="site-nav" aria-label="Primary">
                <a href="index.html#top">About</a>
                <a href="index.html#features">Features</a>
                <a href="docs.html">Docs</a>
                <a href="security.html" aria-current="page">Security</a>
                <a href="privacy.html">Privacy</a>
                <a href="index.html#support">Support</a>
            </nav>
        </header>

        <main>
            <!-- Hero -->
            <section class="hero hero-page reveal" id="top">
                <div class="hero-copy hero-copy-full">
                    <span class="eyebrow">Security and data handling</span>
                    <h1>Release builds are safe — two independent layers of protection.</h1>
                    <p class="hero-text">
                        AppInspect is a local library, not an external data service. It never uploads
                        captured app data, sends zero telemetry, and writes nothing to Logcat. For
                        production, two separate layers each guarantee on their own that no inspection
                        happens in users' hands.
                    </p>
                    <div class="hero-actions">
                        <a class="button button-primary" href="docs.html">Integration guide</a>
                        <a
                            class="button button-secondary"
                            href="https://central.sonatype.com/artifact/io.github.suryansh1720001.appinspect/appinspect/overview"
                            target="_blank"
                            rel="noopener noreferrer"
                        >Maven Central</a>
                    </div>
                </div>
            </section>

            <!-- Security model -->
            <section class="section reveal" id="security">
                <div class="section-heading">
                    <span class="eyebrow">Release safety</span>
                    <h2>Two layers, either one sufficient on its own.</h2>
                </div>

                <div class="security-grid">
                    <article class="content-panel">
                        <h3>Layer 1 — Compile-time no-op</h3>
                        <ul class="check-list">
                            <li><code>releaseImplementation("...appinspect-no-op")</code> ships only a pass-through OkHttp interceptor.</li>
                            <li>No inspector UI, no storage, no network capture, no crash handler, no manifest entries — inspection code is absent from the release APK.</li>
                            <li>Shared OkHttp builder code compiles unchanged across debug and release variants.</li>
                        </ul>
                    </article>

                    <article class="content-panel">
                        <h3>Layer 2 — Runtime self-disable</h3>
                        <ul class="check-list">
                            <li>Even if the full module accidentally ships in a release build, it detects the non-debuggable build and disables itself completely.</li>
                            <li>Never creates <code>appinspect_storage.db</code> on disk, never installs the crash handler or ANR collector, never registers sensors, notifications, or shortcuts.</li>
                            <li>The interceptor becomes a pure pass-through and all <code>open()</code> calls are refused.</li>
                            <li>Cannot be re-enabled at runtime — production requires the host to explicitly ship <strong>both</strong> <code>allowInNonDebugBuilds = true</code> and <code>allowInProductionBuilds = true</code> in the APK.</li>
                        </ul>
                    </article>

                    <article class="content-panel">
                        <h3>Hardening in every build type</h3>
                        <ul class="check-list">
                            <li>No exported components — the inspector activity, startup initializer, and file provider are all <code>exported="false"</code>; nothing is reachable from other apps.</li>
                            <li>No network calls of its own — the library only observes the host's OkHttp traffic and never sends data anywhere.</li>
                            <li>No logging — captured payloads, headers, and crash traces are never written to Logcat.</li>
                            <li>Notifications show only method, status code, host, and path — never headers, bodies, or tokens.</li>
                            <li>Export sharing goes through a non-exported <code>FileProvider</code> scoped exclusively to <code>cacheDir/appinspect_exports/</code> with per-URI grants.</li>
                        </ul>
                    </article>

                    <article class="content-panel">
                        <h3>Debug and staging builds are intentionally open</h3>
                        <ul class="check-list">
                            <li>Auth headers, tokens, cookies, database contents, DataStore values, and crash stack traces are visible inside the inspector — by design, for developer tooling.</li>
                            <li>Captured data stays on device in app-private SQLite with retention caps (200 network events, 50 crashes by default).</li>
                            <li>Distribute enabled builds only to trusted development, QA, and internal-test audiences.</li>
                            <li>Tune visibility for wider audiences with the levers in <a href="docs.html#configure">Configuration</a>.</li>
                        </ul>
                    </article>
                </div>
            </section>

            <!-- QA checklist -->
            <section class="section reveal" id="qa">
                <div class="section-heading">
                    <span class="eyebrow">QA checklist</span>
                    <h2>Share evidence carefully. Exports can carry real credentials.</h2>
                    <p>
                        Network exports are valuable for bug reports, but they include the same headers
                        and tokens the original requests used. Treat them as internal security artifacts.
                    </p>
                </div>

                <div class="qa-layout">
                    <article class="warning-card">
                        <h3>Before sharing TXT, HAR, or cURL output</h3>
                        <ol class="number-list">
                            <li>Search for <code>Authorization</code>, <code>Cookie</code>, <code>Set-Cookie</code>, <code>X-API-Key</code>, and app-specific credential headers.</li>
                            <li>Replace token values with <code>[REDACTED]</code> before uploading to Jira, Slack, email, shared drives, or bug trackers.</li>
                            <li>Remove <code>-H "Authorization: ..."</code> flags from cURL commands copied into tickets or messages.</li>
                            <li>If an unredacted export was already shared, rotate the exposed token and ask the backend team to invalidate the session.</li>
                        </ol>
                    </article>

                    <article class="content-panel">
                        <h3>Good habits for enabled builds</h3>
                        <ul class="check-list">
                            <li>Exports persist in app cache until Android clears the cache or the app is uninstalled.</li>
                            <li>Crash and ANR reports reveal package names, class names, methods, and line numbers — treat shared reports like source-adjacent artifacts.</li>
                            <li>If your debug build enables Android auto-backup, exclude <code>appinspect_storage.db</code> in your backup rules — it can contain captured auth headers. Production builds have nothing to back up.</li>
                            <li>For wider QA audiences, reduce what testers can see and change with the levers in <a href="docs.html#configure">Configuration</a>.</li>
                        </ul>
                    </article>
                </div>
            </section>

            <!-- Bottom CTA -->
            <section class="section section-compact reveal">
                <div class="cta-card">
                    <div>
                        <span class="eyebrow">Ready to integrate</span>
                        <h2>Add AppInspect to your Android app in three steps.</h2>
                        <p>Follow the integration guide to add the Gradle dependency, wire the OkHttp interceptor, and configure panels for your team.</p>
                    </div>
                    <div class="cta-actions">
                        <a class="button button-primary" href="docs.html">Integration guide</a>
                        <a
                            class="button button-secondary"
                            href="https://central.sonatype.com/artifact/io.github.suryansh1720001.appinspect/appinspect/overview"
                            target="_blank"
                            rel="noopener noreferrer"
                        >Maven Central</a>
                    </div>
                </div>
            </section>
        </main>

        <footer class="site-footer">
            <div class="footer-brand">
                <a class="footer-brand-link" href="index.html">
                    <img src="fevicon/favicon-180.png" alt="AppInspect logo" width="32" height="32">
                    <span>AppInspect</span>
                </a>
                <p class="footer-brand-desc">
                    Android in-app inspector for developers and QA teams. Drop in one library,
                    inspect network traffic, storage, background work, crashes and ANRs, and
                    runtime metadata from inside the running app. No cloud. No telemetry.
                </p>
                <p class="footer-copy">&#169; 2026 Suryansh Prajapati</p>
            </div>

            <nav class="footer-nav" aria-label="Footer">
                <div class="footer-nav-group">
                    <span class="footer-nav-label">Docs</span>
                    <a href="index.html#features">Features</a>
                    <a href="docs.html">Integration</a>
                    <a href="security.html">Security</a>
                    <a href="privacy.html">Privacy Policy</a>
                </div>
                <div class="footer-nav-group">
                    <span class="footer-nav-label">Links</span>
                    <a
                        href="https://central.sonatype.com/artifact/io.github.suryansh1720001.appinspect/appinspect/overview"
                        target="_blank"
                        rel="noopener noreferrer"
                    >Maven Central</a>
                    <a
                        href="https://github.com/Suryansh1720001"
                        target="_blank"
                        rel="noopener noreferrer"
                    >GitHub</a>
                    <a
                        href="https://www.linkedin.com/in/itssuryansh/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >LinkedIn</a>
                </div>
            </nav>
        </footer>
    </div>

    <script src="script.js"></script>
    <!-- Cloudflare Web Analytics — token is intentionally public, safe to commit -->
    <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "8f2c362a02c54e9a906a77dd868039f7"}'></script>
</body>
</html>
```

- [ ] **Step 2: Verify the file parses as valid HTML**

```bash
python3 -c "
from html.parser import HTMLParser
class V(HTMLParser): pass
V().feed(open('security.html').read())
print('security.html: valid HTML structure')
"
```
Expected: `security.html: valid HTML structure`

- [ ] **Step 3: Commit**

```bash
git add security.html
git commit -m "feat: add security.html trust and safety page"
```

---

## Task 3: Update `index.html` — remove 4 sections, add Quick Start teaser, update nav + CTA + footer

**Files:**
- Modify: `index.html`

This is the most complex task. Four large sections are removed and one compact section is added in their place.

- [ ] **Step 1: Update the `<nav>` — add Docs and Security links**

Find:
```html
            <nav class="site-nav" id="site-nav" aria-label="Primary">
                <a href="#top">About</a>
                <a href="#features">Features</a>
                <a href="#install">Integration</a>
                <a href="#security">Security</a>
                <a href="privacy.html">Privacy</a>
                <a href="#support">Support</a>
            </nav>
```

Replace with:
```html
            <nav class="site-nav" id="site-nav" aria-label="Primary">
                <a href="#top" aria-current="page">About</a>
                <a href="#features">Features</a>
                <a href="docs.html">Docs</a>
                <a href="security.html">Security</a>
                <a href="privacy.html">Privacy</a>
                <a href="#support">Support</a>
            </nav>
```

- [ ] **Step 2: Remove the Install section (3-step) and replace with Quick Start teaser**

Find this entire block (from `<!-- Integration: Install -->` to its closing `</section>`):
```html
            <!-- Integration: Install -->
            <section class="section reveal" id="install">
                <div class="section-heading">
                    <span class="eyebrow">Integration</span>
                    <h2>Install by build variant, not as a blanket dependency.</h2>
                    <p>
                        The recommended setup gives internal builds the full inspector and production
                        builds only the no-op OkHttp counterpart. AppInspect auto-initializes via
                        AndroidX Startup — add the dependency and the inspector is ready, with
                        <code>AppInspect.install()</code> available when you want host-controlled setup.
                    </p>
                </div>

                <div class="steps-grid">
                    <article class="step-card">
                        <div class="step-meta">
                            <span class="step-number">1</span>
                            <h3>Add Maven Central</h3>
                            <p>Resolve AppInspect from a shared repository so every developer and CI runner uses the same artifact.</p>
                        </div>
                        <div class="snippet-card">
                            <div class="snippet-head">
                                <span>settings.gradle.kts</span>
                                <button class="copy-button" type="button" data-copy-target="repo-kts">Copy</button>
                            </div>
                            <pre><code id="repo-kts">dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
    }
}</code></pre>
                        </div>
                    </article>

                    <article class="step-card">
                        <div class="step-meta">
                            <span class="step-number">2</span>
                            <h3>Add the library</h3>
                            <p>
                                Use the full inspector in debug builds. Use the no-op artifact in
                                release builds when you want shared OkHttp setup without inspection behavior.
                            </p>
                        </div>
                        <div class="snippet-card">
                            <div class="snippet-head">
                                <span>build.gradle.kts</span>
                                <button class="copy-button" type="button" data-copy-target="variant-deps">Copy</button>
                            </div>
                            <pre><code id="variant-deps">dependencies {
    debugImplementation("io.github.suryansh1720001.appinspect:appinspect:&lt;latest-version&gt;")
    releaseImplementation("io.github.suryansh1720001.appinspect:appinspect-no-op:&lt;latest-version&gt;")
}</code></pre>
                        </div>
                        <p class="inline-note">
                            For custom variants, add the full <code>appinspect</code> artifact per
                            variant — e.g. <code>add("stagingImplementation", ...)</code> or
                            <code>add("internalTestImplementation", ...)</code>. Check
                            <a
                                href="https://central.sonatype.com/artifact/io.github.suryansh1720001.appinspect/appinspect/versions"
                                target="_blank"
                                rel="noopener noreferrer"
                            >Maven Central</a>
                            for the latest published version. See
                            <a href="#security">Security</a> for why the no-op artifact keeps release
                            builds clean.
                        </p>
                    </article>

                    <article class="step-card">
                        <div class="step-meta">
                            <span class="step-number">3</span>
                            <h3>Attach OkHttp capture</h3>
                            <p>The same builder code compiles unchanged across variants. In release, the no-op returns the builder unchanged.</p>
                        </div>
                        <div class="snippet-card">
                            <div class="snippet-head">
                                <span>OkHttpClient</span>
                                <button class="copy-button" type="button" data-copy-target="okhttp-setup">Copy</button>
                            </div>
                            <pre><code id="okhttp-setup">val client = OkHttpClient.Builder()
    .addAppInspectInterceptor()
    .build()</code></pre>
                        </div>
                        <p class="inline-note">
                            Guard direct <code>AppInspect.open()</code> or <code>AppInspect.install()</code> calls by build variant,
                            because the no-op artifact only mirrors the OkHttp API surface.
                        </p>
                    </article>
                </div>
            </section>
```

Replace with:
```html
            <!-- Quick Start -->
            <section class="section reveal" id="install">
                <div class="section-heading">
                    <span class="eyebrow">Quick start</span>
                    <h2>Two Gradle lines and you're running.</h2>
                    <p>
                        Add the full inspector for debug builds and the no-op stub for release.
                        AppInspect auto-initializes — no <code>Application</code> class changes needed.
                    </p>
                </div>

                <div class="quickstart-layout">
                    <div class="snippet-card">
                        <div class="snippet-head">
                            <span>build.gradle.kts</span>
                            <button class="copy-button" type="button" data-copy-target="qs-deps">Copy</button>
                        </div>
                        <pre><code id="qs-deps">dependencies {
    debugImplementation("io.github.suryansh1720001.appinspect:appinspect:&lt;latest-version&gt;")
    releaseImplementation("io.github.suryansh1720001.appinspect:appinspect-no-op:&lt;latest-version&gt;")
}</code></pre>
                    </div>
                    <div class="quickstart-actions">
                        <a class="button button-primary" href="docs.html">Full integration guide</a>
                        <a class="button button-secondary" href="security.html">Security model</a>
                    </div>
                </div>
            </section>
```

- [ ] **Step 3: Remove the Configure section entirely**

Find and delete this entire block (from `<!-- Integration: Configure -->` to its closing `</section>`):
```html
            <!-- Integration: Configure -->
            <section class="section reveal" id="configure">
                <div class="section-heading">
                    <span class="eyebrow">Configuration</span>
                    <h2>Customize AppInspect for your team workflow.</h2>
                    <p>
                        The default setup is developer-friendly. When the build is shared with a
                        wider QA or business audience, you can hide raw values, disable editing tools,
                        turn off request notifications, or remove panels that are not needed.
                    </p>
                </div>

                <div class="configure-layout">
                    <article class="content-panel">
                        <h3>Controlled QA profile</h3>
                        <div class="snippet-card">
                            <div class="snippet-head">
                                <span>AppInspectConfiguration</span>
                                <button class="copy-button" type="button" data-copy-target="qa-config">Copy</button>
                            </div>
                            <pre><code id="qa-config">AppInspect.install(
    application = application,
    configuration = AppInspectConfiguration(
        enablement = AppInspectEnablement(
            allowedBuildTiers = linkedSetOf(AppInspectBuildTier.DEBUG),
        ),
        entryPoints = AppInspectEntryPoints(
            shakeToOpenEnabled = true,
            networkNotificationsEnabled = false,
        ),
        panels = AppInspectPanels(
            crashesEnabled = true,
        ),
        powerTools = AppInspectPowerTools(
            showRawSensitiveValues = false,
            allowSharedPreferencesEditing = false,
            allowDatabaseEditing = false,
            allowSqlConsole = false,
        ),
    ),
)</code></pre>
                        </div>
                    </article>

                    <aside class="content-panel side-panel">
                        <h3>Configuration levers</h3>
                        <dl class="definition-list">
                            <div>
                                <dt><code>enablement.allowedBuildTiers</code></dt>
                                <dd>Decide which build tiers can run the inspector at all. Production stays off unless the host explicitly opts in twice.</dd>
                            </div>
                            <div>
                                <dt><code>showRawSensitiveValues</code></dt>
                                <dd>When false, configured headers, query parameters, body fields, cookies, and metadata keys are masked or removed before storage.</dd>
                            </div>
                            <div>
                                <dt><code>allowDatabaseEditing</code>, <code>allowSqlConsole</code>, <code>allowSharedPreferencesEditing</code></dt>
                                <dd>Keep storage inspection read-only for QA builds that do not need mutation tools.</dd>
                            </div>
                            <div>
                                <dt><code>panels.crashesEnabled</code></dt>
                                <dd>Hide the Crashes tab for audiences that should not see stack traces.</dd>
                            </div>
                            <div>
                                <dt><code>networkNotificationsEnabled</code></dt>
                                <dd>Disable per-request notifications when lock-screen visibility or shared testers are a concern.</dd>
                            </div>
                            <div>
                                <dt><code>launcherShortcutEnabled</code></dt>
                                <dd>Show or hide the launcher shortcut that opens the inspector directly from the device home screen.</dd>
                            </div>
                            <div>
                                <dt><code>autoOpenOnLongPressTrigger</code></dt>
                                <dd>Enable the long-press trigger on views and Compose modifiers (<code>AppInspect.attachLongPressTrigger</code> / <code>Modifier.appInspectLongPressTrigger</code>) that opens the inspector.</dd>
                            </div>
                        </dl>
                    </aside>
                </div>
            </section>
```

Replace with nothing (delete entirely — no replacement).

- [ ] **Step 4: Remove Security section entirely**

Find and delete from `<!-- Security -->` to its closing `</section>`:
```html
            <!-- Security -->
            <section class="section reveal" id="security">
```
...through...
```html
                </div>
            </section>

            <!-- QA checklist -->
```

The Security section ends at the `</section>` just before `<!-- QA checklist -->`. Delete the entire Security section block.

- [ ] **Step 5: Remove QA checklist section entirely**

Find and delete from `<!-- QA checklist -->` to its closing `</section>`:
```html
            <!-- QA checklist -->
            <section class="section reveal" id="qa">
                <div class="section-heading">
                    <span class="eyebrow">QA checklist</span>
                    <h2>Share evidence carefully. Exports can carry real credentials.</h2>
                    <p>
                        Network exports are valuable for bug reports, but they include the same headers
                        and tokens the original requests used. Treat them as internal security artifacts.
                    </p>
                </div>

                <div class="qa-layout">
                    <article class="warning-card">
                        <h3>Before sharing TXT, HAR, or cURL output</h3>
                        <ol class="number-list">
                            <li>Search for <code>Authorization</code>, <code>Cookie</code>, <code>Set-Cookie</code>, <code>X-API-Key</code>, and app-specific credential headers.</li>
                            <li>Replace token values with <code>[REDACTED]</code> before uploading to Jira, Slack, email, shared drives, or bug trackers.</li>
                            <li>Remove <code>-H "Authorization: ..."</code> flags from cURL commands copied into tickets or messages.</li>
                            <li>If an unredacted export was already shared, rotate the exposed token and ask the backend team to invalidate the session.</li>
                        </ol>
                    </article>

                    <article class="content-panel">
                        <h3>Good habits for enabled builds</h3>
                        <ul class="check-list">
                            <li>Exports persist in app cache until Android clears the cache or the app is uninstalled.</li>
                            <li>Crash and ANR reports reveal package names, class names, methods, and line numbers — treat shared reports like source-adjacent artifacts.</li>
                            <li>If your debug build enables Android auto-backup, exclude <code>appinspect_storage.db</code> in your backup rules — it can contain captured auth headers. Production builds have nothing to back up.</li>
                            <li>For wider QA audiences, reduce what testers can see and change with the levers in <a href="#configure">Configuration</a>.</li>
                        </ul>
                    </article>
                </div>
            </section>
```

Replace with nothing (delete entirely).

- [ ] **Step 6: Update the CTA button**

Find:
```html
                        <a class="button button-secondary" href="#install">Copy Install Steps</a>
```

Replace with:
```html
                        <a class="button button-secondary" href="docs.html">Read the Docs</a>
```

- [ ] **Step 7: Update the footer nav**

Find:
```html
            <nav class="footer-nav" aria-label="Footer">
                <div class="footer-nav-group">
                    <span class="footer-nav-label">Docs</span>
                    <a href="#features">Features</a>
                    <a href="#install">Integration</a>
                    <a href="#security">Security</a>
                    <a href="privacy.html">Privacy Policy</a>
                </div>
```

Replace with:
```html
            <nav class="footer-nav" aria-label="Footer">
                <div class="footer-nav-group">
                    <span class="footer-nav-label">Docs</span>
                    <a href="#features">Features</a>
                    <a href="docs.html">Integration</a>
                    <a href="security.html">Security</a>
                    <a href="privacy.html">Privacy Policy</a>
                </div>
```

- [ ] **Step 8: Verify index.html no longer contains removed section IDs**

```bash
grep -c 'id="configure"\|id="security"\|id="qa"' index.html
```
Expected: `0`

- [ ] **Step 9: Verify Quick Start teaser is present**

```bash
grep -c 'id="qs-deps"\|quickstart-layout\|Full integration guide' index.html
```
Expected: `3`

- [ ] **Step 10: Commit**

```bash
git add index.html
git commit -m "refactor: shorten homepage — move install/configure/security/qa to dedicated pages"
```

---

## Task 4: Update `privacy.html` nav

**Files:**
- Modify: `privacy.html`

- [ ] **Step 1: Update the nav in privacy.html**

Find (in privacy.html):
```html
            <nav class="site-nav" id="site-nav" aria-label="Primary">
```

Read the full nav block in privacy.html and replace it with:
```html
            <nav class="site-nav" id="site-nav" aria-label="Primary">
                <a href="index.html#top">About</a>
                <a href="index.html#features">Features</a>
                <a href="docs.html">Docs</a>
                <a href="security.html">Security</a>
                <a href="privacy.html" aria-current="page">Privacy</a>
                <a href="index.html#support">Support</a>
            </nav>
```

- [ ] **Step 2: Update the brand link in privacy.html to point to index.html**

In privacy.html, find:
```html
            <a class="brand" href="#top">
```
Replace with:
```html
            <a class="brand" href="index.html">
```

- [ ] **Step 3: Verify**

```bash
grep "aria-current" privacy.html
```
Expected: `aria-current="page"` on the Privacy link.

- [ ] **Step 4: Commit**

```bash
git add privacy.html
git commit -m "fix: update privacy.html nav to match new 4-page structure"
```

---

## Task 5: Add Quick Start CSS to `styles.css`

**Files:**
- Modify: `styles.css`

The new `.quickstart-layout` class is used in the Quick Start teaser on `index.html`.

- [ ] **Step 1: Add quickstart layout styles**

In `styles.css`, find the existing `.faq-list` block (added in previous work):
```css
/* FAQ accordion */
.faq-list {
```

Add the following block immediately **before** it:

```css
/* Quick Start teaser */
.quickstart-layout {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 640px;
}

.quickstart-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

```

- [ ] **Step 2: Verify styles compile (no syntax errors)**

```bash
python3 -c "
import re
css = open('styles.css').read()
opens = css.count('{')
closes = css.count('}')
print(f'Braces: {opens} open, {closes} close — {\"balanced\" if opens == closes else \"UNBALANCED\"}')"
```
Expected: `balanced`

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "style: add quickstart-layout CSS for homepage teaser"
```

---

## Task 6: Update `sitemap.xml`, `llms.txt`, and `README.md`

**Files:**
- Modify: `sitemap.xml`
- Modify: `llms.txt`
- Modify: `README.md`

- [ ] **Step 1: Update sitemap.xml — add docs.html and security.html**

Find:
```xml
  <url>
    <loc>https://app-inspect-doc.vercel.app/privacy.html</loc>
```

Add the two new entries immediately **before** the privacy.html entry:
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
  <url>
    <loc>https://app-inspect-doc.vercel.app/privacy.html</loc>
```

- [ ] **Step 2: Validate sitemap.xml**

```bash
python3 -c "import xml.etree.ElementTree as ET; ET.parse('sitemap.xml'); print('valid XML, entries:', len(ET.parse('sitemap.xml').getroot()))"
```
Expected: `valid XML, entries: 4`

- [ ] **Step 3: Update llms.txt — add new pages under Links**

Find in `llms.txt`:
```
- Documentation: https://app-inspect-doc.vercel.app/
```

Replace with:
```
- Documentation: https://app-inspect-doc.vercel.app/
- Docs / Integration guide: https://app-inspect-doc.vercel.app/docs.html
- Security model: https://app-inspect-doc.vercel.app/security.html
```

- [ ] **Step 4: Update README.md changelog**

In `README.md`, add at the top of the Changelog section:
```markdown
- **2026-06-25** — Multi-page restructure (Approach B): created `docs.html` (integration + configuration) and `security.html` (security model + QA checklist). Homepage shortened — install/configure/security/qa sections moved to dedicated pages, replaced by a compact Quick Start teaser. Nav updated to 6 items on all pages. `sitemap.xml` updated with new pages. `llms.txt` updated with new URLs.
```

- [ ] **Step 5: Commit**

```bash
git add sitemap.xml llms.txt README.md
git commit -m "docs: update sitemap, llms.txt, README for multi-page restructure"
```

---

## Post-Implementation Checklist

After all tasks are committed:

- [ ] Run a local server and verify all three pages load: `python3 -m http.server 8000`
  - `http://localhost:8000/` — homepage has Quick Start teaser, no install/configure/security/qa sections
  - `http://localhost:8000/docs.html` — shows 3-step install + configuration
  - `http://localhost:8000/security.html` — shows 4 security panels + QA checklist
- [ ] Click "Full integration guide" on homepage → goes to docs.html ✓
- [ ] Click "Security model" on homepage → goes to security.html ✓
- [ ] Nav "Docs" on all pages → goes to docs.html ✓
- [ ] Nav "Security" on all pages → goes to security.html ✓
- [ ] "Configuration" link on security.html → goes to `docs.html#configure` ✓
- [ ] Copy buttons on docs.html work (script.js handles by `data-copy-target`) ✓
- [ ] `sitemap.xml` has 4 entries ✓
