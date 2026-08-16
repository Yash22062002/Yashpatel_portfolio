# Bioinformatics Portfolio

*A computational biology portfolio built by Yash Patel.*

Live at **[yash22062002.github.io/Yashpatel_portfolio](https://yash22062002.github.io/Yashpatel_portfolio/)**.

## About

A single page site covering education, technical skills, five research and
engineering projects (each with real figures from the underlying analysis),
career history, certifications, and contact information. The hero section
renders a procedurally generated branching tree in SVG, and a floating
assistant, Jarvis, answers visitor questions about the work using the
Claude API through a small backend service.

## Tech stack

- React and Vite
- styled components for theming and layout
- GSAP for scroll reveals, Lenis for smooth scrolling
- A dependency free, hand built SVG gallery component for project figures
- Deployed to GitHub Pages via GitHub Actions on every push to `main`

## Project structure

```
src/
  sections/     One file per page section: Hero, About, Skills, Projects,
                Career, Certifications, Contact
  components/   Shared UI: navigation, footer, the project image gallery,
                the chat widget, icons
  styles/       Theme tokens (colors, type, motion) and global styles
```

Colors, fonts, and spacing all live in `src/styles/theme.js`, so the whole
visual system can be adjusted from one place.

## Running it locally

```bash
npm install
cp .env.example .env
```

Set `VITE_CHAT_API_URL` in `.env` to a running instance of the backend,
local or deployed, then:

```bash
npm run dev
```

The chat widget needs the backend service running to respond; see that
repository's README for setup.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds
the site and publishes it to the `gh-pages` branch automatically. The
Anthropic API key is never present in this repository, it is held server
side by the backend service, since a static host has nowhere secure to
keep a secret.

## Related repositories

- Backend service: [Dashboard_backend](https://github.com/Yash22062002/Dashboard_backend)
- Comparative genomics capstone: [BINF7700_Capstone_Yash](https://github.com/Yash22062002/BINF7700_Capstone_Yash)

Built by [Yash Patel](https://www.linkedin.com/in/yash-patel-network).
