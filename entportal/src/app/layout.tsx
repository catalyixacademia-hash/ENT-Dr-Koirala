import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Providers from '@/components/Providers';
import '../styles/tailwind.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f766e',
};

export const metadata: Metadata = {
  title:
    'Dr. Krishna Koirala | Best ENT Specialist in Pokhara | Ear, Nose, Throat & Thyroid Surgeon',
  description:
    'Dr. Krishna Prasad Koirala is a leading ENT & Head-Neck Surgeon in Pokhara. Professor at MCOMS and Senior Consultant at Nayabazar ENT Care Center. Specializing in Thyroid, Sinus, and Ear surgeries.',
  keywords:
    'ENT doctor Pokhara, best ear doctor Nepal, Dr. Krishna Koirala, ENT specialist Pokhara, thyroid surgeon Pokhara, sinus surgery Nepal, नाक कान घाँटीको डाक्टर पोखरा',
  alternates: {
    canonical: 'https://drkrishnakoirala.com.np',
  },
  openGraph: {
    title: 'Dr. Krishna Koirala | Expert ENT & Head-Neck Surgeon in Pokhara',
    description:
      'Expert care for ear, nose, throat, and thyroid conditions by Professor Dr. Krishna Koirala.',
    url: 'https://drkrishnakoirala.com.np',
    siteName: 'Dr. Krishna Koirala ENT',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'Nayabazar ENT Care Center / Shree Krishna ENT Care',
    alternateName: 'Dr. Krishna Koirala ENT Clinic',
    image:
      'https://drkrishnakoirala.com.np/assets/images/Gemini_Generated_Image_a6lik2a6lik2a6li-1779012884856.png',
    '@id': 'https://drkrishnakoirala.com.np',
    url: 'https://drkrishnakoirala.com.np',
    telephone: '061-553150',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Nayabazar',
      addressLocality: 'Pokhara',
      addressRegion: 'Gandaki Pradesh',
      postalCode: '33700',
      addressCountry: 'NP',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.2238,
      longitude: 83.9877,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '16:00',
      closes: '20:00',
    },
    founder: {
      '@type': 'Person',
      name: 'Dr. Krishna Koirala',
      jobTitle: 'Professor and Head of ENT Department',
      worksFor: {
        '@type': 'MedicalOrganization',
        name: 'Manipal College of Medical Sciences (MCOMS)',
      },
    },
  };

  const doctorSchema = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: 'Dr. Krishna Koirala (Krishna Prasad Koirala)',
    image:
      'https://drkrishnakoirala.com.np/assets/images/Gemini_Generated_Image_a6lik2a6lik2a6li-1779012884856.png',
    medicalSpecialty: 'OtolaryngologicSurgery',
    description:
      'Professor and Head of Department of ENT at Manipal College of Medical Sciences (MCOMS), Pokhara. Senior Consultant ENT Surgeon at Nayabazar ENT Care Center.',
    occupationalCategory: 'ENT Specialist, Head-Neck Surgeon',
    qualifications: 'MBBS, MS (ENT-HNS)',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pokhara',
      addressCountry: 'NP',
    },
  };

  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(doctorSchema) }}
        />
      </head>
      <body className={plusJakartaSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
