# Bunkie Bois

This app is built using [SvelteKit](https://kit.svelte.dev/), [TypeScript](https://www.typescriptlang.org/), and [Bun](https://bun.sh/).

## Prerequisites

For development, you need the following installed:

- [Bun](https://bun.sh/)
- [Docker](https://docs.docker.com/engine/install/)

## Developing

First install dependencies with `bun install`.

Then run:

```bash
# docker needs to be running for this
bunx supabase start
```

The `bunx supabase start` command will output your local supabase credentials and associated URLs like this:

```bash
API URL: http://localhost:PORT
DB URL: postgresql://postgres:postgres@localhost:PORT/postgres
Studio URL: http://localhost:PORT
Inbucket URL: http://localhost:PORT
JWT secret: some-jwt
anon key: some-jwt
service_role key: some-jwt
```

_Note: `bunx supabase start` will spin up a docker container for your database. Make sure to run `bunx supabase stop` when you are done._

You can use the `Inbucket URL` to manage your local development email auth management.

In a `.env.development` file, add the following:

```bash
# use the variables output from `npx supabase start`
VITE_SUPABASE_URL={API_URL}
VITE_SUPABASE_ANON_KEY={ANON_KEY}
```

To start the development server:

```bash
bunx run dev

# or start the server and open the app in a new browser tab
bunx run dev -- --open
```

To login locally, utilize the `Inbucket URL` link to manage your one time passcode (OTP) emails.

To shut down your local supabase instance, run `bunx supabase stop`.
