# Run Voter Awareness locally

This project includes the responsive home page, quiz, voting journey, knowledge guide, video resources, and maze. The three primary pages match the supplied design-pack previews using their original graphics and locally bundled typography.

## Requirements

- Node.js 22.13 or newer
- pnpm (the project specifies its version in package.json)

## Start with standard Next.js

Extract the ZIP and open a terminal in the extracted `voter-awareness` directory, next to `package.json`.

```sh
corepack enable
pnpm install
pnpm dev:next
```

Open http://localhost:3000 (or the address printed in the terminal if that port is busy).

If your Node installation does not include Corepack, install it first with `npm install --global corepack`, then repeat the commands above.

No API keys, database, or sign-in are needed for the voter pages.

## Standard Next.js production build

```sh
pnpm build:next
pnpm start:next
```

## Deploy to Vercel

The repository's `vercel.json` selects the **Next.js** preset and runs `npm run build:next` (`next build --webpack`). This generates `.next/routes-manifest.json`, which Vercel's Next.js integration requires. The default `build` script runs Vinext for the Cloudflare/Sites runtime and should not be used on Vercel.

In Vercel's project settings:

- Set **Root Directory** to the folder containing `package.json` and `vercel.json` (the repository root for this checkout).
- Use **Next.js** as the framework preset.
- Leave the **Output Directory override disabled** so Vercel uses Next.js's default `.next` directory.
- Keep automatic dependency installation; the existing pnpm lockfile and package-manager declaration control installation. Using npm to run the build script does not change the package manager used to install dependencies.

Commit and push `vercel.json`, then deploy that updated commit. Redeploying an older commit will still use its old build configuration. Successful build logs should identify **Next.js** and show the route table; a log ending with `vinext start` is still using the wrong command.

Reference: [Vercel's missing routes manifest guidance](https://github.com/vercel/vercel/blob/main/errors/now-next-routes-manifest.md).

## Where to edit

- `app/page.tsx`: landing page and resource buttons
- `app/knowledge/page.tsx`: General Knowledge and Urdu FAQs
- `app/quiz/page.tsx`: quiz questions and scoring
- `app/journey/page.tsx`: voting game
- `app/videos/page.tsx`: video links
- `app/home.module.css`: home-page desktop and mobile layouts
- `app/quiz/quiz.module.css`: quiz desktop and mobile layouts
- `app/journey/journey.module.css`: voting-journey desktop and mobile layouts
- `app/globals.css`: shared colors, header, footer, and secondary-page styles
- `public/design/`: unchanged design-pack artwork
- `public/fonts/`: bundled preview fonts and their license
- `public/reference/`: supplied reference illustrations
- `components/awareness/`: shared artwork and navigation components

## Existing hosted version

The hosted Sites version uses Vinext, a Next.js-compatible runtime for Cloudflare. Its existing `dev`, `build`, and `start` scripts are retained. `pnpm dev` starts that runtime locally at http://localhost:5173. The `:next` scripts above run standard Next.js instead.

The `.openai/hosting.json` file identifies the existing Site. Local changes do not automatically update the public website. The ZIP contains no credentials, installed dependencies, or generated build folders.
