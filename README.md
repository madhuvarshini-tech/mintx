# MintX Solutions

The public site for MintX Solutions. The previous site is a single PHP page at mintxsolutions.com. This folder had no source, so this Next.js app keeps the verified business content and replaces the presentation.

## Design

Reading this as: a premium technology studio site for business owners in Tamil Nadu, with a cinematic editorial language, leaning toward Tailwind, Space Grotesk, and GSAP scroll, locked to one electric-blue accent.

Dials: variance 8, motion 7, density 4.

## Run locally

```bash
npm install
copy .env.example .env.local
```

Fill in `.env.local`:

- `SESSION_SECRET`: a long random string
- `ADMIN_EMAIL` and `ADMIN_PASSWORD`: the first admin account, created on the first login
- `SITE_URL`: `http://localhost:3000` locally, `https://www.mintxsolutions.com` in production

Then:

```bash
npm run dev
```

Admin: `http://localhost:3000/admin/login`

Inquiries and career applications are stored in `data/`, which is not committed. Resume files go in `data/private-uploads`.

Optional email: set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, and `CONTACT_TO`. If SMTP is missing, the inquiry is still saved and the form says so. A failed inbox is not reported as a successful email.

## Scripts

- `npm run dev`
- `npm run build`
- `npm start`
- `npm run lint`

## Deploy

This app needs a Node.js server and a persistent disk for `data/`. Static-only hosting will lose inquiries on restart.

```bash
npm install
npm run build
npm start
```

Set the same environment variables in the host. Use HTTPS so the admin cookie is marked secure.

Old paths redirect: `/blog.php` to `/blog`, `/career.php` to `/careers`.

## Content notes

- Project links were checked on 9 October 2026. KTS Aquarium & Exotic Pets timed out, so that project has no live link.
- The blog test post titled "texx" was not carried over.
- Social links are limited to the Instagram account published in the site footer.
- No traffic numbers, awards, or testimonials are shown, because none were published as verified results.
