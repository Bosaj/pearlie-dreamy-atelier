import React, { useState } from 'react';
import { Sparkles, Check, Send, ShoppingBag, Gift, MapPin, Type, Palette, ShieldCheck } from 'lucide-react';
import { BRAND_LINKS, Language, MOROCCAN_CITIES } from '../data/atelierData';

interface BespokeStudioProps {
  lang: Language;
  lightMode: boolean;
  onAddCustomToBag: (item: {
    id: string;
    title: string;
    details: string;
    priceMAD: number;
    image: string;
  }) => void;
}

type SilhouetteId = 'kiss-lock-bag' | 'celestine-tote' | 'alphabet-keychain' | 'coquette-bow' | 'airpods-case';

interface SilhouetteOption {
  id: SilhouetteId;
  name: Record<Language, string>;
  basePriceMAD: number;
  beadCount: number;
  craftHours: number;
  previewImage: string;
  desc: Record<Language, string>;
}

const SILHOUETTES: SilhouetteOption[] = [
  {
    id: 'kiss-lock-bag',
    name: {
      en: 'Crystal Kiss-Lock Couture Clutch',
      fr: 'Sac Cristal Fermoir Kiss-Lock Couture',
      es: 'Bolso de Cristal con Cierre Kiss-Lock Couture',
      ar: 'حقيبة الكريستال بقفل كلاسيكي ذهبي',
    },
    basePriceMAD: 450,
    beadCount: 1220,
    craftHours: 19,
    previewImage: './images/pearlie_post_06_DeZm3JiAHbX.webp',
    desc: {
      en: 'Hand-knotted faceted crystal evening clutch with sculpted handle & gold chain.',
      fr: 'Pochette de soirée en cristal facetté tissée main avec poignée sculptée et chaîne.',
      es: 'Clutch de noche de cristal facetado tejido a mano con asa esculpida y cadena dorada.',
      ar: 'حقيبة سهرة منسوجة يدوياً من الكريستال اللامع مع مقبض منحوت وسلسلة كتف.',
    },
  },
  {
    id: 'celestine-tote',
    name: {
      en: 'Celestine Pearl Handbag',
      fr: 'Sac à Main Perlé Célestine',
      es: 'Bolso de Perlas Célestine',
      ar: 'حقيبة سيليستين اللؤلؤية الفاخرة',
    },
    basePriceMAD: 410,
    beadCount: 920,
    craftHours: 16,
    previewImage: './images/pearlie_post_21_DcDtMK6M7WE.webp',
    desc: {
      en: 'Lustrous mother-of-pearl weave with optional crystal ribbon inlay or lattice work.',
      fr: 'Tissage nacré lumineux avec ruban de cristal incrusté ou résille losangée.',
      es: 'Tejido nacarado luminoso con cinta de cristal incrustada o celosía de diamante.',
      ar: 'حياكة لؤلؤية متقنة مع شريط كريستالي أو تصميم شبكي ماسي.',
    },
  },
  {
    id: 'alphabet-keychain',
    name: {
      en: '3D Alphabet Initial Keychain (A–Z)',
      fr: 'Porte-Clés Initiale Alphabet 3D (A–Z)',
      es: 'Llavero Inicial Alfabeto 3D (A–Z)',
      ar: 'ميدالية الحرف الأبجدي ثلاثية الأبعاد (A–Z)',
    },
    basePriceMAD: 65,
    beadCount: 165,
    craftHours: 3,
    previewImage: './images/pearlie_post_01_DfCaeP3gDfd.webp',
    desc: {
      en: 'Your custom initial woven in double-layer pearls and crystal trim.',
      fr: 'Votre lettre personnalisée tissée en double couche de perles et cristaux.',
      es: 'Tu letra personalizada tejida en doble capa de perlas y ribete de cristal.',
      ar: 'حرفكِ الخاص منسوج بطبقتين من اللؤلؤ الأبيض وتطعيمات الكريستال.',
    },
  },
  {
    id: 'coquette-bow',
    name: {
      en: 'Coquette Pearl & Crystal Bow Charm',
      fr: 'Bijou de Sac Nœud Coquette Perles & Cristal',
      es: 'Charm Lazo Coquette de Perlas y Cristal',
      ar: 'تعليقة فيونكة اللؤلؤ والكريستال',
    },
    basePriceMAD: 50,
    beadCount: 115,
    craftHours: 2,
    previewImage: './images/pearlie_post_13_DdCJ1Syg_ft.webp',
    desc: {
      en: 'Graduated nacre pearls & faceted crystal loops for your bag or keys.',
      fr: 'Perles graduées et boucles de cristal facetté pour votre sac ou vos clés.',
      es: 'Perlas graduadas y lazadas de cristal facetado para tu bolso o tus llaves.',
      ar: 'فيونكة أنيقة من اللؤلؤ المتدرج والكريستال لمفاتيحك أو حقيبتك.',
    },
  },
  {
    id: 'airpods-case',
    name: {
      en: 'Nacre Pearl AirPods & Mini Case',
      fr: 'Étui AirPods & Mini Pochette Perlée',
      es: 'Estuche para AirPods y Mini Bolsito de Perlas',
      ar: 'حافظة سماعات وميني باوتش باللؤلؤ',
    },
    basePriceMAD: 140,
    beadCount: 310,
    craftHours: 6,
    previewImage: './images/pearlie_post_15_DchDdcQxhts.webp',
    desc: {
      en: 'Custom snap-closure pearl mini pouch with beaded wristlet strap.',
      fr: 'Mini écrin en perles avec bouton-pression et dragonne perlée.',
      es: 'Mini estuche de perlas con cierre a presión y muñequera de perlas.',
      ar: 'حافظة لؤلؤية صغيرة بزر إغلاق معدني وسوار معصم من اللؤلؤ.',
    },
  },
];

