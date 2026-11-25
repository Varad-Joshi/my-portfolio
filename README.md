# Varad Joshi — Portfolio

A responsive Next.js portfolio for Varad Joshi, focused on software
engineering, AI, Generative AI, automation, privacy and enterprise technology.
The interface includes project filters, accessible mobile navigation, a
reduced-motion-friendly reveal effect, education, experience, skills,
certificates and contact links.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact form

The contact form validates its fields, then opens a Gmail compose tab with the
professional recipient and entered subject prefilled. The message body includes
the visitor's message, name and email address. Visitors review and send the
message themselves in Gmail; this portfolio does not send emails or require
email-provider credentials. If a browser blocks the new tab, the form displays
a link to open the prepared draft.

## Update portfolio content

- Edit projects, experience, skills, education, achievements, certificates and
  verified profile links in `src/data/portfolio.ts`.
- Project summaries without a supplied public repository or demo are displayed
  with that limitation; add a `repo` URL when one is available.
- Replace `public/photo/Profile.jpg` with the preferred portrait.
- The VJ logo used in the header, footer and browser icon is
  `public/image_2725b09a.jpg`.
- Certificate assets belong in `public/certificates/`; update the matching
  entries in `src/data/portfolio.ts`.
- The repository does not include a resume PDF. The hero action currently opens
  an email request instead of presenting a non-existent download.
-   Set `NEXT_PUBLIC_SITE_URL` to the canonical, absolute website URL in the
  deployment environment. It is used for metadata, structured data, robots and
  the sitemap.

## Build and deploy

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

Deploy as a standard Next.js application. The App Router generates
`/sitemap.xml` and `/robots.txt`; the page includes Open Graph, Twitter and
Person structured metadata.

## Stack

- Next.js 15 App Router, React 19 and TypeScript
- Custom responsive CSS and Tailwind CSS v4
- Lucide React icons
