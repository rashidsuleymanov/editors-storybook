import clsx from "clsx";
import { useState } from "react";
import data from "../../data/dialog-buttons";

export type DialogButtonSize = 22 | 24;
export type DialogButtonVariant = "primary" | "secondary";
export type DialogButtonState =
  | "default"
  | "hover"
  | "pressed"
  | "disabled"
  | "loader";

export type DialogButtonProps = {
  label?: string;
  size?: DialogButtonSize;
  state?: DialogButtonState;
  variant?: DialogButtonVariant;
  theme?: keyof typeof data;
  interactive?: boolean;
  isHovered?: boolean;
  isClicked?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  scale?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type DialogButtonToken = {
  container?: React.CSSProperties;
  text?: React.CSSProperties;
};

type DialogButtonData = Record<
  string,
  Record<string, Record<string, Record<string, DialogButtonToken>>>
>;

const dialogButtons = data as unknown as DialogButtonData;

const parseColorToRgb = (value: string): { r: number; g: number; b: number } | null => {
  const normalized = value.trim().toLowerCase();
  if (normalized === "white") return { r: 255, g: 255, b: 255 };
  if (normalized === "black") return { r: 0, g: 0, b: 0 };

  const hex = normalized.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    const raw = hex[1];
    if (raw.length === 3) {
      return {
        r: parseInt(raw[0] + raw[0], 16),
        g: parseInt(raw[1] + raw[1], 16),
        b: parseInt(raw[2] + raw[2], 16),
      };
    }
    return {
      r: parseInt(raw.slice(0, 2), 16),
      g: parseInt(raw.slice(2, 4), 16),
      b: parseInt(raw.slice(4, 6), 16),
    };
  }

  const rgb = normalized.match(/^rgba?\(([^)]+)\)$/);
  if (rgb) {
    const parts = rgb[1].split(",").map((part) => Number(part.trim()));
    if (parts.length >= 3 && parts.every((part, index) => index > 2 || Number.isFinite(part))) {
      return { r: parts[0], g: parts[1], b: parts[2] };
    }
  }

  return null;
};

const pickLoaderColor = (
  background: string | undefined,
  fallbackTheme: string,
  variant: DialogButtonVariant
): string => {
  if (variant === "primary") {
    if (fallbackTheme === "Classic Light") return "#FFFFFF";
    if (fallbackTheme === "Dark") return "rgba(255, 255, 255, 0.8)";
  }

  if (background) {
    const rgb = parseColorToRgb(background);
    if (rgb) {
      const luminance = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
      return luminance < 0.62 ? "#FFFFFF" : "#0F0F0F";
    }
  }

  return fallbackTheme.includes("Dark") ? "#FFFFFF" : "#0F0F0F";
};

const LoaderGlyph = ({ size, color }: { size: 16 | 20; color: string }) => {
  if (size === 20) {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M18.333 10C18.333 14.6024 14.602 18.3333 9.99967 18.3333C5.3973 18.3333 1.66634 14.6024 1.66634 10C1.66634 5.39763 5.3973 1.66667 9.99967 1.66667C14.602 1.66667 18.333 5.39763 18.333 10ZM4.58301 10C4.58301 12.9915 7.00812 15.4167 9.99967 15.4167C12.9912 15.4167 15.4163 12.9915 15.4163 10C15.4163 7.00846 12.9912 4.58333 9.99967 4.58333C7.00812 4.58333 4.58301 7.00846 4.58301 10Z"
          fill={color}
          opacity={0.2}
        />
        <path
          d="M9.99967 1.66667C11.0939 1.66667 12.1776 1.88222 13.1887 2.30101C14.1997 2.7198 15.1184 3.33363 15.8922 4.10745C16.666 4.88127 17.2799 5.79993 17.6987 6.81098C18.1174 7.82202 18.333 8.90567 18.333 10H15.4163C15.4163 9.28869 15.2762 8.58432 15.004 7.92714C14.7318 7.26996 14.3328 6.67283 13.8298 6.16985C13.3268 5.66687 12.7297 5.26788 12.0725 4.99566C11.4153 4.72344 10.7109 4.58333 9.99967 4.58333V1.66667Z"
          fill={color}
        />
      </svg>
    );
  }

  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.6663 8.00008C14.6663 11.682 11.6816 14.6667 7.99967 14.6667C4.31778 14.6667 1.33301 11.682 1.33301 8.00008C1.33301 4.31818 4.31778 1.33341 7.99967 1.33341C11.6816 1.33341 14.6663 4.31818 14.6663 8.00008ZM3.66634 8.00008C3.66634 10.3933 5.60644 12.3334 7.99967 12.3334C10.3929 12.3334 12.333 10.3933 12.333 8.00008C12.333 5.60684 10.3929 3.66675 7.99967 3.66675C5.60644 3.66675 3.66634 5.60684 3.66634 8.00008Z"
        fill={color}
        opacity={0.2}
      />
      <path
        d="M7.99967 1.33341C8.87515 1.33341 9.74206 1.50584 10.5509 1.84087C11.3597 2.1759 12.0947 2.66697 12.7137 3.28602C13.3328 3.90508 13.8238 4.64001 14.1589 5.44884C14.4939 6.25768 14.6663 7.12459 14.6663 8.00008H12.333C12.333 7.43101 12.2209 6.86753 12.0032 6.34178C11.7854 5.81604 11.4662 5.33834 11.0638 4.93596C10.6614 4.53357 10.1837 4.21438 9.65797 3.99661C9.13222 3.77884 8.56873 3.66675 7.99967 3.66675V1.33341Z"
        fill={color}
      />
    </svg>
  );
};

