/* =========================================================
   ONKAR KHILARI PORTFOLIO
   MAIN JAVASCRIPT
   ========================================================= */

"use strict";


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();

    initSmoothNavigation();

    initScrollProgress();

    initHeaderScroll();

    initMobileViewport();

    initServiceAccordion();

    initBackToTop();

    initContactForm();

    initSkillsFilter();

    preventHorizontalOverflow();

});


/* =========================================================
   ELEMENT HELPERS
   ========================================================= */

/* =========================================================
   MOBILE MENU
   ========================================================= */

function initMobileMenu() {

    const button = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (!button || !mobileMenu) {

        console.warn(
            "Mobile menu elements were not found."
        );

        return;

    }


    /*
     * Make sure initial state is correct.
     */

    button.setAttribute(
        "aria-expanded",
        "false"
    );

    button.setAttribute(
        "aria-label",
        "Open navigation menu"
    );


    /*
     * The menu is controlled by the .open class.
     */

    mobileMenu.classList.remove("open");


    /*
     * OPEN / CLOSE
     */

    button.addEventListener(
        "click",
        (event) => {

            event.preventDefault();
            event.stopPropagation();

            const isOpen =
                mobileMenu.classList.contains("open");

            if (isOpen) {

                closeMobileMenu();

            } else {

                openMobileMenu();

            }

        }
    );


    /*
     * MOBILE LINKS
     */

    const links = mobileMenu.querySelectorAll(".mobile-link");


    links.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                closeMobileMenu();

            }
        );

    });


    /*
     * CLOSE ON RESIZE TO DESKTOP
     */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 767) {

                closeMobileMenu();

            }

        },
        {
            passive: true
        }
    );


    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeMobileMenu();

            }

        }
    );


    document.addEventListener(
        "click",
        (event) => {

            if (
                !mobileMenu.classList.contains("open") ||
                mobileMenu.contains(event.target) ||
                button.contains(event.target)
            ) {

                return;

            }

            closeMobileMenu();

        }
    );

}


/* =========================================================
   OPEN MOBILE MENU
   ========================================================= */

function openMobileMenu() {

    const button = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (!button || !mobileMenu) {

        return;

    }


    mobileMenu.classList.add("open");

    button.classList.add("active");

    button.setAttribute(
        "aria-expanded",
        "true"
    );

    button.setAttribute(
        "aria-label",
        "Close navigation menu"
    );

    document.body.classList.add(
        "menu-open"
    );

}


/* =========================================================
   CLOSE MOBILE MENU
   ========================================================= */

function closeMobileMenu() {

    const button = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenu) {

        mobileMenu.classList.remove("open");

    }

    if (button) {

        button.classList.remove("active");

        button.setAttribute(
            "aria-expanded",
            "false"
        );

        button.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    }

    document.body.classList.remove(
        "menu-open"
    );

}


/* =========================================================
   SMOOTH NAVIGATION
   ========================================================= */

function initSmoothNavigation() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                let target = null;


                try {

                    target =
                        document.querySelector(
                            targetId
                        );

                } catch (error) {

                    return;

                }


                if (!target) {

                    return;

                }


                event.preventDefault();


                /*
                 * Close mobile menu.
                 */

                closeMobileMenu();


                /*
                 * Header height.
                 */

                const header =
                    document.getElementById(
                        "site-header"
                    );


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                /*
                 * Calculate position.
                 */

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;


                window.scrollTo({

                    top: Math.max(
                        targetPosition,
                        0
                    ),

                    behavior: "smooth"

                });

            }
        );

    });

}


/* =========================================================
   SCROLL PROGRESS
   ========================================================= */

function initScrollProgress() {

    const progress =
        document.getElementById(
            "scroll-progress"
        );


    if (!progress) {

        return;

    }


    const updateProgress = () => {

        const scrollTop =
            window.scrollY ||
            window.pageYOffset;


        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        if (documentHeight <= 0) {

            progress.style.width =
                "0%";

            return;

        }


        const percentage =
            (scrollTop /
                documentHeight) *
            100;


        progress.style.width =
            `${Math.min(
                Math.max(
                    percentage,
                    0
                ),
                100
            )}%`;

    };


    window.addEventListener(
        "scroll",
        updateProgress,
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        updateProgress,
        {
            passive: true
        }
    );


    updateProgress();

}


