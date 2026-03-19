import { useMemo } from "react";
import { resolveComponentTheme } from "../shared/pluginTheme";
import { sliderTokens } from "../../data/slider";

export type SliderProps = {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  showValue?: boolean;
  theme?: string;
  onChange?: (next: number) => void;
};

export const Slider = ({
  value = 40,
  min = 0,
  max = 100,
  step,
  disabled = false,
  showValue = false,
  theme,
  onChange,
}: SliderProps) => {
  const resolvedTheme = resolveComponentTheme(theme);
  const tokens = sliderTokens[resolvedTheme];
  const trackWidth = 160;
  const trackHeight = 4;
  const thumbSize = tokens.thumb.size;
  const railHeight = Math.max(12, thumbSize);

  const safeValue = useMemo(() => Math.min(max, Math.max(min, value)), [value, min, max]);
  const percent = useMemo(() => {
    const range = Math.max(1, max - min);
    return ((safeValue - min) / range) * 100;
  }, [safeValue, min, max]);
  const onWidth = (percent / 100) * trackWidth;
  const thumbLeft = (percent / 100) * (trackWidth - thumbSize);
  const inputHeight = Math.max(thumbSize, 18);

  return (
    <div
      className="ui-slider"
      style={{
        width: showValue ? 173 : trackWidth,
        display: "inline-flex",
        alignItems: "center",
        gap: showValue ? 6 : 0,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <div
        style={{
          width: trackWidth,
          height: railHeight,
          position: "relative",
          flex: "0 0 auto",
        }}
      >
        <div
          style={{
            width: trackWidth,
            height: trackHeight,
            borderRadius: 2,
            background: tokens.offTrack,
            position: "absolute",
            left: 0,
            top: (railHeight - trackHeight) / 2,
          }}
        />
        <div
          style={{
            width: onWidth,
            height: trackHeight,
            borderRadius: 2,
            background: tokens.onTrack,
            position: "absolute",
            left: 0,
            top: (railHeight - trackHeight) / 2,
          }}
        />
        <div
          style={{
            width: thumbSize,
            height: thumbSize,
            borderRadius: "50%",
            background: tokens.thumb.fill,
            border: `${tokens.thumb.strokeWidth}px solid ${tokens.thumb.stroke}`,
            boxSizing: "border-box",
            position: "absolute",
            left: thumbLeft,
            top: (railHeight - thumbSize) / 2,
            boxShadow: tokens.thumb.shadow,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={safeValue}
          aria-label="Slider"
          disabled={disabled}
          onChange={(event) => onChange?.(Number(event.target.value))}
          style={{
            position: "absolute",
            left: 0,
            top: (railHeight - inputHeight) / 2,
            width: trackWidth,
            height: inputHeight,
            margin: 0,
            opacity: 0,
            cursor: disabled ? "default" : "pointer",
          }}
        />
      </div>
      {showValue ? (
        <span
          style={{
            width: 11,
            textAlign: "right",
            color: tokens.label.color,
            fontSize: tokens.label.fontSize,
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 400,
            lineHeight: `${tokens.label.lineHeight}px`,
            letterSpacing: tokens.label.letterSpacing,
          }}
        >
          {Math.round(safeValue)}
        </span>
      ) : null}
    </div>
  );
};
