import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { siteUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ["", "/services", "/portfolio", "/pricing", "/blog", "/about", "/contact"].map((path) => ({
    url: siteUrl(path),
    lastModified: new Date(),
  }));

  try {
    const [posts, portfolio] = await Promise.all([
      prisma.blogPost.findMany({ where: { isPublished: true }, select: { slug: true, updatedAt: true } }),
      prisma.portfolio.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }),
    ]);

    return [
      ...staticPages,
      ...posts.map((post) => ({ url: siteUrl(`/blog/${post.slug}`), lastModified: post.updatedAt })),
      ...portfolio.map((item) => ({ url: siteUrl(`/portfolio/${item.slug}`), lastModified: item.updatedAt })),
    ];
  } catch {
    return staticPages;
  }
}
