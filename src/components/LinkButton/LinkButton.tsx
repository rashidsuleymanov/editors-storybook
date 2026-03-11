import { useState, type CSSProperties, type MouseEventHandler } from "react";
import linkButtonsData from "../../data/link-buttons";

export type LinkButtonState = "default" | "hover";

type LinkButtonToken = {
  container?: CSSProperties;
  text?: CSSProperties;
  underlineColor?: string;
};

type LinkButtonData = Record<string, Record<string, LinkButtonToken>>;

const STATE_TO_KEY: Record<LinkButtonState, string> = {
  default: "Default",
  hover: "Hover",
};

const FALLBACK_THEME = "Light";
const linkButtons = linkButtonsData as unknown as LinkButtonData;

const resolveTheme = (theme?: string) => {
  if (!theme) return FALLBACK_THEME;
  return theme in linkButtons ? theme : FALLBACK_THEME;
};

export type LinkButtonProps = {
  label?: string;
  state?: LinkButtonState;
  theme?: string;
  interactive?: boolean;
  isHovered?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const LinkButton = ({
  label = "Show advanced settings",
  state = "default",
  theme = FALLBACK_THEME,
  interactive = false,
  isHovered = false,
  onClick,
}: LinkButtonProps) => {
  const [hovered, setHovered] = useState(false);

  const resolvedState: LinkButtonState = (() => {
    if (isHovered) return "hover";
    if (interactive && hovered) return "hover";
    return state;
  })();

  const resolvedTheme = resolveTheme(theme);
  const themeTokens = linkButtons[resolvedTheme];
  const token =
    themeTokens[STATE_TO_KEY[resolvedState]] ??
    themeTokens.Default ??
    ({} as LinkButtonToken);

  const underlineColor =
    token.underlineColor ?? (token.text?.color as string) ?? "rgba(0, 0, 0, 0.8)";

  const tokenLineHeight = token.text?.lineHeight;
  const normalizedLineHeight =
    typeof tokenLineHeight === "number" ? `${tokenLineHeight}px` : tokenLineHeight;

  const textStyle: CSSProperties = {
    ...(token.text ?? {}),
    display: "inline",
    justifyContent: "initial",
    alignItems: "initial",
    flexDirection: "row",
    userSelect: "none",
    whiteSpace: "nowrap",
    margin: 0,
    padding: 0,
    lineHeight: normalizedLineHeight,
    fontFamily: (token.text?.fontFamily as string | undefined) ?? "Arial, Helvetica, sans-serif",
    textDecorationLine: "underline",
    textDecorationStyle: "dotted",
    textDecorationColor: underlineColor,
    textUnderlineOffset: "2px",
    textDecorationThickness: "1px",
  };

  const containerStyle: CSSProperties = {
    ...(token.container ?? {}),
    display: "inline-block",
    alignSelf: "flex-start",
    width: "auto",
    minHeight: 0,
    cursor: onClick ? "pointer" : "default",
    lineHeight: "normal",
    verticalAlign: "top",
    padding: 0,
    border: "none",
    background: "transparent",
  };

  return (
    <button
      type="button"
      className="ui-link-button"
      style={containerStyle}
      disabled={!onClick}
      aria-disabled={!onClick}
      onMouseEnter={() => interactive && setHovered(true)}
      onMouseLeave={() => interactive && setHovered(false)}
      onClick={onClick}
    >
      <span style={textStyle}>{label}</span>
    </button>
  );
};