/* =========================================================
   HEADER SCROLL EFFECT
   ========================================================= */

function initHeaderScroll() {

    const header =
        document.getElementById(
            "site-header"
        );


    if (!header) {

        return;

    }


    const updateHeader = () => {

        if (window.scrollY > 20) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    };


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    updateHeader();

}


/* =========================================================
   MOBILE VIEWPORT
   ========================================================= */

function initMobileViewport() {

    const setViewportHeight = () => {

        document.documentElement.style.setProperty(
            "--viewport-height",
            `${window.innerHeight}px`
        );

    };


    setViewportHeight();


    window.addEventListener(
        "resize",
        setViewportHeight,
        {
            passive: true
        }
    );

}


/* =========================================================
   SERVICES ACCORDION
   ========================================================= */

/*
 * Your HTML uses:
 *
 * onclick="toggleService(1)"
 *
 * id="service-body-1"
 *
 * id="arrow-1"
 *
 * Therefore toggleService MUST be global.
 */

let openService = null;


window.toggleService = function (id) {

    const body =
        document.getElementById(
            "service-body-" + id
        );


    /*
     * Support both arrow styles.
     */

    const arrow =
        document.getElementById(
            "arrow-" + id
        ) ||
        document.querySelector(
            ".service-arrow-" + id
        );


    if (!body) {

        console.warn(
            "Service body not found:",
            id
        );

        return;

    }


    const isOpen =
        body.classList.contains("open") ||
        !body.classList.contains("hidden");


    /*
     * Close every other service.
     */

    document.querySelectorAll(
        '[id^="service-body-"]'
    ).forEach((otherBody) => {

        if (
            otherBody !== body
        ) {

            otherBody.classList.add(
                "hidden"
            );

            otherBody.classList.remove(
                "open"
            );

            otherBody.style.maxHeight =
                "";

        }

    });


    /*
     * Reset all arrows.
     */

    document.querySelectorAll(
        ".service-arrow, [class*='service-arrow-'], [id^='arrow-']"
    ).forEach((otherArrow) => {

        if (
            otherArrow !== arrow
        ) {

            otherArrow.style.transform =
                "";

        }

    });


    /*
     * CLOSE
     */

    if (isOpen) {

        body.classList.add(
            "hidden"
        );

        body.classList.remove(
            "open"
        );

        body.style.maxHeight =
            "";

        if (arrow) {

            arrow.style.transform =
                "";

        }

        openService = null;

        return;

    }


    /*
     * OPEN
     */

    body.classList.remove(
        "hidden"
    );

    body.classList.add(
        "open"
    );

    body.style.maxHeight =
        body.scrollHeight + "px";


    if (arrow) {

        arrow.style.transform =
            "rotate(180deg)";

    }


    openService = id;

};


/* =========================================================
   SERVICE ACCORDION INITIALIZATION
   ========================================================= */

function initServiceAccordion() {

    /*
     * Your service cards already use:
     *
     * onclick="toggleService(ID)"
     *
     * So we do NOT attach another click
     * listener to the entire card.
     *
     * This prevents double-toggle problems.
     */


    const serviceBodies =
        document.querySelectorAll(
            '[id^="service-body-"]'
        );


    serviceBodies.forEach((body) => {

        /*
         * Start closed if HTML has
         * hidden class.
         */

        if (
            body.classList.contains(
                "hidden"
            )
        ) {

            body.classList.remove(
                "open"
            );

        }

    });

}


/* =========================================================
   BACK TO TOP
   ========================================================= */

