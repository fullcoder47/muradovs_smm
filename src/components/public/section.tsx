import { cn } from "@/lib/utils";

export function Section({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24", className)}>
      {(eyebrow || title || description) && (
        <div className="mb-10 max-w-3xl">
          {eyebrow && <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-300">{eyebrow}</p>}
          {title && <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">{title}</h2>}
          {description && <p className="mt-4 text-lg leading-8 text-slate-400">{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
