/* ==========================================================================
   AppInspect — documentation navigation
   One nav tree drives: the left sidebar, the sub-section links under the
   page you are on, the "On this page" rail, prev/next, and search.
   Add a page here and it appears everywhere. Nothing is duplicated in HTML.
   ========================================================================== */

(function () {
    "use strict";

    var NAV = [
        {
            title: "Getting started",
            pages: [
                {
                    url: "docs.html",
                    title: "Introduction",
                    blurb: "What AppInspect is, what it replaces, and how the pieces fit together.",
                    topics: "overview what is appinspect android in-app inspector debug library modules"
                },
                {
                    url: "install.html",
                    title: "Install",
                    blurb: "Gradle dependencies per build variant and the OkHttp interceptor.",
                    topics: "gradle maven central dependency debugImplementation releaseImplementation no-op interceptor okhttp retrofit ktor ktor-client-okhttp engine preconfigured http client setup sample app example project clone git demo runnable try it"
                },
                {
                    url: "environments.html",
                    title: "Builds and environments",
                    blurb: "Where it runs, where it refuses to, and how a staging build opts in.",
                    topics: "environments build tier debug staging release production flag_debuggable isDebuggable appinspect_enabled_in_non_debuggable_build resValue matchingFallbacks custom variant flavour uat qa preprod minify r8 proguard shrink resources scenarios"
                },
                {
                    url: "compatibility.html",
                    title: "Compatibility",
                    blurb: "minSdk, AndroidX, and why Compose and Kotlin are not required.",
                    topics: "compatibility requirements minSdk 24 androidx compose not required java only host okhttp retrofit ktor cio engine compileOnly workmanager security-crypto agp kotlin version api level degradation apk size"
                },
                {
                    url: "open-inspector.html",
                    title: "Opening the inspector",
                    blurb: "Shake, launcher shortcut, long press, notification tap, or a direct call.",
                    topics: "shake gesture launcher shortcut long press trigger open separate task recents split screen entry points"
                }
            ]
        },
        {
            title: "Panels",
            pages: [
                {
                    url: "network.html",
                    title: "Network",
                    blurb: "Captured API calls, filters, wire headers, and exports.",
                    topics: "network okhttp requests responses curl har export filters search headers bodies notifications"
                },
                {
                    url: "mocks.html",
                    title: "Mocks",
                    blurb: "Replace a live response with one you define, on the device or in git.",
                    topics: "mock mocks.json rules short circuit override failure simulation delay matching priority adb pull mirror"
                },
                {
                    url: "storage.html",
                    title: "Storage",
                    blurb: "SharedPreferences, DataStore, SQLite and Room.",
                    topics: "storage sharedpreferences encryptedsharedpreferences datastore preferences_pb sqlite room database sql console editing"
                },
                {
                    url: "workmanager.html",
                    title: "WorkManager",
                    blurb: "Every persisted work spec, its state, constraints and payloads.",
                    topics: "workmanager work spec worker periodic expedited constraints backoff stop reason tags unique"
                },
                {
                    url: "crashes.html",
                    title: "Crashes and ANRs",
                    blurb: "Uncaught exceptions, ANRs and native crashes, persisted across restarts.",
                    topics: "crash anr native exit info stack trace uncaught exception crashlytics persistence"
                },
                {
                    url: "runtime.html",
                    title: "Runtime",
                    blurb: "App, device, environment and session metadata in one place.",
                    topics: "runtime app version build type device model os memory locale session metadata"
                },
                {
                    url: "logs.html",
                    title: "Logcat",
                    blurb: "A live, filterable tail of your app's own log output, on the device.",
                    topics: "logcat logs terminal tail level filter tag regex pause follow tail ring buffer read_logs permission redact export stack trace"
                },
                {
                    url: "value-viewer.html",
                    title: "Value viewer",
                    blurb: "The shared full-screen JSON tree used by every panel.",
                    topics: "value viewer json tree collapse expand content search escaped json raw large payload"
                }
            ]
        },
        {
            title: "Configuration",
            pages: [
                {
                    url: "configuration.html",
                    title: "Configuration reference",
                    blurb: "Every lever in AppInspectConfiguration and when to change it.",
                    topics: "configuration appinspectconfiguration updateConfiguration install enablement panels power tools entry points logs bufferSize redaction retention showRawSensitiveValues allowResponseMocking logsEnabled build tiers setEnabled"
                },
                {
                    url: "notifications.html",
                    title: "Network notifications",
                    blurb: "The Android 13+ permission your app has to request itself.",
                    topics: "notifications post_notifications android 13 tiramisu permission runtime grant notification channel"
                }
            ]
        },
        {
            title: "Safety and privacy",
            pages: [
                {
                    url: "security.html",
                    title: "Security model",
                    blurb: "Why release builds are safe, and what debug builds deliberately expose.",
                    topics: "security release safety no-op self disable flag_debuggable hardening exported components telemetry mocking gates"
                },
                {
                    url: "data-handling.html",
                    title: "Data handling",
                    blurb: "What the library writes to a device, how long it keeps it, and what leaves.",
                    topics: "data handling storage retention appinspect_storage.db exports fileprovider backup deletion telemetry play data safety declaration gdpr controller processor vendor review encrypted keystore mirror"
                },
                {
                    url: "qa-checklist.html",
                    title: "QA checklist",
                    blurb: "Handling exports that contain real credentials.",
                    topics: "qa checklist export redaction authorization token rotate credentials bug report evidence backup rules"
                },
                {
                    url: "privacy.html",
                    title: "Privacy policy",
                    blurb: "What this documentation website collects. Nothing personal, no cookies.",
                    topics: "privacy policy website cookies analytics cloudflare google fonts vercel hosting localStorage theme third parties"
                }
            ]
        }
    ];

    /* The one place the feedback address lives. Set CONTACT_EMAIL and both the
       footer link and the per-page feedback line switch to it; leave it empty and
       they fall back to GitHub. */
    var CONTACT_EMAIL = "itssuryanshprajapati@gmail.com";
    var GITHUB_URL = "https://github.com/Suryansh1720001";

    var FLAT = NAV.reduce(function (all, group) {
        return all.concat(
            group.pages.map(function (page) {
                page.group = group.title;
                return page;
            })
        );
    }, []);

    /* ------------------------------------------------------------- helpers */

    function normalise(path) {
        var name = path.split("/").pop().split("?")[0].split("#")[0];
        if (!name) {
            return "index.html";
        }
        return name.indexOf(".") === -1 ? name + ".html" : name;
    }

    function slugify(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-");
    }

    function el(tag, attrs, children) {
        var node = document.createElement(tag);
        Object.keys(attrs || {}).forEach(function (key) {
            if (key === "text") {
                node.textContent = attrs[key];
            } else if (key === "html") {
                node.innerHTML = attrs[key];
            } else {
                node.setAttribute(key, attrs[key]);
            }
        });
        (children || []).forEach(function (child) {
            node.appendChild(child);
        });
        return node;
    }

    var here = normalise(window.location.pathname);
    var article = document.querySelector(".prose");

    /* -------------------------------------------------- headings and anchors */

    var headings = [];

    if (article) {
        article.querySelectorAll("h2, h3").forEach(function (heading) {
            if (!heading.id) {
                heading.id = slugify(heading.textContent);
            }
            heading.appendChild(
                el("a", {
                    class: "heading-anchor",
                    href: "#" + heading.id,
                    "aria-label": "Link to this section",
                    text: "#"
                })
            );
            headings.push(heading);
        });
    }

    /* ------------------------------------------------------------- sidebar */

    var sidebarNav = document.getElementById("docs-nav");

    if (sidebarNav) {
        NAV.forEach(function (group) {
            var list = el("ul", { class: "nav-list" });

            group.pages.forEach(function (page) {
                var isHere = page.url === here;
                var link = el("a", { href: page.url, text: page.title });
                if (isHere) {
                    link.setAttribute("aria-current", "page");
                }

                var item = el("li", {}, [link]);

                if (isHere && headings.length) {
                    var sub = el("ul", { class: "nav-sub" });
                    headings
                        .filter(function (heading) {
                            return heading.tagName === "H2";
                        })
                        .forEach(function (heading) {
                            sub.appendChild(
                                el("li", {}, [
                                    el("a", {
                                        href: "#" + heading.id,
                                        "data-target": heading.id,
                                        text: heading.firstChild ? heading.firstChild.textContent.trim() : heading.id
                                    })
                                ])
                            );
                        });
                    item.appendChild(sub);
                }

                list.appendChild(item);
            });

            sidebarNav.appendChild(
                el("div", { class: "nav-group" }, [
                    el("p", { class: "nav-group-title", text: group.title }),
                    list
                ])
            );
        });
    }

    /* --------------------------------------------------------- on this page */

    var tocTargets = document.querySelectorAll("[data-toc]");

    if (tocTargets.length && headings.length) {
        tocTargets.forEach(function (target) {
            var list = el("ul", { class: "toc-list" });

            headings.forEach(function (heading) {
                var label = heading.firstChild ? heading.firstChild.textContent.trim() : heading.id;
                list.appendChild(
                    el("li", { class: heading.tagName === "H3" ? "toc-h3" : "toc-h2" }, [
                        el("a", { href: "#" + heading.id, "data-target": heading.id, text: label })
                    ])
                );
            });

            target.appendChild(list);
        });
    } else {
        document.querySelectorAll(".docs-toc, .toc-inline").forEach(function (node) {
            node.style.display = "none";
        });
    }

    /* ------------------------------------------------------------ prev/next */

    var pageNav = document.getElementById("page-nav");
    var index = FLAT.findIndex(function (page) {
        return page.url === here;
    });

    if (pageNav && index !== -1) {
        var previous = FLAT[index - 1];
        var next = FLAT[index + 1];

        if (previous) {
            pageNav.appendChild(
                el("a", { href: previous.url, class: "page-nav-prev" }, [
                    el("span", { text: "Previous" }),
                    el("strong", { text: previous.title })
                ])
            );
        }

        if (next) {
            pageNav.appendChild(
                el("a", { href: next.url, class: "page-nav-next" }, [
                    el("span", { text: "Next" }),
                    el("strong", { text: next.title })
                ])
            );
        }
    }

    /* ------------------------------------------------------ contact / feedback */

    var contactHref = CONTACT_EMAIL ? "mailto:" + CONTACT_EMAIL : GITHUB_URL;
    var contactExternal = !CONTACT_EMAIL;

    document.querySelectorAll("[data-contact-slot]").forEach(function (slot) {
        var link = el("a", { href: contactHref, text: CONTACT_EMAIL ? "Send a suggestion" : "Suggestions" });
        if (contactExternal) {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
        }
        slot.appendChild(link);
    });

    document.querySelectorAll("[data-feedback-line]").forEach(function (line) {
        line.appendChild(document.createTextNode("Something wrong, unclear, or missing on this page? "));
        var link = el("a", { href: contactHref, text: CONTACT_EMAIL ? "Tell us" : "Tell us on GitHub" });
        if (contactExternal) {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
        }
        line.appendChild(link);
        line.appendChild(document.createTextNode(" — corrections are welcome."));
    });

    /* ----------------------------------------------------------- scroll spy */

    if (headings.length && "IntersectionObserver" in window) {
        var links = document.querySelectorAll("[data-target]");

        var setActive = function (id) {
            links.forEach(function (link) {
                link.classList.toggle("is-active", link.getAttribute("data-target") === id);
            });
        };

        var visible = new Set();

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        visible.add(entry.target.id);
                    } else {
                        visible.delete(entry.target.id);
                    }
                });

                for (var i = 0; i < headings.length; i += 1) {
                    if (visible.has(headings[i].id)) {
                        setActive(headings[i].id);
                        return;
                    }
                }
            },
            { rootMargin: "-70px 0px -70% 0px", threshold: 0 }
        );

        headings.forEach(function (heading) {
            observer.observe(heading);
        });
    }

    /* --------------------------------------------------------------- search */

    var dialog = document.getElementById("search-dialog");

    if (dialog) {
        var input = dialog.querySelector("input");
        var results = dialog.querySelector(".search-results");
        var empty = dialog.querySelector(".search-empty");
        var cursor = 0;
        var matches = [];

        var render = function () {
            results.innerHTML = "";

            matches.forEach(function (page, position) {
                var item = el("li", position === cursor ? { class: "is-active" } : {}, [
                    el("a", { href: page.url }, [
                        el("span", { class: "search-result-title", text: page.title }),
                        el("span", { class: "search-result-meta", text: page.group + " — " + page.blurb })
                    ])
                ]);
                results.appendChild(item);
            });

            empty.hidden = matches.length > 0;
        };

        var search = function (query) {
            var terms = query.toLowerCase().split(/\s+/).filter(Boolean);

            matches = terms.length
                ? FLAT.filter(function (page) {
                      var haystack = (page.title + " " + page.blurb + " " + page.topics + " " + page.group).toLowerCase();
                      return terms.every(function (term) {
                          return haystack.indexOf(term) !== -1;
                      });
                  })
                : FLAT.slice(0, 6);

            cursor = 0;
            render();
        };

        var open = function () {
            dialog.removeAttribute("hidden");
            input.value = "";
            search("");
            input.focus();
        };

        var close = function () {
            dialog.setAttribute("hidden", "");
        };

        document.querySelectorAll("[data-search-open]").forEach(function (trigger) {
            trigger.addEventListener("click", open);
        });

        dialog.querySelector(".search-scrim").addEventListener("click", close);

        input.addEventListener("input", function () {
            search(input.value);
        });

        input.addEventListener("keydown", function (event) {
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault();
                if (!matches.length) {
                    return;
                }
                cursor = (cursor + (event.key === "ArrowDown" ? 1 : matches.length - 1)) % matches.length;
                render();
            } else if (event.key === "Enter" && matches[cursor]) {
                window.location.href = matches[cursor].url;
            }
        });

        document.addEventListener("keydown", function (event) {
            var isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";

            if (isShortcut) {
                event.preventDefault();
                if (dialog.hasAttribute("hidden")) {
                    open();
                } else {
                    close();
                }
            } else if (event.key === "Escape" && !dialog.hasAttribute("hidden")) {
                close();
            } else if (event.key === "/" && dialog.hasAttribute("hidden")) {
                var tag = document.activeElement && document.activeElement.tagName;
                if (tag !== "INPUT" && tag !== "TEXTAREA") {
                    event.preventDefault();
                    open();
                }
            }
        });
    }
})();
