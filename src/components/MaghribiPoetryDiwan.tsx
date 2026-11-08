import React, { useState } from 'react';
import { Sparkles, Copy, Check, BookOpen, Feather, Crown } from 'lucide-react';
import { Language } from '../data/atelierData';

interface MaghribiPoetryDiwanProps {
  lang: Language;
  lightMode: boolean;
}

type CalligraphyFont = 'maghribi' | 'ruqaa' | 'amiri';

interface PoemBayt {
  sadr: string; // First hemistich (صدر البيت)
  ajuz: string; // Second hemistich (عجز البيت)
  en: string;
  fr: string;
}

interface QasidaItem {
  id: string;
  titleAr: string;
  titleEn: string;
  titleFr: string;
  bahrAr: string; // Poetic meter
  dedicationAr: string;
  dedicationEn: string;
  dedicationFr: string;
  accent: string;
  abyat: PoemBayt[];
}

const QASIDAS: QasidaItem[] = [
  {
    id: 'qasida-ihsane-durr',
    titleAr: 'دُرُّ الصِّنَاعَةِ وَإِحْسَانُ اليَدِ',
    titleEn: 'The Pearl of Craft & The Grace of Ihsane’s Hand',
    titleFr: 'La Perle de l’Art & La Grâce de la Main d’Ihsane',
    bahrAr: 'البَحْرُ الكَامِلُ · إِهْدَاءٌ خَاصٌّ لِإِحْسَان (@ihsane__ft)',
    dedicationAr: 'فِي وَصْفِ أَنَامِلِ «إِحْسَان» وَهِيَ تَنْسِجُ حَقَائِبَ اللُّؤْلُؤِ وَالبَلَّوْرِ بِصَبْرٍ وَإِتْقَانٍ',
    dedicationEn: 'Dedicated to founder & artisan Ihsane (@ihsane__ft) — weaving luminous pearls & crystals by hand.',
    dedicationFr: 'Dédié à la fondatrice et artisane Ihsane (@ihsane__ft) — tissant perles et cristaux à la main.',
    accent: '#D8B4E2',
    abyat: [
      {
        sadr: 'نَظَمَتْ أَنَامِلُهَا الجَمَالَ لَآلِئَا',
        ajuz: 'فَغَدَا البَرِيقُ عَلَى الحَرِيرِ مَعَانِيَا',
        en: 'Her fingertips strung beauty into luminous pearls, turning shimmer upon silk into poetry.',
        fr: 'Ses doigts ont tressé la beauté en perles lumineuses, faisant briller la soie comme un poème.',
      },
      {
        sadr: 'فِي كُلِّ حَبَّةِ لُؤْلُؤٍ أُنْشُودَةٌ',
        ajuz: 'تَرْوِي هُدُوءَ الرُّوحِ حِينَ تُنَاجِيَا',
        en: 'Within every single pearl lives a gentle hymn that whispers serenity to the soul.',
        fr: 'Dans chaque perle vit une mélodie douce qui murmure la sérénité à l’âme.',
      },
      {
        sadr: 'حُسْنٌ تَفَرَّدَ فِي السُّكُونِ جَلَالُهُ',
        ajuz: 'لَا يَطْلُبُ الضَّوْضَاءَ كَيْ يَتَسَامِيَا',
        en: 'A majesty of beauty that stands apart in quietness — needing no noise to be exalted.',
        fr: 'Une beauté souveraine dans le calme — qui n’a nul besoin de bruit pour resplendir.',
      },
      {
        sadr: 'إِحْسَانُ صَنْعَتِهَا يُشِعُّ نَضَارَةً',
        ajuz: 'كَالبَدْرِ يَنْسِجُ فِي الظَّلَامِ دَرَارِيَا',
        en: 'The Ihsane (perfection) of her craft radiates grace, like the full moon weaving stars across the night.',
        fr: 'L’Ihsane (l’excellence) de son art rayonne, telle la pleine lune tissant des étoiles dans la nuit.',
      },
    ],
  },
  {
    id: 'qasida-juman-pearlie',
    titleAr: 'سِحْرُ الجُمَانِ وَالدُّرِّ المَكْنُونِ',
    titleEn: 'Enchantment of Hidden Pearls & Crystal Nacre',
    titleFr: 'L’Enchantement des Perles Cachées & du Cristal',
    bahrAr: 'البَحْرُ البَسِيطُ · دَارُ بِيرْلي (@_pearlie.dreamy)',
    dedicationAr: 'فِي بَهَاءِ الدُّرِّ الأَبْيَضِ وَيَاقُوتِ «بِيرْلي» المَنْظُومِ بِالذَّهَبِ',
    dedicationEn: 'In praise of Pearlie Handcrafted’s mother-of-pearl totes and ruby/onyx kiss-lock clutches.',
    dedicationFr: 'Éloge des sacs en nacre et des pochettes cristal cousues d’or de Pearlie Handcrafted.',
    accent: '#F3E5AB',
    abyat: [
      {
        sadr: 'وَأَبْيَضَ مَكْنُونٍ مِنَ الدُّرِّ صَاغَهُ',
        ajuz: 'صَفَاءُ النَّدَى فِي رِقَّةِ اليَاسَمِينِ',
        en: 'Treasured white pearls fashioned from the purity of morning dew and the delicacy of jasmine.',
        fr: 'Blanches perles précieuses façonnées dans la pureté de la rosée et la douceur du jasmin.',
      },
      {
        sadr: 'يَلُوحُ عَلَى الكَفَّيْنِ نُورًا مُنَضَّدًا',
        ajuz: 'كَعِقْدِ الثُّرَيَّا فِي جَبِينِ السِّنِينِ',
        en: 'Shining upon the palms intiered light, like the Pleiades crowning the brow of time.',
        fr: 'Brillant entre les mains telle une constellation, comme les Pléiades au front du temps.',
      },
      {
        sadr: 'وَفِي حُلْكَةِ اليَاقُوتِ وَاللَّيْلِ بَهْجَةٌ',
        ajuz: 'تُضِيءُ سَرَايَا القَلْبِ بَعْدَ الحَنِينِ',
        en: 'And in deep ruby and midnight onyx dwells a splendor that illuminates the chambers of the heart.',
        fr: 'Et dans l’éclat du rubis et de l’onyx nocturne réside une lumière qui enchante le cœur.',
      },
      {
        sadr: 'فَيَا حَامِلًا مِنْ صَنْعَةِ الحُبِّ تُحْفَةً',
        ajuz: 'تَفَرَّدْتَ بِالإِبْدَاعِ فَوْقَ الظُّنُونِ',
        en: 'O bearer of a masterpiece woven with love — you carry a rarity beyond imagination.',
        fr: 'Ô porteuse d’un chef-d’œuvre tissé d’amour — tu portes une création unique au monde.',
      },
    ],
  },
  {
    id: 'qasida-calm-corner',
    titleAr: 'رُكْنُ السَّكِينَةِ وَالغَمَامِ',
    titleEn: 'Sanctuary of Serenity & Soft Clouds',
    titleFr: 'Le Sanctuaire de la Sérénité & des Nuages',
    bahrAr: 'البَحْرُ الوَافِرُ · رُكْنُ الهُدُوءِ (@__little.calmcorner)',
    dedicationAr: 'إِلَى القُلُوبِ الهَادِئَةِ الَّتِي تَقْرَأُ الحُلْمَ وَتَصْنَعُهُ بِهُدُوءٍ وَيَقِينٍ',
    dedicationEn: 'Inspired by Little Calm Corner ☁️ — “Read it. Dream it. Do it!”',
    dedicationFr: 'Inspiré par Little Calm Corner ☁️ — « Lis-le. Rêve-le. Fais-le ! »',
    accent: '#C9F0E4',
    abyat: [
      {
        sadr: 'هُنَا رُكْنُ السَّكِينَةِ وَالغَمَامِ',
        ajuz: 'وَسَلْوَى القَلْبِ فِي زَمَنِ الزِّحَامِ',
        en: 'Here lies the corner of stillness and soft clouds — a solace for the heart in a crowded world.',
        fr: 'Voici le coin de quiétude et de nuages doux — un refuge pour le cœur loin du tumulte.',
      },
      {
        sadr: 'تَنَفَّسْ فِي الصَّبَاحِ نَسِيمَ لُطْفٍ',
        ajuz: 'وَعِشْ بِالرِّفْقِ فِي كَنَفِ السَّلَامِ',
        en: 'Breathe in the morning breeze of kindness, and walk gently within the sanctuary of peace.',
        fr: 'Respire au matin la brise de douceur, et vis avec bienveillance dans la paix.',
      },
      {
        sadr: 'قَرَأْتِ الحُلْمَ ثُمَّ بَنَيْتِ مَجْدًا',
        ajuz: 'بِعَزْمِ العِلْمِ وَالفَنِّ الهُمَامِ',
        en: 'You read the dream, envisioned it, and built it with the resolve of engineering and noble art.',
        fr: 'Tu as lu le rêve, tu l’as imaginé, et tu l’as bâti par la science et l’art.',
      },
      {
        sadr: 'فَلَا تَعْجَلْ عَلَى الأَيَّامِ وَاصْبِرْ',
        ajuz: 'فَإِنَّ الفَجْرَ يَأْتِي بِابْتِسَامِ',
        en: 'Do not rush the unfolding of days — be patient, for dawn always arrives with a gentle smile.',
        fr: 'Ne presse pas le cours des jours — sois patiente, car l’aube vient toujours avec un sourire.',
      },
    ],
  },
  {
    id: 'qasida-muwashshah-maghribi',
    titleAr: 'مُوَشَّحُ تَاجِ الأَنَاقَةِ المَغْرِبِيَّةِ',
    titleEn: 'Andalusian-Moroccan Muwashshah of Crowned Elegance',
    titleFr: 'Mouwachah Maroco-Andalou de la Couronne d’Élégance',
    bahrAr: 'البَحْرُ الخَفِيفُ · التُّرَاثُ المَغْرِبِيُّ الأَصِيلُ 🇲🇦',
    dedicationAr: 'فِي أَصَالَةِ الصَّنْعَةِ المَغْرِبِيَّةِ مِنْ وَجْدَةَ وَبَرْكَانَ إِلَى كُلِّ رُبُوعِ المَغْرِبِ',
    dedicationEn: 'Celebrating Moroccan artisanal heritage across every city of the Kingdom.',
    dedicationFr: 'Célébrant le savoir-faire artisanal marocain à travers toutes les villes du Royaume.',
    accent: '#F9D5E5',
    abyat: [
      {
        sadr: 'يَا سَنَا البَلَّوْرِ فِي اللَّيْلِ البَهِيمْ',
        ajuz: 'وَبَيَاضَ الدُّرِّ فِي العِقْدِ النَّظِيمْ',
        en: 'O radiance of crystal in the velvet night, and pure white pearl in the symmetrically knotted strand!',
        fr: 'Ô éclat du cristal dans la nuit de velours, et blancheur de la perle au collier parfait !',
      },
      {
        sadr: 'مِنْ رُبَى المَغْرِبِ صِيغَتْ تُحَفًا',
        ajuz: 'تَسْحَرُ الأَبْصَارَ بِالطَّبْعِ الكَرِيمْ',
        en: 'From the hills of Morocco fashioned as treasures that enchant every eye with noble grace.',
        fr: 'Depuis les terres du Maroc façonnées en joyaux qui charment le regard par leur noblesse.',
      },
      {
        sadr: 'كُلُّ عِقْدٍ فِيهِ مِنْ رُوحِ الصَّفَا',
        ajuz: 'نَفْحَةٌ تُحْيِي الهَوَى العَذْبَ القَدِيمْ',
        en: 'Every woven clasp carries a breath of serenity that revives timeless, pure affection.',
        fr: 'Chaque fermoir tressé porte un souffle de pureté qui ravive la beauté éternelle.',
      },
    ],
  },
];

