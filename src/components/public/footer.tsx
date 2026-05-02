import Link from "next/link";
import { Camera, Send, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <p className="text-xl font-black">Muradovs_.smm</p>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
            Premium SMM strategiya, kontent production va reklama boshqaruvi orqali biznesingizni raqamli sotuvga tayyorlaymiz.
          </p>
        </div>
        <div>
          <p className="font-semibold">Sahifalar</p>
          <div className="mt-4 grid gap-2 text-sm text-slate-400">
            <Link href="/services">Xizmatlar</Link>
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/pricing">Narxlar</Link>
            <Link href="/blog">Blog</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold">Aloqa</p>
          <div className="mt-4 flex gap-3 text-slate-300">
            <Link href="https://instagram.com/muradovs_.smm" aria-label="Instagram">
              <Camera size={20} />
            </Link>
            <Link href="https://t.me/muradovs_smm" aria-label="Telegram">
              <Send size={20} />
            </Link>
            <Link href="tel:+998900000000" aria-label="Telefon">
              <Phone size={20} />
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Muradovs_.smm. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  );
}
