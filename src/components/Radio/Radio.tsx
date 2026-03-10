import { useState, type CSSProperties } from "react";
import {
  radioTokens,
  resolveRadioTheme,
  type RadioSelection,
  type RadioState,
} from "../../data/radio";

export type RadioProps = {
  label?: string;
  selected?: RadioSelection;
  state?: RadioState;
  theme?: string;
  interactive?: boolean;
  isHovered?: boolean;
  onChange?: (next: RadioSelection) => void;
};

const nextSelection = (current: RadioSelection): RadioSelection =>
  current === "yes" ? "no" : "yes";

export const Radio = ({
  label = "Text",
  selected = "no",
  state = "default",
  theme = "Light",
  interactive = true,
  isHovered = false,
  onChange,
}: RadioProps) => {
  const [hovered, setHovered] = useState(false);
  const resolvedTheme = resolveRadioTheme(theme);
  const effectiveState: RadioState =
    state === "disabled"
      ? "disabled"
      : isHovered || (interactive && hovered)
      ? "hover"
      : state;
  const token = radioTokens[resolvedTheme][effectiveState][selected];
  const isDisabled = effectiveState === "disabled";

  const containerStyle: CSSProperties = {
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
    display: "inline-flex",
    padding: "2px 4px",
    borderRadius: 4,
    transition: "transform 120ms ease",
  };

  const labelStyle: CSSProperties = {
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    color: token.textColor,
    fontSize: token.fontSize,
    fontFamily: "Arial",
    fontWeight: 400,
    lineHeight: `${token.lineHeight}px`,
    letterSpacing: token.letterSpacing,
    wordWrap: "break-word",
    textAlign: "left",
    transition: "color 120ms ease",
  };

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected === "yes"}
      className={`ui-radio ${isDisabled ? "ui-radio--disabled" : ""}`}
      style={containerStyle}
      onMouseEnter={() => interactive && setHovered(true)}
      onMouseLeave={() => interactive && setHovered(false)}
      onClick={() => {
        if (isDisabled) return;
        onChange?.(nextSelection(selected));
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <circle
          cx="7"
          cy="7"
          r="6.5"
          fill={token.outerFill}
          stroke={token.outerStroke}
        />
        {selected === "yes" && token.dotFill ? (
          <circle
            cx="7"
            cy="7"
            r="4"
            fill={token.dotFill}
            fillOpacity={token.dotOpacity}
          />
        ) : null}
      </svg>
      <span style={labelStyle}>{label}</span>
    </button>
  );
};
