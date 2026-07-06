# Genomics portfolio, frontend

A one page React portfolio with a rotating DNA double helix hero built in
Three.js, GSAP scroll reveals, Lenis smooth scrolling, and a floating AI
chat widget that talks to the FastAPI backend in the `backend` folder.

click on https://yash22062002.github.io/Yashpatel_portfolio/

## Run it locally

```bash
cd frontend
npm install
cp .env.example .env
# edit .env, point VITE_CHAT_API_URL at your backend, local or deployed
cp .env.example .env
```

Open the URL it prints, usually `http://localhost:5173`.

The chat widget will not do anything useful until the backend is running
too. Start that first following `backend/README.md`, then come back here.

## Editing content

Everything you would want to personalize lives in `src/sections/`, one
file per section:

- `Hero.jsx`, the headline and subheading over the DNA canvas
- `About.jsx`, your bio paragraph
- `Career.jsx`, the `timeline` array
- `Skills.jsx`, the `groups` array
- `Projects.jsx`, the `projects` array
- `Contact.jsx`, your email

Colors and fonts live in one place, `src/styles/theme.js`, so a palette or
typography change only needs editing there.

The DNA hero's shape and speed live in `src/components/DNAHelix.jsx`, at
the constants near the top: `TURNS`, `RADIUS`, `HEIGHT`, `RUNG_EVERY`.

## Deploy to GitHub Pages

1. Create a new GitHub repository, for example `genomics-portfolio`.
2. If your repo name is not `genomics-portfolio`, update the `base` value
   in `vite.config.js` to match, for example `/my-repo-name/`.
3. Push this `frontend` folder as the root of that repository.
4. In the repo's Settings, Secrets and variables, Actions, add repository
   secrets `VITE_CHAT_API_URL` (your deployed backend URL plus `/chat`)
   and optionally `VITE_GA_ID`.
5. In the repo's Settings, Pages, set the source to the `gh-pages` branch.
   It will not exist yet, that is fine, the first successful deploy
   creates it.
6. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds
   the site and publishes it automatically. Watch the Actions tab for
   progress.
7. Your site will be live at `https://yourusername.github.io/genomics-portfolio/`.

## Optional custom domain

Same pattern Arun used:

1. Buy a domain.
2. Add a `CNAME` file inside `public/` containing just your domain name,
   for example `yourname.dev`.
3. Point your domain's DNS at GitHub Pages, either an A record to GitHub's
   IP addresses (185.199.108.153, 185.199.109.153, 185.199.110.153,
   185.199.111.153) or a CNAME record to `yourusername.github.io`.
4. Change `base` in `vite.config.js` back to `/`, since the domain now
   serves the app from the root.
5. Push, redeploy, and update `ALLOWED_ORIGIN` on the backend to your new
   domain.

## Before you consider this done

- Confirm the widget actually reaches your live backend, not
  `localhost`, by checking the deployed site with your browser's network
  tab open.
- Run a Lighthouse audit once deployed, the Three.js canvas is the one
  part worth watching for performance on lower end phones.
