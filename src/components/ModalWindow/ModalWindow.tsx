import { useEffect, useId, useRef, useState } from "react";
import type { PluginTheme } from "../shared/pluginTheme";
import { resolveComponentTheme } from "../shared/pluginTheme";
import { Header } from "../Header/Header";

export type ModalWindowSize = "S" | "M" | "L";
export type ModalWindowFooter = "auto" | "single" | "double";

export type ModalWindowProps = {
  title?: string;
  contentLabel?: string;
  notificationText?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  size?: ModalWindowSize;
  notification?: boolean;
  footerMode?: ModalWindowFooter;
  theme?: string;
  onClose?: () => void;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
};

type ModalThemeTokens = {
  frameBg: string;
  frameBorder: string;
  contentBg: string;
  contentText: string;
  notificationText: string;
  divider: string;
};

type ModalButtonTokens = {
  bg: string;
  text: string;
  border?: string;
  hoverBg?: string;
  pressedBg?: string;
  hoverText?: string;
  pressedText?: string;
  hoverBorder?: string;
  pressedBorder?: string;
  radius: number;
  size: 22 | 24;
  minWidth?: number;
  px: number;
  letterSpacing: number;
  fontSize: number;
};

const modalTokensByTheme: Record<PluginTheme, ModalThemeTokens> = {
  Light: {
    frameBg: "#FFFFFF",
    frameBorder: "#E0E0E0",
    contentBg: "#FFFFFF",
    contentText: "rgba(0, 0, 0, 0.60)",
    notificationText: "rgba(0, 0, 0, 0.80)",
    divider: "#E0E0E0",
  },
  "Light Classic": {
    frameBg: "#FFFFFF",
    frameBorder: "#D8DADC",
    contentBg: "#FFFFFF",
    contentText: "#A5A5A5",
    notificationText: "#444444",
    divider: "#D8DADC",
  },
  Dark: {
    frameBg: "#333333",
    frameBorder: "#555555",
    contentBg: "#333333",
    contentText: "rgba(255, 255, 255, 0.60)",
    notificationText: "rgba(255, 255, 255, 0.80)",
    divider: "#555555",
  },
  "Dark Contrast": {
    frameBg: "#1E1E1E",
    frameBorder: "#424242",
    contentBg: "#1E1E1E",
    contentText: "#B8B8B8",
    notificationText: "#E8E8E8",
    divider: "#424242",
  },
  "Modern Light": {
    frameBg: "#FFFFFF",
    frameBorder: "#EAEAEA",
    contentBg: "#FFFFFF",
    contentText: "#383838",
    notificationText: "#383838",
    divider: "#EAEAEA",
  },
  "Modern Dark": {
    frameBg: "#404040",
    frameBorder: "#585858",
    contentBg: "#404040",
    contentText: "#F3F3F3",
    notificationText: "#F3F3F3",
    divider: "#585858",
  },
};

const primaryButtonByTheme: Record<PluginTheme, ModalButtonTokens> = {
  Light: {
    bg: "#444444",
    text: "#FFFFFF",
    hoverBg: "#333333",
    pressedBg: "#1F1F1F",
    radius: 1,
    size: 22,
    px: 32,
    letterSpacing: 0.22,
    fontSize: 11,
  },
  "Light Classic": {
    bg: "#7D858C",
    text: "#FFFFFF",
    hoverBg: "#666D73",
    pressedBg: "#666D73",
    radius: 1,
    size: 22,
    px: 32,
    letterSpacing: 0.22,
    fontSize: 11,
  },
  Dark: {
    bg: "#DDDDDD",
    text: "#333333",
    hoverBg: "#FCFCFC",
    pressedBg: "#FCFCFC",
    radius: 1,
    size: 22,
    px: 32,
    letterSpacing: 0.22,
    fontSize: 11,
  },
  "Dark Contrast": {
    bg: "#E6E6E6",
    text: "#121212",
    hoverBg: "#A6A6A6",
    pressedBg: "#A6A6A6",
    radius: 1,
    size: 22,
    px: 32,
    letterSpacing: 0.22,
    fontSize: 11,
  },
  "Modern Light": {
    bg: "#4473CA",
    text: "#FFFFFF",
    hoverBg: "#2A5BB9",
    pressedBg: "#1D4FAF",
    pressedBorder: "#2A5BB9",
    radius: 4,
    size: 24,
    minWidth: 48,
    px: 12,
    letterSpacing: 0.24,
    fontSize: 12,
  },
  "Modern Dark": {
    bg: "#4A7BE0",
    text: "#FFFFFF",
    hoverBg: "#366CDA",
    pressedBg: "#2D66CC",
    pressedBorder: "#4A7BE0",
    radius: 4,
    size: 24,
    minWidth: 48,
    px: 12,
    letterSpacing: 0.24,
    fontSize: 12,
  },
};

