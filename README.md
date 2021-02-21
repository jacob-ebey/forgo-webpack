# forgo-webpack

A SSR'd template using forgo, tailwindcss and webpack.

Includes a custom webpack loader to enabled preloading of code-split chunks.

## Getting started

Localdev:

```bash
> yarn dev
```

Production:

```bash
> npm i -g vercel
```

```bash
> yarn build
> vercel
```

## CI

There are github actions defined in the project to lint and build on push,
deploy to vercel preview environments on PR, and deploy to vercel production
on merge to main.

You'll need to set the following environment variables for your github actions:

- VERCEL_TOKEN
- VERCEL_ORG_ID
- VERCEL_PROJECT_ID
