import { z } from "zod";
import { slugify } from "@/lib/utils";

const checkboxSchema = z.preprocess((value) => {
  if (value === "true" || value === "on" || value === true) return true;
  if (value === "false" || value === false || value === undefined || value === null || value === "") return false;
  return value;
}, z.boolean().default(false));

export const leadSchema = z.object({
  name: z.string().min(2, "Ism kamida 2 ta belgidan iborat bo'lishi kerak"),
  phone: z.string().min(7, "Telefon raqamni to'g'ri kiriting"),
  telegram: z.string().optional(),
  businessType: z.string().min(2, "Biznes turini yozing"),
  serviceType: z.string().min(2, "Xizmat turini tanlang"),
  message: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Email noto'g'ri"),
  password: z.string().min(6, "Parol kamida 6 ta belgi"),
});

export const serviceSchema = z.object({
  title: z.string().min(2),
  slug: z.string().optional(),
  description: z.string().min(10),
  icon: z.string().optional(),
  imageUrl: z.string().optional(),
  features: z.string().optional(),
  isActive: checkboxSchema,
  order: z.coerce.number().default(0),
});

export const portfolioSchema = z.object({
  title: z.string().min(2),
  slug: z.string().optional(),
  client: z.string().min(2),
  category: z.string().min(2),
  summary: z.string().min(10),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  results: z.string().optional(),
  imageUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  isFeatured: checkboxSchema,
  isActive: checkboxSchema,
});

export const pricingSchema = z.object({
  name: z.string().min(2),
  slug: z.string().optional(),
  price: z.string().min(1),
  description: z.string().min(8),
  features: z.string().optional(),
  isPopular: checkboxSchema,
  isActive: checkboxSchema,
  order: z.coerce.number().default(0),
});

export const blogSchema = z.object({
  title: z.string().min(2),
  slug: z.string().optional(),
  excerpt: z.string().min(10),
  content: z.string().min(20),
  imageUrl: z.string().optional(),
  tags: z.string().optional(),
  isPublished: checkboxSchema,
});

export const testimonialSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  company: z.string().optional(),
  content: z.string().min(10),
  rating: z.coerce.number().min(1).max(5).default(5),
  imageUrl: z.string().optional(),
  isActive: checkboxSchema,
});

export const faqSchema = z.object({
  question: z.string().min(5),
  answer: z.string().min(5),
  isActive: checkboxSchema,
  order: z.coerce.number().default(0),
});

export const settingSchema = z.object({
  key: z.string().min(2),
  value: z.string().min(1),
  group: z.string().min(2).default("general"),
});

export function listFromTextarea(value?: string) {
  return (value ?? "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function cleanSlug(input: string | undefined, fallback: string) {
  return slugify(input?.trim() || fallback);
}
