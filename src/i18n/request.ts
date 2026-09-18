import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "./routing";
import en from "@/locales/en.json";
import es from "@/locales/es.json";
import fr from "@/locales/fr.json";
import pt from "@/locales/pt.json";

type Messages = typeof en;

/**
 * locale → 翻译文件映射。
 * ⚠️ 必须与 `src/i18n/routing.ts` 的 locales 数组完全一致（语言集合的第二处）。
 * 这里刻意使用静态 import 而不是 `await import(\`@/locales/${locale}.json\`)`：
 * 静态 import 会让缺失的语言文件在构建期直接报错，而不是运行时静默回退到英文。
 */
const messagesMap: Partial<Record<Locale, Partial<Messages>>> = {
  "en": en,
  "es": es,
  "fr": fr,
  "pt": pt,
};

function deepMerge<T>(base: T, override: Partial<T>): T {
  if (
    typeof base !== "object" ||
    base === null ||
    typeof override !== "object" ||
    override === null
  ) {
    return (override as T) ?? base;
  }

  if (Array.isArray(base)) {
    return (Array.isArray(override) ? override : base) as T;
  }

  const result: Record<string, unknown> = { ...(base as Record<string, unknown>) };

  for (const key of Object.keys(override as Record<string, unknown>)) {
    const baseValue = (base as Record<string, unknown>)[key];
    const overrideValue = (override as Record<string, unknown>)[key];
    if (overrideValue === undefined) continue;
    result[key] = deepMerge(baseValue as never, overrideValue as never);
  }

  return result as T;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // 非英文语言以 en.json 为基线做深度合并，未翻译的键自动回退到英文。
  const localeMessages: Partial<Messages> =
    locale === "en" ? {} : (messagesMap[locale] ?? {});

  const messages = deepMerge(en, localeMessages);
  return { locale, messages };
});
