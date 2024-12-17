# Basic SvelteKit Template

Everything you need to build a Full-Stack Svelte project.

## The Stack

- [sveltekit](https://svelte.dev) full-stack framework
- [vercel](https://vercel.dev) for hosting
- [tailwindcss](https://tailwindcss.com) utility-first CSS framework
- [shadcn-svelte](https://next.shadcn-svelte.com) component library
- [paraglide-sveltekit](https://inlang.com/m/dxnzrydw/paraglide-sveltekit-i18n) for localization
- [sveltekit-flash-message](https://github.com/ciscoheat/sveltekit-flash-message) for flash messages
- [securekit](https://securekit-demo.vercel.app/) for protecting from XSS attacks
- [prisma](https://www.prisma.io) type-safe database ORM
- [lucia](https://v3.lucia-auth.com) for session authentication
- [eslint](https://eslint.org) for linting
- [prettier](https://prettier.io) for formatting
- [vitest](https://vitest.dev) for unit testing

## Developing

### Generate Prisma Client and DB Migration

Run the following command to generate prisma client from your schema:

```bash
bun run db:gen
```

To run the migration use `bun run db:mig`:

```bash
bun run db:mig dev --name <migration-name>
```

### Add Headless UI Components

Run the following command to add [Shadcn UI](https://next.shadcn-svelte.com) components:

```bash
bun run ui add <component-name>

# Example: add button and input
bun run ui add button input
```

### Start Dev Server

Once you've created a project and installed dependencies with `bun install` (or `pnpm` or `yarn`), start a development server:

```bash
bun run dev

# or start the server and open the app in a new browser tab
bun run dev -- --open
```

## Building

To create a production version of your app:

```bash
bun run build
```

You can preview the production build with `bun run preview`.
