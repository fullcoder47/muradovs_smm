export const locales = ["uz", "ru", "en"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  uz: "UZ",
  ru: "RU",
  en: "EN",
};

const dictionary = {
  uz: {
    services: "Xizmatlar",
    portfolio: "Portfolio",
    pricing: "Narxlar",
    blog: "Blog",
    about: "Biz haqimizda",
    contact: "Aloqa",
    consultation: "Konsultatsiya",
    heroBadge: "SMM agentligi | Toshkent va global bozor",
    heroTitle: "Biznesingizni Instagramda premium brendga aylantiramiz",
    heroText: "Muradovs_.smm strategiya, kontent production va target reklamani bitta tizimga birlashtirib, profilni ko'rinishdan sotuvgacha olib boradi.",
    freeAudit: "Bepul audit olish",
    seeResults: "Natijalarni ko'rish",
    liveGrowth: "LIVE growth",
    benefitsEyebrow: "Afzalliklar",
    benefitsTitle: "Chiroyli profil emas, o'sishga ishlaydigan tizim",
    servicesTitle: "Sizga kerakli SMM bo'limini tashqaridan quramiz",
    portfolioTitle: "Natija bilan gaplashadigan ishlar",
    pricingTitle: "O'sish bosqichingizga mos paketlar",
    testimonialsEyebrow: "Mijozlar",
    testimonialsTitle: "Ish jarayoni va natijani qadrlaydiganlar fikri",
    faqTitle: "Ko'p so'raladigan savollar",
    contactTitle: "Profilingizni sotuvga tayyorlaymiz",
    contactText: "Qisqa formani to'ldiring. Biz biznesingizni ko'rib chiqamiz va qaysi SMM yo'nalishi tezroq natija berishini aytamiz.",
    contactResponse: "24 soat ichida javob",
    pages: "Sahifalar",
    rights: "Barcha huquqlar himoyalangan.",
    footerText: "Premium SMM strategiya, kontent production va reklama boshqaruvi orqali biznesingizni raqamli sotuvga tayyorlaymiz.",
    contactPageTitle: "Bepul audit uchun ariza qoldiring",
    contactPageText: "Biz profilingiz, kontentingiz va reklama imkoniyatlarini ko'rib chiqib, keyingi aniq qadamlarni tavsiya qilamiz.",
  },
  ru: {
    services: "Услуги",
    portfolio: "Портфолио",
    pricing: "Цены",
    blog: "Блог",
    about: "О нас",
    contact: "Контакты",
    consultation: "Консультация",
    heroBadge: "SMM агентство | Ташкент и глобальный рынок",
    heroTitle: "Превратим ваш бизнес в премиальный бренд в Instagram",
    heroText: "Muradovs_.smm объединяет стратегию, контент-продакшн и таргетированную рекламу в одну систему роста.",
    freeAudit: "Получить аудит",
    seeResults: "Смотреть кейсы",
    liveGrowth: "LIVE рост",
    benefitsEyebrow: "Преимущества",
    benefitsTitle: "Не просто красивый профиль, а система для роста",
    servicesTitle: "Построим нужный SMM-отдел снаружи",
    portfolioTitle: "Работы, которые говорят результатами",
    pricingTitle: "Пакеты под ваш этап роста",
    testimonialsEyebrow: "Клиенты",
    testimonialsTitle: "Отзывы тех, кто ценит процесс и результат",
    faqTitle: "Частые вопросы",
    contactTitle: "Подготовим ваш профиль к продажам",
    contactText: "Заполните короткую форму. Мы изучим бизнес и подскажем, какой SMM-направление даст быстрый результат.",
    contactResponse: "Ответим в течение 24 часов",
    pages: "Страницы",
    rights: "Все права защищены.",
    footerText: "Премиальная SMM-стратегия, контент-продакшн и реклама для роста бизнеса.",
    contactPageTitle: "Оставьте заявку на бесплатный аудит",
    contactPageText: "Мы изучим профиль, контент и рекламные возможности, затем предложим конкретные следующие шаги.",
  },
  en: {
    services: "Services",
    portfolio: "Portfolio",
    pricing: "Pricing",
    blog: "Blog",
    about: "About",
    contact: "Contact",
    consultation: "Consultation",
    heroBadge: "SMM agency | Tashkent and global market",
    heroTitle: "We turn your business into a premium Instagram brand",
    heroText: "Muradovs_.smm brings strategy, content production, and targeted ads into one growth system.",
    freeAudit: "Get a free audit",
    seeResults: "See results",
    liveGrowth: "LIVE growth",
    benefitsEyebrow: "Benefits",
    benefitsTitle: "Not just a beautiful profile, but a system built for growth",
    servicesTitle: "We build the SMM department your business needs",
    portfolioTitle: "Work backed by results",
    pricingTitle: "Packages for your growth stage",
    testimonialsEyebrow: "Clients",
    testimonialsTitle: "Feedback from people who value process and results",
    faqTitle: "Frequently asked questions",
    contactTitle: "We prepare your profile for sales",
    contactText: "Fill out the short form. We will review your business and recommend the SMM direction with the fastest impact.",
    contactResponse: "Reply within 24 hours",
    pages: "Pages",
    rights: "All rights reserved.",
    footerText: "Premium SMM strategy, content production, and advertising management for digital growth.",
    contactPageTitle: "Request a free audit",
    contactPageText: "We will review your profile, content, and ad opportunities, then suggest clear next steps.",
  },
} as const;

export function t(locale: Locale, key: keyof typeof dictionary.uz) {
  return dictionary[locale][key] ?? dictionary.uz[key];
}

export async function translateText(text: string | null | undefined, locale: Locale) {
  if (!text || locale === "uz") return text ?? "";

  try {
    const url = new URL("https://api.mymemory.translated.net/get");
    url.searchParams.set("q", text.slice(0, 450));
    url.searchParams.set("langpair", `uz|${locale}`);
    const response = await fetch(url, { next: { revalidate: 86400 } });
    if (!response.ok) return text;
    const data = await response.json();
    return data?.responseData?.translatedText || text;
  } catch {
    return text;
  }
}

export async function translateList(items: string[], locale: Locale) {
  if (locale === "uz") return items;
  return Promise.all(items.map((item) => translateText(item, locale)));
}
