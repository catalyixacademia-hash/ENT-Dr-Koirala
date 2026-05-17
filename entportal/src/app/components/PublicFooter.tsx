import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppLogo from '@/components/ui/AppLogo';
import { type Language, getTranslations } from '@/lib/i18n';

interface PublicFooterProps {
  language: Language;
}

export default function PublicFooter({ language }: PublicFooterProps) {
  const t = getTranslations(language);

  const quickLinks = [
    { label: t.nav_home, href: '#hero' },
    { label: t.nav_about, href: '#about' },
    { label: t.nav_services, href: '#services' },
    { label: t.nav_contact, href: '#booking' },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-8 sm:mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <AppLogo size={36} />
              <div>
                <p className="font-bold text-white text-sm">Dr. Krishna Koirala</p>
                <p className="text-xs text-slate-400">ENT & Head-Neck Surgeon</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">{t.footer_tagline}</p>
            <div className="flex gap-3">
              {[
                { icon: 'GlobeAltIcon', href: 'https://www.facebook.com/drkrishnakoirala', label: 'Facebook' },
                { icon: 'PlayCircleIcon', href: 'https://www.tiktok.com/@dr_krishna_koirala_ent', label: 'TikTok' },
                { icon: 'PhoneIcon', href: 'tel:061553150', label: 'Phone' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Icon name={s.icon as Parameters<typeof Icon>[0]['name']} size={16} className="text-slate-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-bold text-white text-sm mb-4 uppercase tracking-wider">{t.footer_quick}</p>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-bold text-white text-sm mb-4 uppercase tracking-wider">{t.footer_contact}</p>
            <div className="space-y-3">
              {[
                { icon: 'PhoneIcon', text: '061-553150 | 985-6034347' },
                { icon: 'MapPinIcon', text: 'Nayabazar ENT Care Center, Pokhara, Nepal' },
                { icon: 'ClockIcon', text: 'Mon–Sat: 9AM–1PM & 5PM–8PM' },
              ].map((item, i) => (
                <div key={`contact-${i}`} className="flex items-start gap-2.5">
                  <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={14} className="text-slate-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-400 text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs text-center sm:text-left">{t.footer_rights}</p>
          <p className="text-slate-600 text-xs text-center sm:text-right max-w-sm">{t.footer_disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}