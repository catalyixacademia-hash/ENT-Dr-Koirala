'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { type Language, getTranslations } from '@/lib/i18n';

interface BookingFormData {
  fullName: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  reason: string;
  message: string;
}

const ENT_REASONS_EN = [
  'Ear Pain / Ear Infection', 'Hearing Loss / Tinnitus', 'Blocked / Runny Nose',
  'Sinusitis / Sinus Pressure', 'Sore Throat / Tonsil Issues', 'Voice Change / Hoarseness',
  'Pediatric ENT Concern', 'Allergy Consultation', 'Post-Surgery Follow-up',
  'Hearing Aid Evaluation', 'Other ENT Concern',
];

const ENT_REASONS_NE = [
  'कान दुख्ने / कान संक्रमण', 'श्रवण हानि / टिनिटस', 'बन्द / बग्ने नाक',
  'साइनसाइटिस / साइनस दबाब', 'घाँटी दुख्ने / टन्सिल समस्या', 'आवाज परिवर्तन / कर्कश',
  'बाल ENT समस्या', 'एलर्जी परामर्श', 'शल्यक्रिया पछिको फलो-अप',
  'श्रवण यन्त्र मूल्यांकन', 'अन्य ENT समस्या',
];

const TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
];

interface BookingSectionProps {
  language: Language;
}

export default function BookingSection({ language }: BookingSectionProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '', phone: '', email: '', preferredDate: '', preferredTime: '', reason: '', message: '',
  });
  const [errors, setErrors] = useState<Partial<BookingFormData>>({});
  const [emailError, setEmailError] = useState<string | null>(null);
  const router = useRouter();

  const t = getTranslations(language);
  const ENT_REASONS = language === 'ne' ? ENT_REASONS_NE : ENT_REASONS_EN;

  const validate = () => {
    const newErrors: Partial<BookingFormData> = {};
    if (!formData.fullName) newErrors.fullName = language === 'ne' ? 'पूरा नाम आवश्यक छ' : 'Full name is required';
    if (!formData.phone) newErrors.phone = language === 'ne' ? 'फोन नम्बर आवश्यक छ' : 'Phone number is required';
    if (!formData.preferredDate) newErrors.preferredDate = language === 'ne' ? 'मिति छान्नुहोस्' : 'Please select a date';
    if (!formData.preferredTime) newErrors.preferredTime = language === 'ne' ? 'समय छान्नुहोस्' : 'Please select a time slot';
    if (!formData.reason) newErrors.reason = language === 'ne' ? 'कारण छान्नुहोस्' : 'Please select a reason';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setLoading(true);
    setEmailError(null);
    try {
      const res = await fetch('/api/send-booking-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        setEmailError(data.error || 'Failed to send confirmation email.');
      }
    } catch {
      setEmailError('Could not send confirmation email. Please try again.');
    }
    setLoading(false);
    const encoded = encodeURIComponent(JSON.stringify(formData));
    router.push(`/booking-confirmation?data=${encoded}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const INFO_ITEMS = [
    { id: 'info-phone', icon: 'PhoneIcon', label: language === 'ne' ? 'फोन' : 'Phone', value: '061-553150 | 985-6034347 | 9846166733' },
    { id: 'info-addr', icon: 'MapPinIcon', label: language === 'ne' ? 'क्लिनिक ठेगाना' : 'Clinic Address', value: language === 'ne' ? 'नयाबजार ENT केयर सेन्टर / श्री कृष्ण ENT केयर, नयाबजार, पोखरा, नेपाल' : 'Nayabazar ENT Care Center / Shree Krishna ENT Care, Nayabazar, Pokhara, Nepal' },
    { id: 'info-hours', icon: 'ClockIcon', label: language === 'ne' ? 'क्लिनिक समय' : 'Clinic Hours', value: language === 'ne' ? 'सोम–शनि: बिहान ९:०० – १:०० र साँझ ५:०० – ८:००' : 'Mon–Sat: 9:00 AM – 1:00 PM & 5:00 PM – 8:00 PM' },
    { id: 'info-fb', icon: 'GlobeAltIcon', label: 'Facebook', value: 'facebook.com/drkrishnakoirala' },
  ];

  return (
    <section id="booking" className="section-padding bg-muted/30">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Info */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 mb-4">
              {t.booking_tag}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground mb-5 leading-tight">
              {t.booking_title}<br />
              <span className="text-gradient">{t.booking_title_accent}</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
              {t.booking_desc}
            </p>

            <div className="space-y-3 sm:space-y-4 mb-8">
              {INFO_ITEMS.map((item) => (
                <div key={item.id} className="flex items-start gap-3 sm:gap-4 bg-white rounded-xl p-3 sm:p-4 border card-shadow">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={16} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-0.5">{item.label}</p>
                    <p className="text-xs sm:text-sm font-semibold text-foreground break-words">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl p-5 sm:p-8 border card-shadow-md">
            {submitted ? (
              <div className="text-center py-10 sm:py-12 animate-slide-up">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-5">
                  <Icon name="CheckCircleIcon" size={32} className="text-secondary" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">{t.booking_success_title}</h3>
                <p className="text-muted-foreground mb-6 text-sm">{t.booking_success_desc}</p>
                <button onClick={() => setSubmitted(false)} className="btn-primary px-6 py-3">
                  {t.booking_success_cta}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="label-text">{t.field_name}</label>
                    <input name="fullName" value={formData.fullName} onChange={handleChange} type="text" placeholder={t.field_name_ph} className="input-field" />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="label-text">{t.field_phone}</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder={t.field_phone_ph} className="input-field" />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="label-text">{t.field_email}</label>
                  <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder={t.field_email_ph} className="input-field" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="label-text">{t.field_date}</label>
                    <input name="preferredDate" value={formData.preferredDate} onChange={handleChange} type="date" className="input-field" />
                    {errors.preferredDate && <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>}
                  </div>
                  <div>
                    <label className="label-text">{t.field_time}</label>
                    <select name="preferredTime" value={formData.preferredTime} onChange={handleChange} className="input-field">
                      <option value="">{t.field_time_ph}</option>
                      {TIME_SLOTS.map((slot) => (
                        <option key={`slot-${slot}`} value={slot}>{slot}</option>
                      ))}
                    </select>
                    {errors.preferredTime && <p className="text-red-500 text-xs mt-1">{errors.preferredTime}</p>}
                  </div>
                </div>

                <div>
                  <label className="label-text">{t.field_reason}</label>
                  <select name="reason" value={formData.reason} onChange={handleChange} className="input-field">
                    <option value="">{t.field_reason_ph}</option>
                    {ENT_REASONS.map((r) => (
                      <option key={`reason-${r}`} value={r}>{r}</option>
                    ))}
                  </select>
                  {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason}</p>}
                </div>

                <div>
                  <label className="label-text">{t.field_notes}</label>
                  <p className="text-xs text-muted-foreground mb-1.5">{t.field_notes_hint}</p>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows={3} placeholder={t.field_notes_ph} className="input-field resize-none" />
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 sm:py-4 text-sm sm:text-base">
                  {loading ? (
                    <>
                      <Icon name="ArrowPathIcon" size={18} className="animate-spin" />
                      {t.booking_submitting}
                    </>
                  ) : (
                    <>
                      <Icon name="CalendarDaysIcon" size={18} />
                      {t.booking_submit}
                    </>
                  )}
                </button>
                {emailError && (
                  <p className="text-xs text-amber-600 text-center bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">{emailError}</p>
                )}
                <p className="text-xs text-muted-foreground text-center">{t.booking_privacy}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}