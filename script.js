/* ==========================================================================
   AppInspect — shared behaviour
   Theme toggle, code highlighting, copy buttons, support modal, mobile drawer.
   The theme is applied pre-paint by a small inline script in each <head>;
   this file only handles the toggle afterwards.
   ========================================================================== */

(function () {
    "use strict";

    var root = document.documentElement;

    /* ---------------------------------------------------------------- theme */

    function systemPrefersDark() {
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    function currentTheme() {
        return root.getAttribute("data-theme") || (systemPrefersDark() ? "dark" : "light");
    }

    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
        button.addEventListener("click", function () {
            var next = currentTheme() === "dark" ? "light" : "dark";
            root.setAttribute("data-theme", next);
            try {
                localStorage.setItem("appinspect-theme", next);
            } catch (error) {
                /* private mode — the choice just will not persist */
            }
        });
    });

    /* ------------------------------------------------------ code highlight */

    var RULES = {
        kotlin: [
            { cls: "comment", re: /\/\/[^\n]*|\/\*[\s\S]*?\*\// },
            { cls: "string", re: /"""[\s\S]*?"""|"(?:[^"\\\n]|\\.)*"/ },
            { cls: "keyword", re: /@[A-Za-z_][\w]*|\b(?:val|var|fun|class|object|interface|data|enum|if|else|when|for|while|return|true|false|null|import|package|private|internal|public|override|is|as|in|by|it|this|super|try|catch|finally|suspend|companion|sealed)\b/ },
            { cls: "number", re: /\b\d[\d_]*(?:\.\d+)?[fFlL]?\b/ }
        ],
        json: [
            { cls: "key", re: /"(?:[^"\\\n]|\\.)*"(?=\s*:)/ },
            { cls: "string", re: /"(?:[^"\\\n]|\\.)*"/ },
            { cls: "keyword", re: /\b(?:true|false|null)\b/ },
            { cls: "number", re: /-?\b\d+(?:\.\d+)?\b/ }
        ],
        bash: [
            { cls: "comment", re: /#[^\n]*/ },
            { cls: "string", re: /"(?:[^"\\\n]|\\.)*"|'(?:[^'\n])*'/ },
            { cls: "keyword", re: /^\s*(?:adb|mkdir|mv|cp|cd|python3|curl|unzip)\b/ },
            { cls: "number", re: /\b\d+\b/ }
        ],
        xml: [
            { cls: "comment", re: /<!--[\s\S]*?-->/ },
            { cls: "string", re: /"(?:[^"\\\n]|\\.)*"/ },
            { cls: "keyword", re: /<\/?[A-Za-z][\w:.-]*|\/?>/ },
            { cls: "key", re: /\b[a-zA-Z:]+(?==)/ }
        ]
    };

    RULES.gradle = RULES.kotlin;

    function escapeHtml(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    function highlight(text, lang) {
        var rules = RULES[lang];
        if (!rules) {
            return escapeHtml(text);
        }

        var combined = new RegExp(
            rules
                .map(function (rule) {
                    return "(" + rule.re.source + ")";
                })
                .join("|"),
            "gm"
        );

        var out = "";
        var last = 0;

        text.replace(combined, function (match) {
            var args = Array.prototype.slice.call(arguments);
            var offset = args[args.length - 2];
            var groups = args.slice(1, rules.length + 1);
            var index = 0;

            for (var i = 0; i < groups.length; i += 1) {
                if (groups[i] !== undefined) {
                    index = i;
                    break;
                }
            }

            out += escapeHtml(text.slice(last, offset));
            out += '<span class="tok-' + rules[index].cls + '">' + escapeHtml(match) + "</span>";
            last = offset + match.length;
            return match;
        });

        out += escapeHtml(text.slice(last));
        return out;
    }

    document.querySelectorAll("pre code[data-lang]").forEach(function (block) {
        block.innerHTML = highlight(block.textContent, block.getAttribute("data-lang"));
    });

    /* ---------------------------------------------------------- copy buttons */

    document.querySelectorAll(".copy-button").forEach(function (button) {
        button.addEventListener("click", function () {
            var snippet = button.closest(".snippet");
            var code = snippet && snippet.querySelector("code");
            if (!code) {
                return;
            }

            var reset = function (label) {
                window.setTimeout(function () {
                    button.textContent = label;
                    button.classList.remove("is-copied");
                }, 1600);
            };

            navigator.clipboard
                .writeText(code.textContent.replace(/\s+$/, ""))
                .then(function () {
                    button.textContent = "Copied";
                    button.classList.add("is-copied");
                    reset("Copy");
                })
                .catch(function () {
                    button.textContent = "Press ⌘C";
                    reset("Copy");
                });
        });
    });

    /* ---------------------------------------------------------- support modal */

    var modal = document.getElementById("support-modal");

    if (modal) {
        var modalTier = document.getElementById("modal-tier");
        var modalIcon = document.getElementById("modal-icon");
        var lastFocused = null;

        var closeModal = function () {
            modal.setAttribute("hidden", "");
            document.body.style.overflow = "";
            if (lastFocused) {
                lastFocused.focus();
                lastFocused = null;
            }
        };

        document.querySelectorAll(".tier-card").forEach(function (card) {
            card.addEventListener("click", function () {
                modalTier.textContent = card.getAttribute("data-tier");
                modalIcon.textContent = card.getAttribute("data-icon");
                lastFocused = card;
                modal.removeAttribute("hidden");
                document.body.style.overflow = "hidden";
                modal.querySelector(".modal-close").focus();
            });
        });

        modal.querySelector(".modal-scrim").addEventListener("click", closeModal);
        modal.querySelector(".modal-close").addEventListener("click", closeModal);

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && !modal.hasAttribute("hidden")) {
                closeModal();
            }
        });
    }

    /* ------------------------------------------------- interactive mockup */

    var mock = document.querySelector("[data-mock]");

    if (mock) {
        var mockTabs = Array.prototype.slice.call(mock.querySelectorAll("[data-mock-tab]"));
        var mockViews = mock.querySelectorAll("[data-mock-view]");
        var mockTitle = mock.querySelector("[data-mock-title]");
        var mockCaption = document.querySelector("[data-mock-caption]");

        var showPanel = function (tab) {
            var name = tab.getAttribute("data-mock-tab");

            mockTabs.forEach(function (other) {
                var isCurrent = other === tab;
                other.classList.toggle("is-on", isCurrent);
                if (other.hasAttribute("role")) {
                    other.setAttribute("aria-selected", String(isCurrent));
                }
            });

            mockViews.forEach(function (view) {
                view.classList.toggle("is-on", view.getAttribute("data-mock-view") === name);
            });

            /* The bar title follows the panel, exactly as it does in the app. */
            var label = tab.getAttribute("data-mock-label");
            mockTitle.textContent = label;

            if (mockCaption) {
                mockCaption.textContent = tab.getAttribute("data-mock-note") + " ";
                var link = document.createElement("a");
                link.href = tab.getAttribute("data-mock-doc");
                link.textContent = label + " docs →";
                mockCaption.appendChild(link);
            }
        };

        mockTabs.forEach(function (tab) {
            tab.addEventListener("click", function () {
                showPanel(tab);
            });
        });

        /* Left/right arrows move along the bottom bar, as swiping does in the app. */
        var bottomTabs = mockTabs.filter(function (tab) {
            return tab.getAttribute("role") === "tab";
        });

        bottomTabs.forEach(function (tab, index) {
            tab.addEventListener("keydown", function (event) {
                var step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
                if (!step) {
                    return;
                }
                event.preventDefault();
                var next = bottomTabs[(index + step + bottomTabs.length) % bottomTabs.length];
                showPanel(next);
                next.focus();
            });
        });
    }

    /* ---------------------------------------------------- live capture feed */

    /* The Network list cycles so the hero shows what the panel actually does:
       calls arriving at the top, older ones pushed down. Deliberately cheap —
       one card is moved in the DOM per tick and only the wrapper's transform is
       animated, so nothing reflows mid-animation.

       It stops running whenever it would be wasted work: reduced motion, the
       phone scrolled out of view, another panel selected, or a hidden tab. */

    var feed = document.querySelector("[data-feed]");

    if (feed && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        var TICK_MS = 1000;
        var timer = null;
        var onScreen = false;

        /* Cards recycle, so a re-used row would carry a stale time and the list
           would read newest-last. Stamp each arrival from a rolling clock that
           starts where the markup's newest card left off. */
        var clock = 11 * 3600 + 55 * 60 + 13;

        var pad = function (n) {
            return n < 10 ? "0" + n : String(n);
        };

        var nextStamp = function () {
            clock += 1 + Math.floor(Math.random() * 4);
            return pad(Math.floor(clock / 3600) % 24) +
                ":" + pad(Math.floor(clock / 60) % 60) +
                ":" + pad(clock % 60);
        };

        var tick = function () {
            var oldest = feed.lastElementChild;
            if (!oldest) {
                return;
            }

            var shift = oldest.offsetHeight + 6; /* card height + the 6px gap */
            var stamp = oldest.querySelector(".phone-tag");
            if (stamp) {
                stamp.textContent = nextStamp();
            }

            feed.insertBefore(oldest, feed.firstElementChild);

            /* Jump the list up by exactly one card, then ease it back to rest:
               the new row appears to slide in from behind the section header. */
            feed.style.transition = "none";
            feed.style.transform = "translateY(" + -shift + "px)";
            void feed.offsetHeight; /* flush, so the transition below animates */
            feed.style.transition = "";
            feed.style.transform = "translateY(0)";

            oldest.classList.add("is-new");
            window.setTimeout(function () {
                oldest.classList.remove("is-new");
            }, 450);
        };

        var sync = function () {
            var view = feed.closest("[data-mock-view]");
            var live = onScreen &&
                document.visibilityState === "visible" &&
                view && view.classList.contains("is-on");

            if (live && !timer) {
                timer = window.setInterval(tick, TICK_MS);
            } else if (!live && timer) {
                window.clearInterval(timer);
                timer = null;
            }
        };

        if ("IntersectionObserver" in window) {
            new IntersectionObserver(function (entries) {
                onScreen = entries[0].isIntersecting;
                sync();
            }, { threshold: 0.25 }).observe(feed.closest(".phone"));
        } else {
            onScreen = true;
        }

        document.addEventListener("visibilitychange", sync);
        document.querySelectorAll("[data-mock-tab]").forEach(function (tab) {
            tab.addEventListener("click", function () {
                window.setTimeout(sync, 0);
            });
        });

        sync();
    }

    /* --------------------------------------------------------- mobile drawer */

    var drawerToggle = document.querySelector(".topbar-menu");
    var sidebar = document.getElementById("docs-sidebar");
    var scrim = document.getElementById("sidebar-scrim");

    if (drawerToggle && sidebar && scrim) {
        var setDrawer = function (open) {
            sidebar.classList.toggle("is-open", open);
            drawerToggle.setAttribute("aria-expanded", String(open));
            if (open) {
                scrim.removeAttribute("hidden");
            } else {
                scrim.setAttribute("hidden", "");
            }
        };

        drawerToggle.addEventListener("click", function () {
            setDrawer(!sidebar.classList.contains("is-open"));
        });

        scrim.addEventListener("click", function () {
            setDrawer(false);
        });

        sidebar.addEventListener("click", function (event) {
            if (event.target.closest("a")) {
                setDrawer(false);
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                setDrawer(false);
            }
        });
    }
})();
