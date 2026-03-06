# create-cutting-edge-react-app (BETA - not everything is configured yet)

Stop wasting time debating which libraries to use, wrestling with outdated AI-generated boilerplate, or untangling configurations that made sense six months ago. This CLI scaffolds a modern React project with a carefully chosen, human-configured tech stack — so you start with a solid foundation instead of technical debt.

## Quick Start

```bash
pnpm create cutting-edge-react-app
# or
npx create-cutting-edge-react-app
```

## Why this template?

- **Handpicked libraries** — not just popular ones, but the *right* ones. Each was chosen after evaluating the ecosystem and reading the latest docs.
- **Human-configured** — every integration is set up correctly from the start, following current best practices rather than what an AI trained on last year's code thinks is correct.
- **Covers real-world needs** — SSR for landing pages and SEO, CSR for dashboards and authenticated views. Not a toy "Hello World" but an architecture you'd actually build a product on.
- **AI-ready** — get the structure right before you hand it off to an AI assistant, so it has a clean, consistent codebase to work within.

## Tech Stack

| Category | Library |
|---|---|
| Language | TypeScript |
| Bundler | Vite |
| Framework | React 19 + React Router 7 |
| Styling | TailwindCSS 4 |
| UI Components | Mantine UI |
| Server State | TanStack Query |
| Forms | TanStack Form |
| Validation | Zod 4 |
| i18n | Paraglide JS (with React Router 7 support) |
| Icons | Iconify (Fluent icon set) |

## Architecture

The template is structured around two rendering modes under one router:

- **SSR routes** — marketing pages, landing pages, and any content that needs good SEO. Rendered on the server via React Router 7's loader pattern.
- **CSR routes** — dashboard and authenticated views. Rendered on the client for fast interactivity after login.

```
app/
├── routes/
│   ├── marketing/     # SSR — landing page, public content
│   └── auth/          # CSR — login, dashboard
```

## What's Included

- React Router 7 configured for both SSR and CSR routes
- TailwindCSS 4 + Mantine UI with PostCSS pre-configured
- TanStack Query set up with sensible defaults
- Paraglide JS wired up to React Router 7 for type-safe i18n
- Fluent icon set via Iconify's TailwindCSS plugin
- TypeScript strict mode
- Docker support for containerized deployments
- VS Code workspace settings and recommended extensions

## Generated Project Scripts

```bash
pnpm dev          # Start development server with HMR
pnpm build        # Production build
pnpm start        # Serve the production build
pnpm typecheck    # Type-check the project
```

> **Note:** Paraglide generates its runtime files (`app/paraglide/`) on the first `dev` or `build` run. This is expected — do not commit those files.

## Deployment

The production build outputs to `build/` and is served by `@react-router/serve`. It can be deployed anywhere Node.js runs, or containerized with the included Dockerfile.

```bash
docker build -t my-app .
docker run -p 3000:3000 my-app
```
