import { getComponentSurface } from "../shared/pluginTheme";

export type LoaderSize = "S" | "M";

export type LoaderProps = {
  size?: LoaderSize;
  theme?: string;
  label?: string;
  overlay?: boolean;
};

export const Loader = ({
  size = "S",
  theme,
  label = "Loading...",
  overlay = false,
}: LoaderProps) => {
  const tokens = getComponentSurface(theme);
  const spinnerSize = size === "M" ? 28 : 20;
  const fontSize = size === "M" ? 15 : tokens.theme.includes("Modern") ? 12 : 11;
  const lineHeight = size === "M" ? 20 : 16;

  const fg = overlay ? "#FFFFFF" : tokens.fg;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size === "M" ? 12 : 8,
        padding: overlay ? "24px 32px" : 0,
        borderRadius: overlay ? 8 : 0,
        boxSizing: "border-box",
        background: overlay
          ? tokens.theme === "Light"
            ? "rgba(68, 68, 68, 0.95)"
            : tokens.theme === "Light Classic"
            ? "#000000a6"
            : tokens.theme === "Modern Light"
            ? "#383838"
            : tokens.theme === "Modern Dark"
            ? "#343434"
            : tokens.theme === "Dark Contrast"
            ? "rgba(18, 18, 18, 0.95)"
            : "rgba(24, 24, 24, 0.95)"
          : "transparent",
      }}
    >
      <span
        className="ui-loader-spinner"
        style={{
          width: spinnerSize,
          height: spinnerSize,
          borderRadius: "50%",
          border: `2px solid ${overlay ? "rgba(255,255,255,0.25)" : tokens.border}`,
          borderTopColor: fg,
          display: "inline-block",
        }}
      />
      <span
        style={{
          color: fg,
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize,
          lineHeight: `${lineHeight}px`,
          letterSpacing: size === "M" ? 0.3 : tokens.theme.includes("Modern") ? 0.24 : 0.22,
        }}
      >
        {label}
      </span>
    </div>
  );
};
