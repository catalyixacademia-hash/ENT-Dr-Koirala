import { extendedEn, extendedNe } from './i18n-extended';

export type Language = 'en' | 'ne';

export const SUPPORTED_LANGUAGES: { code: Language; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'ne', label: 'Nepali', nativeLabel: 'नेपाली' },
];

const translations = {
  en: {
    // Navbar
    nav_home: 'Home',
    nav_about: 'About',
    nav_services: 'Services',
    nav_experience: 'Experience',
    nav_contact: 'Contact',
    nav_book: 'Book Appointment',
    // Hero
    hero_badge: 'Now Accepting New Patients',
    hero_title: 'Expert ENT Care',
    hero_title_accent: 'You Can Trust',
    hero_desc: 'Dr. Krishna Koirala, MBBS, MS (ENT-HNS) — Professor & Head of ENT at MCOMS, Pokhara. Bringing 20+ years of specialized ear, nose, throat, and head-neck surgery expertise with a compassionate, patient-first approach.',
    hero_book: 'Book Appointment',
    hero_tiktok: 'Follow on TikTok',
    hero_scroll: 'Scroll to explore',
    badge_exp_label: 'Years Experience',
    badge_patients_label: 'Patients Treated',
    badge_cert_label: 'Head & Neck Surgeon',
    hero_float_title: 'MCOMS Professor',
    hero_float_sub: 'MBBS, MS ENT-HNS',
    hero_reviews: '340+ reviews',
    // About
    about_tag: 'About the Doctor',
    about_title: 'Dr. Krishna Koirala',
    about_title_sub: 'MBBS, MS (ENT-HNS)',
    about_p1: 'With over 20 years of specialized experience in Otorhinolaryngology and Head-Neck Surgery, Dr. Krishna Prasad Koirala has helped thousands of patients across Western Nepal reclaim their quality of life. His expertise spans the full spectrum of ENT conditions — from ear infections and sinusitis to complex thyroid and head-neck surgeries.',
    about_p2: 'As Professor and Head of the ENT Department at Manipal College of Medical Sciences (MCOMS), Pokhara, Dr. Koirala is deeply committed to academic excellence, research, and patient education. He actively uses social media platforms to share accessible, accurate health information — making ENT care less intimidating for the general public in Nepal and beyond.',
    about_cta: 'Schedule a Consultation',
    qual_title: 'Qualifications',
    // Services
    services_tag: 'Specialties',
    services_title: 'Comprehensive ENT Services',
    services_desc: 'From routine consultations to complex surgical procedures — all ENT needs under one roof.',
    services_cta: 'Book a Consultation',
    // Booking
    booking_tag: 'Book Appointment',
    booking_title: 'Schedule Your',
    booking_title_accent: 'ENT Consultation',
    booking_desc: 'Fill out the form and our team will confirm your appointment within 2 hours. For urgent ENT concerns, please call us directly.',
    booking_submit: 'Request Appointment',
    booking_submitting: 'Submitting...',
    booking_success_title: 'Appointment Request Sent!',
    booking_success_desc: "Thank you! We\'ll confirm your appointment within 2 hours via phone or email.",
    booking_success_cta: 'Book Another Appointment',
    booking_privacy: 'We\'ll confirm within 2 hours. Your data is protected under HIPAA guidelines.',
    field_name: 'Full Name *',
    field_phone: 'Phone Number *',
    field_email: 'Email Address',
    field_date: 'Preferred Date *',
    field_time: 'Preferred Time *',
    field_reason: 'Reason for Visit *',
    field_notes: 'Additional Notes',
    field_notes_hint: 'Describe your symptoms or any relevant medical history',
    field_name_ph: 'Priya Sharma',
    field_phone_ph: '98765 43210',
    field_email_ph: 'priya@email.com',
    field_time_ph: 'Select time slot',
    field_reason_ph: 'Select ENT concern',
    field_notes_ph: 'E.g. I\'ve had a blocked nose for 3 weeks with mild headaches...',
    // Footer
    footer_tagline: 'Expert ENT care with compassion and precision.',
    footer_quick: 'Quick Links',
    footer_contact: 'Contact',
    footer_rights: '© 2024 Dr. Krishna Koirala. All rights reserved.',
    footer_disclaimer: 'This website is for informational purposes only and does not constitute medical advice.',

    // ── Admin Panel ──────────────────────────────────────────────────────────
    // Sidebar
    admin_main_menu: 'Main Menu',
    admin_quick_links: 'Quick Links',
    admin_nav_dashboard: 'Dashboard',
    admin_nav_appointments: 'Appointments',
    admin_nav_patients: 'Patient Records',
    admin_nav_settings: 'Settings',
    admin_nav_website: 'View Website',
    admin_doctor_title: 'ENT & Head-Neck Surgeon',

    // Topbar
    admin_search_placeholder: 'Search patients, appointments...',
    admin_notifications: 'Notifications',
    admin_notif_1: 'New booking from Priya Sharma',
    admin_notif_2: 'Appointment confirmed: Rohan Das',
    admin_notif_3: '4 pending appointments need review',
    admin_notif_ago_5: '5 min ago',
    admin_notif_ago_1h: '1 hr ago',
    admin_notif_ago_2h: '2 hr ago',

    // Dashboard
    admin_good_morning: 'Good morning, Dr. Koirala',
    admin_dashboard_subtitle: 'Monday, May 17, 2026 — Here\'s your practice overview',
    admin_live_data: 'Live data — updated 2 min ago',

    // KPI Cards
    kpi_today_appts: "Today\'s Appointments",
    kpi_pending: 'Pending Confirmations',
    kpi_total_patients: 'Total Patients',
    kpi_monthly_bookings: 'Bookings This Month',
    kpi_completion: 'Completion Rate',
    kpi_new_patients: 'New Patients (May)',
    kpi_change_vs_yesterday: '+2 vs yesterday',
    kpi_action_required: 'Action required',
    kpi_this_week: '+12 this week',
    kpi_vs_last_month_pos: '+18% vs last month',
    kpi_vs_last_month_neg: '-2.1% vs last month',
    kpi_vs_april: '+8 vs April',

    admin_appointments_count: '8 appointments · May 17',
    admin_view_all: 'View all',
    admin_status_confirmed: 'confirmed',
    admin_status_pending: 'pending',

    // Recent Activity
    admin_recent_activity: 'Recent Activity',
    admin_last_24h: 'Last 24 hours',
    act_1: 'New booking received from Kavita Gurung',
    act_1_sub: 'Sinusitis consultation · May 19, 10:00 AM',
    act_2: 'Appointment confirmed: Rohan Das',
    act_2_sub: 'Ear infection · Today 9:30 AM',
    act_3: 'New patient record created: Sanjay Adhikari',
    act_3_sub: 'Walk-in · Tonsil assessment',
    act_4: 'Appointment cancelled: Farhan Sheikh',
    act_4_sub: 'Hearing evaluation · May 18',
    act_5: 'Patient notes updated: Priya Sharma',
    act_5_sub: 'Post-FESS surgery notes added',
    act_6: 'New 5-star review received on Google',
    act_6_sub: 'From verified patient — Neha Joshi',
    act_ago_4m: '4 min ago',
    act_ago_22m: '22 min ago',
    act_ago_1h: '1 hr ago',
    act_ago_2h: '2 hr ago',
    act_ago_3h: '3 hr ago',
    act_ago_5h: '5 hr ago',

    // Appointments Manager
    admin_appointments_title: 'Appointments',
    admin_appointments_found: 'appointments found',
    admin_view_list: 'List',
    admin_view_calendar: 'Calendar',
    admin_export_csv: 'Export CSV',
    admin_new_appointment: 'New Appointment',
    admin_selected: 'selected',
    admin_confirm_all: 'Confirm All',
    admin_delete_selected: 'Delete Selected',
    admin_clear: 'Clear',
    admin_col_patient: 'Patient',
    admin_col_date: 'Date',
    admin_col_time: 'Time',
    admin_col_service: 'Service',
    admin_col_reason: 'Reason',
    admin_col_duration: 'Duration',
    admin_col_status: 'Status',
    admin_col_actions: 'Actions',
    admin_no_appointments: 'No appointments found',
    admin_no_appointments_sub: 'Try adjusting your filters or date range',
    admin_rows_per_page: 'Rows per page:',
    admin_of: 'of',

    // Patient CRM
    admin_patient_records: 'Patient Records',
    admin_patients_in_db: 'patients in database',
    admin_export: 'Export',
    admin_add_patient: 'Add Patient',
    admin_total_patients: 'Total Patients',
    admin_active_patients: 'Active Patients',
    admin_new_this_month: 'New This Month',
    admin_with_upcoming: 'With Upcoming Appt',
    admin_search_patients: 'Search by name, phone, diagnosis, or city...',
    admin_all_patients: 'All Patients',
    admin_active: 'Active',
    admin_inactive: 'Inactive',
    admin_results: 'results',

    // Settings
    admin_settings_title: 'Settings',
    admin_settings_subtitle: 'Manage your profile, clinic hours, and preferences',
    admin_settings_profile: 'Doctor Profile',
    admin_settings_hours: 'Clinic Hours',
    admin_settings_availability: 'Availability',
    admin_settings_notifications: 'Notifications',
    admin_settings_security: 'Security',

    // Appointment Trend Chart
    admin_chart_title: 'Appointment Trends',
    admin_chart_subtitle: 'Daily bookings over the past 30 days',
  },
  ne: {
    // Navbar
    nav_home: 'गृहपृष्ठ',
    nav_about: 'परिचय',
    nav_services: 'सेवाहरू',
    nav_experience: 'अनुभव',
    nav_contact: 'सम्पर्क',
    nav_book: 'अपोइन्टमेन्ट बुक गर्नुहोस्',
    // Hero
    hero_badge: 'नयाँ बिरामी स्वीकार गर्दैछौं',
    hero_title: 'विशेषज्ञ ENT उपचार',
    hero_title_accent: 'जसमा तपाईं भर गर्न सक्नुहुन्छ',
    hero_desc: 'डा. कृष्ण कोइराला, MBBS, MS (ENT-HNS) — MCOMS, पोखराका ENT विभागाध्यक्ष तथा प्राध्यापक। कान, नाक, घाँटी र टाउको-घाँटी शल्यचिकित्सामा २०+ वर्षको विशेषज्ञता।',
    hero_book: 'अपोइन्टमेन्ट बुक गर्नुहोस्',
    hero_tiktok: 'TikTok मा फलो गर्नुहोस्',
    hero_scroll: 'तल स्क्रोल गर्नुहोस्',
    badge_exp_label: 'वर्षको अनुभव',
    badge_patients_label: 'उपचारित बिरामी',
    badge_cert_label: 'टाउको-घाँटी शल्यचिकित्सक',
    hero_float_title: 'MCOMS प्राध्यापक',
    hero_float_sub: 'MBBS, MS ENT-HNS',
    hero_reviews: '३४०+ समीक्षाहरू',
    // About
    about_tag: 'डाक्टरको परिचय',
    about_title: 'डा. कृष्ण कोइराला',
    about_title_sub: 'MBBS, MS (ENT-HNS)',
    about_p1: 'Otorhinolaryngology र Head-Neck Surgery मा २०+ वर्षको विशेषज्ञ अनुभवका साथ, डा. कृष्ण प्रसाद कोइरालाले पश्चिम नेपालका हजारौं बिरामीहरूलाई जीवनको गुणस्तर फिर्ता दिलाउन मद्दत गर्नुभएको छ।',
    about_p2: 'MCOMS, पोखराका ENT विभागाध्यक्ष तथा प्राध्यापकको रूपमा, डा. कोइराला शैक्षिक उत्कृष्टता, अनुसन्धान र बिरामी शिक्षाप्रति गहिरो प्रतिबद्ध हुनुहुन्छ।',
    about_cta: 'परामर्श तालिका बनाउनुहोस्',
    qual_title: 'योग्यताहरू',
    // Services
    services_tag: 'विशेषताहरू',
    services_title: 'व्यापक ENT सेवाहरू',
    services_desc: 'नियमित परामर्शदेखि जटिल शल्यक्रियासम्म — सबै ENT आवश्यकताहरू एकै छतमुनि।',
    services_cta: 'परामर्श बुक गर्नुहोस्',
    // Booking
    booking_tag: 'अपोइन्टमेन्ट बुक गर्नुहोस्',
    booking_title: 'आफ्नो',
    booking_title_accent: 'ENT परामर्श तालिका बनाउनुहोस्',
    booking_desc: 'फारम भर्नुहोस् र हाम्रो टोलीले २ घण्टाभित्र तपाईंको अपोइन्टमेन्ट पुष्टि गर्नेछ।',
    booking_submit: 'अपोइन्टमेन्ट अनुरोध गर्नुहोस्',
    booking_submitting: 'पेश गर्दैछ...',
    booking_success_title: 'अपोइन्टमेन्ट अनुरोध पठाइयो!',
    booking_success_desc: 'धन्यवाद! हामी २ घण्टाभित्र फोन वा इमेलद्वारा पुष्टि गर्नेछौं।',
    booking_success_cta: 'अर्को अपोइन्टमेन्ट बुक गर्नुहोस्',
    booking_privacy: 'हामी २ घण्टाभित्र पुष्टि गर्नेछौं। तपाईंको डेटा सुरक्षित छ।',
    field_name: 'पूरा नाम *',
    field_phone: 'फोन नम्बर *',
    field_email: 'इमेल ठेगाना',
    field_date: 'मनपर्ने मिति *',
    field_time: 'मनपर्ने समय *',
    field_reason: 'भ्रमणको कारण *',
    field_notes: 'थप टिप्पणी',
    field_notes_hint: 'आफ्नो लक्षण वा सम्बन्धित चिकित्सा इतिहास वर्णन गर्नुहोस्',
    field_name_ph: 'प्रिया शर्मा',
    field_phone_ph: '९८७६५ ४३२१०',
    field_email_ph: 'priya@email.com',
    field_time_ph: 'समय छान्नुहोस्',
    field_reason_ph: 'ENT समस्या छान्नुहोस्',
    field_notes_ph: 'उदाहरण: मलाई ३ हप्तादेखि नाक बन्द छ...',
    // Footer
    footer_tagline: 'करुणा र सटीकताका साथ विशेषज्ञ ENT उपचार।',
    footer_quick: 'द्रुत लिङ्कहरू',
    footer_contact: 'सम्पर्क',
    footer_rights: '© २०२४ डा. कृष्ण कोइराला। सर्वाधिकार सुरक्षित।',
    footer_disclaimer: 'यो वेबसाइट केवल सूचनात्मक उद्देश्यका लागि हो र चिकित्सा सल्लाह होइन।',

    // ── Admin Panel ──────────────────────────────────────────────────────────
    // Sidebar
    admin_main_menu: 'मुख्य मेनु',
    admin_quick_links: 'द्रुत लिङ्कहरू',
    admin_nav_dashboard: 'ड्यासबोर्ड',
    admin_nav_appointments: 'अपोइन्टमेन्टहरू',
    admin_nav_patients: 'बिरामी अभिलेख',
    admin_nav_settings: 'सेटिङ',
    admin_nav_website: 'वेबसाइट हेर्नुहोस्',
    admin_doctor_title: 'ENT र टाउको-घाँटी शल्यचिकित्सक',

    // Topbar
    admin_search_placeholder: 'बिरामी, अपोइन्टमेन्ट खोज्नुहोस्...',
    admin_notifications: 'सूचनाहरू',
    admin_notif_1: 'प्रिया शर्माबाट नयाँ बुकिङ',
    admin_notif_2: 'अपोइन्टमेन्ट पुष्टि: रोहन दास',
    admin_notif_3: '४ अपोइन्टमेन्ट समीक्षा आवश्यक',
    admin_notif_ago_5: '५ मिनेट अघि',
    admin_notif_ago_1h: '१ घण्टा अघि',
    admin_notif_ago_2h: '२ घण्टा अघि',

    // Dashboard
    admin_good_morning: 'शुभप्रभात, डा. कोइराला',
    admin_dashboard_subtitle: 'सोमबार, मे १७, २०२६ — तपाईंको अभ्यास अवलोकन',
    admin_live_data: 'लाइभ डेटा — २ मिनेट अघि अपडेट',

    // KPI Cards
    kpi_today_appts: 'आजका अपोइन्टमेन्टहरू',
    kpi_pending: 'पुष्टि बाँकी',
    kpi_total_patients: 'कुल बिरामी',
    kpi_monthly_bookings: 'यस महिनाका बुकिङ',
    kpi_completion: 'पूर्णता दर',
    kpi_new_patients: 'नयाँ बिरामी (मे)',
    kpi_change_vs_yesterday: 'हिजोभन्दा +२',
    kpi_action_required: 'कारबाही आवश्यक',
    kpi_this_week: 'यस हप्ता +१२',
    kpi_vs_last_month_pos: 'गत महिनाभन्दा +१८%',
    kpi_vs_last_month_neg: 'गत महिनाभन्दा -२.१%',
    kpi_vs_april: 'अप्रिलभन्दा +८',

    // Today's Scheduleadmin_todays_schedule: 'आजको तालिका',admin_appointments_count: '८ अपोइन्टमेन्ट · मे १७',admin_view_all: 'सबै हेर्नुहोस्',admin_status_confirmed: 'पुष्टि भयो',admin_status_pending: 'बाँकी',

    // Recent Activity
    admin_recent_activity: 'हालका गतिविधिहरू',admin_last_24h: 'पछिल्लो २४ घण्टा',act_1: 'कविता गुरुङबाट नयाँ बुकिङ प्राप्त',act_1_sub: 'साइनसाइटिस परामर्श · मे १९, बिहान १०:००',act_2: 'अपोइन्टमेन्ट पुष्टि: रोहन दास',act_2_sub: 'कानको संक्रमण · आज बिहान ९:३०',act_3: 'नयाँ बिरामी अभिलेख सिर्जना: सञ्जय अधिकारी',act_3_sub: 'वाक-इन · टन्सिल मूल्याङ्कन',act_4: 'अपोइन्टमेन्ट रद्द: फरहान शेख',act_4_sub: 'श्रवण मूल्याङ्कन · मे १८',act_5: 'बिरामी नोट अपडेट: प्रिया शर्मा',act_5_sub: 'FESS पश्चात शल्यक्रिया नोट थपियो',act_6: 'Google मा नयाँ ५-स्टार समीक्षा प्राप्त',act_6_sub: 'प्रमाणित बिरामीबाट — नेहा जोशी',act_ago_4m: '४ मिनेट अघि',act_ago_22m: '२२ मिनेट अघि',act_ago_1h: '१ घण्टा अघि',act_ago_2h: '२ घण्टा अघि',act_ago_3h: '३ घण्टा अघि',act_ago_5h: '५ घण्टा अघि',

    // Appointments Manager
    admin_appointments_title: 'अपोइन्टमेन्टहरू',admin_appointments_found: 'अपोइन्टमेन्ट फेला परे',admin_view_list: 'सूची',admin_view_calendar: 'क्यालेन्डर',admin_export_csv: 'CSV निर्यात',admin_new_appointment: 'नयाँ अपोइन्टमेन्ट',admin_selected: 'चयन गरियो',admin_confirm_all: 'सबै पुष्टि गर्नुहोस्',admin_delete_selected: 'चयन गरिएका मेट्नुहोस्',admin_clear: 'हटाउनुहोस्',admin_col_patient: 'बिरामी',admin_col_date: 'मिति',admin_col_time: 'समय',admin_col_service: 'सेवा',admin_col_reason: 'कारण',admin_col_duration: 'अवधि',admin_col_status: 'स्थिति',admin_col_actions: 'कार्यहरू',admin_no_appointments: 'कुनै अपोइन्टमेन्ट फेला परेन',admin_no_appointments_sub: 'फिल्टर वा मिति दायरा समायोजन गर्नुहोस्',admin_rows_per_page: 'प्रति पृष्ठ पङ्क्ति:',admin_of: 'मध्ये',

    // Patient CRM
    admin_patient_records: 'बिरामी अभिलेख',admin_patients_in_db: 'बिरामी डेटाबेसमा',admin_export: 'निर्यात',admin_add_patient: 'बिरामी थप्नुहोस्',admin_total_patients: 'कुल बिरामी',admin_active_patients: 'सक्रिय बिरामी',admin_new_this_month: 'यस महिना नयाँ',admin_with_upcoming: 'आगामी अपोइन्टमेन्ट सहित',admin_search_patients: 'नाम, फोन, निदान वा शहरद्वारा खोज्नुहोस्...',admin_all_patients: 'सबै बिरामी',admin_active: 'सक्रिय',admin_inactive: 'निष्क्रिय',admin_results: 'नतिजाहरू',

    // Settings
    admin_settings_title: 'सेटिङ',admin_settings_subtitle: 'आफ्नो प्रोफाइल, क्लिनिक समय र प्राथमिकताहरू व्यवस्थापन गर्नुहोस्',admin_settings_profile: 'डाक्टर प्रोफाइल',admin_settings_hours: 'क्लिनिक समय',admin_settings_availability: 'उपलब्धता',
    admin_settings_notifications: 'सूचनाहरू',admin_settings_security: 'सुरक्षा',

    // Appointment Trend Chart
    admin_chart_title: 'अपोइन्टमेन्ट प्रवृत्ति',admin_chart_subtitle: 'पछिल्लो ३० दिनको दैनिक बुकिङ',
  },
};

export function getTranslations(language: Language) {
  const base = translations[language] ?? translations.en;
  const extra = language === 'ne' ? extendedNe : extendedEn;
  return { ...base, ...extra } as typeof translations.en & typeof extendedEn;
}
