# Changelog

All notable changes to **Pearlie Handcrafted 🔮 × Little Calm Corner ☁️ — Digital Maison** are documented in this file.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.3.0] — 2026-11-08
### Added
- **Diwan al-Durr (`ديوان الدُّرّ واللؤلؤ` — `src/components/MaghribiPoetryDiwan.tsx`)**:
  - Dedicated Classical Arabic Poetry & Moroccan Maghribi Calligraphy pavilion celebrating **Ihsane (`@ihsane__ft`)**, **Pearlie Handcrafted (`@_pearlie.dreamy`)**, and **Little Calm Corner (`@__little.calmcorner`)**.
  - Bundled the complete **`Bouazzi Maghribi`** calligraphic font (`public/fonts/BouazziMaghribi-Regular.woff2` & `.ttf` + `src/assets/fonts/`) alongside **`Aref Ruqaa`** and **`Amiri`** with a live 3-script calligraphy switcher (`الخط المغربي` / `خط الرقعة` / `الخط الأميري`), translation toggle, and 1-click poem copy.
  - Added 4 bespoke classical Arabic poems across traditional meters (*Bahr al-Kamil*, *Bahr al-Basit*, *Bahr al-Wafir*, and *Al-Muwashshah al-Maghribi*), plus featured Maghribi couplets in the Hero banner, Founder section, Surprise Tribute Modal, and Footer colophon.
- **Full Mobile Phone Display Responsiveness (`320px` – `430px`)**:
  - Engineered adaptive Floating Glass Pill Navbar, touch-friendly horizontal pill carousels (`.no-scrollbar`), responsive two-hemistich-to-stacked poetic couplets, and zero horizontal overflow (`docScrollW === vw`) verified across `340px`, `360px`, `375px`, and `390px` phone viewports in English (`LTR`), French (`LTR`), and Arabic (`RTL`).
- **Official GitHub Wiki Live Synchronization**:
  - Pushed all 9 multi-page documentation guides directly to [`Bosaj/pearlie-dreamy-atelier.wiki.git`](https://github.com/Bosaj/pearlie-dreamy-atelier/wiki).

## [1.2.0] — 2026-11-08
### Added
- **Admin & Developer Governance for `@IhsaneFathi`**:
  - Added **Ihsane FATHI (`@IhsaneFathi`)** as repository administrator and owner in `.github/CODEOWNERS`, `CONTRIBUTORS.md`, `CITATION.cff`, and `package.json`.
- **Full GitHub Repository Engineering Standards**:
  - Added comprehensive `README.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `CONTRIBUTORS.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `LICENSE`, `CITATION.cff`, and `.env.example`.
  - Added `.github/ISSUE_TEMPLATE/bug_report.yml`, `.github/ISSUE_TEMPLATE/feature_request.yml`, `.github/PULL_REQUEST_TEMPLATE.md`, `.github/FUNDING.yml`, and `.github/CODEOWNERS`.
- **Continuous Integration & Automated Asset Verification (`.github/workflows/ci.yml`)**:
  - Added `scripts/verify-assets.mjs` (`npm run verify:assets`) to verify that every image referenced in `src/data/atelierData.ts` and `src/components/BespokeStudio.tsx` exists in `public/images/` with non-zero byte size.
  - Added automated test suite `tests/atelier.test.mjs` (`npm test`) validating all 16 product entries (`PRL-001`..`PRL-016`), 7 story highlights, 29 Instagram shortcodes, and trilingual (`en`, `fr`, `ar`) translations.
- **Official Multi-Page GitHub Wiki**:
  - Published 8-page project Wiki covering Architecture, Roadmap, Boutique Catalog, Bespoke 3D Studio, Little Calm Corner Sanctuary, and a dedicated Developer Guide for `@IhsaneFathi`.

## [1.1.0] — 2026-11-08
### Added
- **Little Calm Corner ☁️ Sanctuary (`src/components/CalmCornerPortal.tsx`)**:
  - Dedicated portal for `@__little.calmcorner` featuring the *Daily Soft Reminder Deck*, an interactive `4s Inhale · 4s Hold · 6s Exhale` breathing orb pacer, 3 behind-the-scenes story highlights (*My business 💎*, *Soft Planner 🤍*, *Cozy Breaks 🎬*), and all 5 reels/posts.
- **Founder Surprise Tribute Modal (`src/components/FounderSurpriseModal.tsx`)**:
  - Interactive tribute modal for **Ihsane (`@ihsane__ft`)** accessible from the navbar and founder section, complete with celebratory floating pearl sparkles and trilingual dedication letters.
- **Trilingual (`EN` / `FR` / `AR`) & Dual Atmosphere Support**:
  - Full translation and RTL layout support across English, French, and Arabic, plus one-click toggle between *Obsidian Nacre* (dark mode) and *Cloud Silk* (daylight mode).

## [1.0.0] — 2026-11-08
### Added
- **Interactive 3D Pearl & Crystal Light-Refraction Field (`src/components/PearlFieldCanvas.tsx`)**:
  - 60fps HTML5 Canvas simulation with 5 switchable light spectrums (*Nacre Lavender*, *Ruby Empress*, *Noir Seraphim*, *Celestine Mint*, *Amber Honey*) and cursor spring physics.
- **La Boutique Pearlie & 24-Post Instagram Lookbook (`src/App.tsx`)**:
  - Complete showcase of 16 handcrafted creations (`PRL-001`..`PRL-016`), multi-photo product inspection modal, unboxing experience showcase, shopping bag drawer, and WhatsApp Concierge checkout (`https://wa.me/message/HYSIBOQVMTCAE1`).
- **Bespoke 3D Atelier Customizer (`src/components/BespokeStudio.tsx`)**:
  - Interactive 6-step customizer for bespoke bags and 3D `A–Z` alphabet keychains with live simulated bead-weave preview, Moroccan city selector (`🚚🇲🇦`), and gift card note generator.

## [0.1.0] — 2026-11-07
### Added
- **Instagram Media & Metadata Extraction (`public/images/` & `src/data/atelierData.ts`)**:
  - Extracted and bundled 60 authentic media files (profile avatars, 10 story highlight covers, 24 Pearlie Handcrafted posts/reels, and 5 Little Calm Corner posts/reels) across `@_pearlie.dreamy`, `@__little.calmcorner`, and `@ihsane__ft`.
