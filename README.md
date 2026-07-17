# MRTT Website

MRTT corporate website built with React, TypeScript and Vite.

## Local development

```bash
npm ci
npm run dev
```

## Production build

```bash
npm run build
```

The generated website is written to `dist/`.

## GitHub organization site

Use this directory as the root of a standalone public repository named:

```text
<organization-name>.github.io
```

Push the default branch as `main`. The workflow in
`.github/workflows/deploy-pages.yml` builds and deploys the site automatically.

In the repository settings, open **Pages** and set **Source** to
**GitHub Actions**. The public URL will be:

```text
https://<organization-name>.github.io/
```

The site uses hash-based routes such as `#/product`, so GitHub Pages can serve
every page without custom rewrite rules.

