'use client';
import React, { useEffect, useMemo, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { type Language, getTranslations } from '@/lib/i18n';
import { formatTimeSlot } from '@/lib/i18n-helpers';

interface AppointmentDetails {
  fullName: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  reason: string;
  message: string;
}

function generateICSContent(details: AppointmentDetails): string {
  const dateStr = details.preferredDate.replace(/-/g, '');
  const timeMap: Record<string, string> = {
    '9:00 AM': '090000', '9:30 AM': '093000', '10:00 AM': '100000', '10:30 AM': '103000',
    '11:00 AM': '110000', '11:30 AM': '113000', '2:00 PM': '140000', '2:30 PM': '143000',
    '3:00 PM': '150000', '3:30 PM': '153000', '4:00 PM': '160000', '4:30 PM': '163000',
  };
  const startTime = timeMap[details.preferredTime] || '090000';
  const endHour = parseInt(startTime.substring(0, 2)) + 1;
  const endTime = `${String(endHour).padStart(2, '0')}${startTime.substring(2)}`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ENTPortal//Appointment//EN',
    'BEGIN:VEVENT',
    `DTSTART:${dateStr}T${startTime}`,
    `DTEND:${dateStr}T${endTime}`,
    `SUMMARY:ENT Appointment – Dr. Krishna Koirala`,
    `DESCRIPTION:Appointment for ${details.fullName}\\nReason: ${details.reason}\\nPhone: ${details.phone}`,
    `LOCATION:Nayabazar ENT Care Center\\, Nayabazar\\, Pokhara\\, Nepal`,
    `ORGANIZER;CN=Dr. Krishna Koirala:mailto:drkrishnakoirala@gmail.com`,
    'STATUS:TENTATIVE',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [details, setDetails] = useState<AppointmentDetails | null>(null);
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const t = getTranslations(language);

  useEffect(() => {
    const langParam = searchParams.get('lang');
    if (langParam === 'ne' || langParam === 'en') {
      setLanguage(langParam);
    } else {
      const stored = window.localStorage.getItem('entportal-lang');
      if (stored === 'ne' || stored === 'en') setLanguage(stored);
    }
  }, [searchParams]);

  useEffect(() => {
    const data = searchParams.get('data');
    if (data) {
      try {
        const parsed = JSON.parse(decodeURIComponent(data));
        setDetails(parsed);
      } catch {
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [searchParams, router]);

  const handleDownloadCalendar = () => {
    if (!details) return;
    const icsContent = generateICSContent(details);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ent-appointment-${details.preferredDate}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('061-553150').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return dateStr;
    const locale = language === 'ne' ? 'ne-NP' : 'en-US';
    return new Date(dateStr + 'T00:00:00').toLocaleDateString(locale, {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  const displayTime = (slot: string) =>
    formatTimeSlot(language, slot, t.time_am, t.time_pm);

  const nextSteps = useMemo(
    () => [
      {
        icon: 'PhoneIcon',
        title: t.confirm_step_call_title,
        desc: t.confirm_step_call_desc,
        color: 'bg-blue-50 border-blue-200',
        iconColor: 'text-blue-600',
        iconBg: 'bg-blue-100',
      },
      {
        icon: 'DocumentTextIcon',
        title: t.confirm_step_docs_title,
        desc: t.confirm_step_docs_desc,
        color: 'bg-purple-50 border-purple-200',
        iconColor: 'text-purple-600',
        iconBg: 'bg-purple-100',
      },
      {
        icon: 'ClockIcon',
        title: t.confirm_step_early_title,
        desc: t.confirm_step_early_desc,
        color: 'bg-amber-50 border-amber-200',
        iconColor: 'text-amber-600',
        iconBg: 'bg-amber-100',
      },
      {
        icon: 'ShieldCheckIcon',
        title: t.confirm_step_safe_title,
        desc: t.confirm_step_safe_desc,
        color: 'bg-green-50 border-green-200',
        iconColor: 'text-green-600',
        iconBg: 'bg-green-100',
      },
    ],
    [t]
  );

  if (!details) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/20">
      {/* Top Nav */}
      <nav className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary font-bold text-lg">
            <Icon name="ArrowLeftIcon" size={18} />
            <span className="hidden sm:inline">{t.confirm_back_home}</span>
            <span className="sm:hidden">{t.confirm_home_short}</span>
          </Link>
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground">{t.nav_doctor_name}</p>
            <p className="text-xs text-muted-foreground">{t.confirm_ent_specialist}</p>
          </div>
          <div className="w-24 sm:w-32" />
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Success Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-5 animate-bounce-once">
            <Icon name="CheckCircleIcon" size={44} className="text-green-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-3">
            {t.confirm_title}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            {t.confirm_thanks.replace('{name}', details.fullName)}
            {details.email && t.confirm_email_sent}
            {t.confirm_within_hours.replace('{hours}', '2')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Appointment Details Card */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-4">
                <h2 className="text-white font-bold text-base flex items-center gap-2">
                  <Icon name="CalendarDaysIcon" size={18} />
                  {t.confirm_details_title}
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: t.confirm_label_name, value: details.fullName, icon: 'UserIcon' },
                    { label: t.confirm_label_phone, value: details.phone, icon: 'PhoneIcon' },
                    { label: t.confirm_label_date, value: formatDate(details.preferredDate), icon: 'CalendarIcon' },
                    { label: t.confirm_label_time, value: displayTime(details.preferredTime), icon: 'ClockIcon' },
                    { label: t.confirm_label_reason, value: details.reason, icon: 'ClipboardDocumentListIcon', full: true },
                    ...(details.email ? [{ label: t.confirm_label_email, value: details.email, icon: 'EnvelopeIcon', full: true }] : []),
                    ...(details.message ? [{ label: t.confirm_label_notes, value: details.message, icon: 'ChatBubbleLeftIcon', full: true }] : []),
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 ${(item as { full?: boolean }).full ? 'sm:col-span-2' : ''}`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={15} className="text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground font-medium mb-0.5">{item.label}</p>
                        <p className="text-sm font-semibold text-foreground break-words">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-slate-100">
                <h2 className="font-bold text-base text-foreground flex items-center gap-2">
                  <Icon name="ListBulletIcon" size={18} className="text-primary" />
                  {t.confirm_next_steps}
                </h2>
              </div>
              <div className="p-6 space-y-3">
                {nextSteps.map((step, idx) => (
                  <div key={idx} className={`flex items-start gap-4 p-4 rounded-xl border ${step.color}`}>
                    <div className={`w-9 h-9 rounded-xl ${step.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <Icon name={step.icon as Parameters<typeof Icon>[0]['name']} size={18} className={step.iconColor} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground mb-0.5">{step.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-5">
            {/* Calendar Download */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h3 className="font-bold text-sm text-foreground mb-1 flex items-center gap-2">
                <Icon name="CalendarDaysIcon" size={16} className="text-primary" />
                {t.confirm_add_calendar}
              </h3>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                {t.confirm_calendar_desc}
              </p>
              <button
                onClick={handleDownloadCalendar}
                className="w-full flex items-center justify-center gap-2 bg-primary text-white rounded-xl py-3 px-4 text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                <Icon name="ArrowDownTrayIcon" size={16} />
                {t.confirm_download_ics}
              </button>
              <p className="text-xs text-muted-foreground text-center mt-2">{t.confirm_calendar_compat}</p>
            </div>

            {/* Clinic Info */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h3 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
                <Icon name="MapPinIcon" size={16} className="text-primary" />
                {t.confirm_clinic_info}
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">{t.confirm_address}</p>
                  <p className="text-xs text-foreground font-semibold leading-relaxed">{t.confirm_clinic_address}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">{t.confirm_hours}</p>
                  <p className="text-xs text-foreground font-semibold">{t.confirm_hours_morning}</p>
                  <p className="text-xs text-foreground font-semibold">{t.confirm_hours_evening}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">{t.confirm_phone}</p>
                  <button
                    onClick={handleCopyPhone}
                    className="flex items-center gap-2 text-xs text-primary font-semibold hover:underline"
                  >
                    <Icon name="PhoneIcon" size={13} />
                    061-553150
                    {copied ? <Icon name="CheckIcon" size={13} className="text-green-500" /> : <Icon name="ClipboardDocumentIcon" size={13} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">{t.confirm_status_pending}</p>
              </div>
              <p className="text-xs text-amber-700 leading-relaxed">
                {t.confirm_status_desc}
              </p>
            </div>

            {/* Book Another */}
            <Link
              href="/#booking"
              className="flex items-center justify-center gap-2 w-full bg-slate-100 hover:bg-slate-200 text-foreground rounded-xl py-3 px-4 text-sm font-semibold transition-colors"
            >
              <Icon name="PlusCircleIcon" size={16} />
              {t.confirm_book_another}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}

