# DeCode InfoTech

Company website built with Next.js App Router, React, TypeScript, CSS Modules,
Tailwind CSS, and GSAP. Next.js serves both the website and the email API.

## Local development

Use Node.js 24 (see `.nvmrc`).

```sh
nvm use
npm ci
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>. The website renders without credentials. Configure
SMTP to deliver contact and career submissions; configure `ADMIN_USERNAME` and
`ADMIN_PASSWORD` to unlock the browser-local editor at `/SA`.

## Commands

| Command                | Purpose                                               |
| ---------------------- | ----------------------------------------------------- |
| `npm run dev`          | Start development server                              |
| `npm run build`        | Create production build                               |
| `npm start`            | Serve production build                                |
| `npm run lint`         | Check code; warnings fail the check                   |
| `npm run typecheck`    | Generate route types and run strict TypeScript checks |
| `npm test`             | Run submission and admin regression tests             |
| `npm run format`       | Apply consistent formatting                           |
| `npm run format:check` | Verify formatting without modifying files             |
| `npm run check`        | Run all quality checks and production build           |

## Structure

```text
src/
  app/             Pages, layouts, metadata, and API route handlers
  components/      Website sections, shared UI, and local admin editor
  context/         Shared content state and typed context
  data/            Default website content and media catalogue
  hooks/           Reusable React state hooks
  lib/             Types, animation setup, validation, and mail delivery
  utils/           Browser image optimization
public/            Referenced images and video
tests/            API behavior regression tests
.github/workflows/ Continuous integration
```

Keep section styles beside their components. Add default content to
`src/data/site-content.ts`, use shared types from `src/lib/types.ts`, and keep
server credentials in environment variables. The remaining admin JSX components
are maintained alongside the TypeScript website; JavaScript is not yet checked
by TypeScript.

## API and configuration

- `POST /api/contact`: validates a proposal and sends it through SMTP.
- `POST /api/careers`: validates an application and sends it through SMTP.
- `POST /api/admin/login`: checks configured editor credentials; disabled when
  credentials are missing. It does not issue a server session.
- `GET /api/health`: application liveness only; does not test SMTP.

Malformed submissions return `400`; failed delivery returns `503`. Success means
SMTP accepted the message, not that the recipient opened it. User content is
escaped before inclusion in HTML email. See `.env.example` for all SMTP settings.
For Gmail, use an app password with `SMTP_SERVICE=gmail`. For other providers,
clear `SMTP_SERVICE` and configure host, port, and TLS settings.

## Persistence and production limitations

The `/SA` editor stores changes only in that browser's local storage. Changes do
not publish to other users or update the repository. Career application history
is also local to the submitting browser. To publish content today, edit the
versioned data module and deploy. This editor is not a shared, authenticated CMS.
A shared production CMS requires a database, server-side authorization, durable
sessions, rate limiting, and an audit trail. Add provider or platform abuse
protection before exposing email and login endpoints to significant traffic.

## Deployment and maintenance

Run `npm run check` before merging. CI repeats those checks for pushes and pull
requests to `main`. The Next.js font loader fetches Google Fonts at build time,
so builds need network access. Deploy with a Next.js-compatible host and provide
server environment variables there. The explicit portfolio proxies in
`vercel.json` are preserved; local Next.js pages handle `/`, `/careers`, and `/SA`.

Build output, dependencies, local environment files, and browser artifacts are
ignored by Git. Commit `package-lock.json` with dependency changes and use
`npm ci` for repeatable installs. Use small feature branches and reviewed pull
requests; configure required CI checks in GitHub branch protection separately.
Update dependencies regularly and review security advisories before releases.
