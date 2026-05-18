import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { type Language, getTranslations } from '@/lib/i18n';

const TRUST_BADGES = [
  { id: 'badge-exp', value: '20+', labelKey: 'badge_exp_label', icon: 'StarIcon' },
  { id: 'badge-patients', value: '10,000+', labelKey: 'badge_patients_label', icon: 'UserGroupIcon' },
  { id: 'badge-cert', value: 'MS ENT', labelKey: 'badge_cert_label', icon: 'AcademicCapIcon' },
];

interface HeroSectionProps {
  language: Language;
}

export default function HeroSection({ language }: HeroSectionProps) {
  const t = getTranslations(language);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-16 lg:pt-20"
      style={{ background: 'linear-gradient(135deg, #0F172A 0%, #0F766E 60%, #14B8A6 100%)' }}>

      {/* Background decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #22D3EE 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 lg:py-16">
          {/* Left Content */}
          <div className="animate-slide-up order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs sm:text-sm font-medium mb-5 lg:mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse flex-shrink-0" />
              {t.hero_badge}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold text-white leading-tight tracking-tight mb-5 lg:mb-6 text-balance">
              {t.hero_title}<br />
              <span className="text-accent">{t.hero_title_accent}</span>
            </h1>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-7 lg:mb-8 max-w-lg">
              {t.hero_desc}
            </p>

            <div className="flex flex-wrap gap-3 lg:gap-4 mb-8 lg:mb-10">
              <a href="#booking" className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-sm text-primary transition-all duration-200 active:scale-95 bg-white hover:shadow-xl">
                <Icon name="CalendarDaysIcon" size={18} />
                {t.hero_book}
              </a>
              <a
                href="https://www.tiktok.com/@dr_krishna_koirala_ent"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-sm text-white border-2 border-white/40 hover:bg-white/10 transition-all duration-200 active:scale-95">
                <Icon name="PlayCircleIcon" size={18} />
                {t.hero_tiktok}
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 lg:gap-4">
              {TRUST_BADGES.map((badge) => (
                <div key={badge.id} className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Icon name={badge.icon as Parameters<typeof Icon>[0]['name']} size={16} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-base sm:text-lg leading-none font-tabular">{badge.value}</p>
                    <p className="text-white/70 text-xs font-medium mt-0.5">{t[badge.labelKey as keyof typeof t]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Doctor Image */}
          <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative w-64 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[480px]">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-3xl opacity-30"
                style={{ background: 'radial-gradient(circle, #14B8A6 0%, transparent 70%)' }} />
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-white/20"
                style={{ background: 'linear-gradient(180deg, rgba(20,184,166,0.2) 0%, rgba(15,118,110,0.4) 100%)' }}>
                <AppImage
                  src="/assets/images/Gemini_Generated_Image_a6lik2a6lik2a6li-1779012884856.png"
                  alt="Dr. Krishna Koirala, ENT Specialist and Head-Neck Surgeon in surgical scrubs and cap"
                  fill
                  className="object-cover object-top"
                  priority />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-white rounded-2xl p-3 sm:p-4 card-shadow-lg">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                    <Icon name="CheckBadgeIcon" size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">{t.hero_float_title}</p>
                    <p className="text-xs text-muted-foreground">{t.hero_float_sub}</p>
                  </div>
                </div>
              </div>
              {/* Rating card */}
              <div className="absolute -top-3 sm:-top-4 -right-3 sm:-right-4 bg-white rounded-2xl px-3 sm:px-4 py-2 sm:py-3 card-shadow-lg">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Icon key={`star-${s}`} name="StarIcon" size={11} variant="solid" className="text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-foreground">4.9</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{t.hero_reviews}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <p className="text-white/60 text-xs font-medium">{t.hero_scroll}</p>
        <Icon name="ChevronDownIcon" size={20} className="text-white/60" />
      </div>
    </section>
  );
}