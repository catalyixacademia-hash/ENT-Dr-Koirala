'use client';
import React from 'react';
import PublicNavbar from '../components/PublicNavbar';
import AboutSection from '../components/AboutSection';
import PublicFooter from '../components/PublicFooter';
import WhatsAppButton from '../components/WhatsAppButton';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutPage() {
  const { language, setLanguage, t } = useLanguage();

  const CAREER_MILESTONES = [
    {
      year: 'Present',
      title: 'Professor & HOD',
      org: 'Manipal College of Medical Sciences (MCOMS), Pokhara',
    },
    {
      year: 'Present',
      title: 'Senior Consultant ENT Surgeon',
      org: 'Nayabazar ENT Care Center',
    },
    {
      year: '20+ Years',
      title: 'Specialized Surgical Practice',
      org: 'Western Nepal Region',
    },
  ];

  return (
    <main>
      <PublicNavbar language={language} onLanguageChange={setLanguage} />

      {/* Page Header */}
      <section className="pt-32 pb-16 bg-slate-900 text-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">{t.nav_about}</h1>
          <p className="text-sky-100 text-lg max-w-2xl">
            Learn more about Dr. Krishna Koirala&apos;s academic journey, surgical expertise, and
            dedication to medical excellence in Nepal.
          </p>
        </div>
      </section>

      <AboutSection language={language} />

      {/* Career Journey Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-12">
              Professional Journey & Impact
            </h2>

            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
              {CAREER_MILESTONES.map((stone, idx) => (
                <div
                  key={idx}
                  className="relative flex items-center justify-between group is-active md:justify-normal md:odd:flex-row-reverse"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-[#0f766e] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <Icon name="AcademicCapIcon" size={16} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[45%] p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between mb-1 space-x-2">
                      <div className="font-bold text-slate-900">{stone.title}</div>
                      <time className="font-medium text-[#0f766e] text-xs sm:text-sm">
                        {stone.year}
                      </time>
                    </div>
                    <div className="text-sm text-slate-500">{stone.org}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Philosophy of Care</h2>
              <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                <p>
                  Dr. Koirala believes that every patient deserves clear communication and
                  compassionate care. His approach combines the latest surgical techniques with a
                  deep understanding of the patient&apos;s individual needs.
                </p>
                <p>
                  &quot;In the field of ENT, precision is paramount. Whether it&apos;s a routine
                  checkup or a complex head and neck surgery, my goal is to restore function and
                  improve the quality of life for my patients.&quot;
                </p>
              </div>
            </div>
            <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
              <h3 className="text-xl font-bold text-emerald-900 mb-4">Patient Education</h3>
              <p className="text-emerald-800/80 mb-6 leading-relaxed">
                Dr. Koirala is a strong advocate for preventive health. He regularly shares
                educational content on TikTok and YouTube to help the public identify early signs of
                ENT disorders.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.youtube.com/@DrKrishnaKoiralaENT"
                  target="_blank"
                  className="btn-primary bg-red-600 hover:bg-red-700"
                >
                  YouTube
                </a>
                <a
                  href="https://www.tiktok.com/@dr_krishna_koirala_ent"
                  target="_blank"
                  className="btn-primary bg-black hover:bg-slate-800"
                >
                  TikTok
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
