import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { AdminShortcutListener } from "@/components/layout/AdminShortcutListener";
import { companyData } from "@/data/company";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${companyData.name} | Architecture, Construction & Engineering Pakistan`,
    template: `%s | ${companyData.shortName}`,
  },
  description: `${companyData.name} is a premier PEC C3 certified construction and engineering firm in Karachi, Pakistan. Specializing in residential bungalows, commercial plazas, industrial warehouses, MEP, and turnkey general contracting.`,
  keywords: [
    "AK Associates",
    "AK Associates Engineers & Contractors",
    "Construction Company Karachi",
    "PEC C3 Contractor Pakistan",
    "Rashid Ali Contractor",
    "Residential Construction Karachi",
    "Warehouse Construction Korangi",
    "Industrial Civil Engineering Pakistan",
    "Turnkey General Contractor",
  ],
  authors: [{ name: "Rashid Ali - AK Associates" }],
  creator: "AK Associates Engineers & Contractors",
  metadataBase: new URL("https://www.ak-associates.com"),
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://www.ak-associates.com",
    siteName: companyData.name,
    title: `${companyData.name} | Construction & Engineering`,
    description: companyData.tagline,
    images: [
      {
        url: "/assets/images/ak-headquarters-hero.png",
        width: 1200,
        height: 630,
        alt: `${companyData.name} Corporate Headquarters`,
      },
    ],
  },
  icons: {
    icon: "/assets/images/Ak_logo-removebg-preview.png",
    apple: "/assets/images/Ak_logo-removebg-preview.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased text-slate-900 bg-white selection:bg-brand-500 selection:text-white">
        <TopBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
        <AdminShortcutListener />
      </body>
    </html>
  );
}