const secondaryButtonByTheme: Record<PluginTheme, ModalButtonTokens> = {
  Light: {
    bg: "#FFFFFF",
    text: "rgba(0, 0, 0, 0.80)",
    border: "#C0C0C0",
    hoverBg: "#E0E0E0",
    pressedBg: "#CBCBCB",
    radius: 1,
    size: 22,
    px: 32,
    letterSpacing: 0.22,
    fontSize: 11,
  },
  "Light Classic": {
    bg: "#FFFFFF",
    text: "#444444",
    border: "#CFCFCF",
    hoverBg: "#D8DADC",
    pressedBg: "#7D858C",
    pressedText: "#FFFFFF",
    radius: 1,
    size: 22,
    px: 32,
    letterSpacing: 0.22,
    fontSize: 11,
  },
  Dark: {
    bg: "#333333",
    text: "rgba(255, 255, 255, 0.80)",
    border: "#666666",
    hoverBg: "#555555",
    pressedBg: "#606060",
    radius: 1,
    size: 22,
    px: 32,
    letterSpacing: 0.22,
    fontSize: 11,
  },
  "Dark Contrast": {
    bg: "#1E1E1E",
    text: "#E8E8E8",
    border: "#696969",
    hoverBg: "#424242",
    pressedBg: "#666666",
    radius: 1,
    size: 22,
    px: 32,
    letterSpacing: 0.22,
    fontSize: 11,
  },
  "Modern Light": {
    bg: "#FFFFFF",
    text: "#383838",
    border: "#E1E1E1",
    hoverBg: "#F9F9F9",
    pressedBg: "#EAEAEA",
    pressedBorder: "#2A5BB9",
    radius: 4,
    size: 24,
    minWidth: 48,
    px: 12,
    letterSpacing: 0.24,
    fontSize: 12,
  },
  "Modern Dark": {
    bg: "#404040",
    text: "#F3F3F3",
    border: "#686868",
    hoverBg: "#585858",
    pressedBg: "#686868",
    pressedBorder: "#4A7BE0",
    radius: 4,
    size: 24,
    minWidth: 48,
    px: 12,
    letterSpacing: 0.24,
    fontSize: 12,
  },
};

const sizeToWidth: Record<ModalWindowSize, number> = {
  S: 350,
  M: 610,
  L: 1380,
};

const sizeToContentHeight: Record<ModalWindowSize, number> = {
  S: 206,
  M: 206,
  L: 423,
};

const frameRadiusByTheme: Record<PluginTheme, number> = {
  Light: 2,
  "Light Classic": 2,
  Dark: 2,
  "Dark Contrast": 2,
  "Modern Light": 4,
  "Modern Dark": 4,
};

const WarningGlyph = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden>
    <path
      d="M20.5303 0.882195C21.1795 -0.256091 22.8205 -0.256088 23.4696 0.882198L43.765 36.47C44.4082 37.5978 43.5937 38.9999 42.2953 38.9999H1.70464C0.406249 38.9999 -0.408223 37.5978 0.234989 36.47L20.5303 0.882195Z"
      fill="#F2BE08"
    />
    <path
      d="M22.0007 29.9739C23.39 29.9741 24.5161 31.1002 24.5163 32.4895C24.5163 33.879 23.3901 35.0059 22.0007 35.0061C20.6111 35.0061 19.4841 33.8791 19.4841 32.4895C19.4843 31.1001 20.6112 29.9739 22.0007 29.9739ZM21.9997 9.0061C23.8524 9.0061 25.355 10.5079 25.3552 12.3606C25.3552 13.225 24.3402 17.6282 23.6775 21.5872C23.089 25.1023 22.8408 28.2677 22.8386 28.2961H21.1618C21.1598 28.2695 20.9116 25.1033 20.323 21.5872C19.6602 17.6282 18.6452 13.225 18.6452 12.3606C18.6454 10.508 20.1472 9.00628 21.9997 9.0061Z"
      fill="#FFFFFF"
    />
  </svg>
);

