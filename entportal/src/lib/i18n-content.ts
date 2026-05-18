import type { Language } from './i18n';
import { pick, type Bilingual } from './i18n-helpers';

export function getTestimonials(lang: Language) {
  return TESTIMONIALS.map((t) => ({
    id: t.id,
    name: t.name,
    rating: t.rating,
    avatar: t.avatar,
    avatarAlt: pick(lang, t.avatarAlt),
    city: pick(lang, t.city),
    condition: pick(lang, t.condition),
    text: pick(lang, t.text),
  }));
}

const TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'Priya Sharma',
    rating: 5,
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d8cd6cb1-1763300485347.png',
    avatarAlt: {
      en: 'Indian woman with short black hair smiling warmly in blue top',
      ne: 'नीलो टपमा मुस्कुराउँदै गर्दैको महिला',
    },
    city: { en: 'Mumbai', ne: 'मुम्बई' },
    condition: { en: 'Chronic Sinusitis', ne: 'पुरानो साइनसाइटिस' },
    text: {
      en: 'Dr. Koirala diagnosed my 3-year sinusitis struggle in one visit. The FESS procedure changed my life — I can breathe properly for the first time in years.',
      ne: 'डा. कोइरालाले मेरो ३ वर्षको साइनसाइटिस एक भ्रमणमै निदान गर्नुभयो। FESS प्रक्रियाले मेरो जीवन बदल्यो — वर्षौंदेखि पहिलो पटक राम्रो सास फेर्न सक्छु।',
    },
  },
  {
    id: 'test-2',
    name: 'Rajesh Nair',
    rating: 5,
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1cb468779-1763295443265.png',
    avatarAlt: { en: 'Middle-aged Indian man with glasses', ne: 'चस्मा लगाएको मध्यम उमेरका पुरुष' },
    city: { en: 'Pune', ne: 'पुणे' },
    condition: { en: 'Tinnitus Treatment', ne: 'टिनिटस उपचार' },
    text: {
      en: 'I had ringing in my ears for 8 months. Dr. Koirala identified the root cause and my symptoms reduced by 90% in three months.',
      ne: 'मलाई ८ महिनासम्म कानमा घण्टी बज्यो। डा. कोइरालाले मूल कारण पत्ता लगाउनुभयो र तीन महिनामा लक्षण ९०% घट्यो।',
    },
  },
  {
    id: 'test-3',
    name: 'Ananya Kulkarni',
    rating: 5,
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1fa84eeaf-1772876175126.png',
    avatarAlt: { en: 'Young Indian mother smiling', ne: 'मुस्कुराउँदै गर्दैको युवा आमा' },
    city: { en: 'Thane', ne: 'थाने' },
    condition: { en: 'Pediatric ENT — Child Patient', ne: 'बाल ENT — बाल बिरामी' },
    text: {
      en: 'My 4-year-old needed ear tubes and I was terrified. Dr. Koirala walked us through every step with incredible patience.',
      ne: 'मेरो ४ वर्षे बच्चालाई कानको ट्युब चाहियो। डा. कोइरालाले धैर्यपूर्वक हरेक चरण सम्झाउनुभयो।',
    },
  },
  {
    id: 'test-4',
    name: 'Suresh Patel',
    rating: 5,
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_12b9c2bb3-1763293370864.png',
    avatarAlt: { en: 'Older Indian man smiling confidently', ne: 'आत्मविश्वासी मुस्कान सहित वृद्ध पुरुष' },
    city: { en: 'Navi Mumbai', ne: 'नवी मुम्बई' },
    condition: { en: 'Deviated Septum Surgery', ne: 'विचलित सेप्टम शल्यक्रिया' },
    text: {
      en: 'After years of poor sleep, septoplasty with Dr. Koirala gave me my life back. Online booking was seamless.',
      ne: 'वर्षौंदेखि नराम्रो निद्रा पछि, डा. कोइरालासँग सेप्टोप्लास्टीले जीवन फर्कायो। अनलाइन बुकिङ सजिलो थियो।',
    },
  },
  {
    id: 'test-5',
    name: 'Meera Iyer',
    rating: 5,
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_14e479cba-1763300676390.png',
    avatarAlt: { en: 'Young Indian woman with bright smile', ne: 'उज्यालो मुस्कान सहित युवा महिला' },
    city: { en: 'Mumbai', ne: 'मुम्बई' },
    condition: { en: 'Allergic Rhinitis', ne: 'एलर्जिक राइनाइटिस' },
    text: {
      en: "Seasonal allergies were ruining my quality of life. Dr. Koirala's plan has reduced my symptoms dramatically.",
      ne: 'मौसमी एलर्जीले जीवनको गुणस्तर बिगारेको थियो। डा. कोइरालाको योजनाले लक्षण धेरै घटायो।',
    },
  },
];

