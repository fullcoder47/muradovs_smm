import { prisma } from "@/lib/prisma";
import {
  demoFaqs,
  demoPortfolio,
  demoPosts,
  demoPricing,
  demoServices,
  demoTestimonials,
} from "@/lib/demo-data";
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

    return {
      services: withFallback(services, demoServices),
      portfolio: withFallback(portfolio, demoPortfolio),
      pricing: withFallback(pricing, demoPricing),
      testimonials: withFallback(testimonials, demoTestimonials),
      faqs: withFallback(faqs, demoFaqs),
    };
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

export async function getServices() {
  try {
    return withFallback(await prisma.service.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }), demoServices);
  } catch {
    return withFallback(await listLocalRecords<(typeof demoServices)[number]>("services"), demoServices);
  }
}

export async function getPortfolioItems() {
  try {
    return withFallback(await prisma.portfolio.findMany({ where: { isActive: true }, orderBy: { createdAt: "desc" } }), demoPortfolio);
  } catch {
    return withFallback(await listLocalRecords<(typeof demoPortfolio)[number]>("portfolio"), demoPortfolio);
  }
}

export async function getPortfolioBySlug(slug: string) {
  try {
    return (await prisma.portfolio.findUnique({ where: { slug } })) ?? demoPortfolio.find((item) => item.slug === slug) ?? null;
  } catch {
    return (await listLocalRecords<(typeof demoPortfolio)[number]>("portfolio")).find((item) => item.slug === slug) ?? demoPortfolio.find((item) => item.slug === slug) ?? null;
  }
}

export async function getPricingPackages() {
  try {
    return withFallback(await prisma.pricingPackage.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }), demoPricing);
  } catch {
    return withFallback(await listLocalRecords<(typeof demoPricing)[number]>("pricing"), demoPricing);
  }
}

export async function getBlogPosts() {
  try {
    return withFallback(await prisma.blogPost.findMany({ where: { isPublished: true }, orderBy: { publishedAt: "desc" } }), demoPosts);
  } catch {
    return withFallback(await listLocalRecords<(typeof demoPosts)[number]>("blog"), demoPosts);
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    return (await prisma.blogPost.findUnique({ where: { slug } })) ?? demoPosts.find((post) => post.slug === slug) ?? null;
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
