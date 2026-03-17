import { useState, type CSSProperties } from "react";
import { getComponentSurface } from "../shared/pluginTheme";
import { SvgIcon } from "../shared/SvgIcon";

export type SplitButtonType = "dropDown" | "iconLeft" | "tabs";

export type SplitButtonProps = {
  label?: string;
  state?: "default" | "hover" | "pressed" | "disabled";
  type?: SplitButtonType;
  theme?: string;
  interactive?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const SplitButton = ({
  label = "Button",
  state = "default",
  type = "dropDown",
  theme,
  interactive = true,
  onClick,
}: SplitButtonProps) => {
  const tokens = getComponentSurface(theme);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(false);
  const [pressedIcon, setPressedIcon] = useState(false);

  const isDisabled = state === "disabled";
  const isModern = tokens.theme.includes("Modern");
  const radius = isModern ? 4 : 1;

  const pressedBgByTheme: Record<string, string> = {
    Light: "#CBCBCB",
    "Light Classic": "#7D858C",
    Dark: "#666666",
    "Dark Contrast": "#666666",
    "Modern Light": "#EAEAEA",
    "Modern Dark": "#686868",
  };

  const defaultBg = tokens.bg;
  const hoverBg = tokens.surfaceAlt;
  const pressedBg = pressedBgByTheme[tokens.theme] ?? tokens.surfaceAlt;

  // For tabs, the whole wrapper shares hover/press state
  const isTabsPressed = state === "pressed" || (interactive && pressed && !isDisabled);
  const isTabsHover = state === "hover" || (interactive && hovered && !isDisabled);

  // For dropDown/iconLeft, icon part tracks independently
  const isIconPressed = state === "pressed" || (interactive && pressedIcon && !isDisabled);
  const isIconHover = state === "hover" || (interactive && hoveredIcon && !isDisabled);

  const defaultText = tokens.fg;
  const pressedText =
    tokens.theme === "Light Classic" || tokens.theme === "Modern Dark"
      ? "#FFFFFF"
      : defaultText;

  // Issue 11: icon in iconLeft type uses #F3F3F3 for Modern Dark
  const iconDefaultColor =
    type === "iconLeft" && tokens.theme === "Modern Dark" ? "#F3F3F3" : defaultText;

  const tabsTextColor = isDisabled
    ? tokens.muted
    : isTabsPressed
      ? pressedText
      : defaultText;

  const iconTextColor = isDisabled
    ? tokens.muted
    : isIconPressed
      ? pressedText
      : iconDefaultColor;

  const buttonPartBg =
    type === "tabs"
      ? isTabsPressed
        ? pressedBg
        : isTabsHover
          ? hoverBg
          : defaultBg
      : defaultBg;

  const iconPartBg = isIconPressed ? pressedBg : isIconHover ? hoverBg : defaultBg;

  const commonButtonStyle: CSSProperties = {
    height: 24,
    border: "none",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: isModern ? 12 : 11,
    lineHeight: "16px",
    fontWeight: isModern ? 400 : type === "tabs" ? 400 : 700,
    letterSpacing: isModern ? 0.24 : 0.22,
    cursor: isDisabled ? "not-allowed" : "pointer",
    boxSizing: "border-box",
    whiteSpace: "nowrap",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const iconPartStyle: CSSProperties = {
    ...commonButtonStyle,
    background: iconPartBg,
    color: iconTextColor,
  };

  const iconMouseProps = interactive && !isDisabled
    ? {
        onMouseEnter: () => setHoveredIcon(true),
        onMouseLeave: () => { setHoveredIcon(false); setPressedIcon(false); },
        onMouseDown: () => setPressedIcon(true),
        onMouseUp: () => setPressedIcon(false),
      }
    : {};

  return (
    <div
      onMouseEnter={() => interactive && type === "tabs" && setHovered(true)}
      onMouseLeave={() => {
        if (!interactive) return;
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => interactive && !isDisabled && type === "tabs" && setPressed(true)}
      onMouseUp={() => interactive && !isDisabled && type === "tabs" && setPressed(false)}
      style={{
        display: "inline-flex",
        borderRadius: type === "tabs" ? 31 : radius,
        overflow: "hidden",
        border: `1px solid ${
          // Remove outline on pressed Tabs in Modern themes
          type === "tabs" && isModern && isTabsPressed ? "transparent" : tokens.border
        }`,
        opacity: isDisabled ? 0.6 : 1,
      }}
    >
      {type === "tabs" ? (
        <button
          type="button"
          disabled={isDisabled}
          onClick={onClick}
          style={{
            ...commonButtonStyle,
            background: buttonPartBg,
            color: tabsTextColor,
            minWidth: 48,
            padding: "0 12px",
          }}
        >
          {label}
        </button>
      ) : null}

      {type === "iconLeft" ? (
        <>
          <button
            type="button"
            disabled={isDisabled}
            onClick={onClick}
            aria-label="Icon action"
            {...iconMouseProps}
            style={{
              ...iconPartStyle,
              width: 24,
              minWidth: 24,
              padding: 0,
            }}
          >
            <SvgIcon name="highlight" size={20} color={iconTextColor} monochrome />
          </button>

          <button
            type="button"
            disabled={isDisabled}
            onClick={onClick}
            style={{
              ...commonButtonStyle,
              background: defaultBg,
              color: isDisabled ? tokens.muted : defaultText,
              minWidth: 48,
              padding: "0 12px",
              borderLeft: `1px solid ${tokens.border}`,
            }}
          >
            <span>{label}</span>
          </button>

          {isModern ? (
            <button
              type="button"
              disabled={isDisabled}
              aria-label="Open menu"
              onClick={onClick}
              {...iconMouseProps}
              style={{
                ...iconPartStyle,
                width: 24,
                minWidth: 24,
                padding: 0,
                borderLeft: `1px solid ${tokens.border}`,
              }}
            >
              <SvgIcon
                name="chevron"
                size={8}
                color={iconTextColor}
                monochrome
                style={{
                  transform: isIconPressed ? "rotate(180deg)" : "none",
                  transition: "transform 120ms linear",
                }}
              />
            </button>
          ) : null}
        </>
      ) : null}

      {type === "dropDown" ? (
        <>
          <button
            type="button"
            disabled={isDisabled}
            onClick={onClick}
            style={{
              ...commonButtonStyle,
              background: defaultBg,
              color: isDisabled ? tokens.muted : defaultText,
              minWidth: 96,
              padding: "0 12px",
            }}
          >
            {label}
          </button>

          <button
            type="button"
            disabled={isDisabled}
            aria-label="Open menu"
            onClick={onClick}
            {...iconMouseProps}
            style={{
              ...iconPartStyle,
              width: 24,
              minWidth: 24,
              padding: 0,
              borderLeft: `1px solid ${tokens.border}`,
            }}
          >
            <SvgIcon
              name="chevron"
              size={8}
              color={iconTextColor}
              monochrome
              style={{
                transform: isIconPressed ? "rotate(180deg)" : "none",
                transition: "transform 120ms linear",
              }}
            />
          </button>
        </>
      ) : null}
    </div>
  );
};
