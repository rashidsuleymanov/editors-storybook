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

  const isDisabled = state === "disabled";
  const isPressed = state === "pressed" || (interactive && pressed && !isDisabled);
  const isHover = state === "hover" || (interactive && hovered && !isDisabled);

  const isModern = tokens.theme.includes("Modern");
  const radius = isModern ? 4 : 1;

  const pressedBgByTheme: Record<string, string> = {
    Light: "#CBCBCB",
    "Light Classic": "#7D858C",
    Dark: "#666666",
    "Dark Contrast": "#666666",
    "Modern Light": "#DCE7FA",
    "Modern Dark": "#375478",
  };

  const defaultBg = tokens.bg;
  const hoverBg = tokens.surfaceAlt;
  const pressedBg = pressedBgByTheme[tokens.theme] ?? tokens.surfaceAlt;
  const baseBg = isPressed ? pressedBg : isHover ? hoverBg : defaultBg;

  const defaultText = tokens.fg;
  const pressedText =
    tokens.theme === "Light Classic" || tokens.theme === "Modern Dark"
      ? "#FFFFFF"
      : defaultText;
  const textColor = isDisabled ? tokens.muted : isPressed ? pressedText : defaultText;

  const commonButtonStyle: CSSProperties = {
    height: 24,
    border: "none",
    background: baseBg,
    color: textColor,
    fontSize: tokens.theme.includes("Modern") ? 12 : 11,
    lineHeight: "16px",
    fontWeight: type === "tabs" ? 400 : 700,
    letterSpacing: tokens.theme.includes("Modern") ? 0.24 : 0.22,
    cursor: isDisabled ? "not-allowed" : "pointer",
  };

  return (
    <div
      onMouseEnter={() => interactive && setHovered(true)}
      onMouseLeave={() => {
        if (!interactive) return;
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => interactive && !isDisabled && setPressed(true)}
      onMouseUp={() => interactive && !isDisabled && setPressed(false)}
      style={{
        display: "inline-flex",
        borderRadius: type === "tabs" ? 31 : radius,
        overflow: "hidden",
        border: `1px solid ${tokens.border}`,
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
            style={{
              ...commonButtonStyle,
              minWidth: 48,
              padding: isModern ? "0 8px 0 2px" : "0 12px",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <SvgIcon name="copy" size={isModern ? 20 : 16} color={textColor} monochrome />
            <span>{label}</span>
          </button>
          {isModern ? (
            <button
              type="button"
              disabled={isDisabled}
              aria-label="Open menu"
              onClick={onClick}
              style={{
                width: 24,
                height: 24,
                border: "none",
                borderLeft: `1px solid ${tokens.border}`,
                background: baseBg,
                color: textColor,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: isDisabled ? "not-allowed" : "pointer",
              }}
            >
              <SvgIcon
                name="chevron"
                size={8}
                color={textColor}
                monochrome
                style={{ transform: isPressed ? "rotate(180deg)" : "none", transition: "transform 120ms linear" }}
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
            style={{
              width: 24,
              height: 24,
              border: "none",
              borderLeft: `1px solid ${tokens.border}`,
              background: baseBg,
              color: textColor,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: isDisabled ? "not-allowed" : "pointer",
            }}
          >
            <SvgIcon
              name="chevron"
              size={8}
              color={textColor}
              monochrome
              style={{ transform: isPressed ? "rotate(180deg)" : "none", transition: "transform 120ms linear" }}
            />
          </button>
        </>
      ) : null}
    </div>
  );
};
