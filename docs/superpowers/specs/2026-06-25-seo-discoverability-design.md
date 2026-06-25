---
name: seo-discoverability
description: SEO and AI discoverability improvements for app-inspect-doc.vercel.app — Approach B (technical foundation + content signal tuning)
metadata:
  type: project
---

# SEO & Discoverability Design — AppInspect Website

**Date:** 2026-06-25
**Site:** https://app-inspect-doc.vercel.app/
**Approach:** B — Technical foundation + content signal tuning

## Goal

Rank the AppInspect website in:
1. Google search (queries like "android debugging library", "android in-app inspector")
2. Brand search ("AppInspect android")
3. AI tool recommendations (Perplexity, ChatGPT, Gemini suggesting AppInspect when asked for Android dev tools)

---

## Changes — Code (Claude implements these)

### 1. `sitemap.xml` (new file, project root)

Standard XML sitemap listing both pages with `lastmod` dates and `changefreq`.

```
/              → index.html    (changefreq: monthly, priority: 1.0)
/privacy.html  → privacy.html  (changefreq: yearly,  priority: 0.3)
```

### 2. `robots.txt` (new file, project root)

Allow all crawlers by default. Explicitly allow known AI crawlers that some sites accidentally block. Point to the sitemap.

Crawlers to explicitly allow: Googlebot, Bingbot, GPTBot (ChatGPT), PerplexityBot, ClaudeBot, anthropic-ai, Applebot.

```
User-agent: *
Allow: /
Sitemap: https://app-inspect-doc.vercel.app/sitemap.xml
```

### 3. `<link rel="canonical">` in both HTML files

```html
<link rel="canonical" href="https://app-inspect-doc.vercel.app/">
```

Prevents Google treating `?utm_source=...` variants as duplicate pages.

### 4. Open Graph + Twitter Card meta tags (index.html `<head>`)

```html
<meta property="og:type"        content="website">
<meta property="og:url"         content="https://app-inspect-doc.vercel.app/">
<meta property="og:title"       content="AppInspect — Android In-App Inspector">
<meta property="og:description" content="Network, storage, WorkManager, crash & ANR capture inside your Android app. Zero-overhead no-op for release builds.">
<meta property="og:image"       content="https://app-inspect-doc.vercel.app/fevicon/favicon-180.png">
<meta name="twitter:card"       content="summary">
<meta name="twitter:title"      content="AppInspect — Android In-App Inspector">
<meta name="twitter:description" content="On-device inspector for Android debug builds. Network, storage, crashes, ANRs — no proxy, no USB.">
```

### 5. JSON-LD structured data (index.html, before `</body>`)

#### 5a. SoftwareApplication schema

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "AppInspect",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Android",
  "description": "Android in-app inspector for developer and QA builds...",
  "url": "https://app-inspect-doc.vercel.app/",
  "downloadUrl": "https://central.sonatype.com/artifact/io.github.suryansh1720001.appinspect/appinspect/overview",
  "softwareVersion": "0.3.1",
  "author": {
    "@type": "Person",
    "name": "Suryansh Prajapati",
    "url": "https://github.com/Suryansh1720001"
  },
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
}
```

#### 5b. FAQPage schema — 10 questions

All answers are factually grounded in the library README.

| # | Question | Answer summary |
|---|---|---|
| 1 | Does AppInspect add any code to my release APK? | No. The `appinspect-no-op` artifact is a pass-through stub with no UI, storage, network capture, or crash handler. Inspection code is absent from the release APK. |
| 2 | What can AppInspect inspect? | Network (OkHttp), SharedPreferences, DataStore, SQLite/Room databases, WorkManager jobs, crashes, ANRs (Android 11+), and full runtime/device metadata. |
| 3 | Does AppInspect require root access? | No. It works on any unrooted Android device running API 24 (Android 7.0) or higher. |
| 4 | Is my app's data safe in release builds? | Yes — two independent layers: (1) the no-op artifact contains no inspection code at compile time; (2) even if the full SDK ships accidentally, it detects non-debuggable builds and self-disables completely at runtime. |
| 5 | Does AppInspect collect or send any data outside the device? | No. It never makes network calls of its own, has zero telemetry, and all captured data (network logs, storage values, crash traces) stays entirely on-device. |
| 6 | How is AppInspect different from Charles Proxy or Flipper? | AppInspect runs entirely on-device inside the app — no desktop proxy setup, no USB cable, no Wi-Fi MITM configuration. QA testers can open the inspector on their own device at any time. |
| 7 | What Android versions does AppInspect support? | API 24 (Android 7.0) and above. ANR detection and native crash detection require Android 11 (API 30+). |
| 8 | Can QA testers use AppInspect without developer help? | Yes. Once the library is integrated, testers open the inspector via shake gesture, a launcher shortcut, or a long-press trigger — no Android Studio, adb, or USB cable required. |
| 9 | How do I integrate AppInspect into my project? | Add two Gradle lines: `debugImplementation` for the full SDK and `releaseImplementation` for the no-op. AppInspect auto-initializes via AndroidX Startup — no Application class code is needed for basic usage. |
| 10 | Can I export data captured by AppInspect? | Yes. Network logs export as `.txt` (with cURL commands) or `.har` (HAR 1.2, compatible with browser DevTools and Proxyman). Storage and runtime summaries can also be shared via the Android share sheet. |

### 6. `llms.txt` (new file, project root)

Plain-text file that AI crawlers read as a site summary. Canonical URL: `https://app-inspect-doc.vercel.app/llms.txt`.

