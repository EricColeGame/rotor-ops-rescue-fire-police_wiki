import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

const siteUrl = siteConfig.url;
const gameName = siteConfig.name.replace(/ Wiki$/, "");

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.about" });
  const title = `${t("title")} — ${siteConfig.name}`;
  const description = t("p1", { site: siteConfig.name, game: gameName });
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/about`, languages: Object.fromEntries(routing.locales.map((loc) => [loc, `/${loc}/about`])) },
    openGraph: { title, description, url: `${siteUrl}/${locale}/about`, images: [`${siteUrl}/images/hero.webp`] },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.about" });
  const values = { site: siteConfig.name, game: gameName, email: siteConfig.supportEmail };
  return (
    <LegalPage title={t("title")}>
      <p>{t("p1", values)}</p>
      <p>{t("p2", values)}</p>
      <p>{t("p3", values)}</p>
    </LegalPage>
  );
}
