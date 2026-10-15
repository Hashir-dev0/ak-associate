import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { AdminShortcutListener } from "@/components/layout/AdminShortcutListener";
import { companyData } from "@/data/company";
import { JsonLd } from "@/components/seo/JsonLd";

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
    default: "AK Associates Engineers & Contractors | Construction Firm Karachi",
    template: `%s | ${companyData.shortName} Karachi`,
  },
  description:
    "AK Associates Engineers & Contractors is a premier Pakistan Engineering Council (PEC Category C3) certified civil engineering and general contracting firm in Karachi, Pakistan. Specializing in PEB steel warehouses, industrial factories, commercial plazas, and residential construction.",
  keywords: [
    "AK Associates",
    "AK Associates Karachi",
    "AK Associates Pakistan",
    "AK Associates Engineers & Contractors",
    "Construction Company Karachi",
    "PEC C3 Contractor Pakistan",
    "Rashid Ali Contractor",
    "PEB Steel Building Karachi",
    "Industrial Warehouse Construction Korangi",
    "Commercial Plaza Contractor Karachi",
    "Residential Construction Karachi",
    "Turnkey Civil Engineering Pakistan",
  ],
  authors: [{ name: "Rashid Ali - AK Associates" }],
  creator: "AK Associates Engineers & Contractors",
  publisher: "AK Associates Engineers & Contractors",
  metadataBase: new URL("https://akassociates.com.pk"),
  alternates: {
    canonical: "https://akassociates.com.pk",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://akassociates.com.pk",
    siteName: "AK Associates Engineers & Contractors",
    title: "AK Associates Engineers & Contractors | Construction Firm Karachi",
    description:
      "PEC C3 Certified Civil Engineering & General Contracting in Karachi, Pakistan. Directed by Rashid Ali.",
    images: [
      {
        url: "/assets/images/ak-headquarters-hero.png",
        width: 1200,
        height: 630,
        alt: "AK Associates Engineers & Contractors Headquarters Karachi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AK Associates Engineers & Contractors | Karachi, Pakistan",
    description:
      "PEC C3 certified civil engineering, PEB steel structures & general contracting in Karachi.",
    images: ["/assets/images/ak-headquarters-hero.png"],
  },
  icons: {
    icon: "/assets/images/Ak_logo-removebg-preview.png",
    apple: "/assets/images/Ak_logo-removebg-preview.png",
  },
  other: {
    "geo.region": "PK-SD",
    "geo.placename": "Karachi",
    "geo.position": "24.8270;67.1265",
    ICBM: "24.8270, 67.1265",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <head>
        <JsonLd />
      </head>
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
