# SEO & Discoverability Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add technical SEO infrastructure and AI-search signals to `https://app-inspect-doc.vercel.app/` so it ranks in Google, Bing/ChatGPT, and AI tools like Perplexity.

**Architecture:** Pure static-file changes — no build step, no framework. New files (`sitemap.xml`, `robots.txt`, `llms.txt`) land at the project root. Existing HTML files get new `<head>` meta tags and a `<script type="application/ld+json">` block before `</body>`.

**Tech Stack:** Plain HTML, XML, plain text. No dependencies.

## Global Constraints

- Site canonical URL: `https://app-inspect-doc.vercel.app/` (no trailing variation)
- Library version referenced in structured data: `0.3.1`
- Maven Central group: `io.github.suryansh1720001.appinspect`
- Author: Suryansh Prajapati, GitHub: `https://github.com/Suryansh1720001`
- Never pin a library version in Gradle snippets — use `<latest-version>` placeholder
- Keep README.md changelog updated in every commit that touches the site

---

## Task 1: Create `sitemap.xml`

**Files:**
- Create: `sitemap.xml`

- [ ] **Step 1: Create `sitemap.xml` at project root**

Exact content:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://app-inspect-doc.vercel.app/</loc>
    <lastmod>2026-06-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://app-inspect-doc.vercel.app/privacy.html</loc>
    <lastmod>2026-06-25</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
```

- [ ] **Step 2: Validate the XML is well-formed**

Open a terminal and run:
```bash
python3 -c "import xml.etree.ElementTree as ET; ET.parse('sitemap.xml'); print('valid XML')"
```
Expected output: `valid XML`

- [ ] **Step 3: Commit**

```bash
git add sitemap.xml
git commit -m "seo: add sitemap.xml"
```

---

## Task 2: Create `robots.txt`

**Files:**
- Create: `robots.txt`

- [ ] **Step 1: Create `robots.txt` at project root**

Exact content (allows all crawlers including known AI bots, points to sitemap):

```
User-agent: *
Allow: /

# AI crawlers — explicitly allow so they are never accidentally blocked
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Applebot
Allow: /

Sitemap: https://app-inspect-doc.vercel.app/sitemap.xml
```

- [ ] **Step 2: Verify file is plain text with no BOM or hidden characters**

```bash
file robots.txt
```
Expected: `robots.txt: ASCII text`

- [ ] **Step 3: Commit**

```bash
git add robots.txt
git commit -m "seo: add robots.txt allowing all crawlers including AI bots"
```

---

## Task 3: Create `llms.txt`

**Files:**
- Create: `llms.txt`

`llms.txt` is an emerging open standard (llmstxt.org). AI crawlers read it as a plain-English site summary — think of it as a README for AI agents.

- [ ] **Step 1: Create `llms.txt` at project root**

Exact content:

```
# AppInspect

AppInspect is a free, open-source Android in-app inspector library for developer and QA builds.
It opens a full-screen diagnostics surface inside the host app — no proxy, no USB cable, no desktop tool required.
All captured data stays on-device. Zero telemetry. Safe for debug and staging builds.

## What it inspects

- Network — captures OkHttp requests/responses; export as .har or .txt with cURL
- Storage — SharedPreferences, DataStore, SQLite/Room databases (with optional editing)
- WorkManager — running, enqueued, and completed job specs
- Crashes & ANRs — uncaught exceptions, ANRs (Android 11+), native crash detection (Android 11+)
- Runtime — app version, build type, device model, OS, session metadata

## Release safety

Two independent layers ensure inspection code never runs in production:
1. Compile-time: the `appinspect-no-op` artifact is a pass-through stub with no UI, storage, or capture logic.
2. Runtime: even if the full SDK ships accidentally, it detects non-debuggable builds and self-disables completely.

## Integration (Gradle)

```kotlin
dependencies {
    debugImplementation("io.github.suryansh1720001.appinspect:appinspect:<latest-version>")
    releaseImplementation("io.github.suryansh1720001.appinspect:appinspect-no-op:<latest-version>")
}
```

AppInspect auto-initializes via AndroidX Startup. No Application class changes needed for basic usage.

## Requirements

- Minimum: Android API 24 (Android 7.0)
- ANR + native crash detection: Android API 30 (Android 11+)
- Network capture: requires OkHttp

## Links

- Documentation: https://app-inspect-doc.vercel.app/
- Maven Central: https://central.sonatype.com/artifact/io.github.suryansh1720001.appinspect/appinspect/overview
- GitHub: https://github.com/Suryansh1720001
- Privacy policy: https://app-inspect-doc.vercel.app/privacy.html

## Author

Suryansh Prajapati — https://github.com/Suryansh1720001 — https://www.linkedin.com/in/itssuryansh/

## License

Free to use. Published on Maven Central.
```

- [ ] **Step 2: Commit**

```bash
git add llms.txt
git commit -m "seo: add llms.txt for AI crawler discovery"
```

---

## Task 4: Add canonical + OG + Twitter meta tags to `index.html`

**Files:**
- Modify: `index.html` (lines 11–27, inside `<head>`)

- [ ] **Step 1: Add canonical, meta keywords, OG, and Twitter tags**

In `index.html`, find this exact block (line 11):
```html
    <meta name="theme-color" content="#145f5b">
    <meta name="referrer" content="strict-origin-when-cross-origin">
