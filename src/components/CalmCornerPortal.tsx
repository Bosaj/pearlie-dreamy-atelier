import React, { useState, useEffect } from 'react';
import { Cloud, Heart, Sparkles, RefreshCw, Play, ExternalLink, Wind } from 'lucide-react';
import { BRAND_LINKS, CALM_CORNER_POSTS, Language, SOUL_AFFIRMATIONS } from '../data/atelierData';

interface CalmCornerPortalProps {
  lang: Language;
  lightMode: boolean;
}

export const CalmCornerPortal: React.FC<CalmCornerPortalProps> = ({ lang, lightMode }) => {
  const [affirmationIdx, setAffirmationIdx] = useState(0);
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale (4s)' | 'Hold (4s)' | 'Exhale (6s)'>('Inhale (4s)');

  useEffect(() => {
    if (!breathingActive) return;
    let mounted = true;
    const cycle = () => {
      if (!mounted) return;
      setBreathPhase('Inhale (4s)');
      setTimeout(() => {
        if (!mounted || !breathingActive) return;
        setBreathPhase('Hold (4s)');
        setTimeout(() => {
          if (!mounted || !breathingActive) return;
          setBreathPhase('Exhale (6s)');
        }, 4000);
      }, 4000);
    };
    cycle();
    const interval = setInterval(cycle, 14000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [breathingActive]);

  const affirmations = SOUL_AFFIRMATIONS[lang];
  const nextAffirmation = () => {
    setAffirmationIdx((prev) => (prev + 1) % affirmations.length);
  };

  return (
    <section id="calm-corner" className="relative py-24 md:py-36 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Sanctuary Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
        <div className="max-w-2xl">
          <div
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] uppercase tracking-[0.22em] font-medium mb-5 ${
              lightMode
                ? 'bg-pink-950/5 text-pink-900 ring-1 ring-pink-900/10'
                : 'bg-[#F9D5E5]/10 text-[#F9D5E5] ring-1 ring-[#F9D5E5]/25'
            }`}
          >
            <Cloud className="w-3.5 h-3.5 text-[#F9D5E5]" strokeWidth={1.5} />
            <span>@__little.calmcorner · Sister Sanctuary by Ihsane</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-light tracking-tight leading-[1.06] mb-4">
            {lang === 'ar' ? (
              <>
                ركن الهدوء الصغير ☁️{' '}
                <span className="italic font-normal text-[#F9D5E5]">همسات دافئة لروحكِ</span>
              </>
            ) : lang === 'fr' ? (
              <>
                Little Calm Corner ☁️ —{' '}
                <span className="italic font-normal text-[#F9D5E5]">petits rappels pour l’âme.</span>
              </>
            ) : lang === 'es' ? (
              <>
                Little Calm Corner ☁️ —{' '}
                <span className="italic font-normal text-[#F9D5E5]">pequeños recordatorios para tu alma.</span>
              </>
            ) : (
              <>
                Little Calm Corner ☁️ —{' '}
                <span className="italic font-normal text-[#F9D5E5]">little reminders for your soul.</span>
              </>
            )}
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${lightMode ? 'text-stone-600' : 'text-white/65'}`}>
            {lang === 'ar'
              ? '🤍 تذكيرات لطيفة لروحكِ · 🌸 حياة هادئة وعقل مطمئن. المساحة الإبداعية الثانية لإحسان حيث تلتقي الدراسة، التخطيط اليومي، وصناعة اللؤلؤ بالسلام الداخلي.'
              : lang === 'fr'
              ? '« 🤍 little reminders for your soul · 🌸 soft life & calm mind ». Le journal visuel d’Ihsane où ses études d’ingénieure, son carnet de vie et l’atelier Pearlie se rencontrent en douceur.'
              : lang === 'es' ? '« 🤍 pequeños recordatorios para tu alma | 🌸 vida suave y mente en calma ». El diario visual de Ihsane, donde sus estudios de ingeniería, su agenda de vida y el atelier Pearlie se encuentran con suavidad.' : '“🤍 little reminders for your soul · 🌸 soft life & calm mind.” Explore Ihsane’s second creative universe where gentle motivation, study vlogs, and behind-the-scenes Pearlie craft live in harmony.'}
          </p>
        </div>

        {/* Profile Pill Card for @__little.calmcorner */}
        <a
          href={BRAND_LINKS.calmCornerIG}
          target="_blank"
          rel="noopener noreferrer"
          className={`press-feedback group p-2 rounded-[2rem] shrink-0 ${
            lightMode
              ? 'bg-pink-950/[0.04] ring-1 ring-pink-950/10'
              : 'bg-white/[0.04] ring-1 ring-white/12'
          }`}
        >
          <div
            className={`rounded-[calc(2rem-0.5rem)] px-5 py-3.5 flex items-center gap-4 ${
              lightMode
                ? 'bg-white shadow-sm'
                : 'bg-[#120D1B] shadow-[inset_0_1px_1px_rgba(255,255,255,0.14)]'
            }`}
          >
            <img
              src="./images/calmcorner_dom_00.jpg"
              alt="Little Calm Corner"
              className="w-14 h-14 rounded-full object-cover ring-2 ring-[#F9D5E5]/60"
            />
            <div>
              <div className="text-xs font-mono-tech text-[#F9D5E5] flex items-center gap-1.5">
                <span>@__little.calmcorner</span>
                <ExternalLink className="w-3 h-3 opacity-70 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="font-display text-xl font-medium">Little Calm Corner ☁️</div>
              <div className="text-[11px] opacity-65">“Read it. Dream it. Do it!” · 67+ Souls</div>
            </div>
          </div>
        </a>
      </div>

      {/* Interactive Soul Pacer + Daily Affirmation Deck + Behind-the-Scenes Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
        {/* Left: Interactive Breathing Sanctuary & Soul Reminder Deck (7 cols) */}
        <div
          className={`lg:col-span-7 p-2 rounded-[2rem] ${
            lightMode
              ? 'bg-pink-950/[0.03] ring-1 ring-pink-950/10'
              : 'bg-white/[0.03] ring-1 ring-white/10'
          }`}
        >
          <div
            className={`rounded-[calc(2rem-0.5rem)] p-6 sm:p-9 h-full flex flex-col justify-between relative overflow-hidden ${
              lightMode
                ? 'bg-gradient-to-br from-[#FFF9FB] via-white to-[#F7EEFA] text-stone-900'
                : 'bg-gradient-to-br from-[#171022] via-[#0F0B17] to-[#1D1226] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.2em] text-[#F9D5E5] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>DAILY SOFT REMINDER DECK</span>
              </span>
              <button
                type="button"
                onClick={nextAffirmation}
                className="press-feedback inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs bg-white/10 hover:bg-white/15 ring-1 ring-white/15"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#F9D5E5]" />
                <span>{lang === 'ar' ? 'رسالة أخرى' : lang === 'fr' ? 'Autre pensée douce' : lang === 'es' ? 'Otro recordatorio' : 'Draw Another Reminder'}</span>
              </button>
            </div>

            <blockquote
              key={affirmationIdx}
              className="animate-couture-reveal font-display text-2xl sm:text-4xl font-light italic leading-snug my-4"
            >
              {affirmations[affirmationIdx]}
            </blockquote>

            {/* Interactive Deep Breath Pacer */}
            <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="relative flex items-center justify-center w-14 h-14">
                  <span
                    className={`absolute inset-0 rounded-full bg-[#F9D5E5]/30 transition-transform duration-[4000ms] ease-out ${
                      breathingActive && breathPhase !== 'Exhale (6s)' ? 'scale-125 opacity-90' : 'scale-75 opacity-40'
                    }`}
                  />
                  <span className="relative w-10 h-10 rounded-full bg-gradient-to-br from-white via-[#F9D5E5] to-[#D8B4E2] flex items-center justify-center text-[#120D1B] shadow-md">
                    <Wind className="w-4 h-4" />
                  </span>
                </div>
                <div>
                  <div className="text-xs font-mono-tech uppercase tracking-wider text-[#F9D5E5]">
                    {breathingActive ? breathPhase : 'Take a deep breath… 🌷☁️'}
                  </div>
                  <p className="text-xs opacity-70">
                    {lang === 'ar'
                      ? 'تمرين تنفس هادئ لتصفية الذهن (شهيق 4 ث · حبس 4 ث · زفير 6 ث)'
                      : lang === 'fr'
                      ? 'Pause respiratoire douce (Inspirer 4s · Retenir 4s · Expirer 6s)'
                      : lang === 'es' ? 'Pausa de respiración suave (Inhala 4s · Sostén 4s · Exhala 6s)' : 'Interactive calm breathing pacer inspired by @__little.calmcorner'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setBreathingActive((b) => !b)}
                className="press-feedback rounded-full px-5 py-2.5 text-xs font-medium bg-[#F9D5E5] text-[#140D1E] shrink-0 shadow-[0_0_20px_rgba(249,213,229,0.35)]"
              >
                {breathingActive
                  ? lang === 'ar'
                    ? 'إيقاف التنفس'
                    : lang === 'fr'
                    ? 'Pause'
                    : lang === 'es' ? 'Pausar' : 'Pause Breathing Orb'
                  : lang === 'ar'
                  ? 'ابدئي التنفس الهادئ ☁️'
                  : lang === 'fr'
                  ? 'Respirer en Douceur ☁️'
                  : lang === 'es' ? 'Respirar en Calma 🌬️' : 'Start Calm Breath ☁️'}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Her 3 Real Story Highlights from @__little.calmcorner (5 cols) */}
        <div
          className={`lg:col-span-5 p-2 rounded-[2rem] ${
            lightMode
              ? 'bg-pink-950/[0.03] ring-1 ring-pink-950/10'
              : 'bg-white/[0.03] ring-1 ring-white/10'
          }`}
        >
          <div
            className={`rounded-[calc(2rem-0.5rem)] p-6 sm:p-7 h-full flex flex-col justify-between ${
              lightMode
                ? 'bg-white'
                : 'bg-[#100C18] shadow-[inset_0_1px_1px_rgba(255,255,255,0.14)]'
            }`}
          >
            <div>
              <div className="text-[11px] font-mono-tech uppercase tracking-[0.2em] text-[#D8B4E2] mb-2">
                STORY HIGHLIGHTS · BEHIND THE SCENES
              </div>
              <h3 className="font-display text-2xl font-medium mb-4">
                {lang === 'ar'
                  ? 'حيث تولد إبداعات برلي على مكتب الدراسة 💎📚'
                  : lang === 'fr'
                  ? 'Là où l’atelier Pearlie rencontre sa vie d’étudiante 💎📚'
                  : lang === 'es' ? 'Donde el arte de Pearlie se encuentra con su escritorio de estudiante 🎀📚' : 'Where Pearlie Craft Meets Her Study Desk 💎📚'}
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-3 my-2">
              {[
                {
                  title: 'My business 💎',
                  caption: 'Behind the scenes 🔮',
                  img: './images/calmcorner_dom_01.jpg',
                  href: 'https://www.instagram.com/stories/highlights/18093823037472484/',
                },
                {
                  title: 'Soft Planner 🤍',
                  caption: 'Pearlie bow & Life Planner',
                  img: './images/calmcorner_dom_02.jpg',
                  href: 'https://www.instagram.com/stories/highlights/18646109839044035/',
                },
                {
                  title: 'Cozy Breaks 🍽',
                  caption: 'Iced coffee & cinema',
                  img: './images/calmcorner_dom_03.jpg',
                  href: 'https://www.instagram.com/stories/highlights/18097565258380236/',
                },
              ].map((hl) => (
                <a
                  key={hl.title}
                  href={hl.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block text-center"
                >
                  <div className="aspect-square rounded-2xl overflow-hidden mb-2 ring-1 ring-white/15 p-1 bg-white/5">
                    <img
                      src={hl.img}
                      alt={hl.title}
                      className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-xs font-medium truncate">{hl.title}</div>
                  <div className="text-[10px] opacity-60 truncate">{hl.caption}</div>
                </a>
              ))}
            </div>

            <div className="text-xs opacity-70 pt-3 border-t border-white/10 flex items-center justify-between">
              <span>Notice the mini Pearlie tote & bow on her study desk!</span>
              <Heart className="w-3.5 h-3.5 text-[#F9D5E5]" />
            </div>
          </div>
        </div>
      </div>

      {/* 5 Real Posts & Reels Grid from @__little.calmcorner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {CALM_CORNER_POSTS.map((post) => (
          <a
            key={post.id}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`hover-lift group p-1.5 rounded-[1.75rem] flex flex-col ${
              lightMode
                ? 'bg-pink-950/[0.03] ring-1 ring-pink-950/10'
                : 'bg-white/[0.03] ring-1 ring-white/10'
            }`}
          >
            <div
              className={`rounded-[calc(1.75rem-0.375rem)] overflow-hidden flex-1 flex flex-col ${
                lightMode
                  ? 'bg-white'
                  : 'bg-[#110C19] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]'
              }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title[lang]}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out-strong group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono-tech bg-black/60 backdrop-blur-md text-white ring-1 ring-white/15">
                  {post.tag}
                </div>
                {post.isReel && (
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </div>
                )}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-[10px] font-mono-tech opacity-75 mb-0.5">{post.date}</div>
                  <h4 className="font-display text-lg font-medium leading-snug">{post.title[lang]}</h4>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-xs opacity-75 leading-relaxed line-clamp-3 mb-3">
                  {post.soulNote[lang]}
                </p>
                <span className="text-[11px] font-mono-tech text-[#F9D5E5] flex items-center justify-between pt-2 border-t border-white/10">
                  <span>View on Instagram</span>
                  <span>↗</span>
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
