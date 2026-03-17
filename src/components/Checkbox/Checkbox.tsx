import { useState, type CSSProperties } from "react";
import {
  checkboxTokens,
  resolveCheckboxTheme,
  type CheckboxSelection,
  type CheckboxState,
} from "../../data/checkbox";

export type CheckboxProps = {
  label?: string;
  selected?: CheckboxSelection;
  state?: CheckboxState;
  theme?: string;
  interactive?: boolean;
  isHovered?: boolean;
  onChange?: (next: CheckboxSelection) => void;
};

const CHECK_PATH = "M2.75 6.94995L5.75 9.74995L11.25 4.25005";

const nextSelection = (current: CheckboxSelection): CheckboxSelection => {
  if (current === "no") return "yes";
  if (current === "yes") return "no";
  return "yes";
};

export const Checkbox = ({
  label = "Text",
  selected = "no",
  state = "default",
  theme = "Light",
  interactive = true,
  isHovered = false,
  onChange,
}: CheckboxProps) => {
  const [hovered, setHovered] = useState(false);
  const resolvedTheme = resolveCheckboxTheme(theme);
  const effectiveState: CheckboxState =
    state === "disabled" ? "disabled" : isHovered || (interactive && hovered) ? "hover" : state;
  const token = checkboxTokens[resolvedTheme][effectiveState][selected];
  const isDisabled = effectiveState === "disabled";

  const containerStyle: CSSProperties = {
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
    display: "inline-flex",
  };

  const labelStyle: CSSProperties = {
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    color: token.textColor,
    fontSize: resolvedTheme.startsWith("Modern") ? 12 : 11,
    fontFamily: "Arial, Helvetica, sans-serif",
    fontWeight: 400,
    lineHeight: "16px",
    letterSpacing: resolvedTheme.startsWith("Modern") ? 0.24 : 0.22,
    wordWrap: "break-word",
    textAlign: "left",
  };

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected === "partial" ? "mixed" : selected === "yes"}
      aria-disabled={isDisabled}
      className={`ui-checkbox ${isDisabled ? "ui-checkbox--disabled" : ""}`}
      style={containerStyle}
      disabled={isDisabled}
      onMouseEnter={() => interactive && !isDisabled && setHovered(true)}
      onMouseLeave={() => interactive && setHovered(false)}
      onClick={() => {
        if (isDisabled) return;
        onChange?.(nextSelection(selected));
      }}
    >
      <span
        style={{
          paddingTop: 2,
          paddingBottom: 2,
          justifyContent: "flex-start",
          alignItems: "center",
          display: "flex",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <rect
            x="0.5"
            y="0.5"
            width="13"
            height="13"
            rx={token.boxRadius}
            fill={token.boxFill}
            stroke={token.boxStroke}
          />
          {selected === "yes" && token.markColor ? (
            <path
              d={CHECK_PATH}
              stroke={token.markColor}
              strokeOpacity={token.markOpacity}
              strokeWidth="2"
            />
          ) : null}
          {selected === "partial" && token.markColor ? (
            <rect
              x="3"
              y="6"
              width="8"
              height="2"
              fill={token.markColor}
              fillOpacity={token.markOpacity}
            />
          ) : null}
        </svg>
      </span>
      <span style={labelStyle}>{label}</span>
    </button>
  );
};
