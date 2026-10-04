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

    initProjectCards();

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

function initServiceAccordion() {

    const cards = document.querySelectorAll(".service-card");

    cards.forEach((card) => {
        const header = card.querySelector(".service-header");
        const body = card.querySelector(".service-body");

        if (!header || !body) {
            return;
        }

        const setExpanded = (expanded) => {
            card.classList.toggle("active", expanded);
            card.setAttribute("aria-expanded", String(expanded));
            header.setAttribute("aria-expanded", String(expanded));
        };

        setExpanded(false);

        const toggle = () => {
            const expanded =
                header.getAttribute("aria-expanded") === "true";

            cards.forEach((otherCard) => {
                if (otherCard !== card) {
                    const otherHeader =
                        otherCard.querySelector(".service-header");

                    if (otherHeader) {
                        otherCard.classList.remove("active");
                        otherCard.setAttribute("aria-expanded", "false");
                        otherHeader.setAttribute("aria-expanded", "false");
                    }
                }
            });

            setExpanded(!expanded);
        };

        header.addEventListener("click", toggle);
        header.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggle();
            }
        });
    });

}


/* =========================================================
   PROJECT CASE STUDY MODALS
   ========================================================= */

const projectCaseStudies = {
    "1": {
        number: "01",
        category: "AI · COMPUTER VISION · 3D RECONSTRUCTION",
        name: "VisionTwin AI",
        subtitle: "AI-Powered Live 3D Room Reconstruction",
        overview: "VisionTwin AI is a real-time computer-vision system for capturing and reconstructing an indoor environment. A smartphone camera connects to a laptop over WiFi so live video can be processed, analysed, and visualised as an interactive 3D scene.",
        projectOverview: "The project was created to explore an accessible workflow for turning ordinary camera footage into useful spatial information. It is useful for room inspection, prototyping, spatial understanding, and computer-vision experimentation because the capture device and processing interface remain separate.",
        problem: "The engineering challenge is to move a live camera stream reliably while preserving enough image quality and timing for detection, visual tracking, and reconstruction. The system must also present complex 3D output without hiding the state of the processing pipeline from the user.",
        solution: "The smartphone publishes the camera stream through WebRTC to a FastAPI service. Frames are processed with OpenCV, YOLO provides object detection, ORB-SLAM3 estimates camera motion and scene structure, and Open3D supports reconstruction. A React and Three.js interface presents the resulting spatial view and processing feedback.",
        features: ["Live smartphone camera streaming", "AI-based object detection", "Visual tracking and SLAM", "3D reconstruction pipeline", "Interactive Three.js visualisation", "API-based camera-to-laptop communication"],
        stack: [["Frontend", "React, Three.js"], ["Backend", "FastAPI"], ["AI / ML", "OpenCV, YOLO, ORB-SLAM3"], ["3D / Processing", "Open3D, WebRTC"]],
        architecture: ["Smartphone Camera", "WebRTC Stream", "FastAPI Backend", "OpenCV Frame Processing", "YOLO Detection", "ORB-SLAM3 Tracking", "Open3D Reconstruction", "Three.js Visualisation"],
        workflow: ["The user starts the laptop application and connects a smartphone camera over WiFi.", "WebRTC transports the live stream to the processing service.", "Frames are decoded and prepared for computer-vision processing.", "YOLO detects relevant objects while ORB-SLAM3 tracks camera motion and scene features.", "Open3D supports the reconstruction and geometry workflow.", "The React and Three.js interface displays the interactive result."],
        challenges: "Maintaining a useful real-time flow across a wireless camera connection, coordinating several computer-vision stages, and keeping 3D rendering responsive are the main engineering concerns. Separating capture, processing, and visualisation responsibilities keeps the pipeline easier to inspect and extend.",
        testing: "The workflow is validated through camera-stream checks, frame-processing checks, detection and tracking inspection, reconstruction review, and browser validation of the visualisation interface.",
        result: "The completed system provides a connected capture-to-visualisation workflow for live environmental reconstruction and demonstrates how WebRTC, AI detection, SLAM, and browser-based 3D can work together.",
        role: "Designed and implemented the capture workflow, processing integration, visualisation experience, and the interfaces connecting the camera, backend, and 3D output.",
        learnings: ["Real-time computer-vision pipeline design", "WebRTC and API integration", "SLAM and reconstruction workflows", "3D rendering in the browser", "Balancing processing quality with responsiveness"]
    },
    "2": {
        number: "02",
        category: "E-COMMERCE · FULL STACK · PAYMENTS",
        name: "THE DYNASTY",
        subtitle: "Production-Ready Silver Jewelry E-Commerce Platform",
        overview: "THE DYNASTY is a full-stack silver jewelry commerce platform covering product discovery, customer accounts, checkout, payment processing, order tracking, and administration. It brings the customer and operational workflows into one web application.",
        projectOverview: "The platform was created to support the complete shopping journey rather than only a product catalogue. Customers can browse products, manage carts and wishlists, authenticate with sessions, complete Razorpay checkout, and follow orders, while administrators manage products, categories, and order operations.",
        problem: "An e-commerce system must keep product, cart, account, payment, and order state consistent across many requests and user journeys. It also needs secure authentication, controlled administration, media handling, and clear failure behaviour around payment and order updates.",
        solution: "An Express application exposes the commerce workflows and renders the customer interface with EJS, HTML, CSS, and JavaScript. MySQL stores application data, Passport.js and sessions manage authentication, Multer handles uploads, and Razorpay connects checkout to payment processing. Separate customer and admin flows keep product and order management practical.",
        features: ["Product discovery and detail pages", "Cart and wishlist workflows", "Session-based authentication", "Razorpay checkout integration", "Order tracking", "Admin product and category management"],
        stack: [["Frontend", "EJS, HTML, CSS, JavaScript"], ["Backend", "Node.js, Express.js"], ["Database", "MySQL"], ["Authentication / Payments", "Passport.js, Sessions, Razorpay"], ["Uploads", "Multer"]],
        architecture: ["Customer or Admin Browser", "EJS / HTML Interface", "Express.js Routes", "Passport.js Session Authentication", "Commerce Services", "MySQL Database", "Razorpay Payment Gateway"],
        workflow: ["A customer browses products and opens a product detail page.", "Products can be added to a cart or wishlist while session state is maintained.", "The authenticated customer submits checkout details and starts Razorpay payment.", "The server validates the transaction and records the order in MySQL.", "Customers review order status while administrators manage catalogue and order data.", "Uploaded product media and category changes are reflected in the relevant views."],
        challenges: "The key engineering work is coordinating session state, cart and order consistency, payment callbacks, media uploads, and admin permissions. The application keeps those responsibilities behind server routes and database operations so the browser does not become the source of truth.",
        testing: "The project testing workflow uses Playwright for browser journeys, Postman for API checks, OWASP ZAP for security-oriented inspection, and k6 for performance testing. These tools cover customer flows, API behaviour, common web security concerns, and load-oriented validation.",
        result: "The result is a complete silver jewelry shopping workflow with customer-facing commerce features and an admin surface for maintaining the catalogue and orders.",
        role: "Implemented the full-stack application structure, commerce flows, authentication, payment integration, data handling, administration, and the testing workflow.",
        learnings: ["Commerce data consistency", "Session-based authentication", "Payment gateway integration", "API and browser testing", "Security and performance validation"]
    },
    "3": {
        number: "03",
        category: "NASA SPACE APPS · ENVIRONMENTAL MONITORING · DATA VISUALISATION",
        name: "BloomWatch",
        subtitle: "Satellite-Powered Vegetation and Environmental Monitoring",
        overview: "BloomWatch is a NASA Space Apps Challenge 2025 project for exploring vegetation and environmental change through satellite imagery and map-based analysis. It combines Google Earth Engine data workflows with an interactive interface for turning Earth-observation data into understandable insights.",
        projectOverview: "The project helps users inspect environmental conditions over a selected area instead of treating satellite imagery as an isolated image. It is useful for environmental exploration, vegetation monitoring, and communicating changes through maps, time-aware data, and readable analysis views.",
        problem: "Earth-observation datasets are powerful but difficult to interpret without a workflow that selects relevant imagery, processes it consistently, and presents the result geographically. Users need an interface that connects satellite observations to an area of interest and an understandable monitoring view.",
        solution: "BloomWatch uses Google Earth Engine to work with NASA MODIS and VIIRS data together with Landsat imagery. The application prepares the selected observations, exposes them through a map-based interface, and presents vegetation or environmental indicators so users can compare and interpret the available data. MySQL is used for the current database implementation.",
        features: ["Map-based satellite visualisation", "Vegetation and environmental monitoring", "Google Earth Engine data workflow", "NASA MODIS and VIIRS datasets", "Landsat imagery support", "Interactive area-focused analysis"],
        stack: [["Frontend", "Map-based web interface"], ["Earth Observation", "Google Earth Engine, NASA MODIS, VIIRS, Landsat"], ["Database", "MySQL"], ["Focus", "Environmental analysis and visualisation"]],
        architecture: ["User Selects Area", "Map Interface", "Application Data Layer", "Google Earth Engine", "MODIS / VIIRS / Landsat Data", "Processed Environmental Indicators", "Interactive Map Insights"],
        workflow: ["The user selects a location or area in the map interface.", "The application requests the relevant Earth-observation workflow.", "Google Earth Engine prepares imagery and derived observations from the selected datasets.", "Vegetation or environmental indicators are organised for the selected area.", "The map renders the imagery and analysis layers.", "The user compares the output and uses it to inspect environmental conditions."],
        challenges: "The important engineering concerns are working with heterogeneous satellite sources, keeping map interactions understandable, and separating data preparation from presentation. The workflow keeps Earth-observation processing behind the application interface while giving users a clear geographic context.",
        testing: "Validation focuses on map interaction, area selection, data-layer rendering, dataset handling, and checking that the displayed analysis corresponds to the selected location and available imagery.",
        result: "BloomWatch provides an accessible environmental-monitoring workflow that connects satellite data processing with interactive geographic exploration.",
        role: "Designed and implemented the data exploration workflow, map-based interaction, environmental visualisation, database integration, and the project presentation for the NASA Space Apps context.",
        learnings: ["Earth-observation data workflows", "Map-based interaction design", "Satellite imagery interpretation", "Environmental data visualisation", "Working with Google Earth Engine"]
    },
    "4": {
        number: "04",
        category: "AI · OPTIMIZATION · AUTOMATION",
        name: "Schedulo",
        subtitle: "Auto College Timetable Generator",
        overview: "Schedulo generates college timetables from structured academic inputs while respecting shift, room, faculty, and scheduling constraints. It combines spreadsheet parsing, a constraint solver, validation, and automatic repair into one timetable workflow.",
        projectOverview: "The project was created to replace fragile manual timetable iteration with a repeatable process for colleges. It is useful for administrators and academic coordinators who need to turn course, faculty, and availability data into a schedule that can be reviewed and corrected systematically.",
        problem: "College timetables contain competing constraints: classes cannot overlap for the same faculty or group, shift hours must be respected, and available periods must be used effectively. Manual changes can introduce new conflicts, so the system needs both optimisation and independent validation.",
        solution: "Schedulo reads timetable data from Excel files using pandas and openpyxl, models the requirements with OR-Tools CP-SAT, and generates a candidate schedule for the configured morning or afternoon shift. A validation stage checks the generated result and an automatic repair path addresses recoverable issues before the timetable is presented.",
        features: ["Excel timetable and college-data parsing", "Morning shift: 8 AM–3 PM", "Afternoon shift: 10 AM–5 PM", "OR-Tools CP-SAT constraint modelling", "Conflict validation", "Automatic schedule repair"],
        stack: [["Backend", "FastAPI / Flask components"], ["Database", "MySQL, SQLAlchemy"], ["Data Processing", "pandas, openpyxl"], ["Optimisation", "OR-Tools CP-SAT"]],
        architecture: ["Excel / College Data", "pandas and openpyxl Parser", "FastAPI / Flask API", "SQLAlchemy and MySQL", "CP-SAT Constraint Model", "Validation and Auto-Repair", "Generated Timetable"],
        workflow: ["The user provides college, course, faculty, and timetable inputs.", "Excel files are parsed into structured records.", "The API prepares shift windows and scheduling constraints.", "OR-Tools CP-SAT searches for a timetable that satisfies the model.", "The result is validated for conflicts and coverage.", "Recoverable issues are repaired before the final timetable is returned."],
        challenges: "The difficult part is translating real scheduling rules into constraints that are complete without becoming unnecessarily rigid. The system separates parsing, modelling, solving, and validation so that a generated schedule can be inspected and corrected rather than accepted blindly.",
        testing: "Validation includes Excel parsing checks, constraint-model checks, schedule conflict detection, shift-window validation, and end-to-end generation checks. The documented project results include 95%+ coverage, 0 conflicts, and generation under 10 seconds.",
        result: "Schedulo provides an automated timetable workflow with documented results of 95%+ coverage, 0 conflicts, and generation under 10 seconds.",
        role: "Designed and implemented the data ingestion, API workflow, database integration, constraint model, schedule validation, and repair process.",
        learnings: ["Constraint programming with CP-SAT", "Reliable spreadsheet ingestion", "Schedule validation and repair", "Separating solver output from business validation", "Optimising practical automation workflows"]
    },
    "5": {
        number: "05",
        category: "EDUCATION · ALGORITHMS · VISUALISATION",
        name: "OS-SimX",
        subtitle: "Interactive Operating System Process Scheduling & Visualization Platform",
        overview: "OS-SimX is a lightweight educational mini-project that visualises CPU process scheduling algorithms in the browser. It turns process input into algorithm output and a readable Gantt chart so students can inspect how scheduling decisions affect execution order.",
        projectOverview: "The project was created as a practical way to understand operating-system scheduling rather than only reading algorithm definitions. Users can enter processes, choose an algorithm, and observe the resulting execution timeline and scheduling metrics where implemented.",
        problem: "Scheduling algorithms are easier to compare when their decisions are visible step by step. A static explanation does not show how arrival time, burst time, priority, or time quantum changes the execution sequence, so the project focuses on making those decisions observable.",
        solution: "The browser collects process inputs and runs the selected scheduling algorithm in JavaScript. The result is converted into a Gantt chart and supporting metrics, with HTML5 Canvas used for the visual timeline and Tailwind CSS for the interface structure.",
        features: ["Process input and configuration", "FCFS scheduling", "SJF scheduling", "SRTF scheduling", "Round Robin scheduling", "Priority scheduling", "Gantt chart visualisation"],
        stack: [["Frontend", "HTML, Tailwind CSS, JavaScript"], ["Visualisation", "HTML5 Canvas"], ["Algorithms", "FCFS, SJF, SRTF, Round Robin, Priority Scheduling"]],
        architecture: ["Process Input", "JavaScript Scheduling Algorithm", "Execution Timeline", "Gantt Chart Generation", "Canvas Visualisation", "Scheduling Metrics"],
        workflow: ["The user enters process details such as arrival and burst information.", "An algorithm and any required settings are selected.", "JavaScript calculates the execution order and time slices.", "The schedule is converted into timeline segments.", "The Canvas renders the Gantt chart and the interface shows available metrics.", "The user changes inputs or algorithms to compare behaviour."],
        challenges: "The central challenge is keeping algorithm logic and visual output consistent, especially for pre-emptive scheduling and time-sliced execution. Keeping the project client-side makes each scheduling decision easy to reproduce and inspect in an educational setting.",
        testing: "Validation focuses on algorithm examples, process-order correctness, Gantt chart segment generation, metric calculations where implemented, and checking the interface at different input combinations.",
        result: "OS-SimX provides a focused browser-based learning tool for comparing common CPU scheduling algorithms through interactive visual output.",
        role: "Implemented the scheduling algorithms, process-input workflow, Canvas timeline, interface behaviour, and educational presentation.",
        learnings: ["CPU scheduling algorithms", "Pre-emptive and time-sliced execution", "Canvas-based visualisation", "Keeping algorithm state and UI output aligned", "Designing small educational tools"]
    }
};

