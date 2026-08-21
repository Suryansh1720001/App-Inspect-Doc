# CLAUDE.md

This is the documentation website for the AppInspect Android library.
Plain static HTML/CSS/JS — no build step, no framework, no dependencies.

## Read this first

**`README.md` in this repo root is the single source of truth** for everything about
this website: architecture, the nav tree, file structure, page order, de-duplication
rules, content policies, the design system, and the changelog.

@README.md

## Non-negotiable rules

1. **After every change to the site, update `README.md`** in the same commit — at
   minimum the changelog, plus any structure/policy sections the change affects.
2. **Library facts come from the library repo**, not from memory:
   `/Users/suryansh.prajapati/Documents/Learning/App-Inspect`. Its `README.md` is the
   primary reference and `docs/public-api.md` has the exact field names and defaults —
   but read the version from the root `build.gradle.kts`, since the README's "Current
   Status" line lags, and confirm the version is live on Maven Central before putting
   it on the site. Check `git status`/`git diff` there too: features often land as
   uncommitted work. Record the version/commit in the website README's "Last synced"
   line. **Never invent a configuration field name.**
3. **Navigation is generated, not written.** The sidebar, per-page sub-sections, the
   "On this page" rail, prev/next and search all come from the `NAV` tree in
   `docs.js`. To add a docs page: create the HTML file, add a `NAV` entry, add a
   `<url>` to `sitemap.xml`. Do not hand-write navigation into a page.
4. **One canonical home per topic.** The de-duplication table in `README.md` says
   where each topic lives. Elsewhere, summarise in a line and link — never re-explain.
5. **Use the `<latest-version>` placeholder** in dependency snippets — never pin a
   version.
6. **Both themes matter.** Light and dark are both first-class; check any visual
   change in both. Never hard-code a colour — use the tokens in `styles.css`.
7. Keep `privacy.html` consistent with actual library behaviour and bump its
   "Last updated" date when it changes.
8. The contact address lives only in `CONTACT_EMAIL` at the top of `docs.js`.

## Writing style for docs pages

Written for a developer integrating the library, a tester using it, and someone
deciding whether it is safe to adopt — all on the same page. Lead with what the thing
is for in plain language, explain *why* a behaviour exists, and prefer prose to bullet
dumps. Tables are for genuine matrices, not for hiding sentences.
