import { defineRouting } from "next-intl/routing";
import { siteConfig } from "@/config/site";

/**
 * 语言集合的唯一真相源。
 * 本数组必须与 `src/locales/*.json` 的文件名集合、`src/i18n/request.ts` 的
 * messagesMap 键、`src/components/language-switcher.tsx` 的 localeLabels 键
 * 完全一致，新增/移除语言时四处同步修改。
 *
 * ⚠️ 故意保留 `as string[]`（不要写成 `as const`）：一旦收窄成字面量联合类型，
 * `Locale` 就不再是 `string`，而 `src/app/[locale]/[...slug]/page.tsx` 已把
 * `params` 声明为 `{ locale: Locale }`，会与 Next.js 生成的 `string` 参数类型
 * 产生跨文件冲突，导致 `next build` 的类型检查失败。
 */
export const routing = defineRouting({
  locales: ["en", "fr", "es", "pt"] as string[],
  defaultLocale: siteConfig.defaultLocale,
  localePrefix: "always",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
