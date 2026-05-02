import { prisma } from "@/lib/prisma";

export async function getHomeData() {
  const [services, portfolio, pricing, testimonials, faqs] = await Promise.all([
    prisma.service.findMany({ where: { isActive: true }, orderBy: { order: "asc" }, take: 3 }),
    prisma.portfolio.findMany({ where: { isActive: true, isFeatured: true }, orderBy: { createdAt: "desc" }, take: 3 }),
    prisma.pricingPackage.findMany({ where: { isActive: true }, orderBy: { order: "asc" }, take: 3 }),
    prisma.testimonial.findMany({ where: { isActive: true }, orderBy: { createdAt: "desc" }, take: 6 }),
    prisma.fAQ.findMany({ where: { isActive: true }, orderBy: { order: "asc" }, take: 8 }),
  ]);

  return { services, portfolio, pricing, testimonials, faqs };
}

export async function getSettings() {
  const settings = await prisma.siteSetting.findMany();
  return Object.fromEntries(settings.map((item) => [item.key, item.value]));
}