const ModalButton = ({
  label,
  tokens,
  onClick,
}: {
  label: string;
  tokens: ModalButtonTokens;
  onClick?: () => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const [pressedByMouse, setPressedByMouse] = useState(false);
  const [pressedFlash, setPressedFlash] = useState(false);
  const flashTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (flashTimer.current) window.clearTimeout(flashTimer.current);
    },
    [],
  );

  const isPressed = pressedByMouse || pressedFlash;
  const isHovered = hovered && !isPressed;
  const isDisabled = typeof onClick !== "function";

  const background = isPressed
    ? tokens.pressedBg ?? tokens.hoverBg ?? tokens.bg
    : isHovered
      ? tokens.hoverBg ?? tokens.bg
      : tokens.bg;

  const textColor = isPressed
    ? tokens.pressedText ?? tokens.text
    : isHovered
      ? tokens.hoverText ?? tokens.text
      : tokens.text;

  const borderColor = isPressed
    ? tokens.pressedBorder ?? tokens.hoverBorder ?? tokens.border
    : isHovered
      ? tokens.hoverBorder ?? tokens.border
      : tokens.border;

  return (
    <button
      type="button"
	      disabled={isDisabled}
	      aria-disabled={isDisabled}
	      onClick={() => {
	        if (isDisabled) return;
	        onClick?.();
	        setPressedFlash(true);
	        if (flashTimer.current) window.clearTimeout(flashTimer.current);
	        flashTimer.current = window.setTimeout(() => setPressedFlash(false), 160);
	      }}
	      onMouseEnter={() => !isDisabled && setHovered(true)}
	      onMouseLeave={() => {
	        setHovered(false);
	        setPressedByMouse(false);
	      }}
	      onMouseDown={() => !isDisabled && setPressedByMouse(true)}
	      onMouseUp={() => setPressedByMouse(false)}
	      style={{
	        height: tokens.size,
	        minWidth: tokens.minWidth,
	        padding: `0 ${tokens.px}px`,
	        borderRadius: tokens.radius,
        border: borderColor ? `1px solid ${borderColor}` : "1px solid transparent",
        background,
        color: textColor,
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: tokens.fontSize,
	        fontWeight: 700,
	        lineHeight: "16px",
	        letterSpacing: tokens.letterSpacing,
	        boxSizing: "border-box",
	        cursor: isDisabled ? "default" : "pointer",
	        display: "inline-flex",
	        alignItems: "center",
	        justifyContent: "center",
	        whiteSpace: "nowrap",
	        opacity: isDisabled ? 0.5 : 1,
	        transition: "background-color 120ms ease, color 120ms ease, border-color 120ms ease",
	      }}
	    >
      {label}
    </button>
  );
};

export const ModalWindow = ({
  title = "Title",
  contentLabel = "Content",
  notificationText = "Text\nText",
  primaryLabel = "Button",
  secondaryLabel = "Button",
  size = "M",
  notification = false,
  footerMode = "auto",
  theme,
  onClose,
  onPrimaryClick,
  onSecondaryClick,
}: ModalWindowProps) => {
  const titleId = useId();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const resolvedTheme = resolveComponentTheme(theme);
  const tokens = modalTokensByTheme[resolvedTheme];
  const isModern = resolvedTheme === "Modern Light" || resolvedTheme === "Modern Dark";
  const resolvedFooter = footerMode === "auto" ? (size === "L" ? "double" : "single") : footerMode;
  const modalWidth = sizeToWidth[size];
  const contentHeight = notification ? 76 : sizeToContentHeight[size];
  const primaryButton = primaryButtonByTheme[resolvedTheme];
  const secondaryButton = secondaryButtonByTheme[resolvedTheme];
  const footerPaddingY = isModern ? 12 : 16;

  useEffect(() => {
    const root = modalRef.current;
    if (!root) return;

    const focusable = Array.from(
      root.querySelectorAll<HTMLButtonElement>('button:not([disabled])')
    );

    if (focusable.length === 0) return;
    if (root.contains(document.activeElement)) return;

    focusable[focusable.length - 1].focus();
  }, []);

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      tabIndex={-1}
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose?.();
        if (event.key !== "Tab") return;

        const root = modalRef.current;
        if (!root) return;

        const focusable = Array.from(
          root.querySelectorAll<HTMLButtonElement>('button:not([disabled])')
        );

        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;

        if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        }

        if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }}
      style={{
        width: modalWidth,
        background: tokens.frameBg,
        borderRadius: frameRadiusByTheme[resolvedTheme],
        border: `1px solid ${tokens.frameBorder}`,
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <div id={titleId}>
        <Header title={title} variant="window" width={modalWidth} theme={resolvedTheme} onClose={onClose} />
      </div>

      <div
        style={{
          background: tokens.contentBg,
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          boxSizing: "border-box",
        }}
      >
        {notification ? (
          <div
            style={{
              minHeight: 44,
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <WarningGlyph />
            <div
              style={{
                color: tokens.notificationText,
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: isModern ? 12 : 11,
                fontWeight: 400,
                lineHeight: "16px",
                letterSpacing: isModern ? 0.24 : 0.22,
                whiteSpace: "pre-line",
              }}
            >
              {notificationText}
            </div>
          </div>
        ) : (
          <div
            style={{
              minHeight: contentHeight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: tokens.contentText,
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: isModern ? 12 : 11,
              fontWeight: 400,
              lineHeight: "16px",
              letterSpacing: isModern ? 0.24 : 0.22,
              textAlign: "center",
            }}
          >
            {contentLabel}
          </div>
        )}
      </div>

      <div style={{ background: tokens.contentBg }}>
        <div style={{ height: 1, background: tokens.divider }} />
        <div
          style={{
            minHeight: primaryButton.size + footerPaddingY * 2,
            padding: `${footerPaddingY}px 16px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            boxSizing: "border-box",
            flexWrap: "wrap",
          }}
        >
          <ModalButton label={primaryLabel} tokens={primaryButton} onClick={onPrimaryClick} />
          {resolvedFooter === "double" ? (
            <ModalButton label={secondaryLabel} tokens={secondaryButton} onClick={onSecondaryClick} />
          ) : null}
        </div>
      </div>
    </div>
  );
};
