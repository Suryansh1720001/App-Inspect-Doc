const copyButtons = document.querySelectorAll(".copy-button");
const siteHeader = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const siteNavLinks = document.querySelectorAll(".site-nav a");

copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
        const targetId = button.getAttribute("data-copy-target");
        const target = document.getElementById(targetId);

        if (!target) {
            return;
        }

        try {
            await navigator.clipboard.writeText(target.textContent.trim());
            const originalText = button.textContent;
            button.textContent = "Copied";
            button.classList.add("copied");

            window.setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove("copied");
            }, 1500);
        } catch (error) {
            button.textContent = "Copy failed";
            window.setTimeout(() => {
                button.textContent = "Copy";
            }, 1500);
        }
    });
});

const revealSections = document.querySelectorAll(".reveal");

if (siteHeader && navToggle) {
    navToggle.addEventListener("click", () => {
        const isOpen = siteHeader.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
        navToggle.textContent = isOpen ? "Close" : "Menu";
    });

    siteNavLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 820) {
                siteHeader.classList.remove("is-open");
                navToggle.setAttribute("aria-expanded", "false");
                navToggle.textContent = "Menu";
            }
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 820) {
            siteHeader.classList.remove("is-open");
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.textContent = "Menu";
        }
    });

    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            siteHeader.classList.remove("is-open");
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.textContent = "Menu";
        }
    });
}

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.16,
        },
    );

    revealSections.forEach((section) => {
        observer.observe(section);
    });
} else {
    revealSections.forEach((section) => {
        section.classList.add("is-visible");
    });
}