export const DialogButton = ({
  label = "Button",
  size = 24,
  state = "default",
  variant = "primary",
  theme = "Light",
  interactive = true,
  isHovered = false,
  isClicked = false,
  isDisabled = false,
  isLoading = false,
  scale = false,
  onClick,
}: DialogButtonProps) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const resolvedState: DialogButtonState = (() => {
    if (isLoading) return "loader";
    if (isDisabled) return "disabled";
    if (isClicked) return "pressed";
    if (isHovered) return "hover";
    if (interactive) {
      if (pressed) return "pressed";
      if (hovered) return "hover";
    }
    return state;
  })();
  const themeEntry = dialogButtons[theme] ?? dialogButtons["Light"] ?? {};
  const requestedVariantKey = variant === "primary" ? "Primary" : "Secondary";
  const variantEntry =
    themeEntry[requestedVariantKey] ??
    themeEntry["Secondary"] ??
    themeEntry["Primary"] ??
    Object.values(themeEntry)[0];
  const sizeEntry =
    variantEntry?.[String(size)] ??
    variantEntry?.["24"] ??
    variantEntry?.["22"] ??
    (variantEntry ? Object.values(variantEntry)[0] : undefined);
  const stateKey =
    resolvedState === "default"
      ? "Default"
      : resolvedState === "hover"
        ? "Hover"
        : resolvedState === "pressed"
          ? "Pressed"
          : resolvedState === "disabled"
            ? "Disabled"
            : "Loader";

  const current = sizeEntry?.[stateKey] ?? null;
  const fallback = sizeEntry?.["Default"] ?? null;
  const container = current?.container ?? fallback?.container ?? {};
  const text = current?.text ?? fallback?.text ?? {};
  const isLoader = resolvedState === "loader";
  const textColor = (text.color as string | undefined) ?? "#ffffff";
  const loaderColor = pickLoaderColor(container.background as string | undefined, theme);
  const resolvedHeight = (container.height as number | undefined) ?? size;
  const loaderSize: 16 | 20 = resolvedHeight >= 30 ? 20 : 16;
  const textOpacity = text.opacity as number | undefined;

  const containerStyle: React.CSSProperties = {
    height: (container.height as number | undefined) ?? size,
    minWidth: container.minWidth as number | undefined,
    width: scale ? "100%" : (container.width as number | undefined) ?? "fit-content",
    paddingTop: 0,
    paddingRight: (container.paddingRight as number | undefined) ?? 32,
    paddingBottom: 0,
    paddingLeft: (container.paddingLeft as number | undefined) ?? 32,
    background: (container.background as string | undefined) ?? "#444444",
    overflow: (container.overflow as string | undefined) ?? "hidden",
    borderRadius: (container.borderRadius as number | undefined) ?? 1,
    outline: container.outline as string | undefined,
    outlineOffset: container.outlineOffset as number | undefined,
    display: (container.display as string | undefined) ?? "inline-flex",
    flexDirection: container.flexDirection as React.CSSProperties["flexDirection"],
    alignItems:
      (container.alignItems as React.CSSProperties["alignItems"]) ?? "center",
    justifyContent:
      (container.justifyContent as React.CSSProperties["justifyContent"]) ?? "center",
    gap: container.gap as number | undefined,
    boxSizing: "border-box",
    cursor: resolvedState === "disabled" || resolvedState === "loader" ? "not-allowed" : "pointer",
  };

  const textStyle: React.CSSProperties = {
    color: textColor,
    textAlign: text.textAlign as React.CSSProperties["textAlign"],
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    fontSize: (text.fontSize as number | undefined) ?? 11,
    fontFamily: (text.fontFamily as string | undefined) ?? "Arial, Helvetica, sans-serif",
    fontWeight: (text.fontWeight as number | undefined) ?? 700,
    lineHeight: (text.lineHeight as number | undefined) ?? 16,
    letterSpacing: (text.letterSpacing as number | undefined) ?? 0.22,
    opacity: textOpacity,
    width: "100%",
    whiteSpace: "nowrap",
  };

  const stateClass =
    resolvedState === "hover"
      ? "ui-dialog-button--hover"
      : resolvedState === "pressed"
        ? "ui-dialog-button--pressed"
        : resolvedState === "disabled"
          ? "ui-dialog-button--disabled"
          : resolvedState === "loader"
            ? "ui-dialog-button--loader"
            : "";

  return (
    <button
      type="button"
      className={clsx(
        "ui-dialog-button",
        stateClass
      )}
      style={containerStyle}
      disabled={resolvedState === "disabled" || resolvedState === "loader"}
      aria-busy={resolvedState === "loader"}
      onMouseEnter={() => interactive && !isDisabled && !isLoading && setHovered(true)}
      onMouseLeave={() => {
        if (!interactive) return;
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => interactive && !isDisabled && !isLoading && setPressed(true)}
      onMouseUp={() => interactive && !isDisabled && !isLoading && setPressed(false)}
      onClick={onClick}
    >
      {isLoader ? (
        <span className="ui-dialog-button__spinner" aria-hidden>
          <LoaderGlyph size={loaderSize} color={loaderColor} />
        </span>
      ) : (
        <span style={textStyle}>{label}</span>
      )}
    </button>
  );
};
