# Contributing to Pearlie Handcrafted 🔮 × Little Calm Corner ☁️

Welcome! This repository powers the digital maison for **Pearlie Handcrafted (`@_pearlie.dreamy`)** and **Little Calm Corner (`@__little.calmcorner`)**, owned and maintained by **Ihsane FATHI (`@IhsaneFathi`)**.

## Developer Workflow

1. **Branch from `main`** (or commit directly to `main` if you are `@IhsaneFathi`):
   - Feature branch: `feat/<short-name>`
   - Bugfix branch: `fix/<short-name>`
   - Catalog update: `content/<short-name>`
2. **Follow [Conventional Commits](https://www.conventionalcommits.org/)**:
   - `feat(boutique): add Emerald Seraphim kiss-lock bag (PRL-017)`
   - `feat(calm-corner): add new soft reminder and study reel`
   - `fix(bespoke): update MAD price for custom AirPods pearl case`
3. **Run Verification & Tests Locally Before Pushing**:
   ```bash
   npm run typecheck
   npm run verify:assets
   npm test
   npm run build
   ```
4. **Open a Pull Request** (or push to `main` to trigger automatic GitHub Pages deployment via `.github/workflows/deploy.yml`).

## How to Add a New Pearlie Creation (`src/data/atelierData.ts`)

1. Copy your new product photo (`.jpg`, `.webp`, or `.png`) into `public/images/`.
2. Open [`src/data/atelierData.ts`](src/data/atelierData.ts) and add a new item to `PEARLIE_PRODUCTS` with:
   - `id`, `code` (e.g. `'PRL-017'`), `category`, `priceMAD`, `beadCount`, `craftHours`
   - `image: './images/your_new_photo.jpg'` (always use relative `./images/...` paths so GitHub Pages subpath routing works)
   - `title`, `subtitle`, and `description` in `en`, `fr`, and `ar`.
3. Run `npm run verify:assets` and `npm test` to confirm your image path and translations are valid.

## Rules
- Never use banned generic fonts (`Inter`, `Roboto`, `Arial`); preserve `Cormorant Garamond`, `Plus Jakarta Sans`, `JetBrains Mono`, and `Readex Pro`.
- Always use relative asset paths (`./images/...`) so the app works seamlessly on both root domains and `/pearlie-dreamy-atelier/`.
- Never commit secrets. Use `.env` (git-ignored) and document expected keys in `.env.example`.
