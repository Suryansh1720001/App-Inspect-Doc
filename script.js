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
