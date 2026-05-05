import {
  blogSchema,
  cleanSlug,
  faqSchema,
  listFromTextarea,
  portfolioSchema,
  pricingSchema,
  serviceSchema,
  settingSchema,
  testimonialSchema,
} from "@/lib/validations";
import type { z } from "zod";

export type FieldType = "text" | "textarea" | "number" | "checkbox" | "image";

export type ResourceConfig = {
  label: string;
  delegate: string;
  listTitle: string;
  schema: z.ZodType;
  fields: { name: string; label: string; type: FieldType; required?: boolean; hint?: string }[];
  columns: string[];
  defaults?: Record<string, string | number | boolean>;
  transform: (data: Record<string, unknown>) => Record<string, unknown>;
};

export type ClientResourceConfig = Pick<ResourceConfig, "label" | "listTitle" | "fields" | "columns" | "defaults">;

export const resources = {
  services: {
    label: "Xizmatlar",
    delegate: "service",
    listTitle: "Services CRUD",
    schema: serviceSchema,
    fields: [
      { name: "title", label: "Sarlavha", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", hint: "Bo'sh qoldirilsa avtomatik yaratiladi" },
      { name: "description", label: "Tavsif", type: "textarea", required: true },
      { name: "icon", label: "Icon nomi", type: "text" },
      { name: "imageUrl", label: "Rasm", type: "image" },
      { name: "features", label: "Featurelar", type: "textarea", hint: "Har bir qator alohida feature" },
      { name: "order", label: "Tartib", type: "number" },
      { name: "isActive", label: "Faol", type: "checkbox" },
    ],
    columns: ["title", "slug", "isActive", "order"],
    defaults: { isActive: true, order: 0 },
    transform: (data) => ({
      title: data.title,
      slug: cleanSlug(data.slug as string, data.title as string),
      description: data.description,
      icon: data.icon || null,
      imageUrl: data.imageUrl || null,
      features: listFromTextarea(data.features as string),
      isActive: Boolean(data.isActive),
      order: Number(data.order ?? 0),
    }),
  },
  portfolio: {
    label: "Portfolio",
    delegate: "portfolio",
    listTitle: "Portfolio CRUD",
    schema: portfolioSchema,
    fields: [
      { name: "title", label: "Sarlavha", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "client", label: "Mijoz", type: "text", required: true },
      { name: "category", label: "Kategoriya", type: "text", required: true },
      { name: "summary", label: "Qisqa natija", type: "textarea", required: true },
      { name: "challenge", label: "Vazifa", type: "textarea" },
      { name: "solution", label: "Yechim", type: "textarea" },
      { name: "results", label: "Natijalar", type: "textarea" },
      { name: "imageUrl", label: "Rasm", type: "image" },
      { name: "instagramUrl", label: "Instagram sahifa linki", type: "text", hint: "Masalan: https://instagram.com/username" },
      { name: "isFeatured", label: "Home'da ko'rsatish", type: "checkbox" },
      { name: "isActive", label: "Faol", type: "checkbox" },
    ],
    columns: ["title", "client", "category", "isFeatured", "isActive"],
    defaults: { isActive: true },
    transform: (data) => ({
      title: data.title,
      slug: cleanSlug(data.slug as string, data.title as string),
      client: data.client,
      category: data.category,
      summary: data.summary,
      challenge: data.challenge || null,
      solution: data.solution || null,
      results: listFromTextarea(data.results as string),
      imageUrl: data.imageUrl || null,
      instagramUrl: data.instagramUrl || null,
      isFeatured: Boolean(data.isFeatured),
      isActive: Boolean(data.isActive),
    }),
  },
  pricing: {
    label: "Narxlar",
    delegate: "pricingPackage",
    listTitle: "Pricing CRUD",
    schema: pricingSchema,
    fields: [
      { name: "name", label: "Nomi", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "price", label: "Narx", type: "text", required: true },
      { name: "description", label: "Tavsif", type: "textarea", required: true },
      { name: "features", label: "Featurelar", type: "textarea" },
      { name: "order", label: "Tartib", type: "number" },
      { name: "isPopular", label: "Ommabop", type: "checkbox" },
      { name: "isActive", label: "Faol", type: "checkbox" },
    ],
    columns: ["name", "price", "isPopular", "isActive", "order"],
    defaults: { isActive: true, order: 0 },
    transform: (data) => ({
      name: data.name,
      slug: cleanSlug(data.slug as string, data.name as string),
      price: data.price,
      description: data.description,
      features: listFromTextarea(data.features as string),
      isPopular: Boolean(data.isPopular),
      isActive: Boolean(data.isActive),
      order: Number(data.order ?? 0),
    }),
  },
  blog: {
    label: "Blog",
    delegate: "blogPost",
    listTitle: "Blog CRUD",
    schema: blogSchema,
    fields: [
      { name: "title", label: "Sarlavha", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text" },
      { name: "excerpt", label: "Excerpt", type: "textarea", required: true },
      { name: "content", label: "Kontent", type: "textarea", required: true },
      { name: "imageUrl", label: "Rasm", type: "image" },
      { name: "tags", label: "Taglar", type: "textarea" },
      { name: "isPublished", label: "Published", type: "checkbox" },
    ],
    columns: ["title", "slug", "isPublished", "publishedAt"],
    defaults: { isPublished: false },
    transform: (data) => ({
      title: data.title,
      slug: cleanSlug(data.slug as string, data.title as string),
      excerpt: data.excerpt,
      content: data.content,
      imageUrl: data.imageUrl || null,
      tags: listFromTextarea(data.tags as string),
      isPublished: Boolean(data.isPublished),
      publishedAt: data.isPublished ? new Date() : null,
    }),
  },
  testimonials: {
    label: "Testimonials",
    delegate: "testimonial",
    listTitle: "Testimonials CRUD",
    schema: testimonialSchema,
    fields: [
      { name: "name", label: "Ism", type: "text", required: true },
      { name: "role", label: "Lavozim", type: "text", required: true },
      { name: "company", label: "Kompaniya", type: "text" },
      { name: "content", label: "Fikr", type: "textarea", required: true },
      { name: "rating", label: "Reyting", type: "number" },
      { name: "imageUrl", label: "Rasm", type: "image" },
      { name: "isActive", label: "Faol", type: "checkbox" },
    ],
    columns: ["name", "role", "rating", "isActive"],
    defaults: { rating: 5, isActive: true },
    transform: (data) => ({
      name: data.name,
      role: data.role,
      company: data.company || null,
      content: data.content,
      rating: Number(data.rating ?? 5),
      imageUrl: data.imageUrl || null,
      isActive: Boolean(data.isActive),
    }),
  },
  faqs: {
    label: "FAQ",
    delegate: "fAQ",
    listTitle: "FAQ CRUD",
    schema: faqSchema,
    fields: [
      { name: "question", label: "Savol", type: "text", required: true },
      { name: "answer", label: "Javob", type: "textarea", required: true },
      { name: "order", label: "Tartib", type: "number" },
      { name: "isActive", label: "Faol", type: "checkbox" },
    ],
    columns: ["question", "isActive", "order"],
    defaults: { isActive: true, order: 0 },
    transform: (data) => ({
      question: data.question,
      answer: data.answer,
      isActive: Boolean(data.isActive),
      order: Number(data.order ?? 0),
    }),
  },
  settings: {
    label: "Sozlamalar",
    delegate: "siteSetting",
    listTitle: "Site Settings CRUD",
    schema: settingSchema,
    fields: [
      { name: "key", label: "Key", type: "text", required: true },
      { name: "value", label: "Value", type: "textarea", required: true },
      { name: "group", label: "Guruh", type: "text", required: true },
    ],
    columns: ["key", "value", "group"],
    defaults: { group: "general" },
    transform: (data) => ({
      key: data.key,
      value: data.value,
      group: data.group,
    }),
  },
} satisfies Record<string, ResourceConfig>;

export type ResourceKey = keyof typeof resources;

export function getClientResourceConfig(resource: ResourceKey): ClientResourceConfig {
  const { label, listTitle, fields, columns, defaults } = resources[resource];
  return { label, listTitle, fields, columns, defaults };
}
