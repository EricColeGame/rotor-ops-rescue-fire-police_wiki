import { siteConfig } from "@/config/site";
import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/site";
import { routing } from "@/i18n/routing";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const siteUrl = siteConfig.url;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const image = `${siteUrl}/images/hero.webp`;
  const adsenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;
  return {
    metadataBase: new URL(siteUrl),
    manifest: "/manifest.json",
    icons: {
      icon: [{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }, { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    title: { default: "Rotor Ops Rescue Fire Police Wiki", template: "%s" },
    description: "Complete Rotor Ops Rescue Fire Police fan wiki with helicopter guides, rescue missions, firefighting tips, police operations and Roblox gameplay walkthroughs.",
    keywords: ["Rotor Ops Rescue Fire Police", "Roblox", "helicopter simulator", "rescue game", "fire rescue", "police aviation"],
    // NOTE: no `alternates.canonical` here — this metadata is inherited by pages that
    // define none of their own (about/privacy-policy/terms-of-service/copyright), and a
    // layout-level canonical would point every one of them at the locale homepage.
    // Home and [...slug] pages declare their own canonical.
    openGraph: { type: "website", locale, url: siteUrl, siteName: siteConfig.name, title: "Rotor Ops Rescue Fire Police Wiki", description: "Complete Rotor Ops Rescue Fire Police fan wiki with helicopter guides, rescue missions, firefighting tips, police operations and Roblox gameplay walkthroughs.", images: [{ url: image, width: 768, height: 432, alt: `${siteConfig.name} key art` }] },
    twitter: { card: "summary_large_image", title: "Rotor Ops Rescue Fire Police Wiki", description: "Complete Rotor Ops Rescue Fire Police fan wiki with helicopter guides, rescue missions, firefighting tips, police operations and Roblox gameplay walkthroughs.", images: [image] },
    ...(adsenseId ? { other: { "google-adsense-account": adsenseId } } : {}),
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!hasLocale(routing.locales, locale)) notFound();
  const messages = await getMessages({ locale });
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteUrl,
    logo: `${siteUrl}/android-chrome-512x512.png`,
    image: `${siteUrl}/images/hero.webp`,
  };

  const adsenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;

  return (
    <html lang={locale} className={`${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {adsenseId && (
          <Script
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
          />
        )}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <NextIntlClientProvider messages={messages}>
            <JsonLd data={organization} />
            <SiteHeader locale={locale} />
            {children}
            <SiteFooter locale={locale} />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
