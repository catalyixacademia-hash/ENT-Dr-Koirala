import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { type Language, getTranslations } from '@/lib/i18n';

interface ServicesSectionProps {
  language: Language;
}

export default function ServicesSection({ language }: ServicesSectionProps) {
  const t = getTranslations(language);

  const SERVICES = [
    {
      id: 'svc-ear',
      icon: 'SpeakerWaveIcon',
      title: t.services_ear_title,
      desc: t.services_ear_desc,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      id: 'svc-nose',
      icon: 'FaceSmileIcon',
      title: t.services_nose_title,
      desc: t.services_nose_desc,
      color: 'bg-teal-50 text-teal-600 border-teal-100',
    },
    {
      id: 'svc-throat',
      icon: 'ChatBubbleBottomCenterIcon',
      title: t.services_throat_title,
      desc: t.services_throat_desc,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      id: 'svc-thyroid',
      icon: 'UserIcon',
      title: t.services_thyroid_title,
      desc: t.services_thyroid_desc,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
    {
      id: 'svc-pediatric',
      icon: 'HeartIcon',
      title: t.services_pediatric_title,
      desc: t.services_pediatric_desc,
      color: 'bg-pink-50 text-pink-600 border-pink-100',
    },
    {
      id: 'svc-surgery',
      icon: 'AcademicCapIcon',
      title: t.services_surgery_title,
      desc: t.services_surgery_desc,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
    },
  ];

  return (
    <section id="services" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#0f766e] bg-[#0f766e]/10 mb-4">
            {t.services_tag}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">
            {t.services_title}
          </h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto">{t.services_desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((svc) => (
            <div
              key={svc.id}
              className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${svc.color} border mb-6 group-hover:scale-110 transition-transform duration-200`}
              >
                <Icon name={svc.icon as Parameters<typeof Icon>[0]['name']} size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{svc.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-6">{svc.desc}</p>

              <div className="flex items-center text-[#0f766e] font-bold text-sm group/link cursor-pointer">
                <span>{t.services_cta}</span>
                <Icon
                  name="ChevronRightIcon"
                  size={16}
                  className="ml-1 group-hover/link:translate-x-1 transition-transform"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 lg:p-12 rounded-[2.5rem] bg-gradient-to-r from-[#075985] to-[#0f766e] text-white overflow-hidden relative">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">Need Urgent ENT Consultation?</h3>
              <p className="text-sky-100 text-lg">
                Call our Nayabazar clinic directly for priority appointments.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:061553150"
                className="px-8 py-4 rounded-xl bg-white text-[#0f766e] font-bold shadow-lg hover:bg-sky-50 transition-all active:scale-95 flex items-center gap-2"
              >
                <Icon name="PhoneIcon" size={20} />
                061-553150
              </a>
              <a
                href="https://wa.me/9856034347"
                className="px-8 py-4 rounded-xl bg-emerald-500 text-white font-bold shadow-lg hover:bg-emerald-600 transition-all active:scale-95 flex items-center gap-2"
              >
                <Icon name="ChatBubbleLeftEllipsisIcon" size={20} />
                WhatsApp
              </a>
            </div>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 rounded-full bg-emerald-400/10 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
