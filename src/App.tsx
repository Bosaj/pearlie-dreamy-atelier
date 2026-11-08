import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ShoppingBag,
  Sun,
  Moon,
  Heart,
  ExternalLink,
  X,
  Plus,
  Minus,
  Trash2,
  Send,
  Play,
  Crown,
  Truck,
  ShieldCheck,
  Gift,
  Eye,
  Check,
  MessageCircle,
  Search,
} from 'lucide-react';

const Instagram: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
import {
  ALL_PEARLIE_POSTS,
  BRAND_LINKS,
  HIGHLIGHT_STORIES,
  Language,
  MOROCCAN_CITIES,
  PEARLIE_PRODUCTS,
  ProductCategory,
  ProductItem,
} from './data/atelierData';
import { PearlFieldCanvas, PearlSpectrum } from './components/PearlFieldCanvas';
import { BespokeStudio } from './components/BespokeStudio';
import { CalmCornerPortal } from './components/CalmCornerPortal';
import { FounderSurpriseModal } from './components/FounderSurpriseModal';
import { MaghribiPoetryDiwan } from './components/MaghribiPoetryDiwan';

interface BagItem {
  id: string;
  title: string;
  details: string;
  priceMAD: number;
  image: string;
  qty: number;
}

export function App() {
  const [lang, setLang] = useState<Language>('en');
  const [lightMode, setLightMode] = useState<boolean>(false);
  const [spectrum, setSpectrum] = useState<PearlSpectrum>('nacre');
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lookbookFilter, setLookbookFilter] = useState<'all' | 'photos' | 'reels'>('all');
  const [heroShowcaseIndex, setHeroShowcaseIndex] = useState<number>(0);

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [activeGalleryImg, setActiveGalleryImg] = useState<string>('');
  const [customInitialForModal, setCustomInitialForModal] = useState<string>('I');
  const [surpriseModalOpen, setSurpriseModalOpen] = useState<boolean>(false);
  const [manifestoOpen, setManifestoOpen] = useState<boolean>(false);
  const [bagOpen, setBagOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Shopping Bag State
  const [bagItems, setBagItems] = useState<BagItem[]>([
    {
      id: 'noir-seraphim-clutch',
      title: 'Noir Seraphim Kiss-Lock Clutch',
      details: 'Collection Pearlie 💎 · Gold Hardware',
      priceMAD: 450,
      image: './images/pearlie_post_06_DeZm3JiAHbX.webp',
      qty: 1,
    },
  ]);
  const [checkoutCity, setCheckoutCity] = useState<string>('Berkane');
  const [checkoutNote, setCheckoutNote] = useState<string>('');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const heroProducts = useMemo(
    () => PEARLIE_PRODUCTS.filter((p) => p.featured).slice(0, 6),
    []
  );
  const currentHeroProduct = heroProducts[heroShowcaseIndex % heroProducts.length] || PEARLIE_PRODUCTS[0];

  const filteredProducts = useMemo(() => {
    return PEARLIE_PRODUCTS.filter((item) => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        item.title.en.toLowerCase().includes(q) ||
        item.title.fr.toLowerCase().includes(q) ||
        item.title.ar.toLowerCase().includes(q) ||
        item.collectionTag.toLowerCase().includes(q) ||
        item.originalCaption.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const filteredLookbook = useMemo(() => {
    return ALL_PEARLIE_POSTS.filter((post) => {
      if (lookbookFilter === 'photos') return !post.isReel;
      if (lookbookFilter === 'reels') return post.isReel;
      return true;
    });
  }, [lookbookFilter]);

  const totalBagCount = bagItems.reduce((acc, item) => acc + item.qty, 0);
  const totalBagMAD = bagItems.reduce((acc, item) => acc + item.priceMAD * item.qty, 0);

  const handleAddToBag = (item: {
    id: string;
    title: string;
    details: string;
    priceMAD: number;
    image: string;
  }) => {
    setBagItems((prev) => {
      const existing = prev.find((x) => x.id === item.id);
      if (existing) {
        return prev.map((x) => (x.id === item.id ? { ...x, qty: x.qty + 1 } : x));
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setJustAddedId(item.id);
    setTimeout(() => setJustAddedId(null), 1600);
  };

  const updateBagQty = (id: string, delta: number) => {
    setBagItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const buildWhatsAppCheckoutText = () => {
    const lines = [
      `✨ *NEW ORDER — PEARLIE HANDCRAFTED* 🔮`,
      ``,
      ...bagItems.map(
        (item, idx) =>
          `${idx + 1}. *${item.title}* (x${item.qty}) — ${item.priceMAD * item.qty} MAD\n   _${item.details}_`
      ),
      ``,
      `• *Total Estimated*: ${totalBagMAD} MAD`,
      `• *Delivery City*: ${checkoutCity}, Morocco 🚚🇲🇦`,
      checkoutNote ? `• *Gift / Order Note*: "${checkoutNote}"` : '',
      ``,
      `Salam Pearlie! I would love to confirm this order 🤍`,
    ].filter(Boolean);
    return lines.join('\n');
  };

  const openProductModal = (product: ProductItem) => {
    setSelectedProduct(product);
    setActiveGalleryImg(product.image);
  };

  const isRTL = lang === 'ar';

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`min-h-[100dvh] relative transition-colors duration-500 ${
        lightMode
          ? 'bg-[#FDFBF7] text-[#1D1426]'
          : 'bg-[#07050C] text-[#F7F4FA]'
      } ${isRTL ? 'font-arabic' : ''}`}
    >
      {/* Fixed Film Grain Texture */}
      <div className="film-grain" />

      {/* Interactive 60fps 3D Iridescent Pearl Physics Canvas */}
      <PearlFieldCanvas spectrum={spectrum} lightMode={lightMode} />

      {/* Ambient Holographic Mesh Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className={`absolute -top-40 left-1/4 w-[34rem] h-[34rem] rounded-full blur-[130px] transition-opacity duration-700 ${
            lightMode ? 'bg-[#E5D4ED]/45' : 'bg-[#9D4EDD]/15'
          }`}
        />
        <div
          className={`absolute top-1/2 -right-32 w-[30rem] h-[30rem] rounded-full blur-[140px] transition-opacity duration-700 ${
            lightMode ? 'bg-[#F9D5E5]/50' : 'bg-[#F9D5E5]/10'
          }`}
        />
        <div
          className={`absolute -bottom-32 left-10 w-[28rem] h-[28rem] rounded-full blur-[130px] transition-opacity duration-700 ${
            lightMode ? 'bg-[#C9F0E4]/40' : 'bg-[#7FD1B9]/10'
          }`}
        />
      </div>

      {/* =====================================================================
          FLUID ISLAND FLOATING NAVBAR (Detached Glass Pill — 320px+ Responsive)
         ===================================================================== */}
      <header className="fixed top-3 sm:top-6 inset-x-0 z-40 flex justify-center px-2 sm:px-3 pointer-events-none">
        <nav
          aria-label="Primary Navigation"
          className={`pointer-events-auto flex items-center justify-between gap-1.5 sm:gap-4 px-2.5 sm:px-6 py-2 sm:py-2.5 rounded-full backdrop-blur-2xl transition-all duration-300 w-full max-w-[calc(100vw-1rem)] sm:w-auto sm:max-w-full ${
            lightMode
              ? 'bg-white/85 text-stone-900 ring-1 ring-purple-950/10 shadow-[0_12px_40px_rgba(42,27,56,0.08)]'
              : 'bg-[#110C1A]/85 text-white ring-1 ring-white/15 shadow-[0_16px_50px_rgba(0,0,0,0.55)]'
          }`}
        >
          {/* Brand Logo Pill */}
          <a href="#top" className="flex items-center gap-2 pr-0.5 shrink-0 group">
            <img
              src="./images/pearlie_dom_00.jpg"
              alt="Pearlie Handcrafted Logo"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-1 ring-[#D8B4E2]/60 group-hover:scale-105 transition-transform"
            />
            <div className="leading-none">
              <span className="font-display text-base sm:text-xl font-semibold tracking-wide block">
                Pearlie
              </span>
              <span className="text-[8px] sm:text-[9px] font-mono-tech uppercase tracking-[0.16em] sm:tracking-[0.22em] text-[#D8B4E2] block">
                HANDCRAFTED
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-5 text-xs font-medium tracking-wide">
            <a href="#boutique" className="opacity-75 hover:opacity-100 transition-opacity">
              {lang === 'ar' ? 'المتجر' : lang === 'fr' ? 'Boutique' : 'Boutique'}
            </a>
            <a
              href="#diwan"
              className="text-[#F3E5AB] opacity-90 hover:opacity-100 transition-opacity font-maghribi text-base"
            >
              {lang === 'ar' ? 'ديوان الدُّرّ 📜' : 'Diwan المغربي 📜'}
            </a>
            <a href="#bespoke" className="opacity-75 hover:opacity-100 transition-opacity">
              {lang === 'ar' ? 'تصميم خاص' : lang === 'fr' ? 'Sur-Mesure' : 'Bespoke Studio'}
            </a>
            <a href="#lookbook" className="opacity-75 hover:opacity-100 transition-opacity">
              {lang === 'ar' ? 'الأرشيف (24)' : 'Lookbook (24)'}
            </a>
            <a
              href="#calm-corner"
              className="inline-flex items-center gap-1.5 text-[#F9D5E5] opacity-90 hover:opacity-100 transition-opacity"
            >
              <span>Little Calm Corner ☁️</span>
            </a>
          </div>

          {/* Right Controls: Surprise Button, Lang, Theme, Bag, Mobile Menu */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Surprise Tribute Trigger for Ihsane */}
            <button
              type="button"
              onClick={() => setSurpriseModalOpen(true)}
              className="press-feedback inline-flex items-center justify-center gap-1.5 w-7 h-7 sm:w-auto sm:h-auto sm:px-3 sm:py-1.5 rounded-full text-[11px] font-medium bg-gradient-to-r from-[#D8B4E2]/25 via-[#F9D5E5]/25 to-[#F3E5AB]/25 ring-1 ring-[#D8B4E2]/50 text-[#F9D5E5]"
              title="Special Surprise for Ihsane (@ihsane__ft)"
            >
              <Crown className="w-3.5 h-3.5 text-[#F3E5AB] shrink-0" />
              <span className="hidden sm:inline">
                {lang === 'ar' ? 'مفاجأة لإحسان ✨' : lang === 'fr' ? 'Pour Ihsane ✨' : 'For Ihsane ✨'}
              </span>
            </button>

            {/* Language Switcher */}
            <div
              className={`flex items-center rounded-full p-0.5 text-[9px] sm:text-[10px] font-mono-tech ${
                lightMode ? 'bg-stone-200/70' : 'bg-white/[0.06]'
              }`}
            >
              {(['en', 'fr', 'ar'] as Language[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full uppercase transition-colors ${
                    lang === l
                      ? 'bg-[#D8B4E2] text-[#09060E] font-semibold'
                      : 'opacity-65 hover:opacity-100'
                  }`}
                >
                  {l === 'ar' ? 'ع' : l}
                </button>
              ))}
            </div>

            {/* Atmosphere Mode Switcher (Visible on sm+, and inside mobile drawer on xs) */}
            <button
              type="button"
              onClick={() => setLightMode((m) => !m)}
              aria-label="Toggle atmosphere mode"
              className={`hidden sm:flex press-feedback w-8 h-8 rounded-full items-center justify-center ${
                lightMode
                  ? 'bg-stone-200/80 text-purple-950'
                  : 'bg-white/[0.07] text-[#F3E5AB] hover:bg-white/15'
              }`}
            >
              {lightMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            </button>

            {/* Shopping Bag Pill */}
            <button
              type="button"
              onClick={() => setBagOpen(true)}
              className="press-feedback relative inline-flex items-center gap-1 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#D8B4E2] text-[#09060E] text-[11px] sm:text-xs font-semibold shadow-[0_0_20px_rgba(216,180,226,0.4)]"
            >
              <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>{totalBagCount}</span>
            </button>

            {/* Mobile Hamburger Morph Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label="Toggle navigation menu"
              className="lg:hidden press-feedback w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 flex flex-col items-center justify-center gap-1 relative shrink-0"
            >
              <span
                className={`w-3.5 h-[1.5px] bg-current transition-transform duration-200 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-[2.5px]' : ''
                }`}
              />
              <span
                className={`w-3.5 h-[1.5px] bg-current transition-transform duration-200 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-[2.5px]' : ''
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Glass Overlay Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/90 backdrop-blur-3xl flex flex-col items-center justify-center p-6 text-center animate-modal-enter lg:hidden overflow-y-auto">
          <div className="space-y-5 font-display text-2xl sm:text-3xl text-white max-w-xs w-full">
            <a href="#boutique" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#D8B4E2]">
              {lang === 'ar' ? 'متجر اللؤلؤ والكريستال 💎' : 'Boutique Couture'}
            </a>
            <a
              href="#diwan"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-maghribi text-3xl text-[#F3E5AB]"
            >
              ديوان الدُّرّ بالخط المغربي 📜
            </a>
            <a href="#bespoke" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#D8B4E2]">
              {lang === 'ar' ? 'تصميم حسب الطلب (A–Z)' : 'Atelier Sur-Mesure (A–Z)'}
            </a>
            <a href="#lookbook" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#D8B4E2]">
              {lang === 'ar' ? 'أرشيف إنستغرام (24)' : '24-Post Instagram Lookbook'}
            </a>
            <a href="#calm-corner" onClick={() => setMobileMenuOpen(false)} className="block text-[#F9D5E5]">
              Little Calm Corner ☁️
            </a>
            <div className="pt-2 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setLightMode((m) => !m);
                  setMobileMenuOpen(false);
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-sans bg-white/10 text-white ring-1 ring-white/20"
              >
                {lightMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-[#F3E5AB]" />}
                <span>
                  {lightMode
                    ? lang === 'ar'
                      ? 'الوضع الليلي الملكي'
                      : 'Switch to Obsidian Nacre (Dark)'
                    : lang === 'ar'
                    ? 'الوضع النهاري اللؤلؤي'
                    : 'Switch to Cloud Silk (Light)'}
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSurpriseModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-sans bg-[#D8B4E2] text-black font-semibold"
              >
                <Crown className="w-4 h-4" />
                <span>{lang === 'ar' ? 'رسالة مفاجأة لإحسان 💌' : 'Surprise For Ihsane (@ihsane__ft)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          HERO SECTION — FUTURISTIC NACRE & CRYSTAL HAUTE COUTURE
         ===================================================================== */}
      <main id="top" className="relative z-10">
        <section className="pt-24 sm:pt-36 md:pt-40 pb-14 sm:pb-20 md:pb-32 px-3.5 sm:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Editorial Typography & Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-7">
              {/* Eyebrow Tag */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 sm:px-3.5 py-1.5 text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.22em] font-medium ${
                    lightMode
                      ? 'bg-purple-950/5 text-purple-950 ring-1 ring-purple-950/15'
                      : 'bg-white/[0.05] text-[#E5D4ED] ring-1 ring-white/15'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-[#D8B4E2] shrink-0" />
                  <span>
                    {lang === 'ar'
                      ? 'دار بِيرْلي للصناعة اليدوية 🔮 · المغرب 🇲🇦'
                      : 'MAISON PEARLIE HANDCRAFTED 🔮 · MOROCCO 🇲🇦'}
                  </span>
                </span>

                <button
                  type="button"
                  onClick={() => setManifestoOpen(true)}
                  className="press-feedback inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[9px] sm:text-[10px] uppercase tracking-[0.14em] sm:tracking-[0.18em] bg-[#D8B4E2]/15 text-[#D8B4E2] ring-1 ring-[#D8B4E2]/30"
                >
                  <span>{lang === 'ar' ? 'بيان دار بِيرْلي' : 'Read Pearlie Manifesto'}</span>
                  <span>↗</span>
                </button>
              </div>

              {/* Massive Haute Couture Display Heading (Bouazzi Maghribi when Arabic!) */}
              <h1
                className={
                  lang === 'ar'
                    ? 'font-maghribi text-4xl sm:text-6xl xl:text-[4.65rem] font-normal leading-[1.42] tracking-normal'
                    : 'font-display text-4xl sm:text-7xl xl:text-[5.25rem] font-light tracking-tight leading-[1.02] sm:leading-[0.98]'
                }
              >
                {lang === 'ar' ? (
                  <>
                    أَنَاقَةُ الدُّرِّ، تَفَرُّدُ الرُّوحِ،{' '}
                    <span className="text-[#F3E5AB]">وَإِحْسَانُ الصَّنْعَةِ</span> بِحُبٍّ.
                  </>
                ) : lang === 'fr' ? (
                  <>
                    L’élégance, la singularité &{' '}
                    <span className={lightMode ? 'italic font-normal text-nacre-daylight' : 'italic font-normal text-nacre-gradient'}>
                      le charme nacré
                    </span>{' '}
                    du futur.
                  </>
                ) : (
                  <>
                    Elegance, individuality &{' '}
                    <span className={lightMode ? 'italic font-normal text-nacre-daylight' : 'italic font-normal text-nacre-gradient'}>
                      luminous charm
                    </span>{' '}
                    woven by hand.
                  </>
                )}
              </h1>

              {/* Featured Maghribi Calligraphic Poetic Couplet Banner */}
              <div
                dir="rtl"
                className={`rounded-2xl p-3.5 sm:p-4 transition-all ${
                  lightMode
                    ? 'bg-amber-950/[0.04] ring-1 ring-amber-900/15'
                    : 'bg-[#F3E5AB]/[0.06] ring-1 ring-[#F3E5AB]/25'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="font-maghribi text-lg sm:text-xl md:text-2xl text-[#F3E5AB] leading-[1.85] text-center sm:text-right">
                    « نَظَمَتْ أَنَامِلُهَا الجَمَالَ لَآلِئَا ❖ فَغَدَا البَرِيقُ عَلَى الحَرِيرِ مَعَانِيَا »
                  </div>
                  <a
                    href="#diwan"
                    className="press-feedback shrink-0 self-center sm:self-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-medium bg-[#F3E5AB]/20 text-[#F3E5AB] ring-1 ring-[#F3E5AB]/40"
                  >
                    <span>{lang === 'ar' ? 'اقرئي الديوان كاملاً 📜' : 'Diwan المغربي 📜'}</span>
                  </a>
                </div>
                {lang !== 'ar' && (
                  <p dir="ltr" className="text-[11px] italic opacity-70 mt-1 text-center sm:text-left font-display">
                    “Her fingertips strung beauty into luminous pearls, turning shimmer upon silk into poetry.” — Set in Bouazzi Maghribi Calligraphy
                  </p>
                )}
              </div>

              {/* Subtitle / Manifesto Quote */}
              <p
                className={`text-sm sm:text-lg leading-relaxed max-w-2xl ${
                  lightMode ? 'text-stone-600' : 'text-white/75'
                }`}
              >
                {lang === 'ar'
                  ? '« نوع من الجمال الهادئ الذي لا يحتاج إلى ضجيج ليُلفت الأنظار. تذكير لطيف بأنكِ مرئية، متفردة، جميلة وكافية. » — حقائب وميداليات من اللؤلؤ والكريستال من إبداع إحسان (@_pearlie.dreamy). التوصيل متوفر لجميع أنحاء المغرب 🚚🇲🇦'
                  : lang === 'fr'
                  ? '« Une beauté qui n’a pas besoin de faire du bruit pour être remarquée. Un doux rappel que vous êtes vue, unique, belle et suffisante. » — Sacs de soirée en cristal & perles façonnés à la main par Ihsane (@_pearlie.dreamy). Livraison partout au Maroc 🚚🇲🇦.'
                  : '“A kind of beauty that doesn’t need to be loud to be noticed. A soft reminder that you are seen, unique, beautiful & enough.” — Handcrafted crystal kiss-lock bags, mother-of-pearl totes & custom A–Z charms by Ihsane (@_pearlie.dreamy). Delivery all over Morocco 🚚🇲🇦.'}
              </p>

              {/* Interactive 3D Pearl Light-Spectrum Switcher */}
              <div className="pt-0.5">
                <div className="text-[10px] font-mono-tech uppercase tracking-[0.18em] opacity-60 mb-2">
                  {lang === 'ar'
                    ? 'إضاءة اللؤلؤ التفاعلية ثلاثية الأبعاد:'
                    : lang === 'fr'
                    ? 'Spectre Lumineux 3D Interactif :'
                    : 'Interactive 3D Pearl Refraction Spectrum:'}
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {(
                    [
                      {
                        id: 'nacre',
                        label: lang === 'ar' ? 'لؤلؤ اللافندر 🔮' : 'Nacre Lavender 🔮',
                        dot: '#D8B4E2',
                      },
                      {
                        id: 'ruby',
                        label: lang === 'ar' ? 'ياقوت الأميرة 🥀' : 'Ruby Empress 🥀',
                        dot: '#E01E37',
                      },
                      {
                        id: 'noir',
                        label: lang === 'ar' ? 'سواد السيرافيم 🖤' : 'Noir Seraphim 🖤',
                        dot: '#D4AF37',
                      },
                      {
                        id: 'mint',
                        label: lang === 'ar' ? 'سيليستين الزمردي 🫧' : 'Celestine Mint 🫧',
                        dot: '#7FD1B9',
                      },
                      {
                        id: 'amber',
                        label: lang === 'ar' ? 'عسلي الكهرمان 🍯' : 'Amber Honey 🍯',
                        dot: '#E39D52',
                      },
                    ] as { id: PearlSpectrum; label: string; dot: string }[]
                  ).map((sp) => (
                    <button
                      key={sp.id}
                      type="button"
                      onClick={() => setSpectrum(sp.id)}
                      className={`press-feedback px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs flex items-center gap-1.5 sm:gap-2 transition-all ${
                        spectrum === sp.id
                          ? lightMode
                            ? 'bg-purple-950 text-white shadow-sm'
                            : 'bg-white/15 text-white ring-1 ring-[#D8B4E2]'
                          : lightMode
                          ? 'bg-stone-200/70 text-stone-700 hover:bg-stone-300/70'
                          : 'bg-white/[0.04] text-white/65 hover:bg-white/[0.08] ring-1 ring-white/10'
                      }`}
                    >
                      <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full shrink-0" style={{ background: sp.dot }} />
                      <span>{sp.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary CTAs — Button-in-Button Architecture */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-1">
                <a
                  href="#boutique"
                  className="press-feedback group rounded-full pl-6 pr-2 py-2 bg-gradient-to-r from-[#E5D4ED] via-[#F9D5E5] to-[#D8B4E2] text-[#09060E] font-semibold text-xs sm:text-sm flex items-center justify-between sm:justify-start gap-3 sm:gap-4 shadow-[0_0_35px_rgba(216,180,226,0.4)]"
                >
                  <span>
                    {lang === 'ar'
                      ? 'اكتشفي المجموعة الكاملة'
                      : lang === 'fr'
                      ? 'Explorer la Collection'
                      : 'Explore Couture Collection'}
                  </span>
                  <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/15 flex items-center justify-center transition-transform duration-200 ease-out-strong group-hover:translate-x-1 group-hover:-translate-y-[1px] shrink-0">
                    ↗
                  </span>
                </a>

                <a
                  href="#bespoke"
                  className={`press-feedback group rounded-full pl-5 pr-2 py-2 text-xs sm:text-sm font-medium flex items-center justify-between sm:justify-start gap-3 ring-1 ${
                    lightMode
                      ? 'bg-white text-stone-900 ring-purple-950/15 shadow-sm'
                      : 'bg-white/[0.05] hover:bg-white/[0.1] text-white ring-white/15'
                  }`}
                >
                  <span>
                    {lang === 'ar'
                      ? 'صمّمي قطعتكِ الخاصة (A–Z)'
                      : lang === 'fr'
                      ? 'Créer Sur-Mesure (A–Z)'
                      : 'Custom Atelier Builder'}
                  </span>
                  <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-200 ease-out-strong group-hover:translate-x-1 group-hover:-translate-y-[1px] shrink-0">
                    ✨
                  </span>
                </a>
              </div>

              {/* Live Brand Telemetry */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-white/10 max-w-xl">
                <div>
                  <div className="font-display text-xl sm:text-3xl font-semibold text-[#D8B4E2]">
                    100%
                  </div>
                  <div className="text-[10px] sm:text-[11px] opacity-65">
                    {lang === 'ar' ? 'صناعة يدوية حبةً بحبة' : 'Hand-Knotted Pearls & Crystals'}
                  </div>
                </div>
                <div>
                  <div className="font-display text-xl sm:text-3xl font-semibold text-[#F9D5E5]">
                    26+
                  </div>
                  <div className="text-[10px] sm:text-[11px] opacity-65">
                    {lang === 'ar' ? 'تصميم حصري وميدالية' : 'Signature Creations & Reels'}
                  </div>
                </div>
                <div>
                  <div className="font-display text-xl sm:text-3xl font-semibold text-[#C9F0E4]">
                    🚚 🇲🇦
                  </div>
                  <div className="text-[10px] sm:text-[11px] opacity-65">
                    {lang === 'ar' ? 'توصيل لكل مدن المغرب' : 'Delivery All Over Morocco'}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Double-Bezel Interactive Hero Showcase (5 cols) */}
            <div className="lg:col-span-5">
              <div
                className={`p-2 rounded-[2.25rem] ${
                  lightMode
                    ? 'bg-purple-950/[0.04] ring-1 ring-purple-950/10 shadow-xl'
                    : 'bg-white/[0.04] ring-1 ring-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.65)]'
                }`}
              >
                <div
                  className={`rounded-[calc(2.25rem-0.5rem)] p-4 sm:p-5 relative overflow-hidden ${
                    lightMode
                      ? 'bg-white'
                      : 'bg-[#110C1A] shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)]'
                  }`}
                >
                  {/* Top Bar Inside Card */}
                  <div className="flex items-center justify-between text-[11px] font-mono-tech mb-3 px-1">
                    <span className="text-[#D8B4E2] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#C9F0E4] animate-pulse" />
                      <span>{currentHeroProduct.code} // {currentHeroProduct.collectionTag}</span>
                    </span>
                    <span className="opacity-65">{currentHeroProduct.beadCount} BEADS</span>
                  </div>

                  {/* Main Featured Product Photo */}
                  <div
                    onClick={() => openProductModal(currentHeroProduct)}
                    className="relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer group"
                  >
                    <img
                      src={currentHeroProduct.image}
                      alt={currentHeroProduct.title[lang]}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out-strong group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                    {currentHeroProduct.badge && (
                      <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[10px] font-mono-tech uppercase tracking-widest bg-black/65 backdrop-blur-md text-[#F3E5AB] ring-1 ring-[#F3E5AB]/30">
                        {currentHeroProduct.badge}
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-xs text-[#F9D5E5] italic mb-1">
                        {currentHeroProduct.subtitle[lang]}
                      </p>
                      <div className="flex items-end justify-between gap-2">
                        <h2 className="font-display text-2xl sm:text-3xl font-medium leading-tight">
                          {currentHeroProduct.title[lang]}
                        </h2>
                        <span className="font-mono-tech text-base font-semibold text-[#F3E5AB] shrink-0">
                          {currentHeroProduct.priceMAD} MAD
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Thumbnail Carousel Switcher */}
                  <div className="grid grid-cols-6 gap-2 mt-3.5">
                    {heroProducts.map((prod, idx) => (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => setHeroShowcaseIndex(idx)}
                        className={`press-feedback aspect-square rounded-xl overflow-hidden transition-all ${
                          idx === heroShowcaseIndex
                            ? 'ring-2 ring-[#D8B4E2] scale-105'
                            : 'opacity-55 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={prod.image}
                          alt={prod.title.en}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            INSTAGRAM STORY HIGHLIGHTS RIBBON (All 7 Real Highlights)
           ===================================================================== */}
        <section className="py-10 px-4 sm:px-8 max-w-7xl mx-auto">
          <div
            className={`p-2 rounded-[2rem] ${
              lightMode
                ? 'bg-purple-950/[0.03] ring-1 ring-purple-950/10'
                : 'bg-white/[0.025] ring-1 ring-white/10'
            }`}
          >
            <div
              className={`rounded-[calc(2rem-0.5rem)] p-5 sm:p-7 ${
                lightMode
                  ? 'bg-white/90'
                  : 'bg-[#0E0A16]/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <img
                    src="./images/pearlie_dom_00.jpg"
                    alt="@_pearlie.dreamy"
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-[#D8B4E2]"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-xl font-semibold">@_pearlie.dreamy</span>
                      <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded-full bg-[#D8B4E2]/20 text-[#D8B4E2]">
                        OFFICIAL HIGHLIGHTS
                      </span>
                    </div>
                    <p className="text-xs opacity-65">
                      Elegance, individuality & charm 🔮 · For orders & inquiries, DM or WhatsApp 📩
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setManifestoOpen(true)}
                    className="press-feedback px-3.5 py-2 rounded-full text-xs font-medium bg-[#D8B4E2]/15 text-[#D8B4E2] ring-1 ring-[#D8B4E2]/30"
                  >
                    View “Pearlie 💎” Manifesto Card
                  </button>
                  <a
                    href={BRAND_LINKS.pearlieIG}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="press-feedback inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#D8B4E2] text-[#09060E]"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>Follow @_pearlie.dreamy</span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                {HIGHLIGHT_STORIES.map((hl) => (
                  <a
                    key={hl.id}
                    href={hl.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (hl.id === 'pearlie-manifesto') {
                        e.preventDefault();
                        setManifestoOpen(true);
                      }
                    }}
                    className="group flex flex-col items-center text-center"
                  >
                    <div
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 mb-2.5 transition-transform duration-300 ease-out-strong group-hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${hl.accent}, #FFFFFF, #9D4EDD)`,
                      }}
                    >
                      <img
                        src={hl.image}
                        alt={hl.title}
                        className="w-full h-full rounded-full object-cover ring-2 ring-[#09060E]"
                      />
                    </div>
                    <span className="text-xs font-semibold">{hl.title}</span>
                    <span className="text-[11px] opacity-60 line-clamp-1">{hl.subtitle[lang]}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            CURATED HAUTE COUTURE BOUTIQUE (All 16 Handcrafted Products)
           ===================================================================== */}
        <section id="boutique" className="py-24 md:py-32 px-4 sm:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div
                className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] uppercase tracking-[0.22em] font-medium mb-4 ${
                  lightMode
                    ? 'bg-purple-950/5 text-purple-900 ring-1 ring-purple-900/10'
                    : 'bg-white/[0.05] text-[#D8B4E2] ring-1 ring-white/10'
                }`}
              >
                <span>LA BOUTIQUE PEARLIE · HANDCRAFTED ARCHIVE</span>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-light tracking-tight leading-[1.05]">
                {lang === 'ar' ? (
                  <>مجموعات اللؤلؤ والكريستال الفاخرة 💎</>
                ) : lang === 'fr' ? (
                  <>
                    Collections <span className="italic font-normal text-[#D8B4E2]">Cristal & Perles</span> Nacrees.
                  </>
                ) : (
                  <>
                    Signature <span className="italic font-normal text-[#D8B4E2]">Pearl & Crystal</span> Creations.
                  </>
                )}
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" />
              <input
                id="boutique-search-input"
                name="boutiqueSearch"
                aria-label="Search Pearlie creations"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  lang === 'ar'
                    ? 'ابحثي عن حقيبة أو ميدالية...'
                    : lang === 'fr'
                    ? 'Rechercher un sac, porte-clés...'
                    : 'Search bags, keychains, colors...'
                }
                className={`w-full rounded-full pl-10 pr-4 py-2.5 text-xs outline-none ${
                  lightMode
                    ? 'bg-stone-100 text-stone-900 ring-1 ring-stone-300'
                    : 'bg-white/[0.05] text-white ring-1 ring-white/15 focus:ring-[#D8B4E2]'
                }`}
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {(
              [
                {
                  id: 'all',
                  label: {
                    en: `All Creations (${PEARLIE_PRODUCTS.length})`,
                    fr: `Toutes les Créations (${PEARLIE_PRODUCTS.length})`,
                    ar: `جميع الإبداعات (${PEARLIE_PRODUCTS.length})`,
                  },
                },
                {
                  id: 'crystal-bags',
                  label: {
                    en: 'Crystal Kiss-Lock Couture 💎',
                    fr: 'Sacs Cristal Kiss-Lock 💎',
                    ar: 'حقائب الكريستال الفاخرة 💎',
                  },
                },
                {
                  id: 'pearl-bags',
                  label: {
                    en: 'Celestine & Elarielle Pearl Bags 🦢',
                    fr: 'Sacs Perlés Célestine & Elarielle 🦢',
                    ar: 'حقائب اللؤلؤ سيليستين وإلارييل 🦢',
                  },
                },
                {
                  id: 'keychains',
                  label: {
                    en: 'Porte-Clés & Alphabet A–Z 🔑',
                    fr: 'Porte-Clés & Initiales A–Z 🔑',
                    ar: 'ميداليات وحروف اللؤلؤ 🔑',
                  },
                },
                {
                  id: 'mini-cases',
                  label: {
                    en: 'Pearl AirPods & Mini Cases ✨',
                    fr: 'Étuis AirPods & Mini Pochettes ✨',
                    ar: 'حافظات السماعات والميني باوتش ✨',
                  },
                },
              ] as { id: ProductCategory; label: Record<Language, string> }[]
            ).map((tab) => {
              const active = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`press-feedback px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    active
                      ? 'bg-[#D8B4E2] text-[#09060E] font-semibold shadow-[0_0_20px_rgba(216,180,226,0.4)]'
                      : lightMode
                      ? 'bg-stone-200/70 text-stone-700 hover:bg-stone-300/70'
                      : 'bg-white/[0.04] text-white/70 hover:bg-white/10 ring-1 ring-white/10'
                  }`}
                >
                  {tab.label[lang]}
                </button>
              );
            })}
          </div>

          {/* Product Grid — Double-Bezel Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isAdded = justAddedId === product.id;
              return (
                <article
                  key={product.id}
                  className={`hover-lift group p-1.5 rounded-[2rem] flex flex-col ${
                    lightMode
                      ? 'bg-purple-950/[0.03] ring-1 ring-purple-950/10'
                      : 'bg-white/[0.03] ring-1 ring-white/10'
                  }`}
                >
                  <div
                    className={`rounded-[calc(2rem-0.375rem)] p-3.5 flex-1 flex flex-col justify-between ${
                      lightMode
                        ? 'bg-white shadow-sm'
                        : 'bg-[#100B18] shadow-[inset_0_1px_1px_rgba(255,255,255,0.14)]'
                    }`}
                  >
                    <div>
                      {/* Image Container */}
                      <div
                        onClick={() => openProductModal(product)}
                        className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-3.5 cursor-pointer"
                      >
                        <img
                          src={product.image}
                          alt={product.title[lang]}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out-strong group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono-tech bg-black/65 backdrop-blur-md text-white ring-1 ring-white/15">
                          {product.collectionTag}
                        </div>

                        {product.badge && (
                          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[9px] font-mono-tech uppercase tracking-wider bg-[#D8B4E2] text-[#09060E] font-bold">
                            {product.badge}
                          </div>
                        )}

                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                          <div className="flex items-center gap-1">
                            {product.paletteHex.map((hex, idx) => (
                              <span
                                key={idx}
                                className="w-3.5 h-3.5 rounded-full ring-1 ring-white/50 shadow"
                                style={{ background: hex }}
                              />
                            ))}
                          </div>
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono-tech bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full ring-1 ring-white/15">
                            <Eye className="w-3 h-3" />
                            <span>Inspect</span>
                          </span>
                        </div>
                      </div>

                      {/* Metadata & Title */}
                      <div className="px-1">
                        <div className="flex items-center justify-between text-[10px] font-mono-tech opacity-60 mb-1">
                          <span>{product.code}</span>
                          <span>
                            {product.beadCount} beads · {product.craftHours}h craft
                          </span>
                        </div>
                        <h3
                          onClick={() => openProductModal(product)}
                          className="font-display text-xl font-medium leading-snug cursor-pointer hover:text-[#D8B4E2] transition-colors"
                        >
                          {product.title[lang]}
                        </h3>
                        <p className="text-xs opacity-65 line-clamp-2 mt-1 mb-3">
                          {product.description[lang]}
                        </p>
                      </div>
                    </div>

                    {/* Price & Add to Bag CTA */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 px-1">
                      <div>
                        <span className="text-[10px] opacity-60 block">Atelier Price</span>
                        <span className="font-mono-tech text-sm font-semibold text-[#D8B4E2]">
                          {product.priceMAD} MAD
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <a
                          href={product.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View on Instagram"
                          className={`press-feedback w-8 h-8 rounded-full flex items-center justify-center ring-1 ${
                            lightMode
                              ? 'bg-stone-100 text-stone-700 ring-stone-200'
                              : 'bg-white/[0.05] text-white/75 hover:text-white ring-white/15'
                          }`}
                        >
                          <Instagram className="w-3.5 h-3.5" />
                        </a>

                        <button
                          type="button"
                          onClick={() =>
                            handleAddToBag({
                              id: product.id,
                              title: product.title[lang],
                              details: `${product.collectionTag} · ${product.dimensions}`,
                              priceMAD: product.priceMAD,
                              image: product.image,
                            })
                          }
                          className={`press-feedback rounded-full px-3.5 py-2 text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                            isAdded
                              ? 'bg-[#C9F0E4] text-[#09060E]'
                              : 'bg-[#D8B4E2] text-[#09060E] hover:bg-[#e5c7ee]'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>{lang === 'ar' ? 'أضيفي للسلة' : lang === 'fr' ? 'Ajouter' : 'Add to Bag'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* =====================================================================
            DIWAN AL-DURR — ARABIC POETRY IN BOUAZZI MAGHRIBI CALLIGRAPHY
           ===================================================================== */}
        <MaghribiPoetryDiwan lang={lang} lightMode={lightMode} />

        {/* =====================================================================
            INTERACTIVE BESPOKE STUDIO (Custom Bag & Alphabet Keychain Builder)
           ===================================================================== */}
        <BespokeStudio
          lang={lang}
          lightMode={lightMode}
          onAddCustomToBag={(item) => handleAddToBag(item)}
        />

        {/* =====================================================================
            THE SIGNATURE UNBOXING RITUAL ("PACKAGE with me... ♡")
           ===================================================================== */}
        <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
          <div
            className={`p-2 rounded-[2.25rem] ${
              lightMode
                ? 'bg-purple-950/[0.03] ring-1 ring-purple-950/10'
                : 'bg-white/[0.03] ring-1 ring-white/10'
            }`}
          >
            <div
              className={`rounded-[calc(2.25rem-0.5rem)] p-6 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                lightMode
                  ? 'bg-gradient-to-r from-[#F9F4FC] via-white to-[#FDF6F9]'
                  : 'bg-gradient-to-r from-[#140E1F] via-[#0E0A16] to-[#191024] shadow-[inset_0_1px_1px_rgba(255,255,255,0.16)]'
              }`}
            >
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[10px] uppercase tracking-[0.2em] bg-[#D8B4E2]/15 text-[#D8B4E2] ring-1 ring-[#D8B4E2]/30">
                  <Gift className="w-3.5 h-3.5" />
                  <span>THE PEARLIE UNBOXING RITUAL · ORDERS 🎁</span>
                </div>
                <h2 className="font-display text-3xl sm:text-5xl font-light leading-tight">
                  {lang === 'ar' ? (
                    <>كل طلبية تُغلّف كهدية ملكية بشرائط اللافندر وبطاقة شكر خاصة 🎀</>
                  ) : lang === 'fr' ? (
                    <>
                      « Chez Pearlie Handmade, chaque pièce est imaginée et réalisée à la main avec{' '}
                      <span className="italic text-[#F9D5E5]">beaucoup de soin et d’amour</span>. »
                    </>
                  ) : (
                    <>
                      “Every piece is handcrafted with love, wrapped in{' '}
                      <span className="italic text-[#F9D5E5]">lavender silk ribbons</span> & care.”
                    </>
                  )}
                </h2>
                <p className="text-sm opacity-75 leading-relaxed">
                  {lang === 'ar'
                    ? 'تصل طلبيتكِ في علبة هدايا أنيقة مربوطة بشريط ساتان بلون اللافندر، مع بطاقة شكر Pearlie الموقعة وملصقات العلامة، جاهزة للإهداء أو لتدليل نفسكِ.'
                    : lang === 'fr'
                    ? 'Chaque commande Pearlie est préparée comme un précieux cadeau : boîte kraft siglée, ruban de satin lavande noué à la main, carte de remerciement « Made with love & care » et livraison rapide partout au Maroc.'
                    : 'Every Pearlie order arrives in our signature lavender-ribbon gift box with custom Pearlie thank-you cards (“Made with love & care”), round atelier seals, and nationwide delivery across Morocco.'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-white/[0.04] ring-1 ring-white/10">
                    <Truck className="w-4 h-4 text-[#C9F0E4] mb-1.5" />
                    <div className="text-xs font-semibold">All Over Morocco 🇲🇦</div>
                    <div className="text-[11px] opacity-65">Fast doorstep delivery to all cities</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.04] ring-1 ring-white/10">
                    <Gift className="w-4 h-4 text-[#F9D5E5] mb-1.5" />
                    <div className="text-xs font-semibold">Lavender Gift Box</div>
                    <div className="text-[11px] opacity-65">Satin bow & thank-you card included</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.04] ring-1 ring-white/10">
                    <ShieldCheck className="w-4 h-4 text-[#F3E5AB] mb-1.5" />
                    <div className="text-xs font-semibold">Artisan Quality</div>
                    <div className="text-[11px] opacity-65">Hand-knotted bead by bead</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 grid grid-cols-3 gap-3">
                <img
                  src="./images/pearlie_post_17_DcT71PiMiAF.jpg"
                  alt="Package with me Pearlie"
                  className="rounded-2xl aspect-[3/4] object-cover ring-1 ring-white/15"
                />
                <img
                  src="./images/pearlie_dom_03.jpg"
                  alt="Pearlie Lavender Ribbon Gift Box"
                  className="rounded-2xl aspect-[3/4] object-cover ring-1 ring-white/15 translate-y-3"
                />
                <img
                  src="./images/pearlie_post_02_De9_LXExJ8Z.jpg"
                  alt="Pearlie Thank You Cards and Keychains"
                  className="rounded-2xl aspect-[3/4] object-cover ring-1 ring-white/15"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            COMPLETE 24-POST INSTAGRAM LOOKBOOK ARCHIVE (@_pearlie.dreamy)
           ===================================================================== */}
        <section id="lookbook" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-[10px] font-mono-tech uppercase tracking-[0.22em] text-[#D8B4E2] mb-2">
                LIVE SYNCHRONIZED ARCHIVE · @_pearlie.dreamy
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-light">
                {lang === 'ar'
                  ? 'أرشيف إنستغرام الكامل (24 منشوراً وريلز)'
                  : lang === 'fr'
                  ? 'Lookbook Complet Instagram (24 Publications & Reels)'
                  : 'Complete 24-Post Instagram Lookbook & Reels'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {(
                [
                  { id: 'all', label: 'All Posts (24)' },
                  { id: 'photos', label: 'Photos (16)' },
                  { id: 'reels', label: 'Reels 🎬 (8)' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setLookbookFilter(tab.id)}
                  className={`press-feedback px-3.5 py-1.5 rounded-full text-xs font-medium ${
                    lookbookFilter === tab.id
                      ? 'bg-[#D8B4E2] text-[#09060E] font-semibold'
                      : lightMode
                      ? 'bg-stone-200/70 text-stone-700'
                      : 'bg-white/[0.05] text-white/70 ring-1 ring-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
            {filteredLookbook.map((post) => (
              <a
                key={post.shortcode}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-2xl overflow-hidden ring-1 ring-white/15 bg-black"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out-strong group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-3 flex flex-col justify-between text-white">
                  <div className="flex items-center justify-between text-[10px] font-mono-tech">
                    <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                      {post.collection}
                    </span>
                    <span>{post.date}</span>
                  </div>
                  <div>
                    <div className="font-display text-sm font-medium leading-tight mb-1">
                      {post.title}
                    </div>
                    <p className="text-[10px] text-white/75 line-clamp-2">{post.caption}</p>
                  </div>
                </div>
                {post.isReel && (
                  <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white">
                    <Play className="w-3 h-3 fill-current" />
                  </div>
                )}
              </a>
            ))}
          </div>
        </section>

        {/* =====================================================================
            LITTLE CALM CORNER ☁️ SANCTUARY PORTAL (@__little.calmcorner)
           ===================================================================== */}
        <CalmCornerPortal lang={lang} lightMode={lightMode} />

        {/* =====================================================================
            FOUNDER & ARTISAN SECTION — IHSANE FT (@ihsane__ft)
           ===================================================================== */}
        <section className="py-20 px-4 sm:px-8 max-w-5xl mx-auto">
          <div
            className={`p-2 rounded-[2.25rem] ${
              lightMode
                ? 'bg-purple-950/[0.04] ring-1 ring-purple-950/10'
                : 'bg-white/[0.04] ring-1 ring-white/15'
            }`}
          >
            <div
              className={`rounded-[calc(2.25rem-0.5rem)] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 ${
                lightMode
                  ? 'bg-white'
                  : 'bg-gradient-to-br from-[#161023] via-[#0E0A16] to-[#1A1128] shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)]'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                <div className="relative shrink-0">
                  <img
                    src="./images/ihsane_dom_00.jpg"
                    alt="Ihsane Ft (@ihsane__ft)"
                    className="w-24 h-24 rounded-full object-cover ring-2 ring-[#F3E5AB] shadow-xl"
                  />
                  <span className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#D8B4E2] text-[#09060E] flex items-center justify-center shadow">
                    <Crown className="w-4 h-4" />
                  </span>
                </div>
                <div>
                  <div className="text-[10px] font-mono-tech uppercase tracking-[0.22em] text-[#D8B4E2] mb-1">
                    THE CREATOR & FOUNDER · MAISON IHSANE
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-medium mb-1">
                    Ihsane Ft <span className="text-base font-normal opacity-70">(@ihsane__ft)</span>
                  </h3>
                  <div
                    dir="rtl"
                    className="font-maghribi text-lg sm:text-xl text-[#F3E5AB] mb-2 leading-relaxed"
                  >
                    إِحْسَان فَتْحِي — «إِحْسَانُ صَنْعَتِهَا يُشِعُّ نَضَارَةً ❖ كَالبَدْرِ يَنْسِجُ فِي الظَّلَامِ دَرَارِيَا»
                  </div>
                  <p className="text-xs sm:text-sm opacity-75 max-w-xl leading-relaxed">
                    {lang === 'ar'
                      ? 'المؤسسة والمبدعة وراء متجر Pearlie Handcrafted (@_pearlie.dreamy) ومساحة Little Calm Corner (@__little.calmcorner). طالبة هندسة في سنتها الأخيرة تجمع بين دقة التصميم وسحر الصناعة اليدوية.'
                      : lang === 'fr'
                      ? 'Fondatrice et créatrice de Pearlie Handcrafted (@_pearlie.dreamy) et de Little Calm Corner (@__little.calmcorner). Étudiante en dernière année d’ingénierie, elle façonne chaque pièce avec passion.'
                      : 'Founder & artisan behind Pearlie Handcrafted (@_pearlie.dreamy) and Little Calm Corner (@__little.calmcorner) — uniting engineering precision with poetic pearl craftsmanship.'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSurpriseModalOpen(true)}
                className="press-feedback shrink-0 rounded-full px-6 py-3.5 bg-gradient-to-r from-[#D8B4E2] via-[#F9D5E5] to-[#F3E5AB] text-[#09060E] font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_30px_rgba(216,180,226,0.45)]"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span>
                  {lang === 'ar'
                    ? 'افتحي رسالة المفاجأة لإحسان 💌'
                    : lang === 'fr'
                    ? 'Ouvrir la Surprise pour Ihsane 💌'
                    : 'Open Surprise Dedication for Ihsane 💌'}
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          FOOTER
         ===================================================================== */}
      <footer className="relative z-10 border-t border-white/10 py-14 px-4 sm:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs opacity-75">
          <div className="flex items-center gap-3">
            <img
              src="./images/pearlie_dom_00.jpg"
              alt="Pearlie"
              className="w-9 h-9 rounded-full object-cover ring-1 ring-white/20"
            />
            <div>
              <div className="font-display text-lg font-medium">
                Pearlie Handcrafted 🔮 × Little Calm Corner ☁️
              </div>
              <div>Created with love for Ihsane (@ihsane__ft) · Delivery all over Morocco 🚚🇲🇦</div>
              <div dir="rtl" className="font-maghribi text-base sm:text-lg text-[#F3E5AB] mt-1">
                إِحْسَان فَتْحِي (@IhsaneFathi) ❖ أُسَامَة الحَاجِي (@Bosaj)
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={BRAND_LINKS.pearlieIG}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D8B4E2] inline-flex items-center gap-1"
            >
              <span>@_pearlie.dreamy</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={BRAND_LINKS.calmCornerIG}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F9D5E5] inline-flex items-center gap-1"
            >
              <span>@__little.calmcorner</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={BRAND_LINKS.ihsaneIG}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F3E5AB] inline-flex items-center gap-1"
            >
              <span>@ihsane__ft</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={BRAND_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C9F0E4] inline-flex items-center gap-1 font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          PRODUCT INSPECTOR MODAL
         ===================================================================== */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl"
          role="dialog"
          aria-modal="true"
        >
          <div className="animate-modal-enter relative w-full max-w-4xl p-2 rounded-[2.25rem] bg-white/[0.06] ring-1 ring-white/20 max-h-[92dvh] overflow-y-auto">
            <div className="rounded-[calc(2.25rem-0.5rem)] bg-[#100B18] text-white p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-7 relative">
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                aria-label="Close inspector"
                className="press-feedback absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left: Photo & Multi-Angle Gallery */}
              <div className="md:col-span-6 space-y-3">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-white/15 bg-black">
                  <img
                    src={activeGalleryImg || selectedProduct.image}
                    alt={selectedProduct.title[lang]}
                    className="w-full h-full object-cover"
                  />
                </div>
                {selectedProduct.gallery.length > 1 && (
                  <div className="flex gap-2">
                    {selectedProduct.gallery.map((imgUrl, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveGalleryImg(imgUrl)}
                        className={`w-16 h-16 rounded-xl overflow-hidden ring-2 transition-all ${
                          (activeGalleryImg || selectedProduct.image) === imgUrl
                            ? 'ring-[#D8B4E2] scale-105'
                            : 'ring-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Craft Specs & Order Controls */}
              <div className="md:col-span-6 flex flex-col justify-between space-y-5">
                <div>
                  <div className="text-[11px] font-mono-tech text-[#D8B4E2] mb-1">
                    {selectedProduct.code} · {selectedProduct.collectionTag} · {selectedProduct.date}
                  </div>
                  <h3 className="font-display text-3xl font-medium leading-tight mb-2">
                    {selectedProduct.title[lang]}
                  </h3>
                  <div className="font-mono-tech text-2xl font-semibold text-[#F3E5AB] mb-4">
                    {selectedProduct.priceMAD} MAD
                  </div>
                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed mb-4">
                    {selectedProduct.description[lang]}
                  </p>

                  {/* Materials List */}
                  <div className="space-y-1.5 mb-4">
                    <div className="text-[10px] font-mono-tech uppercase tracking-widest opacity-60">
                      Artisan Specifications & Materials
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.materials[lang].map((mat) => (
                        <span
                          key={mat}
                          className="px-2.5 py-1 rounded-full text-[11px] bg-white/[0.06] ring-1 ring-white/10"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Optional Initial Selector */}
                  <div className="p-3.5 rounded-2xl bg-white/[0.04] ring-1 ring-white/10 mb-4">
                    <label className="text-[11px] font-mono-tech uppercase tracking-wider text-[#D8B4E2] block mb-2">
                      Add Personalized Initial Charm (Optional): Letter “{customInitialForModal}”
                    </label>
                    <div className="flex flex-wrap gap-1">
                      {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => setCustomInitialForModal(l)}
                          className={`w-6 h-6 rounded-full text-[10px] font-bold ${
                            customInitialForModal === l
                              ? 'bg-[#D8B4E2] text-black'
                              : 'bg-white/10 text-white/70 hover:bg-white/20'
                          }`}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 ring-1 ring-white/10 text-[11px] text-white/70 italic">
                    Original Instagram Caption: “{selectedProduct.originalCaption}”
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleAddToBag({
                        id: `${selectedProduct.id}-${customInitialForModal}`,
                        title: selectedProduct.title[lang],
                        details: `${selectedProduct.collectionTag} · Initial Charm "${customInitialForModal}"`,
                        priceMAD: selectedProduct.priceMAD,
                        image: selectedProduct.image,
                      });
                      setSelectedProduct(null);
                      setBagOpen(true);
                    }}
                    className="press-feedback w-full rounded-full py-3 px-6 bg-[#D8B4E2] text-[#09060E] font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(216,180,226,0.4)]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Pearlie Bag ({selectedProduct.priceMAD} MAD)</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={BRAND_LINKS.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="press-feedback rounded-full py-2.5 px-4 bg-white/10 hover:bg-white/15 text-xs font-medium flex items-center justify-center gap-1.5 ring-1 ring-white/15"
                    >
                      <Send className="w-3.5 h-3.5 text-[#C9F0E4]" />
                      <span>Order via WhatsApp</span>
                    </a>
                    <a
                      href={selectedProduct.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="press-feedback rounded-full py-2.5 px-4 bg-white/10 hover:bg-white/15 text-xs font-medium flex items-center justify-center gap-1.5 ring-1 ring-white/15"
                    >
                      <Instagram className="w-3.5 h-3.5 text-[#F9D5E5]" />
                      <span>View Original Post</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          PEARLIE MANIFESTO MODAL (Her Real Highlight Cover pearlie_dom_07.jpg)
         ===================================================================== */}
      {manifestoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl"
          role="dialog"
          aria-modal="true"
        >
          <div className="animate-modal-enter relative w-full max-w-lg p-2 rounded-[2rem] bg-white/[0.06] ring-1 ring-white/20">
            <div className="rounded-[calc(2rem-0.5rem)] bg-[#120D1B] p-6 text-white relative">
              <button
                type="button"
                onClick={() => setManifestoOpen(false)}
                className="press-feedback absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center z-10"
              >
                <X className="w-4 h-4" />
              </button>
              <img
                src="./images/pearlie_dom_07.jpg"
                alt="Welcome to Pearlie Manifesto"
                className="w-full rounded-2xl object-cover mb-4 ring-1 ring-white/15"
              />
              <blockquote className="font-display text-xl italic text-center text-[#F3E5F8] leading-relaxed">
                “Welcome to Pearlie — that represents a kind of beauty that doesn’t need to be loud to be noticed. A soft reminder that you are seen, unique, beautiful & enough. Every piece is handcrafted with love, to make you shine in your own way.”
              </blockquote>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          SHOPPING BAG & WHATSAPP CONCIERGE DRAWER
         ===================================================================== */}
      {bagOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-xl">
          <div className="animate-modal-enter w-full max-w-md bg-[#0F0B17] text-white h-full p-6 flex flex-col justify-between ring-1 ring-white/15 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#D8B4E2]" />
                <h3 className="font-display text-2xl font-medium">Your Pearlie Bag</h3>
              </div>
              <button
                type="button"
                onClick={() => setBagOpen(false)}
                className="press-feedback w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Bag Items */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {bagItems.length === 0 ? (
                <div className="text-center py-16 opacity-60">
                  <p className="font-display text-2xl mb-2">Your Pearlie Bag is empty 🤍</p>
                  <p className="text-xs">Explore our handcrafted bags & custom keychains to add pieces.</p>
                </div>
              ) : (
                bagItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-white/[0.04] ring-1 ring-white/10 flex items-center gap-3.5"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-base font-medium truncate">{item.title}</div>
                      <div className="text-[11px] opacity-65 truncate">{item.details}</div>
                      <div className="text-xs font-mono-tech text-[#F3E5AB] mt-1">
                        {item.priceMAD * item.qty} MAD
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => updateBagQty(item.id, -1)}
                        className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-mono-tech w-4 text-center">{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => updateBagQty(item.id, 1)}
                        className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => updateBagQty(item.id, -item.qty)}
                        className="w-6 h-6 rounded-full bg-red-500/20 text-red-300 flex items-center justify-center ml-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Checkout Concierge Footer */}
            {bagItems.length > 0 && (
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label
                      htmlFor="checkout-city-select"
                      className="text-[10px] font-mono-tech uppercase opacity-65 block mb-1"
                    >
                      Moroccan City 🇲🇦
                    </label>
                    <select
                      id="checkout-city-select"
                      name="checkoutCity"
                      value={checkoutCity}
                      onChange={(e) => setCheckoutCity(e.target.value)}
                      className="w-full rounded-xl px-3 py-2 text-xs bg-[#191226] text-white ring-1 ring-white/15 outline-none"
                    >
                      {MOROCCAN_CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="checkout-note-input"
                      className="text-[10px] font-mono-tech uppercase opacity-65 block mb-1"
                    >
                      Gift Ribbon Note
                    </label>
                    <input
                      id="checkout-note-input"
                      name="checkoutNote"
                      type="text"
                      value={checkoutNote}
                      onChange={(e) => setCheckoutNote(e.target.value)}
                      placeholder="Optional note..."
                      className="w-full rounded-xl px-3 py-2 text-xs bg-[#191226] text-white ring-1 ring-white/15 outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm py-1">
                  <span className="opacity-75">Estimated Total</span>
                  <span className="font-mono-tech text-lg font-semibold text-[#F3E5AB]">
                    {totalBagMAD} MAD
                  </span>
                </div>

                <a
                  href={BRAND_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    try {
                      navigator.clipboard?.writeText(buildWhatsAppCheckoutText());
                    } catch {
                      // ignore
                    }
                  }}
                  className="press-feedback w-full rounded-full py-3 px-5 bg-[#D8B4E2] text-[#09060E] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(216,180,226,0.4)]"
                >
                  <Send className="w-4 h-4" />
                  <span>Confirm Order via WhatsApp Concierge 📩</span>
                </a>
                <p className="text-[10px] text-center opacity-60">
                  Your order summary is automatically copied to clipboard when you click above 🤍
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          FOUNDER SURPRISE MODAL FOR IHSANE (@ihsane__ft)
         ===================================================================== */}
      <FounderSurpriseModal
        isOpen={surpriseModalOpen}
        onClose={() => setSurpriseModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
export default App;
