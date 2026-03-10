import { useState } from "react";
import { getComponentSurface } from "../shared/pluginTheme";

export type PreviewDirection = "back" | "next";

export type PreviewControlProps = {
  direction?: PreviewDirection;
  theme?: string;
  interactive?: boolean;
  isHovered?: boolean;
  isClicked?: boolean;
  isDisabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const PREVIEW_THEME_STYLE: Record<string, { bg: string; fg: string; shadow: string }> = {
  Light: {
    bg: "rgba(0, 0, 0, 0.80)",
    fg: "#FFFFFF",
    shadow: "0px 4px 10px rgba(0, 0, 0, 0.10)",
  },
  "Light Classic": {
    bg: "#444444",
    fg: "#FFFFFF",
    shadow: "0px 4px 10px rgba(0, 0, 0, 0.10)",
  },
  Dark: {
    bg: "rgba(255, 255, 255, 0.80)",
    fg: "#444444",
    shadow: "0px 4px 10px rgba(0, 0, 0, 0.40)",
  },
  "Dark Contrast": {
    bg: "#E8E8E8",
    fg: "#2A2A2A",
    shadow: "0px 4px 10px rgba(0, 0, 0, 0.40)",
  },
  "Modern Light": {
    bg: "#383838",
    fg: "#FFFFFF",
    shadow: "0px 4px 10px rgba(0, 0, 0, 0.10)",
  },
  "Modern Dark": {
    bg: "#EAEAEA",
    fg: "#222222",
    shadow: "0px 4px 10px rgba(0, 0, 0, 0.10)",
  },
};

export const PreviewControl = ({
  direction = "back",
  theme,
  interactive = true,
  isHovered = false,
  isClicked = false,
  isDisabled = false,
  onClick,
}: PreviewControlProps) => {
  const tokens = getComponentSurface(theme);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const resolvedTheme = PREVIEW_THEME_STYLE[tokens.theme] ?? PREVIEW_THEME_STYLE.Light;
  const resolvedPressed = !isDisabled && (isClicked || (interactive && pressed));
  const resolvedHovered = !isDisabled && !resolvedPressed && (isHovered || (interactive && hovered));

  const boxShadow = resolvedPressed
    ? "0px 2px 6px rgba(0, 0, 0, 0.30)"
    : resolvedHovered
      ? "0px 6px 12px rgba(0, 0, 0, 0.18)"
      : resolvedTheme.shadow;
  const arrowPath =
    direction === "back"
      ? "M8 12L17.5 2L16.5 1L6 12L16.5 23L17.5 22L8 12Z"
      : "M16 12L6.5 22L7.5 23L18 12L7.5 1L6.5 2L16 12Z";

  return (
    <button
      type="button"
      aria-label={direction === "back" ? "Back" : "Next"}
      disabled={isDisabled}
      onClick={onClick}
      onMouseEnter={() => interactive && !isDisabled && setHovered(true)}
      onMouseLeave={() => {
        if (!interactive) return;
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => interactive && !isDisabled && setPressed(true)}
      onMouseUp={() => interactive && !isDisabled && setPressed(false)}
      style={{
        width: 40,
        height: 40,
        padding: 2,
        borderRadius: 96,
        border: "none",
        background: resolvedTheme.bg,
        color: resolvedTheme.fg,
        boxShadow,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: isDisabled ? "not-allowed" : "pointer",
        opacity: isDisabled ? 0.45 : 1,
        transform: resolvedPressed ? "translateY(0.5px)" : "none",
        transition: "box-shadow 120ms ease, transform 120ms ease, opacity 120ms ease",
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d={arrowPath} fill={resolvedTheme.fg} />
      </svg>
    </button>
  );
};
