# Developer Setup & Quick-Edit Guide for Ihsane (`@IhsaneFathi`)

Welcome **Ihsane (`@IhsaneFathi`)**! 👑✨ You have full **collaborator write access** on [`Bosaj/pearlie-dreamy-atelier`](https://github.com/Bosaj/pearlie-dreamy-atelier). Whenever you push a change to `main`, GitHub Actions automatically verifies all photos, builds the site, and updates the live website at **[https://bosaj.github.io/pearlie-dreamy-atelier/](https://bosaj.github.io/pearlie-dreamy-atelier/)** in under 30 seconds!

---

## 1. Local Setup (One-Time)

```bash
# 1. Accept your collaborator invite at:
#    https://github.com/Bosaj/pearlie-dreamy-atelier/invitations

# 2. Clone the repository
git clone https://github.com/Bosaj/pearlie-dreamy-atelier.git
cd pearlie-dreamy-atelier

# 3. Install dependencies
npm install

# 4. Run the local dev server (opens http://localhost:5173 with instant live reload)
npm run dev
```

---

## 2. How to Edit Prices, Titles, or Add a New Bag / Keychain

All products, story highlights, lookbook posts, and Little Calm Corner posts live in **one clean file**:
👉 [`src/data/atelierData.ts`](https://github.com/Bosaj/pearlie-dreamy-atelier/blob/main/src/data/atelierData.ts)

### Example: Changing a Price in MAD
Open `src/data/atelierData.ts`, find the product (for example `PRL-001`), and edit `priceMAD`:
```ts
{
  id: 'noir-seraphim-clutch',
  code: 'PRL-001',
  priceMAD: 450, // <-- Change this number anytime!
  ...
}
```

### Example: Adding a Brand-New Bag or Keychain
1. Put your new image in `public/images/` (e.g., `public/images/new_bag.jpg`).
2. Add a new object to `PEARLIE_PRODUCTS` in `src/data/atelierData.ts` (and if you update the total product count from 16 to 17, update the count in `tests/atelier.test.mjs`).
3. Run the verification check:
   ```bash
   npm run verify:assets
   npm test
   ```
4. Commit and push to deploy live:
   ```bash
   git add .
   git commit -m "feat(boutique): add new Pearlie creation"
   git push origin main
   ```
