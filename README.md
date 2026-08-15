# Nextisy

An internationalized Next.js application template with accessible UI components, RTL support, and light, dark, and system themes.

## Requirements

- Node.js 24
- pnpm 11.21.0

If you use [mise](https://mise.jdx.dev/), `mise install` installs both versions.

## Getting started

```sh
pnpm install
pnpm exec dotenvx set APP_ORIGIN http://localhost:3000
pnpm dev
```

The dotenvx command creates an encrypted `.env` file and a private `.env.keys` file. Commit `.env`, but never commit `.env.keys`. `APP_ORIGIN` must contain only the public scheme and host.

Provide the generated `DOTENV_PRIVATE_KEY` through your deployment platform so it can decrypt `.env` in production.

## Commands

| Command            | Purpose                              |
| ------------------ | ------------------------------------ |
| `pnpm dev`         | Start the development server         |
| `pnpm build`       | Create a production build            |
| `pnpm start`       | Run the production build             |
| `pnpm check`       | Check formatting and lint rules      |
| `pnpm fix`         | Apply safe formatting and lint fixes |
| `pnpm test`        | Run the test suite once              |
| `pnpm env:decrypt` | Decrypt `.env` for local editing     |
| `pnpm env:encrypt` | Encrypt supported values in `.env`   |

## Customizing the template

- Change the application name and URL handling in `src/app/site-metadata.ts`.
- Replace `src/app/icon.svg`, `src/app/apple-icon.tsx`, and the mark in `src/app/og/[locale]/route.tsx`.
- Edit supported locales and prefixes in `src/i18n/routing.ts`.
- Keep `src/i18n/locale.ts`, `src/i18n/messages.ts`, and `src/locales/` aligned when adding or removing a locale.
- Replace the starter metadata and page copy in every file under `src/locales/`.

Before publishing, run:

```sh
pnpm check
pnpm test
pnpm build
```
