import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import WhatsAppButton from "@/components/WhatsAppButton";

// Luxury editorial serif — headings
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
});

// Clean geometric sans — body & UI
const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jost",
  display: "swap",
  preload: true,
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  "https://www.wahmomentz.com";

export const metadata: Metadata = {
  title: {
    default: "WAH Momentz — Luxury Wedding Planners India",
    template: "%s | WAH Momentz",
  },
  description:
    "India's premier luxury wedding planning studio. We craft bespoke, emotionally rich celebrations — destination weddings, royal ceremonies, intimate gatherings — tailored to every couple's story.",
  keywords:
    "luxury wedding planner India, destination wedding planner, Indian wedding planning, wedding decorators Delhi, bespoke wedding, royal wedding India",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "WAH Momentz",
    title: "WAH Momentz — Luxury Wedding Planners India",
    description:
      "Crafting unforgettable love stories. Destination weddings, royal celebrations, and intimate ceremonies across India and beyond.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "WAH Momentz" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WAH Momentz — Luxury Wedding Planners India",
    description: "India's premier luxury wedding planning studio.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#2D1B4E" />
      </head>
      <body className="font-sans antialiased">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JZSQ4FYM27"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JZSQ4FYM27');
          `}
        </Script>

        {/* Schema.org structured data */}
        <Script id="schema-org" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "WAH Momentz",
            description: "India's premier luxury wedding planning studio",
            url: siteUrl,
            "@id": siteUrl,
            telephone: "+91-98911-06761",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Delhi",
              addressRegion: "Delhi",
              addressCountry: "IN",
            },
            sameAs: [
              "https://www.instagram.com/wahmomentz",
              "https://www.facebook.com/wahmomentz",
            ],
          })}
        </Script>

        <ThemeProvider>{children}</ThemeProvider>
        <WhatsAppButton />
      </body>
    </html>
  );
}
