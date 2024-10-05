# Bunkie Bois

This app is built using [SvelteKit](https://kit.svelte.dev/) and [TypeScript](https://www.typescriptlang.org/).

## Prerequisites

For development, you need the following installed:

- Node

## Developing

First install dependencies with `npm install`.

Then in one terminal run:

```bash
./pocketbase/pocketbase serve
```

to spin up the local database and admin UI.

and in another run:

```bash
npm run dev
```

to start the app dev server.

In a `.env.local` file, you can (optionally) add the following:

```bash
# use the URL from the `pocketbase serve` command
VITE_POCKETBASE_URL={POCKETBASE_URL} # defaults to http://127.0.0.1:8090
```
