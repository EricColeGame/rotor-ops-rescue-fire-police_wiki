import type { LucideIcon } from "lucide-react";

/**
 * 导航项契约。
 * 消费方 `src/components/site.tsx`（SiteHeader / 移动端抽屉）读取 `key`（next-intl
 * `nav` 命名空间下的翻译键）与 `path`（不带 locale 前缀的站内路径，由 localizeHref
 * 补前缀），这两个字段必须保留。`path` 收窄为 `/` 开头的模板字面量类型，
 * 缺少 path 或写成裸 slug（如 "guide"）时由 TypeScript 直接报错。
 */
export interface NavItem {
  /** next-intl `nav` 命名空间下的翻译键 */
  key: string;
  /** 站内路径，必须以 "/" 开头，如 "/codes" */
  path: `/${string}`;
  /** 导航/侧边栏图标（当前由分类图标位保留，可选） */
  icon?: LucideIcon;
  /** 是否属于 content/<locale>/<path> 下的内容分类（决定是否进入 CONTENT_TYPES） */
  isContentType: boolean;
}

/**
 * 顶部导航配置。
 * 分类 slug 来自 `关键词.json` 的 categories，必须与 `content/<locale>/` 下的
 * 文章子目录名一一对应（这些目录名同时是 `content.ts` 的 GROUP_TITLES /
 * GROUP_ORDER 键与 en.json 的顶级 key）。
 */
export const NAVIGATION_CONFIG = [
  { key: "guide", path: "/guide", isContentType: true },
  { key: "controls", path: "/controls", isContentType: true },
  { key: "vehicles", path: "/vehicles", isContentType: true },
  { key: "missions", path: "/missions", isContentType: true },
  { key: "mechanics", path: "/mechanics", isContentType: true },
  { key: "community", path: "/community", isContentType: true },
] satisfies readonly NavItem[];

export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map((item) => item.path.replace(/^\//, ""));
