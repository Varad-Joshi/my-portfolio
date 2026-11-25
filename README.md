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

## Configure contact email

The contact form sends messages through Resend from the server. Copy
`.env.example` to `.env.local`, create a Resend API key, verify the sender
domain in Resend, and set:

- `RESEND_API_KEY` — secret Resend API key. Keep it server-side; never expose it
  with a `NEXT_PUBLIC_` prefix.
- `RESEND_FROM_EMAIL` — sender address verified by Resend, for example
  `Varad Joshi <portfolio@your-verified-domain.com>`.
- `NEXT_PUBLIC_SITE_URL` — the canonical absolute URL for metadata and sitemap.

The recipient is the professional email in `src/data/portfolio.ts`. Restart the
development server after changing environment variables. The form validates
submissions on both client and server, uses a hidden honeypot field, and applies
a per-client in-memory rate limit. For multi-instance deployments, add a shared
rate-limit store at the hosting layer. If Resend credentials are missing or
delivery is rejected, the form displays an error instead of a success state.
The “Open in email app” action also launches a `mailto:` draft with the form
details filled in.

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
- Set `NEXT_PUBLIC_SITE_URL` to the canonical, absolute website URL in the
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
