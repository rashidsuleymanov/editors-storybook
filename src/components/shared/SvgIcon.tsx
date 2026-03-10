import type { CSSProperties } from "react";
import { iconSvgs, type IconSvgName } from "../../data/icon-svgs";

const ICON_ALIASES = {
  alert: "Window icon / alert",
  arrowLeft: "common / btn-arrow-top",
  chevron: "Chevron (2)",
  close: "common / btn-close",
  closeMin: "common / close min",
  copy: "common / btn-more",
  highlight: "common / btn-highlight",
  info: "Window icon / info",
  selectRange: "common / btn-embed",
  submenu: "Chevron (2)",
} as const;

type IconAlias = keyof typeof ICON_ALIASES;

const normalizeName = (value: string) =>
  value.trim().toLowerCase().replace(/[\s/_-]+/g, "");

const iconNameByNormalized = Object.keys(iconSvgs).reduce<Record<string, IconSvgName>>((acc, key) => {
  acc[normalizeName(key)] = key as IconSvgName;
  return acc;
}, {});

const preparedIconCache = new Map<string, string>();

const ensureRootSizing = (svgMarkup: string) =>
  svgMarkup.replace(/<svg\b([^>]*)>/i, (_match, attrs) => {
    const cleanedAttrs = String(attrs).replace(/\s(width|height)="[^"]*"/gi, "");
    return `<svg${cleanedAttrs} width="100%" height="100%" preserveAspectRatio="xMidYMid meet">`;
  });

const toMonochrome = (svgMarkup: string) =>
  svgMarkup
    .replace(/\sfill="(?!none|url\()[^"]*"/gi, ' fill="currentColor"')
    .replace(/\sstroke="(?!none|url\()[^"]*"/gi, ' stroke="currentColor"');

const resolveIconName = (name: string): IconSvgName | null => {
  const aliasTarget = ICON_ALIASES[name as IconAlias];
  if (aliasTarget) return aliasTarget;

  if (name in iconSvgs) return name as IconSvgName;

  const normalized = normalizeName(name);
  return iconNameByNormalized[normalized] ?? null;
};

const getPreparedMarkup = (name: IconSvgName, monochrome: boolean) => {
  const cacheKey = `${name}::${monochrome ? "mono" : "raw"}`;
  const cached = preparedIconCache.get(cacheKey);
  if (cached) return cached;

  const rawMarkup = iconSvgs[name];
  const sizedMarkup = ensureRootSizing(rawMarkup);
  const prepared = monochrome ? toMonochrome(sizedMarkup) : sizedMarkup;
  preparedIconCache.set(cacheKey, prepared);
  return prepared;
};

export type SvgIconProps = {
  name: IconSvgName | IconAlias | string;
  size?: number | string;
  color?: string;
  monochrome?: boolean;
  style?: CSSProperties;
  className?: string;
  title?: string;
};

export const SvgIcon = ({
  name,
  size = 20,
  color,
  monochrome = false,
  style,
  className,
  title,
}: SvgIconProps) => {
  const resolvedName = resolveIconName(String(name));
  if (!resolvedName) return null;

  const markup = getPreparedMarkup(resolvedName, monochrome);
  const iconSize = typeof size === "number" ? `${size}px` : size;

  const iconStyle: CSSProperties = {
    width: iconSize,
    height: iconSize,
    color,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 0,
    flexShrink: 0,
    ...style,
  };

  if (title) {
    return (
      <span
        role="img"
        aria-label={title}
        className={className}
        style={iconStyle}
        dangerouslySetInnerHTML={{ __html: markup }}
      />
    );
  }

  return (
    <span
      aria-hidden
      className={className}
      style={iconStyle}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
};