export const MaghribiPoetryDiwan: React.FC<MaghribiPoetryDiwanProps> = ({ lang, lightMode }) => {
  const [activePoemIdx, setActivePoemIdx] = useState(0);
  const [fontStyle, setFontStyle] = useState<CalligraphyFont>('maghribi');
  const [showTranslation, setShowTranslation] = useState(lang !== 'ar');
  const [copied, setCopied] = useState(false);

  const currentPoem = QASIDAS[activePoemIdx];

  const fontClass =
    fontStyle === 'maghribi'
      ? 'font-maghribi'
      : fontStyle === 'ruqaa'
      ? 'font-ruqaa'
      : 'font-amiri';

  const handleCopyPoem = () => {
    const text =
      `${currentPoem.titleAr}\n` +
      currentPoem.abyat.map((b) => `${b.sadr}   ❖   ${b.ajuz}`).join('\n') +
      `\n— ديوان دار بيرلي للؤلؤ (@_pearlie.dreamy × @__little.calmcorner)`;
    try {
      navigator.clipboard?.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // ignore
    }
  };

  return (
    <section
      id="diwan"
      className="py-16 sm:py-24 md:py-32 px-3.5 sm:px-8 max-w-7xl mx-auto relative"
    >
      {/* Ambient Moroccan Gold & Lavender Glow */}
      <div
        className="w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-[130px] absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none opacity-25"
        style={{ background: currentPoem.accent }}
        aria-hidden="true"
      />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div
          className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] sm:text-xs tracking-[0.18em] font-medium mb-4 ${
            lightMode
              ? 'bg-amber-900/10 text-amber-900 ring-1 ring-amber-800/20'
              : 'bg-[#F3E5AB]/10 text-[#F3E5AB] ring-1 ring-[#F3E5AB]/30'
          }`}
        >
          <Feather className="w-3.5 h-3.5 shrink-0" />
          <span>
            {lang === 'ar'
              ? 'دِيوَانُ الدُّرِّ وَاللُّؤْلُؤِ · بِالخَطِّ المَغْرِبِيِّ الأَصِيلِ'
              : lang === 'fr'
              ? 'DIWAN AL-DURR · POÉSIE ARABE EN CALLIGRAPHIE MAGHRIBI'
              : 'DIWAN AL-DURR · CLASSICAL ARABIC POETRY IN MAGHRIBI SCRIPT'}
          </span>
        </div>

        {/* Big Maghribi Calligraphic Title */}
        <h2
          dir="rtl"
          className="font-maghribi text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.45] text-[#F3E5AB] drop-shadow-[0_2px_20px_rgba(243,229,171,0.22)] mb-3"
        >
          دِيوَانُ الدُّرِّ وَإِحْسَانِ الصَّنْعَةِ
        </h2>

        <p className="text-xs sm:text-sm md:text-base opacity-75 leading-relaxed px-2">
          {lang === 'ar'
            ? 'قصائدُ عربيةٌ فصيحةٌ نُظمت على البحور الشعرية الكلاسيكية (الكامل، البسيط، الوافر، والموشح المغربي) في وصف لآلئ «بِيرْلي» وسكينة «ركن الهدوء»، مرسومةً بالخط المغربي المبسوط الأصيل (Bouazzi Maghribi).'
            : lang === 'fr'
            ? 'Odes arabes classiques composées sur les mètres poétiques traditionnels (Al-Kamil, Al-Basit, Al-Wafir et Mouwachah marocain) célébrant les perles de Pearlie et la quiétude de Little Calm Corner, tracées dans l’authentique calligraphie marocaine Bouazzi Maghribi.'
            : 'Classical Arabic odes composed in traditional poetic meters (Al-Kamil, Al-Basit, Al-Wafir & Moroccan Muwashshah) celebrating Pearlie’s hand-knotted pearls and Little Calm Corner’s serenity — rendered in authentic Moroccan Bouazzi Maghribi calligraphy.'}
        </p>
      </div>

      {/* Double-Bezel Diwan Manuscript Pavilion */}
      <div
        className={`p-1.5 sm:p-2 rounded-[1.75rem] sm:rounded-[2.25rem] transition-all duration-500 ${
          lightMode
            ? 'bg-amber-950/[0.05] ring-1 ring-amber-900/15 shadow-xl'
            : 'bg-white/[0.04] ring-1 ring-[#F3E5AB]/25 shadow-[0_30px_90px_rgba(0,0,0,0.75)]'
        }`}
      >
        <div
          className={`rounded-[calc(1.75rem-0.375rem)] sm:rounded-[calc(2.25rem-0.5rem)] p-4 sm:p-8 md:p-12 relative overflow-hidden ${
            lightMode
              ? 'bg-gradient-to-br from-[#FFFDF9] via-[#FAF3E8] to-[#F5E9D6] text-stone-900'
              : 'bg-gradient-to-br from-[#130D1E] via-[#0B0712] to-[#171024] text-white shadow-[inset_0_1px_1px_rgba(243,229,171,0.22)]'
          }`}
        >
          {/* Top Controls: Qasida Selector Tabs + Calligraphic Script Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 sm:mb-8 border-b border-white/10">
            {/* 4 Qasida Tabs — horizontally scrollable on small phones */}
            <div
              dir="rtl"
              className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1"
            >
              {QASIDAS.map((q, idx) => {
                const isActive = idx === activePoemIdx;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setActivePoemIdx(idx)}
                    className={`press-feedback shrink-0 rounded-full px-3.5 sm:px-4 py-2 text-xs sm:text-sm transition-all flex items-center gap-2 ${
                      isActive
                        ? 'bg-[#F3E5AB] text-[#09060E] font-semibold shadow-[0_0_20px_rgba(243,229,171,0.35)]'
                        : lightMode
                        ? 'bg-stone-200/80 text-stone-700 hover:bg-stone-300/80'
                        : 'bg-white/[0.06] text-white/80 hover:bg-white/10 ring-1 ring-white/10'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5 shrink-0" />
                    <span className="font-maghribi text-sm sm:text-base leading-none">
                      {q.titleAr}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Calligraphic Script Selector */}
            <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2">
              <div
                dir="rtl"
                className={`inline-flex items-center rounded-full p-1 text-[11px] ${
                  lightMode
                    ? 'bg-stone-200/80 ring-1 ring-stone-300'
                    : 'bg-white/[0.05] ring-1 ring-white/15'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setFontStyle('maghribi')}
                  className={`px-2.5 sm:px-3 py-1 rounded-full transition-all ${
                    fontStyle === 'maghribi'
                      ? 'bg-[#D8B4E2] text-[#09060E] font-semibold'
                      : 'opacity-75 hover:opacity-100'
                  }`}
                >
                  الخط المغربي
                </button>
                <button
                  type="button"
                  onClick={() => setFontStyle('ruqaa')}
                  className={`px-2.5 sm:px-3 py-1 rounded-full transition-all ${
                    fontStyle === 'ruqaa'
                      ? 'bg-[#D8B4E2] text-[#09060E] font-semibold'
                      : 'opacity-75 hover:opacity-100'
                  }`}
                >
                  خط الرقعة
                </button>
                <button
                  type="button"
                  onClick={() => setFontStyle('amiri')}
                  className={`px-2.5 sm:px-3 py-1 rounded-full transition-all ${
                    fontStyle === 'amiri'
                      ? 'bg-[#D8B4E2] text-[#09060E] font-semibold'
                      : 'opacity-75 hover:opacity-100'
                  }`}
                >
                  الخط الأميري
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowTranslation((v) => !v)}
                className={`press-feedback rounded-full px-3 py-1.5 text-[11px] font-medium transition-all ${
                  showTranslation
                    ? 'bg-[#D8B4E2]/20 text-[#D8B4E2] ring-1 ring-[#D8B4E2]/40'
                    : lightMode
                    ? 'bg-stone-200 text-stone-700'
                    : 'bg-white/[0.06] text-white/75 ring-1 ring-white/10'
                }`}
              >
                {lang === 'ar'
                  ? showTranslation
                    ? 'إخفاء الترجمة'
                    : 'إظهار الترجمة (EN)'
                  : showTranslation
                  ? 'Hide Translation'
                  : 'Show Translation'}
              </button>
            </div>
          </div>

          {/* Poem Header Metadata */}
          <div dir="rtl" className="text-center mb-8 sm:mb-10">
            <span className="inline-block px-3.5 py-1 rounded-full text-[11px] sm:text-xs bg-[#F3E5AB]/15 text-[#F3E5AB] ring-1 ring-[#F3E5AB]/30 mb-3">
              {currentPoem.bahrAr}
            </span>
            <h3
              className={`${fontClass} text-2xl sm:text-4xl md:text-5xl font-normal leading-[1.6] text-[#F3E5AB] mb-2`}
            >
              ﴿ {currentPoem.titleAr} ﴾
            </h3>
            <p
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
              className="text-xs sm:text-sm opacity-75 max-w-xl mx-auto"
            >
              {lang === 'ar'
                ? currentPoem.dedicationAr
                : lang === 'fr'
                ? currentPoem.dedicationFr
                : currentPoem.dedicationEn}
            </p>
          </div>

          {/* Abyat (Poetic Couplets — Two-Hemistich Layout on Desktop, Graceful Stacked Couplets on Mobile) */}
          <div dir="rtl" className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
            {currentPoem.abyat.map((bayt, idx) => (
              <div
                key={`${activePoemIdx}-${fontStyle}-${idx}`}
                style={{ animationDelay: `${idx * 90}ms` }}
                className={`animate-couture-reveal hover-lift rounded-2xl p-4 sm:p-6 transition-all ${
                  lightMode
                    ? 'bg-white/80 ring-1 ring-amber-900/10 shadow-sm'
                    : 'bg-white/[0.03] ring-1 ring-white/10 hover:ring-[#F3E5AB]/35'
                }`}
              >
                {/* Arabic Bayt (Sadr + Ornamental Pearl + Ajuz) */}
                <div className="grid grid-cols-1 md:grid-cols-11 items-center gap-2 md:gap-4 text-center">
                  {/* Sadr (First Hemistich) */}
                  <div
                    className={`md:col-span-5 ${fontClass} text-xl sm:text-2xl md:text-[1.75rem] leading-[1.9] tracking-wide md:text-left`}
                  >
                    {bayt.sadr}
                  </div>

                  {/* Central Pearl Medallion Separator */}
                  <div className="md:col-span-1 flex items-center justify-center py-0.5 md:py-0">
                    <span
                      className="animate-medallion inline-flex items-center justify-center w-6 h-6 rounded-full text-xs text-[#F3E5AB] bg-[#F3E5AB]/15 ring-1 ring-[#F3E5AB]/35"
                      aria-hidden="true"
                    >
                      ❖
                    </span>
                  </div>

                  {/* Ajuz (Second Hemistich) */}
                  <div
                    className={`md:col-span-5 ${fontClass} text-xl sm:text-2xl md:text-[1.75rem] leading-[1.9] tracking-wide md:text-right text-[#F9D5E5]`}
                  >
                    {bayt.ajuz}
                  </div>
                </div>

                {/* Optional Poetic Translation (EN / FR) */}
                {showTranslation && (
                  <p
                    dir="ltr"
                    className="mt-3 pt-3 border-t border-white/10 text-center font-display italic text-xs sm:text-sm md:text-base opacity-75"
                  >
                    “{lang === 'fr' ? bayt.fr : bayt.en}”
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Calligraphic Colophon & Copy Action */}
          <div className="mt-8 sm:mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div dir="rtl" className="flex items-center gap-3 text-center sm:text-right">
              <div className="w-9 h-9 rounded-full bg-[#F3E5AB]/15 ring-1 ring-[#F3E5AB]/35 flex items-center justify-center text-[#F3E5AB] shrink-0">
                <Crown className="w-4 h-4" />
              </div>
              <div>
                <div className="font-maghribi text-lg sm:text-xl text-[#F3E5AB] leading-snug">
                  دِيوَانُ الدُّرِّ وَاللُّؤْلُؤِ — الخَطُّ المَغْرِبِيُّ الأَصِيلُ
                </div>
                <div className="text-[11px] opacity-65">
                  © 2026 Pearlie Handcrafted 🔮 × Little Calm Corner ☁️ · All Rights Reserved 🇲🇦
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyPoem}
              className="press-feedback inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium bg-[#F3E5AB]/15 hover:bg-[#F3E5AB]/25 text-[#F3E5AB] ring-1 ring-[#F3E5AB]/30"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'تَمَّ نَسْخُ القَصِيدَةِ 🤍' : 'Poem Copied 🤍'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'نَسْخُ أَبْيَاتِ القَصِيدَةِ' : 'Copy Arabic Poem'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
