import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { type Language, getTranslations } from '@/lib/i18n';

interface AboutSectionProps {
  language: Language;
}

export default function AboutSection({ language }: AboutSectionProps) {
  const t = getTranslations(language);

  const QUALIFICATIONS = [t.qual_1, t.qual_2, t.qual_3, t.qual_4];

  return (
    <section id="about" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative w-full aspect-[4/5] max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl">
              <AppImage
                src="/assets/images/Gemini_Generated_Image_wpcwupwpcwupwpcw__1_-1779013155996.png"
                alt="Dr. Krishna Koirala in surgical scrubs working at a medical workstation"
                fill
                className="object-cover"
                style={{ transform: 'scaleX(-1)' }}
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -right-6 lg:right-0 bg-[#0f766e] text-white p-6 rounded-2xl shadow-xl animate-float">
              <p className="text-3xl font-bold leading-none">20+</p>
              <p className="text-xs font-medium opacity-90 uppercase tracking-wider mt-1">
                {t.badge_exp_label}
              </p>
            </div>

            {/* Decorative background element */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-100 rounded-full -z-10 blur-3xl opacity-60" />
          </div>

          {/* Content side */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-6 border border-emerald-100">
              <Icon name="UserIcon" size={14} />
              {t.about_tag}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              {t.about_title}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-600">
                {t.about_title_sub}
              </span>
            </h2>

            <div className="space-y-6 text-slate-600 text-base sm:text-lg leading-relaxed mb-10">
              <p>{t.about_p1}</p>
              <p>{t.about_p2}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {QUALIFICATIONS.map((qual, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-600/10 flex items-center justify-center">
                    <Icon name="CheckBadgeIcon" size={18} className="text-emerald-600" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{qual}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#booking"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#0f766e] text-white font-bold hover:bg-[#0d6d65] transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                <Icon name="CalendarDaysIcon" size={20} />
                {t.about_cta}
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-700 font-bold border border-slate-200 hover:bg-slate-50 transition-all active:scale-95"
              >
                <Icon name="PhoneIcon" size={20} />
                {t.nav_contact}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