```

Replace it with:
```html
    <meta name="theme-color" content="#145f5b">
    <meta name="referrer" content="strict-origin-when-cross-origin">
    <meta name="keywords" content="android debugging library, android in-app inspector, network inspector android, in-app debugger android, appinspect, android developer tools, android crash inspector, workmanager inspector, android qa tools">
    <link rel="canonical" href="https://app-inspect-doc.vercel.app/">

    <!-- Open Graph -->
    <meta property="og:type"        content="website">
    <meta property="og:url"         content="https://app-inspect-doc.vercel.app/">
    <meta property="og:title"       content="AppInspect — Android In-App Inspector">
    <meta property="og:description" content="Network, storage, WorkManager, crash & ANR capture inside your Android app. Zero-overhead no-op for release builds. Free and open source.">
    <meta property="og:image"       content="https://app-inspect-doc.vercel.app/fevicon/favicon-180.png">

    <!-- Twitter / X Card -->
    <meta name="twitter:card"        content="summary">
    <meta name="twitter:title"       content="AppInspect — Android In-App Inspector">
    <meta name="twitter:description" content="On-device inspector for Android debug builds. Network, storage, crashes, ANRs — no proxy, no USB. Free and open source.">
    <meta name="twitter:image"       content="https://app-inspect-doc.vercel.app/fevicon/favicon-180.png">
```

- [ ] **Step 2: Fix blank alt attributes**

Find (line 33):
```html
                <img class="brand-logo" src="fevicon/favicon-180.png" alt="" width="44" height="44">
```
Replace with:
```html
                <img class="brand-logo" src="fevicon/favicon-180.png" alt="AppInspect logo" width="44" height="44">
```

Find (line 625):
```html
                    <img src="fevicon/favicon-180.png" alt="" width="32" height="32">
```
Replace with:
```html
                    <img src="fevicon/favicon-180.png" alt="AppInspect logo" width="32" height="32">
```

- [ ] **Step 3: Verify head section looks correct**

```bash
python3 -m http.server 8000 &
sleep 1
curl -s http://localhost:8000/index.html | grep -E "canonical|og:|twitter:|keywords" | head -20
kill %1
```

Expected: lines showing the canonical, og:, twitter:, and keywords tags you just added.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "seo: add canonical, OG, Twitter meta tags and fix alt attributes"
```

---

## Task 5: Add JSON-LD structured data to `index.html`

**Files:**
- Modify: `index.html` (before `</body>`)

This is the highest-ROI change for AI search recommendations. The `FAQPage` block is quoted directly by Perplexity and ChatGPT when answering "what Android debugging library should I use?"

- [ ] **Step 1: Add JSON-LD block before `</body>`**

In `index.html`, find this exact line (currently the last script tag before `</body>`):
```html
    <script src="script.js"></script>
```

Add the following block **after** `<script src="script.js"></script>` and **before** the Cloudflare beacon script:

