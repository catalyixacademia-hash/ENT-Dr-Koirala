import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { type Language, getTranslations } from '@/lib/i18n';

const CREDENTIALS = [
  { id: 'cred-1', text: { en: 'MBBS — Medical Graduate', ne: 'MBBS — चिकित्सा स्नातक' } },
  { id: 'cred-2', text: { en: 'MS (ENT-HNS) — Otorhinolaryngology & Head-Neck Surgery', ne: 'MS (ENT-HNS) — Otorhinolaryngology र Head-Neck Surgery' } },
  { id: 'cred-3', text: { en: 'Professor & Head of ENT, Manipal College of Medical Sciences (MCOMS), Pokhara', ne: 'प्राध्यापक र ENT विभागाध्यक्ष, MCOMS, पोखरा' } },
  { id: 'cred-4', text: { en: 'Senior ENT Consultant, Nayabazar ENT Care Center, Pokhara', ne: 'वरिष्ठ ENT परामर्शदाता, नयाबजार ENT केयर सेन्टर, पोखरा' } },
];

const AWARDS = [
  { id: 'award-1', icon: 'AcademicCapIcon', title: { en: 'Full Professor & Dept. Head', ne: 'पूर्ण प्राध्यापक र विभागाध्यक्ष' }, org: 'MCOMS, Pokhara' },
  { id: 'award-2', icon: 'TrophyIcon', title: { en: 'ENT & Head-Neck Surgery Expert', ne: 'ENT र Head-Neck Surgery विशेषज्ञ' }, org: 'Western Nepal' },
  { id: 'award-3', icon: 'StarIcon', title: { en: 'Excellence in Patient Education', ne: 'बिरामी शिक्षामा उत्कृष्टता' }, org: 'Social Media & Clinic' },
];

interface AboutSectionProps {
  language: Language;
}

export default function AboutSection({ language }: AboutSectionProps) {
  const t = getTranslations(language);

  return (
    <section id="about" className="section-padding bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative w-full aspect-[4/5] max-w-sm mx-auto lg:mx-0 rounded-3xl overflow-hidden">
              <AppImage
                src="/assets/images/Gemini_Generated_Image_wpcwupwpcwupwpcw__1_-1779013155996.png"
                alt="Dr. Krishna Koirala in surgical scrubs working at a medical workstation"
                fill
                className="object-cover"
                style={{ transform: 'scaleX(-1)' }} />
            </div>
            {/* Floating credentials card */}
            <div className="absolute -bottom-4 right-0 sm:-bottom-6 sm:-right-4 lg:right-0 bg-white rounded-2xl p-4 sm:p-5 card-shadow-lg border max-w-xs">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">{t.qual_title}</p>
              <div className="space-y-2">
                {CREDENTIALS.map((c) => (
                  <div key={c.id} className="flex items-start gap-2">
                    <Icon name="CheckCircleIcon" size={14} className="text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-foreground">{c.text[language]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="mt-8 sm:mt-12 lg:mt-0">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 mb-4">
              {t.about_tag}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-5 leading-tight">
              {t.about_title}<br />
              <span className="text-gradient">{t.about_title_sub}</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
              {t.about_p1}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6 text-sm sm:text-base">
              {t.about_p2}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
              {AWARDS.map((award) => (
                <div key={award.id} className="bg-muted/50 rounded-xl p-4 text-center border">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-3">
                    <Icon name={award.icon as Parameters<typeof Icon>[0]['name']} size={18} className="text-white" />
                  </div>
                  <p className="text-xs font-bold text-foreground mb-1">{award.title[language]}</p>
                  <p className="text-xs text-muted-foreground">{award.org}</p>
                </div>
              ))}
            </div>

            <a href="#booking" className="btn-primary">
              <Icon name="CalendarDaysIcon" size={18} />
              {t.about_cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}