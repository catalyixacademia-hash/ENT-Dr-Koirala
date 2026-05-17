'use client';
import React, { useState } from 'react';
import PublicNavbar from '../components/PublicNavbar';
import PublicFooter from '../components/PublicFooter';
import WhatsAppButton from '../components/WhatsAppButton';
import Icon from '@/components/ui/AppIcon';
import { type Language, getTranslations } from '@/lib/i18n';

export default function ContactPage() {
  const [language, setLanguage] = useState<Language>('en');
  const t = getTranslations(language);

  return (
    <main>
      <PublicNavbar language={language} onLanguageChange={setLanguage} />

      {/* Page Header */}
      <section className="pt-32 pb-16 bg-slate-900 text-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">{t.nav_contact}</h1>
          <p className="text-sky-100 text-lg max-w-2xl">
            Visit our clinic in Nayabazar, Pokhara or reach out via phone and WhatsApp for
            appointments and inquiries.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Get in Touch</h2>

              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Icon name="MapPinIcon" size={24} className="text-[#0f766e]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Clinic Location</h3>
                    <p className="text-slate-600 leading-relaxed">
                      {t.clinic_name}
                      <br />
                      {t.clinic_addr}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Icon name="PhoneIcon" size={24} className="text-[#0f766e]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Contact Numbers</h3>
                    <p className="text-slate-600 leading-relaxed font-tabular">
                      Landline: {t.clinic_phone}
                      <br />
                      Mobile: {t.clinic_mobile}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Icon name="ClockIcon" size={24} className="text-[#0f766e]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">OPD Timings</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Sunday — Friday: 4:00 PM — 8:00 PM
                      <br />
                      Saturday: By Appointment
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-8 rounded-3xl bg-slate-50 border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Emergency ENT Care</h3>
                <p className="text-slate-600 mb-6">
                  For after-hours emergencies, please visit the ENT Department at Manipal Teaching
                  Hospital, Phulbari, Pokhara.
                </p>
                <a
                  href="tel:061553150"
                  className="inline-flex items-center gap-2 text-[#0f766e] font-bold hover:underline"
                >
                  <Icon name="ArrowRightIcon" size={16} />
                  Emergency Contact
                </a>
              </div>
            </div>

            {/* Map Placeholder / Info */}
            <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-100 min-h-[400px] border shadow-inner">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <Icon name="MapIcon" size={64} className="text-slate-300 mb-4" />
                <h3 className="text-xl font-bold text-slate-400 mb-2">Google Maps View</h3>
                <p className="text-slate-400 max-w-xs">
                  Located at ENT Chowk, Nayabazar — the most accessible ENT clinic in Pokhara.
                </p>
                <a
                  href="https://maps.google.com/?q=Nayabazar+ENT+Care+Center+Pokhara"
                  target="_blank"
                  className="mt-6 px-6 py-3 rounded-xl bg-white text-slate-900 font-bold shadow-sm border hover:bg-slate-50 transition-all"
                >
                  Open in Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter language={language} />
      <WhatsAppButton language={language} />
    </main>
  );
}
