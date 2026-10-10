# ONKAR KHILARI — AI/ML & Full-Stack Developer Portfolio

My personal developer portfolio website, showcasing work across AI/ML, full-stack development, backend engineering, computer vision, and software testing and automation.


## Live Demo


[🌐 Live Demo](https://onkar-khiari.engineerr.workers.dev)


## About the Portfolio


This portfolio presents my skills, selected projects, engineering experience, technologies, and contact information in a responsive single-page website.

## Tech Stack

- HTML5 and CSS3
- JavaScript (ES6+)
- Tailwind CSS via CDN
- GSAP and ScrollTrigger
- Google Fonts: Inter, JetBrains Mono, and Syne
- Simple Icons CDN

## Key Features

- Responsive portfolio design for desktop, tablet, and mobile
- About section with education and engineering mindset details
- Services and expertise accordion
- Filterable skills and technology grid
- Selected project showcase with interactive case-study modal
- Contact form with client-side submission feedback
- Resume/CV download
- GitHub and LinkedIn profile links
- Mobile navigation menu
- Smooth section navigation, scroll progress, and back-to-top controls

## Portfolio Sections

- **Hero** — Introduction, portrait, focus areas, and portfolio highlights
- **About** — Education, competencies, and engineering mindset
- **Services** — AI/ML, frontend, backend, databases, and testing expertise
- **Projects** — Selected work with technologies and case-study details
- **Skills** — Filterable tools and technologies across AI/ML, backend, DevOps, tools, and testing
- **Contact** — Contact information, profile links, and contact form

## Project Structure

```text
Onkar-Khilari/
├── index.html
├── index.js
├── css/
│   └── style.css
├── assets/
│   ├── black_white_logo.png
│   ├── cream_black_logo.png
│   ├── cream_black_logo-1.png
│   ├── Onkar_Khilari_CV.pdf
│   └── portrait.png
└── README.md
```

## Getting Started

This is a static HTML, CSS, and JavaScript project with a small Cloudflare Worker API for contact-form email delivery.

1. Clone or download the repository.
2. Install Wrangler if needed: `npm install --global wrangler`.
3. Configure the Worker environment variables described below.
4. Run the project locally with Wrangler.

For local development, create a `.dev.vars` file from `.env.example`, replace the placeholder Resend sender and API key with local values, and run:

```bash
npx wrangler dev
```

Then visit the local URL shown by Wrangler.

## Deployment

The portfolio is deployed online with Cloudflare Workers and available here:

[🌐 Visit Live Portfolio](https://onkar-khiari.engineerr.workers.dev)

Before deploying, configure the Resend sender and API key:

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put RESEND_FROM_EMAIL
npx wrangler deploy
```

`RESEND_FROM_EMAIL` must be a sender address from a domain verified in Resend. `CONTACT_TO_EMAIL` is defined in `wrangler.toml` and defaults to `onkarkhilari17@gmail.com`.

## Author

**Onkar Khilari**

AI/ML & Full-Stack Developer

## Connect With Me

- [GitHub](https://github.com/khilarionkar05)
- [LinkedIn](https://linkedin.com/in/onkar-khilari)
