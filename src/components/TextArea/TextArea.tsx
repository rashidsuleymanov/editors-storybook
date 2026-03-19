import { useEffect, useId, useMemo, useState, type CSSProperties } from "react";
import { resolveComponentTheme } from "../shared/pluginTheme";
import { textAreaTokens } from "../../data/text-area";
import "./TextArea.css";

export type TextAreaState = "default" | "disabled" | "scroll" | "no-scroll";

export type TextAreaProps = {
  label?: string;
  caption?: string;
  value?: string;
  theme?: string;
  state?: TextAreaState;
  width?: number;
  height?: number;
  showLabel?: boolean;
  showCaption?: boolean;
  showCopyButton?: boolean;
  onChange?: (next: string) => void;
  onCopy?: (value: string) => void;
};

const SAMPLE_TEXT = `The 10 most undervalued stocks from our Best Companies to Own list as of Feb. 28, 2023, were:
Comcast CMCSA — a leading global media and technology company with businesses in cable, entertainment, and theme parks.
Taiwan Semiconductor Manufacturing TSM — the world's largest dedicated semiconductor foundry serving major chip designers.
Roche Holding RHHBY — a global pioneer in pharmaceuticals and diagnostics focused on oncology and rare diseases.
Walt Disney DIS — a diversified entertainment company spanning film, television, streaming, and theme park experiences.
Equifax EFX — one of the three major credit reporting agencies providing data analytics and risk solutions worldwide.
TransUnion TRU — a global information and insights company helping businesses manage risk and consumers manage credit.
International Flavors & Fragrances IFF — a leading creator of flavors, fragrances, and specialty ingredients.
Zimmer Biomet ZBH — a global medical device company specializing in musculoskeletal healthcare and reconstructive products.
Kenvue KVUE — a consumer health company spun off from Johnson & Johnson managing iconic personal care brands.
Anheuser-Busch InBev BUD — the world's largest brewer with a portfolio of over 500 beer brands sold globally.
Booking Holdings BKNG — the world's leading provider of online travel and related services across 220+ countries.
Stellantis STLA — a multinational automotive manufacturer formed from the merger of PSA Group and Fiat Chrysler.
Medtronic MDT — a global leader in medical devices, therapies, and services for chronic disease management.`;

const CopyGlyph = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path
      d="M4 5H12V7H13V5C13 4.44772 12.5523 4 12 4H4C3.44772 4 3 4.44772 3 5V12C3 12.5523 3.44772 13 4 13H6V12H4V5Z"
      fill={color}
    />
    <path d="M11 6H5V7H11V6Z" fill={color} />
    <path d="M15 11V10H9V11H15Z" fill={color} />
    <path d="M15 12V13H9V12H15Z" fill={color} />
    <path d="M15 15V14H9V15H15Z" fill={color} />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 8C7.44772 8 7 8.44772 7 9V16C7 16.5523 7.44772 17 8 17H16C16.5523 17 17 16.5523 17 16V9C17 8.44772 16.5523 8 16 8H8ZM8 9V16H16V9H8Z"
      fill={color}
    />
    <path d="M6 8H5V9H6V8Z" fill={color} />
    <path d="M5 10H6V11H5V10Z" fill={color} />
  </svg>
);

const CopyGlyphModern = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
    <path
      d="M4 5H12V7H13V5C13 4.44772 12.5523 4 12 4H4C3.44772 4 3 4.44772 3 5V12C3 12.5523 3.44772 13 4 13H6V12H4V5Z"
      fill={color}
    />
    <path d="M11 6H5V7H11V6Z" fill={color} />
    <path d="M15 11V10H9V11H15Z" fill={color} />
    <path d="M15 12V13H9V12H15Z" fill={color} />
    <path d="M15 15V14H9V15H15Z" fill={color} />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 8C7.44772 8 7 8.44772 7 9V16C7 16.5523 7.44772 17 8 17H16C16.5523 17 17 16.5523 17 16V9C17 8.44772 16.5523 8 16 8H8ZM8 9V16H16V9H8Z"
      fill={color}
    />
    <path d="M6 8H5V9H6V8Z" fill={color} />
    <path d="M5 10H6V11H5V10Z" fill={color} />
  </svg>
);

const copyToClipboard = (value: string) => navigator.clipboard.writeText(value);

