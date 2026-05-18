import type { Language } from './i18n';

export type Bilingual = { en: string; ne: string };

export function pick(lang: Language, map: Bilingual): string {
  return map[lang] ?? map.en;
}

export const STATUS_LABELS: Record<string, Bilingual> = {
  pending: { en: 'Pending', ne: 'बाँकी' },
  confirmed: { en: 'Confirmed', ne: 'पुष्टि भयो' },
  completed: { en: 'Completed', ne: 'पूरा भयो' },
  cancelled: { en: 'Cancelled', ne: 'रद्द भयो' },
};

export const SERVICE_TYPE_LABELS: Record<string, Bilingual> = {
  'Ear Disorders': { en: 'Ear Disorders', ne: 'कानका समस्याहरू' },
  'Nose & Sinus': { en: 'Nose & Sinus', ne: 'नाक र साइनस' },
  'Throat & Voice': { en: 'Throat & Voice', ne: 'घाँटी र आवाज' },
  'Pediatric ENT': { en: 'Pediatric ENT', ne: 'बाल ENT' },
  'Allergy & Immunology': { en: 'Allergy & Immunology', ne: 'एलर्जी र इम्युनोलोजी' },
  'Hearing Solutions': { en: 'Hearing Solutions', ne: 'श्रवण समाधान' },
  Ear: { en: 'Ear', ne: 'कान' },
  Sinus: { en: 'Sinus', ne: 'साइनस' },
  Throat: { en: 'Throat', ne: 'घाँटी' },
  Pediatric: { en: 'Pediatric', ne: 'बाल' },
  Allergy: { en: 'Allergy', ne: 'एलर्जी' },
  Hearing: { en: 'Hearing', ne: 'श्रवण' },
};

export const DAY_LABELS: Record<string, Bilingual> = {
  Monday: { en: 'Monday', ne: 'सोमबार' },
  Tuesday: { en: 'Tuesday', ne: 'मङ्गलबार' },
  Wednesday: { en: 'Wednesday', ne: 'बुधबार' },
  Thursday: { en: 'Thursday', ne: 'बिहीबार' },
  Friday: { en: 'Friday', ne: 'शुक्रबार' },
  Saturday: { en: 'Saturday', ne: 'शनिबार' },
  Sunday: { en: 'Sunday', ne: 'आइतबार' },
};

export function statusLabel(lang: Language, status: string): string {
  return STATUS_LABELS[status]?.[lang] ?? status;
}

export function serviceLabel(lang: Language, service: string): string {
  return SERVICE_TYPE_LABELS[service]?.[lang] ?? service;
}

export function dayLabel(lang: Language, day: string): string {
  return DAY_LABELS[day]?.[lang] ?? day;
}

/** e.g. "9:00 AM" → "9:00 बिहान" when lang is ne */
export function formatTimeSlot(lang: Language, slot: string, amLabel: string, pmLabel: string): string {
  if (lang === 'en') return slot;
  return slot.replace(/\s*AM$/i, ` ${amLabel}`).replace(/\s*PM$/i, ` ${pmLabel}`);
}

export function capitalizeStatus(lang: Language, status: string): string {
  const label = statusLabel(lang, status);
  return label;
}
