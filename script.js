const copyButtons = document.querySelectorAll(".copy-button");
const siteHeader = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const siteNavLinks = document.querySelectorAll(".site-nav a");

// Support tier modal
const supportModal = document.getElementById("support-modal");
const modalBackdrop = supportModal && supportModal.querySelector(".modal-backdrop");
const modalClose = supportModal && supportModal.querySelector(".modal-close");
const modalTierIcon = document.getElementById("modal-tier-icon");
const modalTierName = document.getElementById("modal-tier-name");
const modalTierAmount = document.getElementById("modal-tier-amount");
const tierCards = document.querySelectorAll(".tier-card");

let modalLastFocused = null;

function openSupportModal(tier, amount, icon, triggerEl) {
    modalTierIcon.textContent = icon;
    modalTierName.textContent = tier;
    modalTierAmount.textContent = "₹" + amount;
    modalLastFocused = triggerEl;
    supportModal.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
    if (modalClose) {
        modalClose.focus();
    }
}

function closeSupportModal() {
    supportModal.setAttribute("hidden", "");
    document.body.style.overflow = "";
    if (modalLastFocused) {
        modalLastFocused.focus();
        modalLastFocused = null;
    }
}

if (supportModal) {
    tierCards.forEach((card) => {
        card.addEventListener("click", () => {
            openSupportModal(
                card.getAttribute("data-tier"),
                card.getAttribute("data-amount"),
                card.getAttribute("data-icon"),
                card
            );
        });
    });

    if (modalBackdrop) {
        modalBackdrop.addEventListener("click", closeSupportModal);
    }

    if (modalClose) {
        modalClose.addEventListener("click", closeSupportModal);
    }
}

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
            if (supportModal && !supportModal.hasAttribute("hidden")) {
                closeSupportModal();
            }
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
