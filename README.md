# Kidonia Web Application

This repository is a web application of the Kidonia project.

## The purpose of this project

This project is a social network for learners of different age categories who want to develop in areas of interest to them.

## List of technologies used

1. Framework: [Svelte](https://svelte.dev/)
2. Type safe language: [Typescript](https://www.typescriptlang.org/)
3. Components: [Shadcn](https://next.shadcn-svelte.com/)
   - CSS framework: [TailwindCSS](https://tailwindcss.com/)
   - Headless components: [Bits-UI](https://bits-ui.com/docs/introduction/)
   - Icons: [Lucide](https://lucide.dev/guide/packages/lucide-svelte/)
   - Form validation: [Zod](https://zod.dev/)
4. Database: [Supabase](https://supabase.com/)
5. Internationalization: [Svelte-i18n](svelte-i18n-svelte5)
6. Testing: [Vitest](https://vitest.dev/)

## Developing

After installing dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for target environment.

## Goals

- [x] Create a project
- [x] Dark mode
- [x] Translation
- [ ] Responsive design
- [ ] Search posts
- [ ] Add to favorites post
- [ ] Create/Read/Update/Delete posts
- [ ] Authentication
- [ ] Google/Apple OAuth2
- [ ] Google maps
- [ ] Account management

## Rules used within this repository

- We write code first and foremost for people, and only then for machines😃🖥️
- We are not afraid to rewrite our code
- [Plugin](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree&ssr=false#review-details) for Visual Studio Code to view TODO