export function getBlogPosts(lang: Language) {
  return BLOG_POSTS.map((p) => ({
    id: p.id,
    image: p.image,
    imageAlt: pick(lang, p.imageAlt),
    category: pick(lang, p.category),
    title: pick(lang, p.title),
    excerpt: pick(lang, p.excerpt),
    readTime: pick(lang, p.readTime),
    date: p.date,
  }));
}

const BLOG_POSTS = [
  {
    id: 'blog-1',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600',
    imageAlt: { en: 'Doctor examining patient ear', ne: 'डाक्टरले बिरामीको कान जाँच्दै' },
    category: { en: 'Ear Health', ne: 'कान स्वास्थ्य' },
    title: { en: '5 Signs You Should See an ENT Specialist', ne: 'ENT विशेषज्ञलाई भेट्नुपर्ने ५ संकेत' },
    excerpt: {
      en: 'Persistent ear pain, hearing changes, or ringing could signal conditions that need specialist care.',
      ne: 'लामो कान दुखाइ, श्रवण परिवर्तन वा घण्टीले विशेषज्ञ हेरचाह चाहिने अवस्था संकेत गर्न सक्छ।',
    },
    readTime: { en: '4 min read', ne: '४ मिनेट पढाइ' },
    date: '2026-05-10',
  },
  {
    id: 'blog-2',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d621c?w=600',
    imageAlt: { en: 'Sinus health illustration', ne: 'साइनस स्वास्थ्य चित्र' },
    category: { en: 'Sinus Care', ne: 'साइनस हेरचाह' },
    title: { en: 'Understanding Chronic Sinusitis', ne: 'पुरानो साइनसाइटिस बुझ्नुहोस्' },
    excerpt: {
      en: 'Learn what causes chronic sinus inflammation and the treatment options available in Nepal.',
      ne: 'पुरानो साइनस सुजनका कारण र नेपालमा उपलब्ध उपचार विकल्प जान्नुहोस्।',
    },
    readTime: { en: '6 min read', ne: '६ मिनेट पढाइ' },
    date: '2026-05-03',
  },
  {
    id: 'blog-3',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600',
    imageAlt: { en: 'Child at medical checkup', ne: 'चिकित्सा जाँचमा बच्चा' },
    category: { en: 'Pediatric ENT', ne: 'बाल ENT' },
    title: { en: 'When Does Your Child Need an ENT Visit?', ne: 'तपाईंको बच्चालाई कहिले ENT भ्रमण चाहिन्छ?' },
    excerpt: {
      en: 'Frequent ear infections, snoring, or speech delays may warrant a pediatric ENT evaluation.',
      ne: 'बारम्बार कान संक्रमण, घुर्ने वा बोलाइ ढिलाइले बाल ENT मूल्याङ्कन आवश्यक हुन सक्छ।',
    },
    readTime: { en: '5 min read', ne: '५ मिनेट पढाइ' },
    date: '2026-04-28',
  },
];
