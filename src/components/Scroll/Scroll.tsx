import { useEffect, useRef, useState, type CSSProperties } from "react";
import { resolveComponentTheme } from "../shared/pluginTheme";
import { scrollByTheme, scrollSizePixels, type ScrollSize, type ScrollVisualState } from "../../data/scroll";

export type ScrollProps = {
  orientation?: "vertical" | "horizontal";
  size?: ScrollSize;
  state?: ScrollVisualState;
  type?: "withButtons" | "withoutButtons";
  length?: number;
  interactive?: boolean;
  isHovered?: boolean;
  isPressed?: boolean;
  theme?: string;
  viewportSize?: number;
  contentSize?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onValueChange?: (nextValue: number) => void;
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const getPoint = (event: { clientX: number; clientY: number }, horizontal: boolean) =>
  horizontal ? event.clientX : event.clientY;

const Notching = ({ color, size, horizontal }: { color: string; size: "S" | "M"; horizontal: boolean }) => {
  const notchWidth = scrollSizePixels[size].notch;
  const lineStyle: CSSProperties = {
    background: color,
    height: 1,
    width: notchWidth,
    flexShrink: 0,
  };

  const body = (
    <div style={{ display: "grid", gridTemplateRows: "repeat(7, 1fr)", gap: 1 }}>
      {Array.from({ length: 7 }, (_, idx) => (
        <span key={idx} style={lineStyle} />
      ))}
    </div>
  );

  if (!horizontal) return body;

  return <div style={{ transform: "rotate(90deg)", transformOrigin: "center" }}>{body}</div>;
};

const Arrow = ({ direction, color }: { direction: "up" | "down" | "left" | "right"; color: string }) => {
  const rotation =
    direction === "up" ? 0 : direction === "down" ? 180 : direction === "left" ? -90 : 90;

  return (
    <svg
      width="7"
      height="5"
      viewBox="0 0 7 5"
      fill="none"
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-hidden
    >
      <path d="M3 0H4V1H5V2H6V3H7V4H0V3H1V2H2V1H3V0Z" fill={color} />
    </svg>
  );
};

export const Scroll = ({
  orientation = "vertical",
  size = "M",
  state = "default",
  type = "withoutButtons",
  length = 167,
  interactive = true,
  isHovered = false,
  isPressed = false,
  theme,
  viewportSize = 100,
  contentSize = 200,
  step = 16,
  value,
  defaultValue = 0,
  onValueChange,
}: ScrollProps) => {
  const resolvedTheme = resolveComponentTheme(theme);
  const [runtimeHovered, setRuntimeHovered] = useState(false);
  const [runtimePressed, setRuntimePressed] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);

  const dragDataRef = useRef<{ pointerStart: number; valueStart: number } | null>(null);
  const isHorizontal = orientation === "horizontal";
  const showButtons = type === "withButtons";
  const effectiveSize: ScrollSize = showButtons ? "M" : size;
  const metrics = scrollSizePixels[effectiveSize];
  const tokensByState = scrollByTheme[resolvedTheme];

  const forceState: ScrollVisualState | null = isPressed ? "pressed" : isHovered ? "hover" : null;
  const runtimeState: ScrollVisualState = runtimePressed || dragging ? "pressed" : runtimeHovered ? "hover" : "default";
  const resolvedState = forceState ?? (interactive ? runtimeState : state);

  const tokens = tokensByState[resolvedState];
  const liftTokens = tokens.lift[effectiveSize];
  const buttonTokens = tokens.button;

  const totalLength = Math.max(48, length);
  const trackLength = Math.max(
    24,
    totalLength - (showButtons ? metrics.button * 2 + metrics.gap * 2 : 0),
  );

  const viewport = Math.max(1, viewportSize);
  const content = Math.max(viewport, contentSize);
  const maxValue = Math.max(0, content - viewport);

  const controlled = value !== undefined;
  const currentValue = clamp(controlled ? value : internalValue, 0, maxValue);
  const thumbRaw = Math.round((viewport / content) * trackLength);
  const thumbMin = effectiveSize === "XS" ? 18 : 24;
  const thumbLength = clamp(thumbRaw, Math.min(thumbMin, trackLength), trackLength);
  const travel = Math.max(0, trackLength - thumbLength);
  const thumbPosition = travel === 0 || maxValue === 0 ? 0 : (currentValue / maxValue) * travel;

  const setValue = (next: number) => {
    const clamped = clamp(next, 0, maxValue);
    if (!controlled) setInternalValue(clamped);
    onValueChange?.(clamped);
  };

  useEffect(() => {
    if (!dragging || !interactive) return;

    const onPointerMove = (event: PointerEvent) => {
      if (!dragDataRef.current || travel === 0 || maxValue === 0) return;
      const delta = getPoint(event, isHorizontal) - dragDataRef.current.pointerStart;
      const ratio = delta / travel;
      const nextValue = clamp(dragDataRef.current.valueStart + ratio * maxValue, 0, maxValue);
      if (!controlled) setInternalValue(nextValue);
      onValueChange?.(nextValue);
    };

    const onPointerUp = () => {
      setDragging(false);
      setRuntimePressed(false);
      dragDataRef.current = null;
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [controlled, dragging, interactive, isHorizontal, maxValue, onValueChange, travel]);

  const handleThumbPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || travel === 0 || maxValue === 0) return;
    event.preventDefault();
    setRuntimePressed(true);
    setDragging(true);
    dragDataRef.current = {
      pointerStart: getPoint(event, isHorizontal),
      valueStart: currentValue,
    };
  };

  const handleTrackPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || travel === 0 || maxValue === 0) return;
    if (event.target !== event.currentTarget) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const offset = isHorizontal ? event.clientX - rect.left : event.clientY - rect.top;
    const targetThumbStart = clamp(offset - thumbLength / 2, 0, travel);
    const ratio = targetThumbStart / travel;
    setValue(ratio * maxValue);
    setRuntimePressed(true);
    window.setTimeout(() => setRuntimePressed(false), 120);
  };

  const moveByStep = (direction: -1 | 1) => {
    if (!interactive) return;
    setValue(currentValue + direction * step);
    setRuntimePressed(true);
    window.setTimeout(() => setRuntimePressed(false), 120);
  };

  const rootStyle: CSSProperties = {
    display: "inline-flex",
    flexDirection: isHorizontal ? "row" : "column",
    gap: metrics.gap,
    alignItems: "center",
    justifyContent: "flex-start",
    userSelect: "none",
    outline: "none",
  };

  const trackStyle: CSSProperties = {
    position: "relative",
    width: isHorizontal ? trackLength : metrics.frameCross,
    height: isHorizontal ? metrics.frameCross : trackLength,
    boxSizing: "border-box",
    cursor: interactive ? "pointer" : "default",
  };

  const thumbCrossOffset = Math.floor((metrics.frameCross - metrics.railInner) / 2);
  const thumbStyle: CSSProperties = {
    position: "absolute",
    left: isHorizontal ? thumbPosition : thumbCrossOffset,
    top: isHorizontal ? thumbCrossOffset : thumbPosition,
    width: isHorizontal ? thumbLength : metrics.railInner,
    height: isHorizontal ? metrics.railInner : thumbLength,
    background: liftTokens.bg,
    border: `1px solid ${liftTokens.border}`,
    borderRadius: metrics.radius,
    boxSizing: "border-box",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: interactive ? (isHorizontal ? "ew-resize" : "ns-resize") : "default",
  };

  const buttonStyle: CSSProperties = {
    width: metrics.button,
    height: metrics.button,
    border: `1px solid ${buttonTokens.border}`,
    borderRadius: 1,
    background: buttonTokens.bg,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    cursor: interactive ? "pointer" : "default",
    padding: 0,
  };

  return (
    <div
      role="scrollbar"
      aria-orientation={orientation}
      aria-valuemin={0}
      aria-valuemax={maxValue}
      aria-valuenow={Math.round(currentValue)}
      tabIndex={interactive ? 0 : -1}
      style={rootStyle}
      onMouseEnter={() => interactive && setRuntimeHovered(true)}
      onMouseLeave={() => {
        if (!interactive) return;
        setRuntimeHovered(false);
        if (!dragging) setRuntimePressed(false);
      }}
      onWheel={(event) => {
        if (!interactive || maxValue === 0) return;
        const delta = isHorizontal ? event.deltaX || event.deltaY : event.deltaY;
        if (delta === 0) return;
        event.preventDefault();
        setValue(currentValue + delta);
      }}
      onKeyDown={(event) => {
        if (!interactive) return;
        const back = isHorizontal ? "ArrowLeft" : "ArrowUp";
        const next = isHorizontal ? "ArrowRight" : "ArrowDown";
        if (event.key === back) {
          event.preventDefault();
          moveByStep(-1);
        }
        if (event.key === next) {
          event.preventDefault();
          moveByStep(1);
        }
      }}
    >
      {showButtons ? (
        <button
          type="button"
          style={buttonStyle}
          onClick={() => moveByStep(-1)}
          onMouseDown={() => interactive && setRuntimePressed(true)}
          onMouseUp={() => interactive && setRuntimePressed(false)}
        >
          <Arrow direction={isHorizontal ? "left" : "up"} color={buttonTokens.arrow} />
        </button>
      ) : null}

      <div style={trackStyle} onPointerDown={handleTrackPointerDown}>
        <div style={thumbStyle} onPointerDown={handleThumbPointerDown}>
          {metrics.hasNotching ? (
            <Notching
              color={liftTokens.notch}
              size={effectiveSize === "XS" ? "S" : effectiveSize}
              horizontal={isHorizontal}
            />
          ) : null}
        </div>
      </div>

      {showButtons ? (
        <button
          type="button"
          style={buttonStyle}
          onClick={() => moveByStep(1)}
          onMouseDown={() => interactive && setRuntimePressed(true)}
          onMouseUp={() => interactive && setRuntimePressed(false)}
        >
          <Arrow direction={isHorizontal ? "right" : "down"} color={buttonTokens.arrow} />
        </button>
      ) : null}
    </div>
  );
};
