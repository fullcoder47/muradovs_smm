import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/public/section";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: "SMM, Instagram, kontent va reklama bo'yicha foydali maqolalar.",
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({ where: { isPublished: true }, orderBy: { publishedAt: "desc" } });

  return (
    <Section eyebrow="Blog" title="SMM growth haqida amaliy fikrlar">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group rounded-lg border border-white/10 bg-white/[0.04] p-6 transition hover:border-blue-400/50">
            <div className="mb-6 aspect-[16/10] rounded-md bg-[linear-gradient(135deg,#0f172a,#1d4ed8)]" />
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <ArrowUpRight className="shrink-0 text-slate-500 transition group-hover:text-blue-300" size={20} />
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-400">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
