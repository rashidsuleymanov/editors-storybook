import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { resolveComponentTheme } from "../shared/pluginTheme";
import { textAreaTokens } from "../../data/text-area";
import "./TextArea.css";

export type TextAreaState = "default" | "hover" | "disabled" | "scroll" | "no-scroll";

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
  interactive?: boolean;
  isHovered?: boolean;
  onChange?: (next: string) => void;
  onCopy?: (value: string) => void;
};

const SAMPLE_TEXT = `The 10 most undervalued stocks from our Best Companies to Own list as of Feb. 28, 2023, were:
Comcast CMCSA
Taiwan Semiconductor Manufacturing TSM
Roche Holding RHHBY
Walt Disney DIS
Equifax EFX
TransUnion TRU
International Flavors & Fragrances`;

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
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M8.5 13.4999L6.50001 13.4999C5.94772 13.4999 5.5 13.0522 5.5 12.4999V6.50391C5.5 5.95162 5.94772 5.50391 6.5 5.50391H12.5C13.0523 5.50391 13.5 5.95162 13.5 6.50391V8.49988M10.5 11.5039V17.4999C10.5 18.0522 10.9477 18.4999 11.5 18.4999H17.5C18.0523 18.4999 18.5 18.0522 18.5 17.4999V11.5039C18.5 10.9516 18.0523 10.5039 17.5 10.5039H11.5C10.9477 10.5039 10.5 10.9516 10.5 11.5039Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const copyToClipboard = async (value: string) => {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  if (typeof document === "undefined") return;
  const temp = document.createElement("textarea");
  temp.value = value;
  temp.setAttribute("readonly", "");
  temp.style.position = "absolute";
  temp.style.left = "-9999px";
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy");
  document.body.removeChild(temp);
};

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
  interactive = true,
  isHovered = false,
  onChange,
  onCopy,
}: TextAreaProps) => {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const resolvedTheme = resolveComponentTheme(theme);
  const tokens = textAreaTokens[resolvedTheme];

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 900);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const isDisabled = state === "disabled";
  const forceScroll = state === "scroll";
  const forceNoScroll = state === "no-scroll";
  const isHover = state === "hover" || isHovered || (interactive && hovered);
  const borderColor = isHover && !isDisabled ? tokens.hoverBorder : tokens.border;
  const copyButtonSize = tokens.copyIconStyle === "modern" ? 24 : 20;

  const cssVars = useMemo(
    () =>
      ({
        "--ui-textarea-scroll-track": tokens.scrollTrack,
        "--ui-textarea-scroll-border": tokens.scrollBorder,
        "--ui-textarea-scroll-thumb": tokens.scrollThumb,
      }) as CSSProperties,
    [tokens.scrollTrack, tokens.scrollBorder, tokens.scrollThumb]
  );

  return (
    <div style={{ width, display: "grid", gap: showCaption ? 2 : 4 }}>
      {showLabel || showCopyButton ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 20 }}>
          {showLabel ? (
            <span
              style={{
                color: tokens.labelColor,
                fontWeight: tokens.labelWeight,
                fontSize: tokens.labelTypography.fontSize,
                lineHeight: `${tokens.labelTypography.lineHeight}px`,
                letterSpacing: tokens.labelTypography.letterSpacing,
              }}
            >
              {label}
            </span>
          ) : (
            <span />
          )}
          {showCopyButton ? (
            <button
              type="button"
              onClick={async () => {
                await copyToClipboard(localValue);
                onCopy?.(localValue);
                setCopied(true);
              }}
              disabled={isDisabled}
              aria-label="Copy text"
              style={{
                width: copyButtonSize,
                height: copyButtonSize,
                padding: 0,
                border: "none",
                background: "transparent",
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
          className="ui-textarea__input"
          disabled={isDisabled}
          value={localValue}
          wrap={forceScroll ? "off" : "soft"}
          onChange={(event) => {
            setLocalValue(event.target.value);
            onChange?.(event.target.value);
          }}
          onMouseEnter={() => interactive && setHovered(true)}
          onMouseLeave={() => interactive && setHovered(false)}
          style={{
            ...cssVars,
            width: "100%",
            height: "100%",
            border: "none",
            outline: "none",
            resize: "none",
            background: "transparent",
            color: isDisabled ? tokens.disabledTextColor : tokens.textColor,
            fontFamily: "Arial",
            fontSize: tokens.textTypography.fontSize,
            lineHeight: `${tokens.textTypography.lineHeight}px`,
            letterSpacing: tokens.textTypography.letterSpacing,
            padding: 0,
            paddingInlineEnd: forceNoScroll ? 0 : 8,
            paddingBottom: forceNoScroll ? 0 : 4,
            margin: 0,
            overflow: forceNoScroll ? "hidden" : forceScroll ? "scroll" : "auto",
            whiteSpace: forceScroll ? "pre" : "pre-wrap",
            wordBreak: "break-word",
            boxSizing: "border-box",
            scrollbarGutter: forceNoScroll ? "auto" : "stable both-edges",
            scrollbarColor: `${tokens.scrollThumb} ${tokens.scrollTrack}`,
            scrollbarWidth: "thin",
          }}
        />
      </div>

      {showCaption ? (
        <span
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
