# Techlifai: Digital Studio

The marketing website for [Techlifai](https://techlifai.com), an Islamabad based studio offering
Web Development, WordPress, Webflow, Shopify, App Development, SEO and AI Automation.

A multi-page React single-page app with animated page transitions, smooth scrolling and a
dark/light theme.

## Tech stack

- **React 18** + **Vite 5**
- **React Router 7** for routing (pages are lazy-loaded)
- **Tailwind CSS 4** (via `@tailwindcss/vite`) plus design tokens in `src/index.css`
- **Framer Motion** for animation (`LazyMotion`, respects `prefers-reduced-motion`)
- **Lenis** for smooth scrolling
- **React Helmet Async** for per-page SEO tags
- **EmailJS** for the contact form

## Getting started

**Requirements:** [Node.js](https://nodejs.org) 18+

```bash
npm install
npm run dev       # dev server, usually http://localhost:5173
npm run build     # production build into dist/
npm run preview   # preview the production build locally
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/services` | Services |
| `/industries` | Industries |
| `/projects` | Projects (category filter) |
| `/blog`, `/blog/:slug` | Blog list and posts |
| `/team` | Team |
| `/reviews` | Reviews / testimonials |
| `/contact` | Contact form |
| `*` | Not found |

## Project structure

```
techlifai/
├─ index.html              # Entry HTML: meta tags, Open Graph, JSON-LD
├─ vite.config.js
├─ vercel.json             # SPA rewrite for Vercel
├─ public/
│  ├─ CNAME                # Custom domain (techlifai.com)
│  ├─ _redirects           # SPA fallback for Netlify-style hosts
│  ├─ robots.txt
│  ├─ sitemap.xml
│  └─ favicon.svg
└─ src/
   ├─ main.jsx             # React root
   ├─ App.jsx              # Router and lazy-loaded routes
   ├─ index.css            # Global styles, tokens, animations
   ├─ data.js              # Editable content (see below)
   ├─ icons.jsx            # Inline SVG icons
   ├─ images/              # Project and section images
   ├─ lib/
   │  ├─ smoothScroll.js   # Lenis setup
   │  └─ theme.js          # Dark/light theme hook
   ├─ components/
   │  ├─ Layout.jsx        # Header, mobile menu, footer, theme toggle
   │  ├─ Site.jsx          # Shared site building blocks
   │  └─ PageTransition.jsx
   └─ pages/               # One file per route
      ├─ Home, About, Services, Industries, Projects
      ├─ Blog, BlogPost, Team, Reviews, NotFound
      ├─ Contact.jsx       # Re-exports EmailContact.jsx
      ├─ EmailContact.jsx  # Contact form (EmailJS)
      └─ pageHelpers.jsx
```

## Editing content

Most text content lives in **`src/data.js`**:

- `CONTACT_EMAIL`, `CONTACT_PHONE`, `COMPANY_ADDRESS`, `SOCIAL_LINKS`
- `NAV_ITEMS`
- `SERVICES`, `INDUSTRIES`
- `PROJECT_CATS`, `PROJECTS`
- `TEAM`, `ROLE_CHIPS`, `TESTIMONIALS`
- `BLOG_POSTS`
- `EMAILJS` (service, template and public key for the contact form)

Colors, fonts and spacing are defined as tokens in **`src/index.css`**. The theme is stored
in `localStorage` and applied through `data-theme` on `<html>`.

## Contact form

`src/pages/EmailContact.jsx` sends submissions directly from the browser with
[EmailJS](https://www.emailjs.com), so no backend is needed. The IDs are configured in the
`EMAILJS` object in `src/data.js`. The EmailJS public key is designed to be exposed in
client code, but to rotate or change it, update that object and your EmailJS template.

The template expects these variables: `name`, `email`, `service`, `budget`, `message`,
`to_email`.

## SEO

- Per-page titles and descriptions via React Helmet
- Open Graph tags and `ProfessionalService` JSON-LD (Islamabad) in `index.html`
- `public/sitemap.xml` and `public/robots.txt`: update the sitemap when adding routes or
  blog posts

## Deployment

The build output (`dist/`) is fully static.

- **Vercel:** `vercel.json` rewrites all paths to `index.html` so client-side routes work on refresh.
- **Netlify and similar:** `public/_redirects` provides the same fallback.
- **Custom domain:** `public/CNAME` is set to `techlifai.com`.
- `App.jsx` also supports being served under a `/techlifai` base path (for example, GitHub Pages
  project hosting).

Note: because the app is client-rendered, route-level SEO relies on crawlers executing
JavaScript. Prerendering would improve this.
