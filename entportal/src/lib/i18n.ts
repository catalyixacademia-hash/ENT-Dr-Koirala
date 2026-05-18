export type Language = 'en' | 'ne';

export const SUPPORTED_LANGUAGES: { code: Language; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'ne', label: 'नेपाली', nativeLabel: 'नेपाली' },
];

export const translations = {
  en: {
    // Navbar
    nav_home: 'Home',
    nav_about: 'About Dr. Koirala',
    nav_services: 'Treatments',
    nav_experience: 'Experience',
    nav_contact: 'Contact',
    nav_book: 'Book Appointment',
    // Hero
    hero_badge: 'Leading ENT Specialist in Pokhara',
    hero_title: 'Expert Ear, Nose, Throat',
    hero_title_accent: '& Thyroid Care',
    hero_desc:
      'Dr. Krishna Koirala, MBBS, MS (ENT-HNS) — Professor & Head of ENT at MCOMS, Pokhara. Providing world-class head, neck, and ENT surgical expertise at Nayabazar ENT Care Center.',
    hero_book: 'Book Appointment',
    hero_tiktok: 'Watch Health Videos',
    hero_scroll: 'Scroll to explore',
    badge_exp_label: 'Years Experience',
    badge_patients_label: 'Patients Treated',
    badge_cert_label: 'Head & Neck Surgeon',
    hero_float_title: 'MCOMS Professor',
    hero_float_sub: 'HOD, Dept. of ENT',
    hero_reviews: 'Thousands of satisfied patients',
    // About
    about_tag: 'Meet the Expert',
    about_title: 'Dr. Krishna Koirala',
    about_title_sub: 'MBBS, MS (ENT-HNS)',
    about_p1:
      'Dr. Krishna Prasad Koirala is a distinguished ENT & Head-Neck Surgeon with over 20 years of experience. As the Professor and Head of the Department of ENT at Manipal College of Medical Sciences (MCOMS), Pokhara, he has trained hundreds of future doctors while providing expert surgical care to thousands of patients across Western Nepal.',
    about_p2:
      'Known popularly for his practice at Nayabazar ENT Care Center (ENT Chowk), Dr. Koirala specializes in complex thyroid disorders, sinus surgeries, and pediatric ENT. He is a pioneer in using social media (TikTok and YouTube) to educate the Nepali public about ENT health and prevention.',
    about_cta: 'View Full Biography',
    qual_title: 'Professional Qualifications',
    qual_1: 'MBBS - Tribhuvan University',
    qual_2: 'MS (ENT-HNS) - Institute of Medicine',
    qual_3: 'Professor & HOD, MCOMS Pokhara',
    qual_4: 'Senior Consultant, Nayabazar ENT Care',

    // Services Detailed
    services_tag: 'Specialized Treatments',
    services_title: 'Comprehensive ENT & Head-Neck Care',
    services_desc:
      'From microscopic ear surgeries to advanced thyroid management, we provide specialized care for all ENT conditions.',
    services_ear_title: 'Ear Problems',
    services_ear_desc:
      'Expert treatment for hearing loss, chronic ear infections (CSOM), earwax removal, tinnitus, vertigo, and eardrum repair (Tympanoplasty).',
    services_nose_title: 'Nose & Sinus',
    services_nose_desc:
      'Advanced care for sinusitis, nasal polyps, deviated septum (DNS), allergic rhinitis, and endoscopic sinus surgery (FESS).',
    services_throat_title: 'Throat & Voice',
    services_throat_desc:
      'Management of tonsillitis, adenoids, snoring, sleep apnea, hoarseness of voice, and throat infections.',
    services_thyroid_title: 'Thyroid & Head-Neck',
    services_thyroid_desc:
      'Specialized surgery for thyroid nodules, goiter, salivary gland tumors, and other head and neck swellings.',
    services_pediatric_title: 'Pediatric ENT',
    services_pediatric_desc:
      'Gentle and specialized care for children with ear infections, breathing issues, and tonsil/adenoid problems.',
    services_surgery_title: 'Surgeries',
    services_surgery_desc:
      'State-of-the-art surgical procedures including Microscopic Ear Surgery and Endoscopic Sinus Surgery.',
    services_cta: 'Book a Consultation',

    // Contact & Clinic
    clinic_name: 'Nayabazar ENT Care Center / Shree Krishna ENT Care',
    clinic_addr: 'Nayabazar, Pokhara, Gandaki Pradesh, Nepal (ENT Chowk)',
    clinic_phone: '061-553150',
    clinic_mobile: '985-6034347 / 9846166733',
    clinic_whatsapp: 'Contact on WhatsApp',

    // Booking
    booking_tag: 'Appointments',
    booking_title: 'Book Your',
    booking_title_accent: 'Consultation',
    booking_desc:
      'Schedule an appointment at Nayabazar ENT Care Center. We will confirm your time slot via WhatsApp or Phone.',
    booking_submit: 'Confirm Appointment',
    booking_submitting: 'Processing...',
    booking_success_title: 'Request Received!',
    booking_success_desc:
      "Dr. Koirala's team will contact you shortly to confirm your appointment.",
    booking_success_cta: 'Return to Home',
    booking_privacy: 'Fast confirmation within 2 hours. Your privacy is our priority.',
    field_name: 'Patient Full Name *',
    field_phone: 'Mobile Number *',
    field_email: 'Email (Optional)',
    field_date: 'Preferred Date *',
    field_time: 'Preferred Time *',
    field_reason: 'Medical Concern *',
    field_notes: 'Symptoms / Details',
    field_notes_hint: 'Briefly describe your ear, nose, or throat issue',

    // Footer
    footer_tagline:
      'Leading ENT specialist in Pokhara, dedicated to excellence in patient care and medical education.',
    footer_quick: 'Quick Navigation',
    footer_contact: 'Get in Touch',
    footer_rights: '© 2025 Dr. Krishna Koirala. Built for Patient Care Excellence.',
    footer_disclaimer:
      'Disclaimer: This website provides general information and should not replace professional medical advice.',

    // Admin Panel (Retained for future use)
    admin_main_menu: 'Main Menu',
    admin_nav_dashboard: 'Dashboard',
    admin_nav_appointments: 'Appointments',
    admin_nav_patients: 'Patients',
    admin_nav_settings: 'Settings',
  },
  ne: {
    // Navbar
    nav_home: 'गृहपृष्ठ',
    nav_about: 'डा. कोइरालाको बारेमा',
    nav_services: 'उपचारहरू',
    nav_experience: 'अनुभव',
    nav_contact: 'सम्पर्क',
    nav_book: 'अपोइन्टमेन्ट बुक गर्नुहोस्',
    // Hero
    hero_badge: 'पोखराका अग्रणी ENT विशेषज्ञ',
    hero_title: 'विशेषज्ञ कान, नाक, घाँटी',
    hero_title_accent: 'र थाइरोइड उपचार',
    hero_desc:
      'डा. कृष्ण कोइराला, MBBS, MS (ENT-HNS) — मनिपाल शिक्षण अस्पताल (MCOMS), पोखराका ENT विभागाध्यक्ष तथा प्राध्यापक। नयाँबजार ENT केयर सेन्टरमा उत्कृष्ट सेवा।',
    hero_book: 'अपोइन्टमेन्ट बुक गर्नुहोस्',
    hero_tiktok: 'स्वास्थ्य भिडियोहरू हेर्नुहोस्',
    hero_scroll: 'थप जानकारीको लागि',
    badge_exp_label: 'वर्षको अनुभव',
    badge_patients_label: 'उपचारित बिरामी',
    badge_cert_label: 'टाउको-घाँटी शल्यचिकित्सक',
    hero_float_title: 'MCOMS प्राध्यापक',
    hero_float_sub: 'ENT विभागाध्यक्ष',
    hero_reviews: 'हजारौं सन्तुष्ट बिरामीहरू',
    // About
    about_tag: 'विशेषज्ञलाई चिन्नुहोस्',
    about_title: 'डा. कृष्ण कोइराला',
    about_title_sub: 'MBBS, MS (ENT-HNS)',
    about_p1:
      'डा. कृष्ण प्रसाद कोइराला २० वर्षभन्दा बढी अनुभव भएका प्रतिष्ठित ENT र टाउको-घाँटी शल्यचिकित्सक हुनुहुन्छ। उहाँ मनिपाल शिक्षण अस्पताल (MCOMS), पोखराको ENT विभागका प्राध्यापक र प्रमुख हुनुहुन्छ।',
    about_p2:
      'पोखराको नयाँबजार (ENT चोक) स्थित नयाँबजार ENT केयर सेन्टरमा उहाँको क्लिनिक रहेको छ। उहाँ थाइरोइड, साइनस र बाल ENT समस्याहरूको उपचारमा विशेषज्ञ हुनुहुन्छ।',
    about_cta: 'पूर्ण जीवनी हेर्नुहोस्',
    qual_title: 'व्यावसायिक योग्यता',
    qual_1: 'MBBS - त्रिभुवन विश्वविद्यालय',
    qual_2: 'MS (ENT-HNS) - चिकित्सा शास्त्र अध्ययन संस्थान (IOM)',
    qual_3: 'प्राध्यापक र विभागाध्यक्ष, मनिपाल पोखरा',
    qual_4: 'वरिष्ठ कन्सल्टेन्ट, नयाँबजार ENT केयर',

    // Services Detailed
    services_tag: 'विशिष्ट उपचार सेवाहरू',
    services_title: 'पूर्ण कान, नाक, घाँटी र थाइरोइड उपचार',
    services_desc:
      'कानको सूक्ष्म शल्यक्रियादेखि थाइरोइडको आधुनिक उपचारसम्म, हामी सबै प्रकारका ENT सेवाहरू प्रदान गर्दछौं।',
    services_ear_title: 'कानको समस्या',
    services_ear_desc:
      'सुन्ने शक्ति कम भएको, कान पाक्ने (CSOM), कानेगुजी निकाल्ने, कान कराउने (Tinnitus), रिंगटा लाग्ने र कानको जाली फेर्ने उपचार।',
    services_nose_title: 'नाक र साइनस',
    services_nose_desc:
      'पिनास (Sinusitis), नाकमा मासु पलाएको (Polyps), नाकको हड्डी बाङ्गो भएको र इन्डोस्कोपिक साइनस सर्जरी (FESS)।',
    services_throat_title: 'घाँटी र आवाज',
    services_throat_desc:
      'टन्सिल, एडिनोइड, घुर्ने समस्या, श्वास फेर्न गाह्रो हुने र आवाजको समस्याको उपचार।',
    services_thyroid_title: 'थाइरोइड र टाउको-घाँटी',
    services_thyroid_desc:
      'थाइरोइड ग्रन्थि, र्याल ग्रन्थिको ट्युमर र टाउको-घाँटीमा आएका गिर्खाहरूको शल्यक्रिया।',
    services_pediatric_title: 'बाल ENT',
    services_pediatric_desc: 'बालबालिकाहरूको कान, नाक र घाँटीका समस्याहरूको विशेष र कोमल उपचार।',
    services_surgery_title: 'शल्यक्रियाहरू',
    services_surgery_desc:
      'अत्याधुनिक प्रविधिबाट कानको सूक्ष्म शल्यक्रिया र नाकको इन्डोस्कोपिक शल्यक्रिया।',
    services_cta: 'परामर्श बुक गर्नुहोस्',

    // Contact & Clinic
    clinic_name: 'नयाँबजार ENT केयर सेन्टर / श्री कृष्ण ENT केयर',
    clinic_addr: 'नयाँबजार, पोखरा, गण्डकी प्रदेश (ENT चोक)',
    clinic_phone: '०६१-५५३१५०',
    clinic_mobile: '९८५-६०३४३४७ / ९८४६१६६७३३',
    clinic_whatsapp: 'WhatsApp मा सम्पर्क गर्नुहोस्',

    // Booking
    booking_tag: 'अपोइन्टमेन्ट',
    booking_title: 'परामर्शका लागि',
    booking_title_accent: 'समय लिनुहोस्',
    booking_desc:
      'नयाँबजार ENT केयर सेन्टरमा आफ्नो अपोइन्टमेन्ट बुक गर्नुहोस्। हामी फोन वा WhatsApp मार्फत समय पुष्टि गर्नेछौं।',
    booking_submit: 'अपोइन्टमेन्ट निश्चित गर्नुहोस्',
    booking_submitting: 'प्रक्रियामा छ...',
    booking_success_title: 'अनुरोध प्राप्त भयो!',
    booking_success_desc: 'हाम्रो टोलीले छिट्टै तपाईंलाई सम्पर्क गरी अपोइन्टमेन्ट पुष्टि गर्नेछ।',
    booking_success_cta: 'गृहपृष्ठमा फर्कनुहोस्',
    booking_privacy: '२ घण्टाभित्र पुष्टि गरिनेछ। तपाईंको गोपनीयता हाम्रो प्राथमिकता हो।',
    field_name: 'बिरामीको पूरा नाम *',
    field_phone: 'मोबाइल नम्बर *',
    field_email: 'इमेल (ऐच्छिक)',
    field_date: 'मनपर्ने मिति *',
    field_time: 'मनपर्ने समय *',
    field_reason: 'स्वास्थ्य समस्या *',
    field_notes: 'लक्षणहरू / विवरण',
    field_notes_hint: 'आफ्नो समस्याको बारेमा छोटकरीमा लेख्नुहोस्',

    // Footer
    footer_tagline: 'पोखराका अग्रणी ENT विशेषज्ञ, बिरामीको सेवा र चिकित्सा शिक्षामा समर्पित।',
    footer_quick: 'द्रुत लिङ्कहरू',
    footer_contact: 'सम्पर्क गर्नुहोस्',
    footer_rights: '© २०२५ डा. कृष्ण कोइराला। सर्वाधिकार सुरक्षित।',
    footer_disclaimer:
      'अस्वीकरण: यो वेबसाइटमा दिइएको जानकारी सामान्य जानकारीका लागि मात्र हो र चिकित्सकको सल्लाहको विकल्प होइन।',

    // Admin Panel (Retained)
    admin_main_menu: 'मुख्य मेनु',
    admin_nav_dashboard: 'ड्यासबोर्ड',
    admin_nav_appointments: 'अपोइन्टमेन्टहरू',
    admin_nav_patients: 'बिरामीहरू',
    admin_nav_settings: 'सेटिङ',
  },
};

export function getTranslations(language: Language) {
  return translations[language] ?? translations['en'];
}
