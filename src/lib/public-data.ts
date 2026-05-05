import { prisma } from "@/lib/prisma";
import {
  demoFaqs,
  demoPortfolio,
  demoPosts,
  demoPricing,
  demoServices,
  demoTestimonials,
} from "@/lib/demo-data";
import type { Locale } from "@/lib/i18n";
import { translateList, translateText } from "@/lib/i18n";
import { listLocalRecords } from "@/lib/local-store";

function withFallback<T>(items: T[], fallback: T[]) {
  return items.length > 0 ? items : fallback;
}

export async function getHomeData() {
  try {
    const [services, portfolio, pricing, testimonials, faqs] = await Promise.all([
      prisma.service.findMany({ where: { isActive: true }, orderBy: { order: "asc" }, take: 3 }),
      prisma.portfolio.findMany({ where: { isActive: true, isFeatured: true }, orderBy: { createdAt: "desc" }, take: 3 }),
      prisma.pricingPackage.findMany({ where: { isActive: true }, orderBy: { order: "asc" }, take: 3 }),
      prisma.testimonial.findMany({ where: { isActive: true }, orderBy: { createdAt: "desc" }, take: 6 }),
      prisma.fAQ.findMany({ where: { isActive: true }, orderBy: { order: "asc" }, take: 8 }),
    ]);

    return { services, portfolio, pricing, testimonials, faqs };
  } catch {
    const [services, portfolio, pricing, testimonials, faqs] = await Promise.all([
      listLocalRecords<(typeof demoServices)[number]>("services"),
      listLocalRecords<(typeof demoPortfolio)[number]>("portfolio"),
      listLocalRecords<(typeof demoPricing)[number]>("pricing"),
      listLocalRecords<(typeof demoTestimonials)[number]>("testimonials"),
      listLocalRecords<(typeof demoFaqs)[number]>("faqs"),
    ]);

    return {
      services: withFallback(services, demoServices),
      portfolio: withFallback(portfolio, demoPortfolio),
      pricing: withFallback(pricing, demoPricing),
      testimonials: withFallback(testimonials, demoTestimonials),
      faqs: withFallback(faqs, demoFaqs),
    };
  }
}

export async function localizeService<T extends { title: string; description: string; features: string[] }>(service: T, locale: Locale) {
  if (locale === "uz") return service;
  return {
    ...service,
    title: await translateText(service.title, locale),
    description: await translateText(service.description, locale),
    features: await translateList(service.features, locale),
  };
}

export async function localizePortfolio<T extends { title: string; summary: string; results: string[]; challenge?: string | null; solution?: string | null }>(item: T, locale: Locale) {
  if (locale === "uz") return item;
  return {
    ...item,
    title: await translateText(item.title, locale),
    summary: await translateText(item.summary, locale),
    challenge: await translateText(item.challenge, locale),
    solution: await translateText(item.solution, locale),
    results: await translateList(item.results, locale),
  };
}

export async function localizePricing<T extends { name: string; description: string; features: string[] }>(item: T, locale: Locale) {
  if (locale === "uz") return item;
  return {
    ...item,
    name: await translateText(item.name, locale),
    description: await translateText(item.description, locale),
    features: await translateList(item.features, locale),
  };
}

export async function localizePost<T extends { title: string; excerpt: string; content: string; tags: string[] }>(post: T, locale: Locale) {
  if (locale === "uz") return post;
  return {
    ...post,
    title: await translateText(post.title, locale),
    excerpt: await translateText(post.excerpt, locale),
    content: await translateText(post.content, locale),
    tags: await translateList(post.tags, locale),
  };
}

export async function localizeTestimonial<T extends { role: string; content: string }>(item: T, locale: Locale) {
  if (locale === "uz") return item;
  return {
    ...item,
    role: await translateText(item.role, locale),
    content: await translateText(item.content, locale),
  };
}

export async function localizeFaq<T extends { question: string; answer: string }>(faq: T, locale: Locale) {
  if (locale === "uz") return faq;
  return {
    ...faq,
    question: await translateText(faq.question, locale),
    answer: await translateText(faq.answer, locale),
  };
}

export async function getServices() {
  try {
    return await prisma.service.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
  } catch {
    return withFallback(await listLocalRecords<(typeof demoServices)[number]>("services"), demoServices);
  }
}

export async function getPortfolioItems() {
  try {
    return await prisma.portfolio.findMany({ where: { isActive: true }, orderBy: { createdAt: "desc" } });
  } catch {
    return withFallback(await listLocalRecords<(typeof demoPortfolio)[number]>("portfolio"), demoPortfolio);
  }
}

export async function getPortfolioBySlug(slug: string) {
  try {
    return await prisma.portfolio.findFirst({ where: { slug, isActive: true } });
  } catch {
    return (await listLocalRecords<(typeof demoPortfolio)[number]>("portfolio")).find((item) => item.slug === slug) ?? demoPortfolio.find((item) => item.slug === slug) ?? null;
  }
}

export async function getPricingPackages() {
  try {
    return await prisma.pricingPackage.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
  } catch {
    return withFallback(await listLocalRecords<(typeof demoPricing)[number]>("pricing"), demoPricing);
  }
}

export async function getBlogPosts() {
  try {
    return await prisma.blogPost.findMany({ where: { isPublished: true }, orderBy: { publishedAt: "desc" } });
  } catch {
    return withFallback(await listLocalRecords<(typeof demoPosts)[number]>("blog"), demoPosts);
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    return await prisma.blogPost.findFirst({ where: { slug, isPublished: true } });
  } catch {
    return (await listLocalRecords<(typeof demoPosts)[number]>("blog")).find((post) => post.slug === slug) ?? demoPosts.find((post) => post.slug === slug) ?? null;
  }
}

export async function getSettings() {
  try {
    const settings = await prisma.siteSetting.findMany();
    return Object.fromEntries(settings.map((item) => [item.key, item.value]));
  } catch {
    return {};
  }
}
