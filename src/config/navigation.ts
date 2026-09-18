import type { LucideIcon } from "lucide-react";

/**
 * 导航项契约。
 * 消费方 `src/components/site.tsx`（SiteHeader / 移动端抽屉）读取 `key`（next-intl
 * `nav` 命名空间下的翻译键）与 `path`（不带 locale 前缀的站内路径，由 localizeHref
 * 补前缀），这两个字段必须保留。
 */
export interface NavItem {
  /** next-intl `nav` 命名空间下的翻译键 */
  key: string;
  /** 站内路径，如 "/codes" */
  path: string;
  /** 导航/侧边栏图标 */
  icon: LucideIcon;
  /** 是否属于 content/<locale>/<path> 下的内容分类（决定是否进入 CONTENT_TYPES） */
  isContentType: boolean;
}

/**
 * 顶部导航配置。本阶段（多语言与导航重置）按模板清理要求置空，
 * 内容分类将在后续阶段重建；CONTENT_TYPES 会随本数组自动派生。
 */
export const NAVIGATION_CONFIG: readonly NavItem[] = [];

export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map((item) => item.path.replace(/^\//, ""));
