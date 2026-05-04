import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@muradovs.uz";
  const password = process.env.ADMIN_PASSWORD ?? "admin12345";

  await prisma.user.upsert({
    where: { email },
    update: { password: await bcrypt.hash(password, 12) },
    create: {
      email,
      name: "Muradovs_.smm Admin",
      password: await bcrypt.hash(password, 12),
    },
  });

  await prisma.siteSetting.createMany({
    data: [
      { key: "site_name", value: "Muradovs_.smm", group: "brand" },
      { key: "site_description", value: "Bizneslar uchun premium SMM strategiya, kontent va reklama boshqaruvi.", group: "seo" },
      { key: "phone", value: "+998 90 000 00 00", group: "contact" },
      { key: "telegram", value: "https://t.me/muradovs_smm", group: "contact" },
      { key: "instagram", value: "https://instagram.com/muradovs_.smm", group: "contact" },
      { key: "address", value: "Toshkent, O'zbekiston", group: "contact" },
    ],
    skipDuplicates: true,
  });

  await prisma.service.createMany({
    data: [
      {
        title: "SMM strategiya",
        slug: "smm-strategiya",
        description: "Brend pozitsiyasi, kontent yo'nalishi va sotuvga olib boruvchi oylik reja.",
        icon: "Target",
        features: ["Audit va raqobatchi tahlili", "Kontent rubrikalari", "KPI va roadmap"],
        order: 1,
      },
      {
        title: "Kontent production",
        slug: "kontent-production",
        description: "Reels, post, story va visual identika uchun premium ijodiy ishlab chiqarish.",
        icon: "Sparkles",
        features: ["Reels ssenariy", "Dizayn paket", "Copywriting"],
        order: 2,
      },
      {
        title: "Target reklama",
        slug: "target-reklama",
        description: "Instagram va Meta Ads orqali lead va savdoni oshirishga qaratilgan kampaniyalar.",
        icon: "Megaphone",
        features: ["Pixel/analytics", "A/B test", "Haftalik optimizatsiya"],
        order: 3,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.pricingPackage.createMany({
    data: [
      {
        name: "Start",
        slug: "start",
        price: "$299/oy",
        description: "Yangi bizneslar uchun toza start.",
        features: ["12 post", "8 story", "Oylik kontent reja", "Basic reporting"],
        order: 1,
      },
      {
        name: "Growth",
        slug: "growth",
        price: "$599/oy",
        description: "Kontent va reklama birga ishlaydigan paket.",
        features: ["20 post/reels", "Daily story", "Target setup", "Haftalik hisobot"],
        isPopular: true,
        order: 2,
      },
      {
        name: "Scale",
        slug: "scale",
        price: "$999/oy",
        description: "Savdo funnel va performance growth uchun.",
        features: ["Full production", "Meta Ads boshqaruvi", "CRM lead tracking", "Strategik sessiya"],
        order: 3,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.portfolio.createMany({
    data: [
      {
        title: "Beauty studio uchun 3x lead o'sishi",
        slug: "beauty-studio-lead-growth",
        client: "Lumi Beauty",
        category: "Beauty",
        summary: "Kontent formatlarini yangilab, reklama funnelini soddalashtirdik.",
        challenge: "Lead narxi yuqori va profil konversiyasi past edi.",
        solution: "Reels seriyasi, UGC format va segmentlangan target kampaniyalar ishga tushirildi.",
        results: ["3.1x ko'proq lead", "-42% lead narxi", "18 kun ichida 120+ ariza"],
        isFeatured: true,
      },
      {
        title: "Restoran uchun bronlar oqimi",
        slug: "restoran-bronlar-oqimi",
        client: "Aurum Dining",
        category: "Restaurant",
        summary: "Premium visual uslub va geotarget orqali kechki bronlar oshirildi.",
        results: ["2.4x bron", "31% engagement", "Haftalik sold-out kunlar"],
        isFeatured: true,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.blogPost.createMany({
    data: [
      {
        title: "Instagram profilini sotuvga tayyorlash uchun 7 qadam",
        slug: "instagram-profilini-sotuvga-tayyorlash",
        excerpt: "Bio, highlights, kontent va CTA orqali profil konversiyasini oshirish yo'llari.",
        content: "Instagram profilingiz mini landing page vazifasini bajaradi. Avval auditoriyangiz kimligini aniqlang, bio'da aniq taklif yozing, highlights'ni xizmatlar va natijalar bo'yicha tartiblang. Har bir post foyda, ishonch yoki harakatga chaqirish vazifasini bajarishi kerak. Reklama yuborishdan oldin profil tayyor bo'lsa, lead narxi pasayadi.",
        tags: ["Instagram", "SMM", "Konversiya"],
        isPublished: true,
        publishedAt: new Date(),
      },
    ],
    skipDuplicates: true,
  });

  await prisma.testimonial.createMany({
    data: [
      {
        name: "Dilnoza Karimova",
        role: "Founder",
        company: "Lumi Beauty",
        content: "Muradovs_.smm bilan profilimiz ancha premium ko'rinish oldi va arizalar soni sezilarli oshdi.",
        rating: 5,
      },
      {
        name: "Jasur Aliyev",
        role: "Marketing manager",
        company: "Aurum Dining",
        content: "Jamoa strategik fikrlaydi, faqat post chiqarish emas, biznes natijaga ishlaydi.",
        rating: 5,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.fAQ.createMany({
    data: [
      { question: "Natijani qancha vaqtda ko'ramiz?", answer: "Odatda ilk signal 2-4 haftada ko'rinadi, barqaror o'sish uchun 3 oy tavsiya qilamiz.", order: 1 },
      { question: "Reklama byudjeti paketga kiradimi?", answer: "Yo'q, reklama byudjeti alohida Meta Ads hisobingizdan sarflanadi.", order: 2 },
      { question: "Kontent suratga olishni ham qilasizmi?", answer: "Ha, Growth va Scale paketlarida production jarayonini ham yo'lga qo'yamiz.", order: 3 },
    ],
    skipDuplicates: true,
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
