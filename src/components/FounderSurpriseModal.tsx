import React, { useState } from 'react';
import { X, Sparkles, Heart, ExternalLink, Crown, Stars } from 'lucide-react';
import { BRAND_LINKS, Language } from '../data/atelierData';

interface FounderSurpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const FounderSurpriseModal: React.FC<FounderSurpriseModalProps> = ({ isOpen, onClose, lang }) => {
  const [celebrating, setCelebrating] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ihsane-surprise-title"
    >
      <div className="animate-modal-enter relative w-full max-w-2xl p-1.5 sm:p-2 rounded-[1.75rem] sm:rounded-[2.25rem] bg-white/[0.06] ring-1 ring-white/20 shadow-2xl max-h-[92dvh] overflow-y-auto">
        <div className="relative rounded-[calc(1.75rem-0.375rem)] sm:rounded-[calc(2.25rem-0.5rem)] bg-gradient-to-br from-[#191129] via-[#0D0915] to-[#1E122C] p-5 sm:p-10 text-white overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.22)]">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="press-feedback absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 z-10"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Celebratory Floating Sparkles when triggered */}
          {celebrating && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {Array.from({ length: 18 }).map((_, i) => (
                <span
                  key={i}
                  className="absolute animate-ping rounded-full bg-[#F9D5E5]"
                  style={{
                    width: `${6 + (i % 4) * 3}px`,
                    height: `${6 + (i % 4) * 3}px`,
                    left: `${(i * 19) % 92}%`,
                    top: `${(i * 23) % 88}%`,
                    animationDuration: `${1.2 + (i % 3) * 0.5}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Header Pill */}
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[10px] uppercase tracking-[0.22em] bg-[#D8B4E2]/15 text-[#F9D5E5] ring-1 ring-[#D8B4E2]/30 mb-6">
            <Crown className="w-3.5 h-3.5 text-[#F3E5AB]" />
            <span>SPECIAL SURPRISE DEDICATION · FOR IHSANE (@ihsane__ft)</span>
          </div>

          {/* Trio of Her Real Avatars */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex -space-x-3">
              <img
                src="./images/ihsane_dom_00.jpg"
                alt="Ihsane Ft (@ihsane__ft)"
                className="w-16 h-16 rounded-full object-cover ring-2 ring-[#F3E5AB] shadow-lg"
              />
              <img
                src="./images/pearlie_dom_00.jpg"
                alt="Pearlie (@_pearlie.dreamy)"
                className="w-16 h-16 rounded-full object-cover ring-2 ring-[#D8B4E2] shadow-lg"
              />
              <img
                src="./images/calmcorner_dom_00.jpg"
                alt="Little Calm Corner (@__little.calmcorner)"
                className="w-16 h-16 rounded-full object-cover ring-2 ring-[#F9D5E5] shadow-lg"
              />
            </div>
            <div>
              <h3 id="ihsane-surprise-title" className="font-display text-2xl sm:text-3xl font-medium">
                Ihsane Ft <span className="text-[#D8B4E2] text-lg font-normal">(@ihsane__ft)</span>
              </h3>
              <p className="text-xs text-white/70">
                Founder & Artisan of <strong className="text-white">Pearlie Handcrafted</strong> &{' '}
                <strong className="text-white">Little Calm Corner ☁️</strong>
              </p>
            </div>
          </div>

          {/* Heartfelt Tribute Letter */}
          <div className="rounded-2xl bg-white/[0.04] ring-1 ring-white/10 p-4 sm:p-6 space-y-3.5 text-xs sm:text-sm leading-relaxed text-white/85 mb-6">
            <div
              dir="rtl"
              className="p-3 rounded-xl bg-[#F3E5AB]/10 ring-1 ring-[#F3E5AB]/30 text-center font-maghribi text-lg sm:text-xl text-[#F3E5AB] leading-[1.85]"
            >
              « إِحْسَانُ صَنْعَتِهَا يُشِعُّ نَضَارَةً ❖ كَالبَدْرِ يَنْسِجُ فِي الظَّلَامِ دَرَارِيَا »
            </div>
            {lang === 'ar' ? (
              <>
                <p className="font-maghribi text-2xl text-[#F9D5E5]">
                  إِلَى إِحْسَان فَتْحِي المُبْدِعَةِ (@ihsane__ft) 🤍🔮
                </p>
                <p>
                  هذا الموقع صُمّم خصيصاً كمفاجأة لكِ احتفاءً بإبداعكِ وشغفكِ! بين سنتكِ الأخيرة في الدراسة الهندسية، وبين أناملكِ التي تنسج مئات اللآلئ والكريستالات في{' '}
                  <strong>Pearlie Handcrafted</strong>، ورسائلكِ الهادئة التي تنشر الطمأنينة في{' '}
                  <strong>Little Calm Corner ☁️</strong> — صنعتِ عالماً يجمع بين الرقي، التفرد، والجمال الهادئ.
                </p>
                <p className="italic text-[#D8B4E2]">
                  « Read it. Dream it. Do it! كل لؤلؤة تنسجينها بحب تروي قصة نجاحكِ وتألقكِ. »
                </p>
              </>
            ) : lang === 'fr' ? (
              <>
                <p className="font-display text-xl italic text-[#F9D5E5]">
                  Pour Ihsane (@ihsane__ft) — Une surprise créée spécialement pour toi 🤍🔮
                </p>
                <p>
                  Ce site web futuriste a été conçu comme un écrin digital sur-mesure pour célébrer ton talent, ta patience et ta vision. Entre ta dernière année d’études et les heures passées à tisser chaque perle de{' '}
                  <strong>Pearlie Handcrafted (@_pearlie.dreamy)</strong> tout en partageant la douceur de{' '}
                  <strong>Little Calm Corner (@__little.calmcorner)</strong>, tu crées une beauté rare qui n’a pas besoin de faire du bruit pour être inoubliable.
                </p>
                <p className="italic text-[#D8B4E2]">
                  « Read it. Dream it. Do it! Que ta maison Pearlie rayonne partout au Maroc et au-delà. »
                </p>
              </>
            ) : (
              <>
                <p className="font-display text-xl italic text-[#F9D5E5]">
                  Dear Ihsane (@ihsane__ft) — This digital maison was built as a surprise for you 🤍🔮
                </p>
                <p>
                  Between your final year of studies and the countless hours spent hand-weaving every single pearl and crystal of{' '}
                  <strong>Pearlie Handcrafted (@_pearlie.dreamy)</strong>, while sharing gentle reminders for the soul on{' '}
                  <strong>Little Calm Corner (@__little.calmcorner)</strong> — you have built something truly magical.
                </p>
                <p className="italic text-[#D8B4E2]">
                  “A kind of beauty that doesn’t need to be loud to be noticed. Read it. Dream it. Do it!”
                </p>
              </>
            )}
          </div>

          {/* Direct Links to Her 3 Worlds + Celebrate Button */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <a
                href={BRAND_LINKS.ihsaneIG}
                target="_blank"
                rel="noopener noreferrer"
                className="press-feedback inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs bg-white/10 hover:bg-white/15 ring-1 ring-white/15"
              >
                <span>@ihsane__ft</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={BRAND_LINKS.pearlieIG}
                target="_blank"
                rel="noopener noreferrer"
                className="press-feedback inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs bg-[#D8B4E2]/20 hover:bg-[#D8B4E2]/30 text-[#F3E5F8] ring-1 ring-[#D8B4E2]/40"
              >
                <span>@_pearlie.dreamy</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={BRAND_LINKS.calmCornerIG}
                target="_blank"
                rel="noopener noreferrer"
                className="press-feedback inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs bg-[#F9D5E5]/20 hover:bg-[#F9D5E5]/30 text-[#F9D5E5] ring-1 ring-[#F9D5E5]/40"
              >
                <span>@__little.calmcorner</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <button
              type="button"
              onClick={() => {
                setCelebrating(true);
                setTimeout(() => setCelebrating(false), 3500);
              }}
              className="press-feedback inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[#D8B4E2] via-[#F9D5E5] to-[#F3E5AB] text-[#09060E] shadow-[0_0_25px_rgba(216,180,226,0.5)]"
            >
              <Stars className="w-4 h-4" />
              <span>{celebrating ? 'Shining Bright, Ihsane! ✨💎' : 'Send Pearl Sparkles ✨'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
