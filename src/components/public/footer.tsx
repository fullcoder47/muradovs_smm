import Link from "next/link";
import { Camera, Send, Phone } from "lucide-react";
import { t } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { getSettings } from "@/lib/public-data";

export async function Footer() {
  const [locale, settings] = await Promise.all([getLocale(), getSettings()]);
  const siteName = settings.site_name ?? "Muradovs_.smm";
  const footerText = settings.site_description ?? t(locale, "footerText");
  const phone = settings.phone ?? "+998 90 000 00 00";
  const telegram = settings.telegram ?? "https://t.me/muradovs_smm";
  const instagram = settings.instagram ?? "https://instagram.com/muradovs_.smm";

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <p className="text-xl font-black">{siteName}</p>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">{footerText}</p>
        </div>
        <div>
          <p className="font-semibold">{t(locale, "pages")}</p>
          <div className="mt-4 grid gap-2 text-sm text-slate-400">
            <Link href="/services">{t(locale, "services")}</Link>
            <Link href="/portfolio">{t(locale, "portfolio")}</Link>
            <Link href="/pricing">{t(locale, "pricing")}</Link>
            <Link href="/blog">{t(locale, "blog")}</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold">{t(locale, "contact")}</p>
          <div className="mt-4 flex gap-3 text-slate-300">
            <Link href={instagram} aria-label="Instagram">
              <Camera size={20} />
            </Link>
            <Link href={telegram} aria-label="Telegram">
              <Send size={20} />
            </Link>
            <Link href={`tel:${phone.replace(/\s/g, "")}`} aria-label="Telefon">
              <Phone size={20} />
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-500">{phone}</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {siteName}. {t(locale, "rights")}
      </div>
    </footer>
  );
}
