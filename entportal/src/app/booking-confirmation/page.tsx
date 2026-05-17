'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

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
    '9:00 AM': '090000',
    '9:30 AM': '093000',
    '10:00 AM': '100000',
    '10:30 AM': '103000',
    '11:00 AM': '110000',
    '11:30 AM': '113000',
    '2:00 PM': '140000',
    '2:30 PM': '143000',
    '3:00 PM': '150000',
    '3:30 PM': '153000',
    '4:00 PM': '160000',
    '4:30 PM': '163000',
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
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!details) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const NEXT_STEPS = [
    {
      icon: 'PhoneIcon',
      title: 'Await Confirmation Call',
      desc: 'Our team will call you within 2 hours to confirm your appointment slot.',
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
    },
    {
      icon: 'DocumentTextIcon',
      title: 'Prepare Your Documents',
      desc: 'Bring any previous medical reports, prescriptions, or test results relevant to your condition.',
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
    },
    {
      icon: 'ClockIcon',
      title: 'Arrive 10 Minutes Early',
      desc: 'Please arrive 10 minutes before your appointment to complete registration at the clinic.',
      color: 'bg-amber-50 border-amber-200',
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-100',
    },
    {
      icon: 'ShieldCheckIcon',
      title: 'Your Data is Safe',
      desc: 'Your personal and medical information is handled with strict confidentiality.',
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/20">
      {/* Top Nav */}
      <nav className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary font-bold text-lg">
            <Icon name="ArrowLeftIcon" size={18} />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </Link>
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground">Dr. Krishna Koirala</p>
            <p className="text-xs text-muted-foreground">ENT Specialist</p>
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
            Appointment Request Sent!
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Thank you, <strong className="text-foreground">{details.fullName}</strong>! Your
            appointment request has been received.
            {details.email && ' A confirmation email has been sent to your inbox.'} We'll confirm
            within <strong className="text-primary">2 hours</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Appointment Details Card */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-4">
                <h2 className="text-white font-bold text-base flex items-center gap-2">
                  <Icon name="CalendarDaysIcon" size={18} />
                  Appointment Details
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Patient Name', value: details.fullName, icon: 'UserIcon' },
                    { label: 'Phone Number', value: details.phone, icon: 'PhoneIcon' },
                    {
                      label: 'Preferred Date',
                      value: formatDate(details.preferredDate),
                      icon: 'CalendarIcon',
                    },
                    { label: 'Preferred Time', value: details.preferredTime, icon: 'ClockIcon' },
                    {
                      label: 'Reason for Visit',
                      value: details.reason,
                      icon: 'ClipboardDocumentListIcon',
                      full: true,
                    },
                    ...(details.email
                      ? [{ label: 'Email', value: details.email, icon: 'EnvelopeIcon', full: true }]
                      : []),
                    ...(details.message
                      ? [
                          {
                            label: 'Additional Notes',
                            value: details.message,
                            icon: 'ChatBubbleLeftIcon',
                            full: true,
                          },
                        ]
                      : []),
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 ${(item as { full?: boolean }).full ? 'sm:col-span-2' : ''}`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon
                          name={item.icon as Parameters<typeof Icon>[0]['name']}
                          size={15}
                          className="text-primary"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground font-medium mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-sm font-semibold text-foreground break-words">
                          {item.value}
                        </p>
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
                  Next Steps
                </h2>
              </div>
              <div className="p-6 space-y-3">
                {NEXT_STEPS.map((step, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-4 p-4 rounded-xl border ${step.color}`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl ${step.iconBg} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon
                        name={step.icon as Parameters<typeof Icon>[0]['name']}
                        size={18}
                        className={step.iconColor}
                      />
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
                Add to Calendar
              </h3>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                Download a calendar invite to save this appointment to your device.
              </p>
              <button
                onClick={handleDownloadCalendar}
                className="w-full flex items-center justify-center gap-2 bg-primary text-white rounded-xl py-3 px-4 text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                <Icon name="ArrowDownTrayIcon" size={16} />
                Download .ics File
              </button>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Works with Google, Apple & Outlook Calendar
              </p>
            </div>

            {/* Clinic Info */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h3 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
                <Icon name="MapPinIcon" size={16} className="text-primary" />
                Clinic Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Address</p>
                  <p className="text-xs text-foreground font-semibold leading-relaxed">
                    Nayabazar ENT Care Center, Nayabazar, Pokhara, Nepal
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Hours</p>
                  <p className="text-xs text-foreground font-semibold">
                    Mon–Sat: 9:00 AM – 1:00 PM
                  </p>
                  <p className="text-xs text-foreground font-semibold">5:00 PM – 8:00 PM</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">Phone</p>
                  <button
                    onClick={handleCopyPhone}
                    className="flex items-center gap-2 text-xs text-primary font-semibold hover:underline"
                  >
                    <Icon name="PhoneIcon" size={13} />
                    061-553150
                    {copied ? (
                      <Icon name="CheckIcon" size={13} className="text-green-500" />
                    ) : (
                      <Icon name="ClipboardDocumentIcon" size={13} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                  Status: Pending Confirmation
                </p>
              </div>
              <p className="text-xs text-amber-700 leading-relaxed">
                Your appointment is pending confirmation. Our team will contact you within 2 hours.
              </p>
            </div>

            {/* Book Another */}
            <Link
              href="/#booking"
              className="flex items-center justify-center gap-2 w-full bg-slate-100 hover:bg-slate-200 text-foreground rounded-xl py-3 px-4 text-sm font-semibold transition-colors"
            >
              <Icon name="PlusCircleIcon" size={16} />
              Book Another Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-muted/30">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
