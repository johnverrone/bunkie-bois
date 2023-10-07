# Bunkie Bois

This app is built using [SvelteKit](https://kit.svelte.dev/) and [TypeScript](https://www.typescriptlang.org/).

## Prerequisites

For development, you need the following installed:

- [Docker](https://docs.docker.com/engine/install/)

## Developing

First install dependencies with `npm install`.

Then run:

```bash
# docker needs to be running for this
npx supabase start
```

The `npx supabase start` command will output your local supabase credentials and associated URLs like this:

```bash
API URL: http://localhost:PORT
DB URL: postgresql://postgres:postgres@localhost:PORT/postgres
Studio URL: http://localhost:PORT
Inbucket URL: http://localhost:PORT
JWT secret: some-jwt
anon key: some-jwt
service_role key: some-jwt
```

_Note: `npx supabase start` will spin up a docker container for your database. Make sure to run `npx supabase stop` when you are done._

You can use the `Inbucket URL` to manage your local development email auth management.

In a `.env.development` file, add the following:

```bash
# use the variables output from `npx supabase start`
VITE_SUPABASE_URL={API_URL}
VITE_SUPABASE_ANON_KEY={ANON_KEY}
```

To start the development server:

```bash
npx run dev

# or start the server and open the app in a new browser tab
npx run dev -- --open
```

To login locally, utilize the `Inbucket URL` link to manage your one time passcode (OTP) emails.

To shut down your local supabase instance, run `npx supabase stop`.
