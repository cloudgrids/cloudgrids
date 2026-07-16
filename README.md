<div align="center">

<img src="./public/logo.svg" alt="CloudGrids logo" width="112" height="112" />

# CloudGrids

**Deploy from GitHub. Go live on `*.cloudgrids.tech` in minutes.**

[Website](https://cloudgrids.tech) · [Documentation](https://cloudgrids.tech/docs) · [GitHub organization](https://github.com/cloudgrids) · [Support](mailto:support@cloudgrids.tech)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple?style=flat-square)](LICENSE)

</div>

## About

CloudGrids is an open-source cloud platform for developers, indie hackers, and AI builders. It brings deployment workflows, developer tools, media services, metadata utilities, agent hosting, and project resources into one ecosystem.

The platform is being developed publicly. Features marked as coming soon in the interface are not yet production services; internal staging and deployment automation will be introduced separately.

## Current application areas

- Cloud hosting dashboards for deployments, domains, environment variables, logs, and templates.
- Unified documentation and API references at `/docs`.
- Media upload, CDN, and transformation interfaces.
- Metadata inspection, endpoint discovery, and testing tools.
- AI UI generation and component galleries.
- Agent hosting, boilerplates, creator tools, and scraping workflows.
- Public privacy, legal, and project information pages.

## Development

Requirements:

- Node.js 20 or newer
- pnpm

```bash
git clone https://github.com/cloudgrids/cloudgrids.git
cd cloudgrids
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Commands

```bash
pnpm dev             # start the Next.js development server
pnpm build           # create a production build
pnpm start           # run the production server
pnpm lint            # run ESLint
pnpm typecheck       # run TypeScript validation
pnpm generate-icons  # regenerate committed application icons
```

## Project structure

```text
app/                  Next.js App Router pages and product areas
components/           shared navigation, footer, branding, and UI
hooks/                client-side application hooks and providers
lib/                  application metadata, constants, and utilities
public/               logo, icons, screenshots, and web manifest
```

## Branding

The primary CloudGrids mark combines a cloud outline with a four-cell grid. The canonical assets are:

- [`components/Logo.tsx`](components/Logo.tsx) for React interfaces and generated metadata images.
- [`public/logo.svg`](public/logo.svg) for documentation and external use.
- [`public/icons/`](public/icons/) for application and installable-web-app icons.
- [`app/favicon.ico`](app/favicon.ico) for browser tabs and bookmarks.

Keep the mark’s proportions and cyan-blue-magenta gradient intact. Regenerate derived icons after changing the source logo.

## Documentation

Documentation is part of this application and is served at:

```text
https://cloudgrids.tech/docs
```

Do not use `docs.cloudgrids.tech` unless that separate hostname is configured and deployed in the future.

## Contributing

Issues and pull requests are welcome. Before submitting a change:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

Keep public descriptions aligned with functionality that is actually available. Do not present planned staging, billing, deployment automation, or other coming-soon services as production-ready.

## License

MIT © CloudGrids contributors.