Contents:
- One-paragraph description
- Bullet list of inspected areas
- Integration snippet (two Gradle lines)
- Maven Central artifact ID
- Author and GitHub URL
- Privacy note (on-device only)

### 7. Content signal tuning (index.html)

| Change | Why |
|---|---|
| `alt="AppInspect logo"` on brand `<img>` | Fixes empty alt — accessibility + crawl keyword |
| `alt="AppInspect inspector UI showing network, storage, and crash panels"` on mockup image | Keyword signal for image search |
| `<meta name="keywords">` | `android debugging library, android in-app inspector, network inspector android, in-app debugger android, appinspect, android developer tools, android crash inspector, workmanager inspector` |
| Verify `<h2>`/`<h3>` hierarchy in features section | AI parsers extract headings as section labels — must be semantic |

---

## Changes — Manual (user does these, all free)

### Step 1 — Google Search Console (free, ~5 min)

1. Go to **https://search.google.com/search-console/welcome**
2. Click **"Add property"** → choose **"URL prefix"** → enter `https://app-inspect-doc.vercel.app/`
3. Google shows verification options. Choose **"HTML tag"** method — it gives you a `<meta name="google-site-verification" content="...">` tag.
4. Claude adds this tag to `index.html` (tell me the value and I'll add it).
5. Back in Search Console, click **"Verify"**.
6. Once verified, go to **Sitemaps** (left sidebar) → enter `sitemap.xml` → click **Submit**.
7. Done. Google will crawl within 1–4 weeks.

### Step 2 — Bing Webmaster Tools (free, ~5 min) — important for ChatGPT

ChatGPT's web search is powered by Bing. Getting indexed in Bing directly improves ChatGPT recommendations.

1. Go to **https://www.bing.com/webmasters/about**
2. Sign in with a Microsoft account (create one free if you don't have one).
3. Click **"Add your site"** → enter `https://app-inspect-doc.vercel.app/`
4. Import from Google Search Console (easiest) — Bing has a one-click import button.
   OR manually verify with an HTML meta tag (same as Google's flow).
5. Go to **Sitemaps** → submit `https://app-inspect-doc.vercel.app/sitemap.xml`.
6. Done.

### Step 3 — Wait

| Surface | Typical re-index time |
|---|---|
| Google | 1–4 weeks after sitemap submission |
| Bing / ChatGPT | 1–2 weeks |
| Perplexity | 3–7 days (crawls frequently) |
| AI training data | Months (next model update) |

---

## Files changed / created

| File | Change type |
|---|---|
| `sitemap.xml` | New |
| `robots.txt` | New |
| `llms.txt` | New |
| `index.html` | Modified (canonical, OG/Twitter meta, JSON-LD, alt text, meta keywords) |
| `privacy.html` | Modified (canonical tag only) |
| `README.md` | Changelog update |