```html
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "AppInspect",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Android",
      "description": "AppInspect is a free Android in-app inspector for developer and QA builds. Inspect network requests, storage, WorkManager jobs, crashes, ANRs, and runtime metadata — all on-device with no proxy or USB cable required.",
      "url": "https://app-inspect-doc.vercel.app/",
      "downloadUrl": "https://central.sonatype.com/artifact/io.github.suryansh1720001.appinspect/appinspect/overview",
      "softwareVersion": "0.3.1",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "author": {
        "@type": "Person",
        "name": "Suryansh Prajapati",
        "url": "https://github.com/Suryansh1720001"
      }
    }
    </script>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is AppInspect free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. AppInspect is completely free. It is published on Maven Central at no cost. There is no paid tier, no license fee, and no usage limits."
          }
        },
        {
          "@type": "Question",
          "name": "Does AppInspect add any code to my release APK?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. You use the appinspect-no-op artifact for release builds. It is a pass-through stub with no UI, no storage, no network capture, and no crash handler. Inspection code is completely absent from the release APK."
          }
        },
        {
          "@type": "Question",
          "name": "What can AppInspect inspect?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AppInspect inspects: network requests and responses captured via OkHttp (exportable as .har or .txt with cURL commands), SharedPreferences, DataStore, SQLite and Room databases, WorkManager job queues, uncaught exceptions, ANRs, native crashes (Android 11+), and full runtime and device metadata."
          }
        },
        {
          "@type": "Question",
          "name": "Does AppInspect require root access?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. AppInspect works on any unrooted Android device running API 24 (Android 7.0) or higher. No special device permissions or developer mode are required beyond what a normal debug build needs."
          }
        },
        {
          "@type": "Question",
          "name": "Is my app's data safe when using AppInspect in release builds?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, through two independent layers. Layer 1 (compile-time): the no-op artifact contains no inspection code, so nothing is added to the release APK. Layer 2 (runtime): even if the full SDK accidentally ships in a release build, it detects that the build is non-debuggable and self-disables completely — no database is created, no crash handler is installed, no lifecycle callbacks are registered, and all open() calls are refused."
          }
        },
        {
          "@type": "Question",
          "name": "Does AppInspect collect or send any data outside the device?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. AppInspect never makes network calls of its own. It has zero telemetry. All captured data — network logs, storage values, crash traces — stays entirely on-device. Nothing is sent to any server."
          }
        },
        {
          "@type": "Question",
          "name": "How is AppInspect different from Charles Proxy or Flipper?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AppInspect runs entirely on-device inside the app — no desktop proxy, no SSL certificate installation, no Wi-Fi MITM configuration, and no USB cable needed. QA testers can open the inspector on their device at any time via shake gesture, a launcher shortcut, or a long-press trigger without involving a developer or any external tool."
          }
        },
        {
          "@type": "Question",
          "name": "What Android versions does AppInspect support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AppInspect supports Android API 24 (Android 7.0) and above. ANR detection and native crash detection require Android API 30 (Android 11+)."
          }
        },
        {
          "@type": "Question",
          "name": "Can QA testers use AppInspect without developer help after initial setup?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Once the library is integrated into the app by a developer, testers can open the inspector on their own device at any time — via a shake gesture, a launcher shortcut, or a long-press trigger. No Android Studio, adb, USB cable, or developer involvement is needed during testing."
          }
        },
        {
          "@type": "Question",
          "name": "How do I integrate AppInspect into my Android project?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Add two lines to your Gradle dependencies: debugImplementation for the full SDK and releaseImplementation for the no-op stub. AppInspect auto-initializes via AndroidX Startup — no changes to your Application class are needed for basic usage. For OkHttp network capture, add .addAppInspectInterceptor() to your OkHttpClient builder."
          }
        },
        {
          "@type": "Question",
          "name": "Can I export data captured by AppInspect?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Network logs can be exported as .txt files (including cURL commands for every request) or as .har files in HAR 1.2 format, which is compatible with browser DevTools and tools like Proxyman. Storage contents and runtime summaries can also be shared via the Android share sheet."
          }
        }
      ]
    }
    </script>
```

- [ ] **Step 2: Validate the JSON-LD is well-formed**

```bash
python3 -c "
import json, re
with open('index.html') as f:
    html = f.read()
blocks = re.findall(r'<script type=\"application/ld\+json\">(.*?)</script>', html, re.DOTALL)
for i, b in enumerate(blocks):
    obj = json.loads(b)
    print(f'Block {i+1}: @type={obj[\"@type\"]} — valid JSON')
"
```

Expected output:
```
Block 1: @type=SoftwareApplication — valid JSON
Block 2: @type=FAQPage — valid JSON
```

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "seo: add JSON-LD structured data (SoftwareApplication + FAQPage with 11 FAQs)"
```

---

## Task 6: Add canonical tag to `privacy.html`

**Files:**
- Modify: `privacy.html` (inside `<head>`)

- [ ] **Step 1: Add canonical tag**

In `privacy.html`, find:
```html
    <meta name="theme-color" content="#145f5b">
    <meta name="referrer" content="strict-origin-when-cross-origin">
```

Replace with:
```html
    <meta name="theme-color" content="#145f5b">
    <meta name="referrer" content="strict-origin-when-cross-origin">
    <link rel="canonical" href="https://app-inspect-doc.vercel.app/privacy.html">
```

- [ ] **Step 2: Verify**

```bash
grep "canonical" privacy.html
```
Expected: `<link rel="canonical" href="https://app-inspect-doc.vercel.app/privacy.html">`

- [ ] **Step 3: Commit**

```bash
git add privacy.html
git commit -m "seo: add canonical tag to privacy.html"
```

---

## Task 7: Update `README.md` changelog

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Add changelog entry**

In `README.md`, find the changelog section and add this entry at the top:

```markdown
- **2026-06-25** — SEO & discoverability pass (Approach B): added `sitemap.xml`, `robots.txt` (allows all crawlers including GPTBot/PerplexityBot/ClaudeBot), `llms.txt` (AI crawler summary file). Added to `index.html`: `<link rel="canonical">`, Open Graph tags, Twitter Card tags, `<meta name="keywords">`, JSON-LD `SoftwareApplication` schema, JSON-LD `FAQPage` schema (11 questions). Added canonical to `privacy.html`. Fixed blank `alt` attributes on logo images.
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: update README changelog for SEO pass"
```

---

## Post-Implementation Checklist

After all tasks are committed and pushed to Vercel:

- [ ] Verify `https://app-inspect-doc.vercel.app/sitemap.xml` returns valid XML in browser
- [ ] Verify `https://app-inspect-doc.vercel.app/robots.txt` returns plain text in browser
- [ ] Verify `https://app-inspect-doc.vercel.app/llms.txt` returns plain text in browser
- [ ] Test JSON-LD at **https://search.google.com/test/rich-results** — enter the site URL, expect SoftwareApplication and FAQPage to appear
- [ ] Submit sitemap to Google Search Console (manual step — see spec for full instructions)
- [ ] Submit sitemap to Bing Webmaster Tools (manual step — see spec for full instructions)
