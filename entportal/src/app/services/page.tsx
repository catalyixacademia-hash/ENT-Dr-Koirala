'use client';
import React from 'react';
import Link from 'next/link';
import PublicNavbar from '../components/PublicNavbar';
import ServicesSection from '../components/ServicesSection';
import PublicFooter from '../components/PublicFooter';
import WhatsAppButton from '../components/WhatsAppButton';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ServicesPage() {
  const { language, setLanguage, t } = useLanguage();

  const DETAILED_SERVICES = [
    {
      title: t.services_ear_title,
      items:
        language === 'en'
          ? [
              'Microscopic Ear Surgery',
              'Tympanoplasty (Eardrum Repair)',
              'Mastoidectomy',
              'Hearing Aid Evaluation',
              'Vertigo Management',
              'Tinnitus Therapy',
            ]
          : [
              'कानको सूक्ष्म शल्यक्रिया',
              'कानको जाली फेर्ने (Tympanoplasty)',
              'मास्टोइडेक्टोमी',
              'श्रवण यन्त्र मूल्याङ्कन',
              'रिंगटा लाग्ने समस्याको व्यवस्थापन',
              'कान कराउने समस्याको उपचार',
            ],
    },
    {
      title: t.services_nose_title,
      items:
        language === 'en'
          ? [
              'Endoscopic Sinus Surgery (FESS)',
              'Septoplasty',
              'Turbinate Reduction',
              'Nasal Polyps Removal',
              'Allergy Management',
              'Epistaxis (Nosebleed) Control',
            ]
          : [
              'इन्डोस्कोपिक साइनस सर्जरी (FESS)',
              'सेप्टोप्लास्टी',
              'टर्बिनेट रिडक्सन',
              'नाकको मासु निकाल्ने',
              'एलर्जी व्यवस्थापन',
              'नाकबाट रगत बग्ने समस्याको नियन्त्रण',
            ],
    },
    {
      title: t.services_thyroid_title,
      items:
        language === 'en'
          ? [
              'Thyroidectomy',
              'Parotid Surgery',
              'Submandibular Gland Surgery',
              'Head and Neck Cancer Screening',
              'Biopsy and Cyst Removal',
            ]
          : [
              'थाइरोइड सर्जरी',
              'प्यारोटिड सर्जरी',
              'सबमन्डिबुलर ग्रन्थि सर्जरी',
              'टाउको र घाँटीको क्यान्सर स्क्रिनिङ',
              'बायोप्सी र सिस्ट निकाल्ने',
            ],
    },
  ];

  return (
    <main>
      <PublicNavbar language={language} onLanguageChange={setLanguage} />

      {/* Page Header */}
      <section className="pt-32 pb-16 bg-slate-900 text-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">{t.nav_services}</h1>
          <p className="text-sky-100 text-lg max-w-2xl">
            Specialized medical and surgical treatments for ear, nose, throat, and thyroid disorders
            using advanced diagnostic and surgical technologies.
          </p>
        </div>
      </section>

      <ServicesSection language={language} />

      {/* Detailed Service Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Comprehensive Treatment List
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DETAILED_SERVICES.map((section, idx) => (
              <div key={idx} className="p-8 rounded-3xl border border-slate-100 bg-slate-50">
                <h3 className="text-xl font-bold text-[#0f766e] mb-6 border-b border-[#0f766e]/10 pb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 font-medium">
                      <Icon
                        name="CheckCircleIcon"
                        size={18}
                        className="text-emerald-500 shrink-0 mt-0.5"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Expert Surgical Care for Your Health</h2>
          <p className="text-emerald-50 text-lg mb-10 max-w-2xl mx-auto">
            Book a consultation today to discuss your symptoms and explore the most effective
            treatment options tailored for you.
          </p>
          <Link
            href="/#booking"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-white text-emerald-600 font-bold hover:bg-emerald-50 transition-all shadow-xl active:scale-95"
          >
            <Icon name="CalendarDaysIcon" size={20} />
            {t.nav_book}
          </Link>
        </div>
      </section>

      <PublicFooter language={language} />
      <WhatsAppButton language={language} />
    </main>
  );
}
