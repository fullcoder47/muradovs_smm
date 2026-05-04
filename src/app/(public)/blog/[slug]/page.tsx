import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/public/section";
import { getLocale } from "@/lib/i18n-server";
import { getBlogPostBySlug, localizePost } from "@/lib/public-data";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Blog" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const sourcePost = await getBlogPostBySlug(slug);
  const post = sourcePost ? await localizePost(sourcePost, locale) : null;
  if (!post || !post.isPublished) notFound();

  return (
    <Section eyebrow={post.tags.join(" / ") || "Blog"} title={post.title} description={post.excerpt}>
      <article className="prose prose-invert max-w-none rounded-lg border border-white/10 bg-white/[0.04] p-6 leading-8 text-slate-300">
        {post.content.split("\n").map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>
    </Section>
  );
}
