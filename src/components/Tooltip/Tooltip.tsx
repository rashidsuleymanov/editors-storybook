import { getComponentSurface } from "../shared/pluginTheme";

export type TooltipProps = {
  text?: string;
  theme?: string;
};

export const Tooltip = ({ text = "Texts", theme }: TooltipProps) => {
  const tokens = getComponentSurface(theme);

  return (
    <div
      style={{
        minHeight: 28,
        padding: "4px 8px",
        borderRadius: 2,
        border: `1px solid ${tokens.border}`,
        background: tokens.bg,
        color: tokens.fg,
        boxShadow:
          tokens.theme === "Dark" || tokens.theme === "Dark Contrast" || tokens.theme === "Modern Dark"
            ? "0px 4px 10px rgba(0, 0, 0, 0.25)"
            : "0px 4px 10px rgba(0, 0, 0, 0.10)",
        display: "inline-flex",
        alignItems: "center",
        boxSizing: "border-box",
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: tokens.theme.includes("Modern") ? 12 : 10,
        lineHeight: tokens.theme.includes("Modern") ? "16px" : "12px",
        letterSpacing: tokens.theme.includes("Modern") ? 0.24 : 0.2,
      }}
    >
      {text}
    </div>
  );
};
