import { prisma } from "@/lib/prisma";
import {
  demoFaqs,
  demoPortfolio,
  demoPosts,
  demoPricing,
  demoServices,
  demoTestimonials,
} from "@/lib/demo-data";

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
    return {
      services: demoServices,
      portfolio: demoPortfolio,
      pricing: demoPricing,
      testimonials: demoTestimonials,
      faqs: demoFaqs,
    };
  }
}

export async function getServices() {
  try {
    return await prisma.service.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
  } catch {
    return demoServices;
  }
}

export async function getPortfolioItems() {
  try {
    return await prisma.portfolio.findMany({ where: { isActive: true }, orderBy: { createdAt: "desc" } });
  } catch {
    return demoPortfolio;
  }
}

export async function getPortfolioBySlug(slug: string) {
  try {
    return await prisma.portfolio.findUnique({ where: { slug } });
  } catch {
    return demoPortfolio.find((item) => item.slug === slug) ?? null;
  }
}

export async function getPricingPackages() {
  try {
    return await prisma.pricingPackage.findMany({ where: { isActive: true }, orderBy: { order: "asc" } });
  } catch {
    return demoPricing;
  }
}

export async function getBlogPosts() {
  try {
    return await prisma.blogPost.findMany({ where: { isPublished: true }, orderBy: { publishedAt: "desc" } });
  } catch {
    return demoPosts;
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    return await prisma.blogPost.findUnique({ where: { slug } });
  } catch {
    return demoPosts.find((post) => post.slug === slug) ?? null;
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
