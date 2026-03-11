import { useId, useState } from "react";
import { resolveComponentTheme } from "../shared/pluginTheme";
import { SvgIcon } from "../shared/SvgIcon";
import { textFieldTokens } from "../../data/text-field";

export type TextFieldState = "default" | "hover" | "focused" | "typing" | "filled" | "error" | "disabled";
export type TextFieldPlaceholderState = "default" | "hidden";

export type TextFieldProps = {
  label?: string;
  caption?: string;
  errorText?: string;
  placeholder?: string;
  value?: string;
  state?: TextFieldState;
  placeholderState?: TextFieldPlaceholderState;
  theme?: string;
  withIconRight?: boolean;
  interactive?: boolean;
  isHovered?: boolean;
  onChange?: (next: string) => void;
};

export const TextField = ({
  label = "Title",
  caption = "Caption",
  errorText = "Error text",
  placeholder = "Line input",
  value = "",
  state = "default",
  placeholderState = "default",
  theme,
  withIconRight = false,
  interactive = true,
  isHovered = false,
  onChange,
}: TextFieldProps) => {
  const inputId = useId();
  const captionId = useId();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const resolvedTheme = resolveComponentTheme(theme);
  const tokens = textFieldTokens[resolvedTheme];

  const isDisabled = state === "disabled";
  const isError = state === "error";
  const isFocused = state === "focused" || state === "typing" || focused;
  const isHover = state === "hover" || isHovered || (interactive && hovered);
  const hasTypedValue = value.length > 0 || state === "filled";
  const isHiddenPlaceholder = placeholderState === "hidden";
  const showPlaceholderText = !isHiddenPlaceholder && value.length === 0;
  const hiddenDotsCount = 6;

  const borderColor = isError
    ? tokens.errorBorder
    : isFocused
    ? tokens.focusBorder
    : isHover
    ? tokens.hoverBorder
    : tokens.border;

  return (
    <div style={{ width: 165, display: "grid", gap: 4 }}>
      <label
        htmlFor={inputId}
        style={{
          color: tokens.titleColor,
          fontWeight: tokens.titleWeight,
          fontSize: tokens.typography.fontSize,
          lineHeight: `${tokens.typography.lineHeight}px`,
          letterSpacing: tokens.typography.letterSpacing,
        }}
      >
        {label}
      </label>
      <div
        onMouseEnter={() => interactive && setHovered(true)}
        onMouseLeave={() => interactive && setHovered(false)}
        style={{
          height: 24,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 8px",
          borderRadius: tokens.radius,
          border: `1px solid ${borderColor}`,
          background: isDisabled ? tokens.disabledBackground : tokens.background,
          opacity: isDisabled ? tokens.disabledOpacity : 1,
        }}
      >
        <div style={{ position: "relative", flex: "1 1 0", height: 20 }}>
          {showPlaceholderText ? (
            <span
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                color: tokens.placeholderColor,
                fontSize: tokens.typography.fontSize,
                lineHeight: `${tokens.typography.lineHeight}px`,
                letterSpacing: tokens.typography.letterSpacing,
                fontFamily: "Arial, Helvetica, sans-serif",
                pointerEvents: "none",
              }}
            >
              {placeholder}
            </span>
          ) : null}
          {isHiddenPlaceholder ? (
            <div style={{ height: 20, display: "inline-flex", alignItems: "center", gap: 4 }}>
              {Array.from({ length: hiddenDotsCount }).map((_, index) => (
                <span
                  key={index}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: tokens.hiddenDotColor,
                  }}
                />
              ))}
            </div>
          ) : (
            <input
              type="text"
              id={inputId}
              disabled={isDisabled}
              value={value}
              placeholder=""
              aria-describedby={captionId}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onChange={(event) => onChange?.(event.target.value)}
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: tokens.typography.fontSize,
                lineHeight: `${tokens.typography.lineHeight}px`,
                letterSpacing: tokens.typography.letterSpacing,
                fontFamily: "Arial, Helvetica, sans-serif",
                caretColor: tokens.cursorColor,
                color: isDisabled
                  ? tokens.disabledTextColor
                  : hasTypedValue
                  ? tokens.valueColor
                  : tokens.placeholderColor,
                WebkitTextFillColor: isDisabled
                  ? tokens.disabledTextColor
                  : hasTypedValue
                  ? tokens.valueColor
                  : tokens.placeholderColor,
              }}
            />
          )}
        </div>
        {withIconRight ? <SvgIcon name="common / chevron" size={20} color={tokens.iconColor} monochrome /> : null}
      </div>
      {isError ? (
        <div
          id={captionId}
          style={{
            color: tokens.errorTextColor,
            fontSize: tokens.captionTypography.fontSize,
            lineHeight: `${tokens.captionTypography.lineHeight}px`,
            letterSpacing: tokens.captionTypography.letterSpacing,
          }}
        >
          {errorText}
        </div>
      ) : (
        <div
          id={captionId}
          style={{
            color: tokens.captionColor,
            fontSize: tokens.captionTypography.fontSize,
            lineHeight: `${tokens.captionTypography.lineHeight}px`,
            letterSpacing: tokens.captionTypography.letterSpacing,
          }}
        >
          {caption}
        </div>
      )}
    </div>
  );
};
