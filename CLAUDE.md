# CLAUDE.md

This is the documentation/marketing website for the AppInspect Android library.
Plain static HTML/CSS/JS — no build step, no framework.

## Read this first

**`README.md` in this repo root is the single source of truth** for everything about
this website: file structure, section order and each section's job, de-duplication
rules, content policies (version placeholder, security claims), design system, and
the changelog.

@README.md

## Non-negotiable rules

1. **After every change to the site, update `README.md`** in the same commit — at
   minimum the changelog, plus any structure/policy sections the change affects.
2. **Library facts come from the library repo**, not from memory:
   `/Users/suryansh.prajapati/Documents/Learning/Project/AppInspect` (its `README.md`
   is the primary reference). When syncing, record the library version/commit in the
   website README's "Last synced" line.
3. Keep the section order and one-job-per-section de-duplication rules defined in
   `README.md`.
4. Use the `<latest-version>` placeholder in dependency snippets — never pin a version.
5. Keep `privacy.html` consistent with actual library behavior and bump its
   "Last updated" date when it changes.