function renderCaseStudy(study) {
    const section = (title, content) => `
        <section class="case-study-section">
            <h3 class="case-study-section-title">${title}</h3>
            ${content}
        </section>
    `;

    const paragraph = (text) => `<p class="case-study-copy">${text}</p>`;
    const list = (items, className = "case-study-list") =>
        `<ul class="${className}">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
    const stack = study.stack.map(([label, technologies]) => `
        <div class="case-study-stack-row">
            <span class="case-study-stack-label">${label}</span>
            <span>${technologies}</span>
        </div>
    `).join("");
    const architecture = study.architecture.map((step, index) => `
        <div class="case-study-architecture-step">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <strong>${step}</strong>
        </div>
    `).join("");

    return `
        <article class="case-study-content">
            <header class="case-study-header">
                <div class="case-study-eyebrow">${study.number} // ${study.category}</div>
                <h2 class="case-study-title">${study.name}</h2>
                <p class="case-study-subtitle">${study.subtitle}</p>
                ${paragraph(study.overview)}
            </header>
            ${section("PROJECT OVERVIEW", paragraph(study.projectOverview))}
            ${section("PROBLEM STATEMENT", paragraph(study.problem))}
            ${section("THE SOLUTION", paragraph(study.solution))}
            ${section("KEY FEATURES", list(study.features, "case-study-feature-grid"))}
            ${section("TECHNOLOGY STACK", `<div class="case-study-stack">${stack}</div>`)}
            ${section("SYSTEM ARCHITECTURE", `<div class="case-study-architecture">${architecture}</div>`)}
            ${section("HOW IT WORKS", list(study.workflow, "case-study-workflow"))}
            ${section("ENGINEERING CHALLENGES", paragraph(study.challenges))}
            ${section("TESTING & VALIDATION", paragraph(study.testing))}
            ${section("RESULT", paragraph(study.result))}
            ${section("MY ROLE", paragraph(study.role))}
            ${section("KEY LEARNINGS", list(study.learnings))}
            <footer class="case-study-footer">
                <span class="case-study-footer-label">CASE STUDY COMPLETE</span>
                <button type="button" class="case-study-footer-close" data-close-case-study>
                    CLOSE CASE STUDY
                </button>
            </footer>
        </article>
    `;
}

function initProjectCards() {
    const container = document.querySelector("#projects .grid");
    const modal = document.getElementById("case-study-modal");
    const modalContent = document.getElementById("modal-content");
    const closeButton = document.getElementById("case-study-close");

    if (!container || !modal || !modalContent || !closeButton) {
        return;
    }

    const cards = container.querySelectorAll(".project-card");
    let lastFocusedElement = null;

    const closeModal = () => {
        modal.classList.add("hidden");
        document.body.classList.remove("modal-open");
        modalContent.replaceChildren();

        if (lastFocusedElement) {
            lastFocusedElement.focus();
            lastFocusedElement = null;
        }
    };

    const openModal = (card) => {
        const study = projectCaseStudies[card.dataset.project];

        if (!study) {
            console.warn("Project case study not found:", card.dataset.project);
            return;
        }

        modalContent.innerHTML = renderCaseStudy(study);
        modal.classList.remove("hidden");
        document.body.classList.add("modal-open");
        closeButton.focus();
    };

    cards.forEach((card) => {
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");

        card.addEventListener("click", (event) => {
            if (event.target.closest("a, button")) {
                return;
            }

            lastFocusedElement = card;
            openModal(card);
        });

        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                lastFocusedElement = card;
                openModal(card);
            }
        });
    });

    container.querySelectorAll(".project-case-study-link").forEach((link) => {
        link.addEventListener("click", (event) => {
            event.stopPropagation();
            lastFocusedElement = link;
            openModal(link.closest(".project-card"));
        });

        link.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                event.stopPropagation();
                lastFocusedElement = link;
                openModal(link.closest(".project-card"));
            }
        });
    });

    closeButton.addEventListener("click", closeModal);

    modalContent.addEventListener("click", (event) => {
        if (event.target.closest("[data-close-case-study]")) {
            closeModal();
        }
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !modal.classList.contains("hidden")) {
            closeModal();
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