export const TextArea = ({
  label = "Title",
  caption = "Caption",
  value = SAMPLE_TEXT,
  theme,
  state = "default",
  width = 236,
  height = 188,
  showLabel = true,
  showCaption = true,
  showCopyButton = true,
  onChange,
  onCopy,
}: TextAreaProps) => {
  const textareaId = useId();
  const captionId = useId();
  const [copied, setCopied] = useState(false);
  const [copyHovered, setCopyHovered] = useState(false);
  const resolvedTheme = resolveComponentTheme(theme);
  const tokens = textAreaTokens[resolvedTheme];

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 900);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const isDisabled = state === "disabled";
  const forceScroll = state === "scroll";
  const forceNoScroll = state === "no-scroll";
  const borderColor = tokens.border;
  const copyButtonSize = tokens.copyIconStyle === "modern" ? 24 : 20;
  const copyHoverBackground =
  resolvedTheme === "Light"
    ? "#E0E0E0"
    : resolvedTheme === "Light Classic"
      ? "#D8DADC"
      : resolvedTheme === "Dark"
        ? "#555555"
        : resolvedTheme === "Dark Contrast"
          ? "#424242"
          : resolvedTheme === "Modern Light"
            ? "#F9F9F9"
            : "#585858";

  const cssVars = useMemo(
    () =>
      ({
        "--ui-textarea-scroll-track": tokens.scrollTrack,
        "--ui-textarea-scroll-thumb": tokens.scrollThumb,
      }) as CSSProperties,
    [tokens.scrollTrack, tokens.scrollThumb]
  );

  return (
    <div style={{ width, display: "grid", gap: showCaption ? 2 : 4 }}>
      {showLabel || showCopyButton ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 20 }}>
          {showLabel ? (
            <label
              htmlFor={textareaId}
              style={{
                color: tokens.labelColor,
                fontWeight: tokens.labelWeight,
                fontSize: tokens.labelTypography.fontSize,
                lineHeight: `${tokens.labelTypography.lineHeight}px`,
                letterSpacing: tokens.labelTypography.letterSpacing,
              }}
            >
              {label}
            </label>
          ) : (
            <span />
          )}
          {showCopyButton ? (
            <button
              type="button"
              onClick={async () => {
                await copyToClipboard(value);
                onCopy?.(value);
                setCopied(true);
              }}
              onMouseEnter={() => !isDisabled && setCopyHovered(true)}
              onMouseLeave={() => setCopyHovered(false)}
              disabled={isDisabled}
              aria-label="Copy text"
              style={{
                width: copyButtonSize,
                height: copyButtonSize,
                padding: 0,
                border: "none",
                background: copyHovered && !isDisabled ? copyHoverBackground : "transparent",
                cursor: isDisabled ? "default" : "pointer",
                opacity: isDisabled ? tokens.disabledOpacity : 1,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {tokens.copyIconStyle === "modern" ? (
                <CopyGlyphModern color={copied ? tokens.hoverBorder : tokens.copyIconColor} />
              ) : (
                <CopyGlyph color={copied ? tokens.hoverBorder : tokens.copyIconColor} />
              )}
            </button>
          ) : null}
        </div>
      ) : null}

      <div
        style={{
          width,
          height,
          borderRadius: tokens.radius,
          border: `1px solid ${borderColor}`,
          background: isDisabled ? tokens.disabledBackground : tokens.background,
          opacity: isDisabled ? tokens.disabledOpacity : 1,
          boxSizing: "border-box",
          padding: "5px 5px 5px 8px",
        }}
      >
        <textarea
          id={textareaId}
          className="ui-textarea__input"
          disabled={isDisabled}
          aria-describedby={showCaption ? captionId : undefined}
          value={value}
          wrap={forceScroll ? "off" : "soft"}
          onChange={(event) => onChange?.(event.target.value)}
          style={{
            ...cssVars,
            width: "100%",
            height: "100%",
            border: "none",
            outline: "none",
            resize: "none",
            background: "transparent",
            color: isDisabled ? tokens.disabledTextColor : tokens.textColor,
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: tokens.textTypography.fontSize,
            lineHeight: `${tokens.textTypography.lineHeight}px`,
            letterSpacing: tokens.textTypography.letterSpacing,
            paddingTop: 0,
            paddingLeft: 0,
            paddingRight: forceNoScroll || isDisabled ? 0 : 3,
            paddingBottom: forceNoScroll || isDisabled ? 0 : 4,
            margin: 0,
            overflow: isDisabled || forceNoScroll ? "hidden" : forceScroll ? "scroll" : "auto",
            whiteSpace: forceScroll ? "pre" : "pre-wrap",
            wordBreak: "break-word",
            boxSizing: "border-box",
            pointerEvents: isDisabled ? "none" : undefined,
            scrollbarGutter: forceScroll ? "stable" : "auto",
            scrollbarColor: `${tokens.scrollThumb} ${tokens.scrollTrack}`,
            scrollbarWidth: "thin",
          }}
        />
      </div>

      {showCaption ? (
        <span
          id={captionId}
          style={{
            color: tokens.captionColor,
            fontSize: tokens.captionTypography.fontSize,
            lineHeight: `${tokens.captionTypography.lineHeight}px`,
            letterSpacing: tokens.captionTypography.letterSpacing,
          }}
        >
          {caption}
        </span>
      ) : null}
    </div>
  );
};
