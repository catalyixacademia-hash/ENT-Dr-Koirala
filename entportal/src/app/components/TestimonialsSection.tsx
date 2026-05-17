'use client';
import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { type Language, getTranslations } from '@/lib/i18n';
import { getTestimonials } from '@/lib/i18n-content';

interface TestimonialsSectionProps {
  language: Language;
}

export default function TestimonialsSection({ language }: TestimonialsSectionProps) {
  const t = getTranslations(language);
  const testimonials = getTestimonials(language);
  const [activeIdx, setActiveIdx] = useState(0);

  const prev = () => setActiveIdx((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setActiveIdx((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  const active = testimonials[activeIdx];

  return (
    <section className="section-padding bg-white">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 mb-4">
            {t.testimonials_tag}
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
            {t.testimonials_title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t.testimonials_desc}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-muted/30 rounded-3xl p-8 lg:p-12 border relative animate-fade-in" key={active?.id}>
            <div className="absolute top-6 right-8 text-8xl font-serif text-primary/10 leading-none select-none">"</div>

            <div className="flex gap-1 mb-6">
              {Array.from({ length: active?.rating }).map((_, i) => (
                <Icon key={`${active?.id}-star-${i}`} name="StarIcon" size={18} variant="solid" className="text-yellow-400" />
              ))}
            </div>

            <p className="text-foreground text-lg leading-relaxed mb-8 font-medium">
              "{active?.text}"
            </p>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <AppImage
                  src={active?.avatar}
                  alt={active?.avatarAlt}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="font-bold text-foreground">{active?.name}</p>
                <p className="text-sm text-muted-foreground">{active?.condition} · {active?.city}</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Icon name="CheckBadgeIcon" size={18} className="text-secondary" />
                <span className="text-xs font-semibold text-secondary">{t.testimonials_verified}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-xl border bg-white hover:bg-muted transition-colors card-shadow active:scale-95"
              aria-label={t.testimonials_prev_aria}
            >
              <Icon name="ChevronLeftIcon" size={20} className="text-foreground" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={`dot-${i}`}
                  onClick={() => setActiveIdx(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === activeIdx ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/30'}`}
                  aria-label={`${t.testimonials_go_to_aria} ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-xl border bg-white hover:bg-muted transition-colors card-shadow active:scale-95"
              aria-label={t.testimonials_next_aria}
            >
              <Icon name="ChevronRightIcon" size={20} className="text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