const PALETTE_SWATCHES = [
  { id: 'nacre-ivory', name: 'Nacre Ivory 🤍', primary: '#FAF7F2', secondary: '#E5D4ED', ring: '#FFFFFF' },
  { id: 'noir-onyx', name: 'Midnight Onyx 🖤', primary: '#121117', secondary: '#D4AF37', ring: '#2E2A3B' },
  { id: 'ruby-crimson', name: 'Ruby Empress 🥀', primary: '#9E0B22', secondary: '#F4A2B0', ring: '#D4AF37' },
  { id: 'lavender-dream', name: 'Elarielle Lavender 💜', primary: '#C8A2D6', secondary: '#FAF7F2', ring: '#E6CCF2' },
  { id: 'celestine-mint', name: 'Celestine Mint 🫧', primary: '#7FD1B9', secondary: '#FAF7F2', ring: '#B6F0DE' },
  { id: 'amber-honey', name: 'Amber Honey 🍯', primary: '#C87628', secondary: '#F3E5AB', ring: '#E69F52' },
  { id: 'champagne-rose', name: 'Champagne Rose 🎀', primary: '#E8B4B8', secondary: '#FFFDF9', ring: '#F4D4D7' },
];

const HARDWARE_OPTIONS = [
  { id: 'gold-24k', label: { en: '24K-Tone Gold Clasp & Chain', fr: 'Fermoir & Chaîne Doré Or', es: 'Cierre y Cadena Dorados', ar: 'إطار وسلسلة باللون الذهبي' } },
  { id: 'silver-luxe', label: { en: 'Polished Silver Hardware', fr: 'Finition Argent Poli', es: 'Herrajes de Plata Pulida', ar: 'إطار وسلسلة باللون الفضي' } },
  { id: 'lavender-satin', label: { en: 'Pearl + Lavender Satin Ribbon', fr: 'Perles + Ruban Satin Lavande', es: 'Perlas + Cinta de Satén Lavanda', ar: 'لؤلؤ مع شريط ساتان لافندر' } },
];

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const BespokeStudio: React.FC<BespokeStudioProps> = ({ lang, lightMode, onAddCustomToBag }) => {
  const [silhouette, setSilhouette] = useState<SilhouetteId>('kiss-lock-bag');
  const [paletteId, setPaletteId] = useState<string>('nacre-ivory');
  const [hardwareId, setHardwareId] = useState<string>('gold-24k');
  const [initialLetter, setInitialLetter] = useState<string>('I');
  const [city, setCity] = useState<string>('Berkane');
  const [giftNote, setGiftNote] = useState<string>('With love & calm wishes ✨');
  const [addedFeedback, setAddedFeedback] = useState(false);

  const activeSilhouette = SILHOUETTES.find((s) => s.id === silhouette) || SILHOUETTES[0];
  const activePalette = PALETTE_SWATCHES.find((p) => p.id === paletteId) || PALETTE_SWATCHES[0];
  const activeHardware = HARDWARE_OPTIONS.find((h) => h.id === hardwareId) || HARDWARE_OPTIONS[0];

  const buildOrderMessage = () => {
    return [
      `✨ *PEARLIE BESPOKE ATELIER ORDER* 🔮`,
      `• *Creation*: ${activeSilhouette.name.en}`,
      `• *Colorway*: ${activePalette.name}`,
      `• *Hardware*: ${activeHardware.label.en}`,
      `• *Custom Monogram / Initial*: Letter "${initialLetter}"`,
      `• *Delivery City (Morocco)*: ${city} 🚚🇲🇦`,
      `• *Gift Ribbon Note*: "${giftNote || 'Standard Pearlie Lavender Gift Box'}"`,
      `• *Estimated Price*: ${activeSilhouette.basePriceMAD} MAD`,
      ``,
      `Salam Pearlie! I designed this custom piece on your website and would love to order it 🤍`,
    ].join('\n');
  };

  const handleAddBespoke = () => {
    onAddCustomToBag({
      id: `custom-${silhouette}-${paletteId}-${initialLetter}-${Date.now()}`,
      title: `${activeSilhouette.name[lang]} (${activePalette.name})`,
      details: `Initial "${initialLetter}" · ${activeHardware.label[lang]} · ${city}`,
      priceMAD: activeSilhouette.basePriceMAD,
      image: activeSilhouette.previewImage,
    });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2200);
  };

  return (
    <section id="atelier-customizer" className="relative py-24 md:py-36 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="max-w-3xl mb-14">
        <div
          className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] uppercase tracking-[0.22em] font-medium mb-5 ${
            lightMode
              ? 'bg-purple-950/5 text-purple-900 ring-1 ring-purple-900/10'
              : 'bg-white/[0.05] text-[#E5D4ED] ring-1 ring-white/10'
          }`}
        >
          <Sparkles className="w-3 h-3 text-[#D8B4E2]" strokeWidth={1.5} />
          <span>
            {lang === 'ar'
              ? 'استوديو التصميم المخصص · صممي قطعتكِ الفريدة'
              : lang === 'fr'
              ? 'Atelier Sur-Mesure · Créez Votre Pièce Unique'
              : lang === 'es' ? 'Atelier a Medida · Crea Tu Pieza Única' : 'Bespoke Holographic Atelier · Co-Create With Ihsane'}
          </span>
        </div>

        <h2 className="font-display text-4xl sm:text-6xl font-light tracking-tight leading-[1.06] mb-4">
          {lang === 'ar' ? (
            <>صمّمي تحفتكِ اللؤلؤية الخاصة بالطلب 🔮</>
          ) : lang === 'fr' ? (
            <>
              Façonnez votre <span className="italic font-normal text-[#D8B4E2]">création sur-mesure</span> perle par perle.
            </>
          ) : lang === 'es' ? (
            <>
              Da forma a tu <span className="italic font-normal text-[#D8B4E2]">creación a medida</span> perla a perla.
            </>
          ) : (
            <>
              Architect your own <span className="italic font-normal text-[#D8B4E2]">bespoke pearl</span> heirloom.
            </>
          )}
        </h2>
        <p className={`text-sm sm:text-base leading-relaxed ${lightMode ? 'text-stone-600' : 'text-white/65'}`}>
          {lang === 'ar'
            ? 'اختاري شكل الحقيبة أو الميدالية، لون اللؤلؤ والكريستال، الحرف الأبجدي الخاص بكِ، ومدينة التوصيل في المغرب، ثم أرسلي طلبكِ مباشرة عبر واتساب.'
            : lang === 'fr'
            ? 'Choisissez votre silhouette, votre palette de perles ou cristaux, votre initiale A–Z et votre coffret cadeau lavande. Livraison partout au Maroc 🚚🇲🇦.'
            : lang === 'es' ? 'Elige tu silueta, tu paleta de perlas o cristales, tu inicial A–Z y tu caja de regalo lavanda. Envíos a todo Marruecos 🚚🇲🇦.' : 'Every Pearlie creation is hand-knotted to order. Select your silhouette, crystal refraction palette, custom A–Z monogram charm, and lavender gift box note.'}
        </p>
      </div>

      {/* Double-Bezel Main Configurator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Controls (7 cols) */}
        <div
          className={`lg:col-span-7 p-2 rounded-[2rem] ${
            lightMode
              ? 'bg-purple-950/[0.03] ring-1 ring-purple-950/10'
              : 'bg-white/[0.03] ring-1 ring-white/10'
          }`}
        >
          <div
            className={`rounded-[calc(2rem-0.5rem)] p-6 sm:p-8 space-y-8 ${
              lightMode
                ? 'bg-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]'
                : 'bg-[#100C18]/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.14)]'
            }`}
          >
            {/* Step 1: Silhouette */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs uppercase tracking-[0.2em] font-mono-tech opacity-70 flex items-center gap-2">
                  <span>01</span>
                  <span>·</span>
                  <span>{lang === 'ar' ? 'اختاري التصميم' : lang === 'fr' ? 'Silhouette' : lang === 'es' ? 'Silueta' : 'Select Silhouette'}</span>
                </label>
                <span className="text-xs font-mono-tech text-[#D8B4E2]">
                  {activeSilhouette.beadCount} {lang === 'fr' ? 'perles' : lang === 'es' ? 'perlas' : 'beads'} · ~{activeSilhouette.craftHours}h
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SILHOUETTES.map((item) => {
                  const selected = item.id === silhouette;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSilhouette(item.id)}
                      className={`press-feedback text-left p-3.5 rounded-2xl transition-all duration-200 flex items-center gap-3.5 ${
                        selected
                          ? lightMode
                            ? 'bg-purple-950 text-white shadow-lg'
                            : 'bg-[#D8B4E2]/20 ring-1 ring-[#D8B4E2] text-white'
                          : lightMode
                          ? 'bg-stone-100/80 hover:bg-stone-200/70 text-stone-800'
                          : 'bg-white/[0.04] hover:bg-white/[0.08] text-white/80 ring-1 ring-white/5'
                      }`}
                    >
                      <img
                        src={item.previewImage}
                        alt={item.name[lang]}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 ring-1 ring-white/20"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs sm:text-sm font-medium truncate">{item.name[lang]}</div>
                        <div className="text-[11px] font-mono-tech opacity-75">{item.basePriceMAD} MAD</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Pearl & Crystal Palette */}
            <div>
              <label className="text-xs uppercase tracking-[0.2em] font-mono-tech opacity-70 flex items-center gap-2 mb-3">
                <Palette className="w-3.5 h-3.5 text-[#D8B4E2]" strokeWidth={1.5} />
                <span>02 · {lang === 'ar' ? 'لون اللؤلؤ والكريستال' : lang === 'fr' ? 'Palette de Perles & Cristaux' : lang === 'es' ? 'Paleta de Perlas y Cristales' : 'Pearl & Crystal Palette'}</span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {PALETTE_SWATCHES.map((swatch) => {
                  const active = swatch.id === paletteId;
                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      onClick={() => setPaletteId(swatch.id)}
                      className={`press-feedback px-3.5 py-2 rounded-full text-xs flex items-center gap-2.5 transition-all duration-200 ${
                        active
                          ? lightMode
                            ? 'bg-purple-950 text-white ring-2 ring-purple-400'
                            : 'bg-white/15 text-white ring-1 ring-[#D8B4E2]'
                          : lightMode
                          ? 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                          : 'bg-white/[0.04] text-white/70 hover:bg-white/[0.08] ring-1 ring-white/10'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full shrink-0 ring-1 ring-white/40 shadow-inner"
                        style={{
                          background: `radial-gradient(circle at 30% 30%, ${swatch.secondary}, ${swatch.primary})`,
                        }}
                      />
                      <span>{swatch.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Custom Initial A-Z */}
            <div>
              <label className="text-xs uppercase tracking-[0.2em] font-mono-tech opacity-70 flex items-center gap-2 mb-3">
                <Type className="w-3.5 h-3.5 text-[#D8B4E2]" strokeWidth={1.5} />
                <span>
                  03 ·{' '}
                  {lang === 'ar'
                    ? 'الحرف المخصص (ميدالية الحروف أو تعليقة الحقيبة)'
                    : lang === 'fr'
                    ? 'Initiale Personnalisée (Porte-clés ou Bijou de Sac)'
                    : lang === 'es' ? 'Inicial Personalizada (Llavero o Charm de Bolso)' : 'Custom Initial Monogram (A–Z Keychain or Bag Tag)'}
                </span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {LETTERS.map((letter) => {
                  const selected = initialLetter === letter;
                  return (
                    <button
                      key={letter}
                      type="button"
                      onClick={() => setInitialLetter(letter)}
                      className={`press-feedback w-8 h-8 rounded-full font-display text-sm font-semibold flex items-center justify-center transition-all duration-150 ${
                        selected
                          ? 'bg-[#D8B4E2] text-[#09060E] shadow-[0_0_15px_rgba(216,180,226,0.6)] scale-105'
                          : lightMode
                          ? 'bg-stone-100 text-stone-700 hover:bg-purple-100'
                          : 'bg-white/[0.04] text-white/70 hover:bg-white/10 ring-1 ring-white/10'
                      }`}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Hardware & Delivery City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="bespoke-hardware-select"
                  className="text-xs uppercase tracking-[0.2em] font-mono-tech opacity-70 block mb-2"
                >
                  04 · {lang === 'ar' ? 'الإطار والسلسلة' : lang === 'fr' ? 'Finition Métal & Ruban' : lang === 'es' ? 'Herrajes y Cinta' : 'Hardware & Ribbon'}
                </label>
                <select
                  id="bespoke-hardware-select"
                  name="bespokeHardware"
                  value={hardwareId}
                  onChange={(e) => setHardwareId(e.target.value)}
                  className={`w-full rounded-xl px-3.5 py-2.5 text-xs sm:text-sm outline-none ${
                    lightMode
                      ? 'bg-stone-100 text-stone-900 ring-1 ring-stone-300'
                      : 'bg-[#181224] text-white ring-1 ring-white/15'
                  }`}
                >
                  {HARDWARE_OPTIONS.map((hw) => (
                    <option key={hw.id} value={hw.id}>
                      {hw.label[lang]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="bespoke-city-select"
                  className="text-xs uppercase tracking-[0.2em] font-mono-tech opacity-70 flex items-center gap-1.5 mb-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#D8B4E2]" />
                  <span>05 · {lang === 'ar' ? 'مدينة التوصيل (المغرب)' : lang === 'fr' ? 'Ville de Livraison (Maroc)' : lang === 'es' ? 'Ciudad de Entrega (Marruecos)' : 'Delivery City (Morocco)'}</span>
                </label>
                <select
                  id="bespoke-city-select"
                  name="bespokeCity"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={`w-full rounded-xl px-3.5 py-2.5 text-xs sm:text-sm outline-none ${
                    lightMode
                      ? 'bg-stone-100 text-stone-900 ring-1 ring-stone-300'
                      : 'bg-[#181224] text-white ring-1 ring-white/15'
                  }`}
                >
                  {MOROCCAN_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c} 🇲🇦
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 5: Gift Box Note */}
            <div>
              <label
                htmlFor="bespoke-gift-note-input"
                className="text-xs uppercase tracking-[0.2em] font-mono-tech opacity-70 flex items-center gap-1.5 mb-2"
              >
                <Gift className="w-3.5 h-3.5 text-[#D8B4E2]" />
                <span>06 · {lang === 'ar' ? 'رسالة بطاقة الهدية' : lang === 'fr' ? 'Message Carte Cadeau Pearlie' : lang === 'es' ? 'Mensaje de la Tarjeta de Regalo Pearlie' : 'Signature Gift Card Message'}</span>
              </label>
              <input
                id="bespoke-gift-note-input"
                name="bespokeGiftNote"
                type="text"
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                maxLength={80}
                placeholder="Write a soft note for the Pearlie thank-you card..."
                className={`w-full rounded-xl px-4 py-2.5 text-xs sm:text-sm outline-none ${
                  lightMode
                    ? 'bg-stone-100 text-stone-900 ring-1 ring-stone-300'
                    : 'bg-white/[0.04] text-white ring-1 ring-white/15 focus:ring-[#D8B4E2]'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Right: Live Holographic Blueprint Preview Card (5 cols) */}
        <div
          className={`lg:col-span-5 animate-float-delayed p-2 rounded-[2rem] ${
            lightMode
              ? 'bg-purple-950/[0.04] ring-1 ring-purple-950/10'
              : 'bg-white/[0.04] ring-1 ring-white/12'
          }`}
        >
          <div
            className={`rounded-[calc(2rem-0.5rem)] p-6 sm:p-7 relative overflow-hidden ${
              lightMode
                ? 'bg-gradient-to-br from-[#FAF6FD] via-white to-[#F3E8FA] text-stone-900'
                : 'bg-gradient-to-br from-[#171124] via-[#0D0914] to-[#1D132B] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)]'
            }`}
          >
            {/* Ambient radial glow matching selected palette */}
            <div
              className="w-56 h-56 rounded-full blur-3xl absolute -top-16 -right-16 pointer-events-none opacity-45"
              style={{ background: activePalette.primary }}
            />

            <div className="flex items-center justify-between text-[11px] font-mono-tech uppercase tracking-[0.18em] opacity-70 mb-4">
              <span>ATELIER SPEC // {silhouette.toUpperCase()}</span>
              <span>🇲🇦 {city}</span>
            </div>

            {/* Interactive Visual Preview Frame */}
            <div
              key={`${silhouette}-${paletteId}-${initialLetter}`}
              className="img-shimmer-frame animate-couture-reveal relative rounded-2xl overflow-hidden aspect-[4/3] mb-5 ring-1 ring-white/15 group"
            >
              <img
                src={activeSilhouette.previewImage}
                alt={activeSilhouette.name[lang]}
                className="w-full h-full object-cover transition-transform duration-500 ease-out-strong group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Live Custom Pearl Monogram Badge Overlay */}
              <div className="absolute top-3.5 right-3.5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-md ring-1 ring-white/20 text-white">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center font-display text-xs font-bold text-black shadow"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, #FFFFFF, ${activePalette.ring})`,
                  }}
                >
                  {initialLetter}
                </span>
                <span className="text-[11px] font-mono-tech">Initial “{initialLetter}”</span>
              </div>

              {/* Interactive Bead Matrix Mini Visualizer */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between text-white">
                <div>
                  <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#D8B4E2] block">
                    {activePalette.name}
                  </span>
                  <h3 className="font-display text-2xl font-medium leading-tight">
                    {activeSilhouette.name[lang]}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs opacity-75 block">Est. Atelier Price</span>
                  <span className="font-mono-tech text-lg font-semibold text-[#F3E5AB]">
                    {activeSilhouette.basePriceMAD} MAD
                  </span>
                </div>
              </div>
            </div>

            {/* Live Simulated Pearl Strand Preview */}
            <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-black/20 ring-1 ring-white/10 mb-5">
              <span className="text-[11px] font-mono-tech opacity-75">Live Bead Weave Preview:</span>
              <div className="flex items-center gap-1.5">
                {Array.from({ length: 9 }).map((_, idx) => (
                  <span
                    key={idx}
                    className="rounded-full shadow-sm transition-transform duration-300"
                    style={{
                      width: idx === 4 ? '16px' : idx % 2 === 0 ? '12px' : '9px',
                      height: idx === 4 ? '16px' : idx % 2 === 0 ? '12px' : '9px',
                      background: `radial-gradient(circle at 30% 30%, #FFFFFF, ${
                        idx % 2 === 0 ? activePalette.primary : activePalette.secondary
                      })`,
                      boxShadow: `0 0 8px ${activePalette.ring}66`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Spec Summary */}
            <div className="space-y-2 text-xs mb-6">
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="opacity-65">Hardware & Clasp</span>
                <span className="font-medium">{activeHardware.label[lang]}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="opacity-65">Artisan Craft Time</span>
                <span className="font-mono-tech">
                  ~{activeSilhouette.craftHours} hrs ({activeSilhouette.beadCount} beads)
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/10">
                <span className="opacity-65">Gift Card Note</span>
                <span className="italic truncate max-w-[200px]">“{giftNote}”</span>
              </div>
            </div>

            {/* Action Buttons (Button-in-Button Architecture) */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleAddBespoke}
                className="press-feedback group w-full rounded-full pl-6 pr-2 py-2 bg-[#D8B4E2] text-[#09060E] font-medium text-sm flex items-center justify-between shadow-[0_0_25px_rgba(216,180,226,0.35)]"
              >
                <span className="flex items-center gap-2 font-semibold">
                  {addedFeedback ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>
                        {lang === 'ar'
                          ? 'تمت الإضافة إلى حقيبة التسوق!'
                          : lang === 'fr'
                          ? 'Ajouté à votre Panier Pearlie !'
                          : lang === 'es' ? '¡Añadido a tu Bolsa Pearlie!' : 'Added to Your Pearlie Bag!'}
                      </span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>
                        {lang === 'ar'
                          ? 'أضيفي التصميم المخصص للسلة'
                          : lang === 'fr'
                          ? 'Ajouter cette Création au Panier'
                          : lang === 'es' ? 'Añadir esta Creación a la Bolsa' : 'Add Custom Creation to Bag'}
                      </span>
                    </>
                  )}
                </span>
                <span className="w-9 h-9 rounded-full bg-black/15 flex items-center justify-center transition-transform duration-200 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </button>

              <a
                href={BRAND_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  try {
                    navigator.clipboard?.writeText(buildOrderMessage());
                  } catch {
                    // ignore clipboard restrictions
                  }
                }}
                className={`press-feedback group w-full rounded-full pl-6 pr-2 py-2 text-sm flex items-center justify-between ring-1 ${
                  lightMode
                    ? 'bg-purple-950 text-white ring-purple-900'
                    : 'bg-white/[0.06] hover:bg-white/[0.12] text-white ring-white/15'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Send className="w-3.5 h-3.5 text-[#C9F0E4]" />
                  <span>
                    {lang === 'ar'
                      ? 'اطلبي التصميم مباشرة عبر واتساب 📩'
                      : lang === 'fr'
                      ? 'Commander directement sur WhatsApp 📩'
                      : lang === 'es' ? 'Pedir directamente por WhatsApp 💬' : 'Send Custom Spec via WhatsApp Concierge 📩'}
                  </span>
                </span>
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-200 ease-out-strong group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] opacity-65">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C9F0E4]" />
              <span>100% Handcrafted in Morocco · Cash on Delivery / WhatsApp Confirmation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