function initBackToTop() {

    const buttons =
        document.querySelectorAll(
            ".back-to-top, #back-to-top"
        );


    if (!buttons.length) {

        return;

    }


    buttons.forEach((button) => {

        button.addEventListener(
            "click",
            (event) => {

                event.preventDefault();


                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    });

}


/* =========================================================
   SKILLS FILTER
   ========================================================= */

window.filterSkills = function (
    category
) {

    const buttons =
        document.querySelectorAll(
            ".skill-tab"
        );


    buttons.forEach((button) => {

        const isActive =
            button.dataset.category ===
            category;


        button.classList.toggle(
            "bg-black",
            isActive
        );

        button.classList.toggle(
            "text-white",
            isActive
        );

        button.classList.toggle(
            "font-bold",
            isActive
        );

        button.classList.toggle(
            "border-black",
            isActive
        );


        button.classList.toggle(
            "bg-white",
            !isActive
        );

        button.classList.toggle(
            "text-[#4A4944]",
            !isActive
        );

        button.classList.toggle(
            "border-[#E4DFD5]",
            !isActive
        );

    });


    const items =
        document.querySelectorAll(
            ".skill-item"
        );


    items.forEach((item) => {

        if (
            category === "all" ||
            item.dataset.category ===
                category
        ) {

            item.classList.remove(
                "hidden"
            );

        } else {

            item.classList.add(
                "hidden"
            );

        }

    });

};


/* =========================================================
   CONTACT FORM
   ========================================================= */

let contactSubmitting = false;

function initContactForm() {

    const form =
        document.getElementById(
            "contact-form"
        );


    if (!form) {

        return;

    }


    form.addEventListener(
        "submit",
        handleContactSubmit
    );

}


window.handleContactSubmit =
    async function (event) {

        event.preventDefault();

        const form =
            event.currentTarget ||
            document.getElementById(
                "contact-form"
            );

        if (
            !form ||
            contactSubmitting
        ) {

            return;

        }

        if (!form.checkValidity()) {

            form.reportValidity();

            return;

        }

        const button =
            document.getElementById(
                "submit-btn"
            );

        const buttonText =
            document.getElementById(
                "btn-text"
            );

        const feedback =
            document.getElementById(
                "form-feedback"
            );


        if (!button) {

            return;

        }

        if (buttonText) {

            buttonText.textContent =
                "Sending...";

        }

        contactSubmitting = true;

        button.disabled = true;


        button.classList.add(
            "opacity-75"
        );

        if (feedback) {

            feedback.classList.add(
                "hidden"
            );

            feedback.textContent =
                "";

        }

        const value = (id) => {

            const field =
                document.getElementById(id);

            return field
                ? field.value.trim()
                : "";

        };

        const controller =
            new AbortController();

        const timeout =
            window.setTimeout(
                () => controller.abort(),
                15000
            );

        try {

            const response =
                await fetch(
                    "/api/contact",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json",
                            "Accept":
                                "application/json"
                        },
                        body: JSON.stringify({
                            firstName:
                                value("first-name"),
                            lastName:
                                value("last-name"),
                            email:
                                value("email"),
                            subject:
                                value("subject"),
                            message:
                                value("message")
                        }),
                        signal:
                            controller.signal
                    }
                );

            let result = {};

            try {

                result =
                    await response.json();

            } catch (error) {

                result = {};

            }

            if (
                !response.ok ||
                result.success !== true
            ) {

                throw new Error(
                    result.error ||
                    "Unable to send your message right now."
                );

            }

            if (feedback) {

                feedback.textContent =
                    "Message sent successfully. I'll get back to you soon.";

                feedback.classList.remove(
                    "hidden"
                );

            }

            form.reset();

        } catch (error) {

            if (feedback) {

                feedback.textContent =
                    "Unable to send your message right now. Please try again or contact me directly.";

                feedback.classList.remove(
                    "hidden"
                );

            }

            console.error(
                "Contact form submission failed:",
                error
            );

        } finally {

            window.clearTimeout(
                timeout
            );

            contactSubmitting =
                false;

            button.disabled =
                false;

            button.classList.remove(
                "opacity-75"
            );

            if (buttonText) {

                buttonText.textContent =
                    "Submit Message";

            }

        }

    };


/* =========================================================
   PREVENT HORIZONTAL OVERFLOW
   ========================================================= */

function preventHorizontalOverflow() {

    if (
        window.innerWidth <= 767
    ) {

        document.documentElement.style.overflowX =
            "hidden";

        document.body.style.overflowX =
            "hidden";

    } else {

        document.documentElement.style.overflowX =
            "";

        document.body.style.overflowX =
            "";

    }

}


window.addEventListener(
    "resize",
    preventHorizontalOverflow,
    {
        passive: true
    }
);