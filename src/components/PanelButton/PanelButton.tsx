import { useState, type CSSProperties } from "react";
import panelButtonsData from "../../data/panel-buttons";

export type PanelButtonSize = 24 | 30;
export type PanelButtonState =
  | "default"
  | "hover"
  | "pressed"
  | "disabled"
  | "loader";

type PanelButtonToken = {
  container?: CSSProperties;
  text?: CSSProperties;
  spinnerColor?: string;
};

type PanelButtonData = Record<string, Record<string, Record<string, PanelButtonToken>>>;

const STATE_TO_KEY: Record<PanelButtonState, string> = {
  default: "Default",
  hover: "Hover",
  pressed: "Pressed",
  disabled: "Disabled",
  loader: "Loader",
};

const FALLBACK_THEME = "Light";
const panelButtons = panelButtonsData as unknown as PanelButtonData;

const resolveTheme = (theme?: string) => {
  if (!theme) return FALLBACK_THEME;
  return theme in panelButtons ? theme : FALLBACK_THEME;
};

const Spinner = ({ color, size }: { color: string; size: 16 | 20 }) => (
  <span
    className="ui-panel-button__spinner"
    aria-hidden
    style={{ color, ["--spinner-size" as string]: `${size}px` }}
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" opacity="0.24" />
      <path d="M8 2 A6 6 0 0 1 14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </span>
);

export type PanelButtonProps = {
  label?: string;
  size?: PanelButtonSize;
  state?: PanelButtonState;
  theme?: string;
  interactive?: boolean;
  isHovered?: boolean;
  isClicked?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  scale?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const PanelButton = ({
  label = "Button",
  size = 24,
  state = "default",
  theme = FALLBACK_THEME,
  interactive = true,
  isHovered = false,
  isClicked = false,
  isDisabled = false,
  isLoading = false,
  scale = false,
  onClick,
}: PanelButtonProps) => {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const resolvedState: PanelButtonState = (() => {
    if (isLoading) return "loader";
    if (isDisabled) return "disabled";
    if (isClicked) return "pressed";
    if (isHovered) return "hover";
    if (interactive) {
      if (pressed) return "pressed";
      if (hovered) return "hover";
    }
    return state;
  })();

  const resolvedTheme = resolveTheme(theme);
  const themeTokens = panelButtons[resolvedTheme];
  const sizeTokens = themeTokens[String(size)] ?? themeTokens["24"];
  const token =
    sizeTokens?.[STATE_TO_KEY[resolvedState]] ??
    sizeTokens?.Default ??
    ({} as PanelButtonToken);

  const containerStyle: CSSProperties = {
    ...(token.container ?? {}),
    width: scale ? "100%" : (token.container?.width as CSSProperties["width"]),
    paddingTop: 0,
    paddingBottom: 0,
    boxSizing: "border-box",
    border: "none",
    cursor:
      resolvedState === "disabled" || resolvedState === "loader"
        ? "not-allowed"
        : "pointer",
  };

  const stateClass =
    resolvedState === "hover"
      ? "ui-panel-button--hover"
      : resolvedState === "pressed"
        ? "ui-panel-button--pressed"
        : resolvedState === "disabled"
          ? "ui-panel-button--disabled"
          : resolvedState === "loader"
            ? "ui-panel-button--loader"
            : "";

  return (
    <button
      type="button"
      className={`ui-panel-button ${stateClass}`.trim()}
      style={containerStyle}
      disabled={resolvedState === "disabled" || resolvedState === "loader"}
      aria-busy={resolvedState === "loader"}
      onMouseEnter={() => interactive && !isDisabled && !isLoading && setHovered(true)}
      onMouseLeave={() => {
        if (!interactive) return;
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => interactive && !isDisabled && !isLoading && setPressed(true)}
      onMouseUp={() => interactive && !isDisabled && !isLoading && setPressed(false)}
      onClick={onClick}
    >
      {resolvedState === "loader" ? (
        <Spinner
          color={token.spinnerColor ?? (token.text?.color as string) ?? "rgba(0, 0, 0, 0.8)"}
          size={size === 30 ? 20 : 16}
        />
      ) : (
        <span
          style={{
            ...(token.text ?? {}),
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            whiteSpace: "nowrap",
            fontFamily: (token.text?.fontFamily as string | undefined) ?? "Arial, Helvetica, sans-serif",
          }}
        >
          {label}
        </span>
      )}
    </button>
  );
};
