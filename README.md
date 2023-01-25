# Bunkie Bois

This app is built using [SvelteKit](https://kit.svelte.dev/) and [TypeScript](https://www.typescriptlang.org/).

## Prerequisites

For development, you need the following installed:

- [Docker](https://docs.docker.com/engine/install/)
- [Supabase CLI](https://supabase.com/docs/guides/cli)


## Developing

First install dependencies with `npm install`.

To setup local supabase for the first time run `supabase init`.

Then run:
```bash
# docker needs to be running for this
supabase start
```

The `supabase start` command will output your local supabase credentials and associated URLs like this:
```bash
API URL: http://localhost:PORT
DB URL: postgresql://postgres:postgres@localhost:PORT/postgres
Studio URL: http://localhost:PORT
Inbucket URL: http://localhost:PORT
JWT secret: some-jwt
anon key: some-jwt
service_role key: some-jwt
```

You can use the `Inbucket URL` to manage your local development email auth management.

In a `.env.development` file, add the following:
```bash
# use the variables output from `supabase start`
VITE_SUPABASE_URL={API_URL}
VITE_SUPABASE_ANON_KEY={ANON_KEY}
VITE_LOCAL_TEST_EMAIL=test123@gmail.com
```

To start the development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

To login locally, utilize the `Inbucket URL` link to manage your one time passcode (OTP) emails.