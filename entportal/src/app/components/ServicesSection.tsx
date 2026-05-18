import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { type Language, getTranslations } from '@/lib/i18n';

const SERVICES = [
  {
    id: 'svc-ear',
    icon: 'SpeakerWaveIcon',
    title: { en: 'Ear Disorders', ne: 'कानको समस्याहरू' },
    desc: { en: 'Comprehensive care for hearing loss, ear infections, tinnitus, and eardrum perforations.', ne: 'श्रवण हानि, कानको संक्रमण, टिनिटस र कानको पर्दा फुटेको उपचार।' },
    tags: { en: ['Hearing Loss', 'Tinnitus', 'Ear Infections'], ne: ['श्रवण हानि', 'टिनिटस', 'कान संक्रमण'] },
    color: 'bg-blue-50 text-blue-600',
  },
  {
    id: 'svc-nose',
    icon: 'FaceSmileIcon',
    title: { en: 'Nose & Sinus', ne: 'नाक र साइनस' },
    desc: { en: 'Expert treatment for sinusitis, nasal polyps, deviated septum, and chronic congestion.', ne: 'साइनसाइटिस, नाकको पोलिप, विचलित सेप्टम र पुरानो बन्द नाकको उपचार।' },
    tags: { en: ['Sinusitis', 'Nasal Polyps', 'Septoplasty'], ne: ['साइनसाइटिस', 'नाकको पोलिप', 'सेप्टोप्लास्टी'] },
    color: 'bg-teal-50 text-teal-600',
  },
  {
    id: 'svc-throat',
    icon: 'ChatBubbleBottomCenterIcon',
    title: { en: 'Throat & Voice', ne: 'घाँटी र आवाज' },
    desc: { en: 'Diagnosis and treatment of sore throats, tonsillitis, voice disorders, and swallowing issues.', ne: 'घाँटी दुख्ने, टन्सिलाइटिस, आवाजको समस्या र निल्न गाह्रो हुने उपचार।' },
    tags: { en: ['Tonsillitis', 'Voice Disorders', 'Dysphagia'], ne: ['टन्सिलाइटिस', 'आवाजको समस्या', 'डिस्फेजिया'] },
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    id: 'svc-pediatric',
    icon: 'HeartIcon',
    title: { en: 'Pediatric ENT', ne: 'बाल ENT' },
    desc: { en: 'Specialized gentle care for children — ear tubes, adenoids, tonsils, and speech concerns.', ne: 'बच्चाहरूका लागि विशेष कोमल उपचार — कानको ट्युब, एडिनोइड, टन्सिल।' },
    tags: { en: ['Ear Tubes', 'Adenoids', 'Tonsils'], ne: ['कानको ट्युब', 'एडिनोइड', 'टन्सिल'] },
    color: 'bg-pink-50 text-pink-600',
  },
  {
    id: 'svc-allergy',
    icon: 'ShieldExclamationIcon',
    title: { en: 'Allergy & Immunology', ne: 'एलर्जी र इम्युनोलोजी' },
    desc: { en: 'Allergy testing, immunotherapy, and management of seasonal and perennial allergies.', ne: 'एलर्जी परीक्षण, इम्युनोथेरापी र मौसमी एलर्जीको व्यवस्थापन।' },
    tags: { en: ['Allergy Testing', 'Immunotherapy', 'Rhinitis'], ne: ['एलर्जी परीक्षण', 'इम्युनोथेरापी', 'राइनाइटिस'] },
    color: 'bg-amber-50 text-amber-600',
  },
  {
    id: 'svc-hearing',
    icon: 'AdjustmentsHorizontalIcon',
    title: { en: 'Hearing Solutions', ne: 'श्रवण समाधान' },
    desc: { en: 'Audiological evaluations, hearing aids fitting, and cochlear implant candidacy assessment.', ne: 'अडियोलोजिकल मूल्यांकन, श्रवण यन्त्र फिटिङ र कक्लियर इम्प्लान्ट मूल्यांकन।' },
    tags: { en: ['Audiometry', 'Hearing Aids', 'Cochlear'], ne: ['अडियोमेट्री', 'श्रवण यन्त्र', 'कक्लियर'] },
    color: 'bg-purple-50 text-purple-600',
  },
];

interface ServicesSectionProps {
  language: Language;
}

export default function ServicesSection({ language }: ServicesSectionProps) {
  const t = getTranslations(language);

  return (
    <section id="services" className="section-padding bg-muted/30">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 lg:mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 mb-4">
            {t.services_tag}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
            {t.services_title}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            {t.services_desc}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {SERVICES.map((svc) => (
            <div
              key={svc.id}
              className="bg-white rounded-2xl p-5 sm:p-6 border card-shadow hover:card-shadow-md transition-all duration-300 group hover:-translate-y-1 cursor-pointer"
            >
              <div className={`inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${svc.color} mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={svc.icon as Parameters<typeof Icon>[0]['name']} size={20} />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-foreground mb-2">{svc.title[language]}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">{svc.desc[language]}</p>
              <div className="flex flex-wrap gap-1.5">
                {svc.tags[language].map((tag) => (
                  <span key={`${svc.id}-tag-${tag}`} className="px-2.5 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <a href="#booking" className="btn-primary px-6 sm:px-8 py-3 sm:py-3.5">
            <Icon name="CalendarDaysIcon" size={18} />
            {t.services_cta}
          </a>
        </div>
      </div>
    </section>
  );
}