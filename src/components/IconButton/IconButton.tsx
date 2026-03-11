import { useState, type CSSProperties } from "react";
import iconButtonsData from "../../data/icon-buttons";
import { SvgIcon } from "../shared/SvgIcon";

export type IconButtonType = "outline" | "solid" | "rightExpander";
export type IconButtonState = "default" | "hover" | "pressed";

type IconButtonToken = {
  container?: CSSProperties;
  iconColor?: string;
  direction?: "up" | "down";
};

type IconButtonData = Record<string, Record<string, Record<string, IconButtonToken>>>;

const TYPE_TO_KEY: Record<IconButtonType, string> = {
  outline: "Outline",
  solid: "Solid",
  rightExpander: "RightExpander",
};

const STATE_TO_KEY: Record<IconButtonState, string> = {
  default: "Default",
  hover: "Hover",
  pressed: "Pressed",
};

const FALLBACK_THEME = "Light";
const iconButtons = iconButtonsData as unknown as IconButtonData;

const resolveTheme = (theme?: string) => {
  if (!theme) return FALLBACK_THEME;
  return theme in iconButtons ? theme : FALLBACK_THEME;
};

export type PluginIconButtonProps = {
  type?: IconButtonType;
  state?: IconButtonState;
  theme?: string;
  interactive?: boolean;
  isHovered?: boolean;
  isClicked?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const PluginIconButton = ({
  type = "outline",
  state = "default",
  theme = FALLBACK_THEME,
  interactive = true,
  isHovered = false,
  isClicked = false,
  onClick,
}: PluginIconButtonProps) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const resolvedState: IconButtonState = (() => {
    if (isClicked) return "pressed";
    if (isHovered) return "hover";
    if (interactive) {
      if (pressed) return "pressed";
      if (hovered) return "hover";
    }
    return state;
  })();

  const resolvedTheme = resolveTheme(theme);
  const themeTokens = iconButtons[resolvedTheme];
  const typeTokens = themeTokens[TYPE_TO_KEY[type]] ?? themeTokens.Outline;
  const token =
    typeTokens?.[STATE_TO_KEY[resolvedState]] ??
    typeTokens?.Default ??
    ({} as IconButtonToken);

  const buttonStyle: CSSProperties = {
    ...(token.container ?? {}),
    boxSizing: "border-box",
    border: "none",
    background: (token.container?.background as CSSProperties["background"]) ?? "transparent",
    cursor: onClick ? "pointer" : "default",
  };

  const iconColor = token.iconColor ?? "rgba(0, 0, 0, 0.8)";
  const direction =
    resolvedState === "pressed"
      ? "up"
      : (token.direction ?? "down");

  const stateClass =
    resolvedState === "hover"
      ? "ui-icon-button--hover"
      : resolvedState === "pressed"
        ? "ui-icon-button--pressed"
        : "";

  return (
    <button
      type="button"
      className={`ui-icon-button ${stateClass}`.trim()}
      style={buttonStyle}
      onMouseEnter={() => interactive && setHovered(true)}
      onMouseLeave={() => {
        if (!interactive) return;
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => interactive && setPressed(true)}
      onMouseUp={() => interactive && setPressed(false)}
      onClick={onClick}
      aria-label="Icon button"
      aria-disabled={!onClick}
    >
      {type === "rightExpander" ? (
        <SvgIcon
          name="chevron"
          size={6}
          color={iconColor}
          monochrome
          style={{
            transform: direction === "up" ? "rotate(180deg)" : "none",
            transition: "transform 120ms linear",
          }}
        />
      ) : (
        <SvgIcon name="copy" size={14} color={iconColor} monochrome />
      )}
    </button>
  );
};
