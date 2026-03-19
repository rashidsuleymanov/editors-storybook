import type { PluginTheme } from "../shared/pluginTheme";
import { resolveComponentTheme } from "../shared/pluginTheme";
import { SvgIcon } from "../shared/SvgIcon";

type HeaderVariant = "panel" | "window";

export type HeaderProps = {
  title?: string;
  width?: number;
  variant?: HeaderVariant;
  theme?: string;
  onClose?: () => void;
  onCollapse?: () => void;
};

const HEADER_TOKENS: Record<
  PluginTheme,
  { bg: string; text: string; panelDivider: string; windowDivider: string; windowWeight?: number }
> = {
  Light: {
    bg: "#F7F7F7",
    text: "rgba(0, 0, 0, 0.80)",
    panelDivider: "#E0E0E0",
    windowDivider: "#E0E0E0",
  },
  "Light Classic": {
    bg: "#F1F1F1",
    text: "#444444",
    panelDivider: "#D8DADC",
    windowDivider: "#D8DADC",
  },
  Dark: {
    bg: "#404040",
    text: "rgba(255, 255, 255, 0.80)",
    panelDivider: "#555555",
    windowDivider: "#555555",
  },
  "Dark Contrast": {
    bg: "#2A2A2A",
    text: "#E8E8E8",
    panelDivider: "#424242",
    windowDivider: "#555555",
  },
  "Modern Light": {
    bg: "#FFFFFF",
    text: "#383838",
    panelDivider: "#EAEAEA",
    windowDivider: "#EAEAEA",
  },
  "Modern Dark": {
    bg: "#404040",
    text: "#F3F3F3",
    panelDivider: "#585858",
    windowDivider: "#585858",
    windowWeight: 400,
  },
};

const PanelCollapseIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M6.5 7C6.22386 7 6 7.22386 6 7.5V17.5C6 17.7761 6.22386 18 6.5 18C6.77614 18 7 17.7761 7 17.5V7.5C7 7.22386 6.77614 7 6.5 7ZM12.8535 8.14648C12.6583 7.95122 12.3417 7.95122 12.1465 8.14648L8.14648 12.1465C8.05272 12.2403 8 12.3674 8 12.5C8 12.6326 8.05272 12.7597 8.14648 12.8535L12.1465 16.8535C12.3417 17.0488 12.6583 17.0488 12.8535 16.8535C13.0488 16.6583 13.0488 16.3417 12.8535 16.1465L9.70703 13H18.5C18.7761 13 19 12.7761 19 12.5C19 12.2239 18.7761 12 18.5 12H9.70703L12.8535 8.85352C13.0488 8.65825 13.0488 8.34175 12.8535 8.14648Z"
      fill={color}
    />
  </svg>
);

const PanelCloseIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M17.4997 6.50232L11.9993 12.0014M11.9993 12.0014L6.49902 17.5003M11.9993 12.0014L17.4997 17.5003M11.9993 12.0014L6.49919 6.50273"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Header = ({
  title = "Title",
  width = 261,
  variant = "panel",
  theme,
  onClose,
  onCollapse,
}: HeaderProps) => {
  const resolvedTheme = resolveComponentTheme(theme);
  const tokens = HEADER_TOKENS[resolvedTheme];
  const isModern = resolvedTheme === "Modern Light" || resolvedTheme === "Modern Dark";
  const isPanel = variant === "panel";
  const isWindow = variant === "window";
  const divider = isPanel ? tokens.panelDivider : tokens.windowDivider;
  const titleWeight = isWindow ? (tokens.windowWeight ?? 700) : 700;
  const canCollapse = typeof onCollapse === "function";
  const canClose = typeof onClose === "function";

  return (
    <div
      style={{
        width,
        height: isPanel ? 44 : 34,
        background: tokens.bg,
        borderBottom: `1px solid ${divider}`,
        display: "flex",
        alignItems: "stretch",
      }}
    >
      <div
        style={{
          width: "100%",
          padding: isPanel ? "11px 12px 12px" : "7px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: isPanel ? "space-between" : "center",
          gap: 8,
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        {isWindow ? <span style={{ width: 20, height: 20, flexShrink: 0 }} aria-hidden /> : null}
        <div
          style={{
            color: tokens.text,
            fontSize: 12,
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: titleWeight,
            lineHeight: "16px",
            letterSpacing: 0.24,
            textAlign: isWindow ? "center" : "left",
            flex: 1,
            minWidth: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: isModern && isPanel ? 0 : 4 }}>
          {isPanel && isModern ? (
            <button
              type="button"
              aria-label="Collapse panel"
              aria-disabled={!canCollapse}
              disabled={!canCollapse}
              onClick={onCollapse}
              style={{
                width: 24,
                height: 24,
                border: "none",
                background: "transparent",
                padding: 0,
                cursor: canCollapse ? "pointer" : "default",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: canCollapse ? 1 : 0.5,
                flexShrink: 0,
              }}
            >
              <PanelCollapseIcon color={tokens.text} />
            </button>
          ) : null}
          <button
            type="button"
            aria-label="Close"
            aria-disabled={!canClose}
            disabled={!canClose}
            onClick={onClose}
            style={{
              width: isModern && isPanel ? 24 : 20,
              height: isModern && isPanel ? 24 : 20,
              border: "none",
              outline: "none",
              background: "transparent",
              padding: 0,
              cursor: canClose ? "pointer" : "default",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              opacity: canClose ? 1 : 0.5,
            }}
          >
            {isModern && isPanel ? (
              <PanelCloseIcon color={tokens.text} />
            ) : (
              <SvgIcon name="close" size={20} color={tokens.text} monochrome />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
