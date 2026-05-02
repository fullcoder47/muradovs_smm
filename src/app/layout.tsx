import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Muradovs_.smm | Premium SMM agentligi",
    template: "%s | Muradovs_.smm",
  },
  description:
    "Muradovs_.smm bizneslar uchun premium SMM strategiya, kontent production va target reklama xizmatlarini taqdim etadi.",
  openGraph: {
    title: "Muradovs_.smm",
    description: "SMM strategiya, kontent va performance reklama orqali biznesingizni o'stiring.",
    url: "/",
    siteName: "Muradovs_.smm",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uz"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#030303] text-slate-50">{children}</body>
    </html>
  );
}
