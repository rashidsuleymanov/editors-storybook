import { useState, type CSSProperties, type KeyboardEvent, type MouseEventHandler } from "react";
import {
  cardsByTheme,
  resolveCardTheme,
  type CardState,
  type CardType,
} from "../../data/cards";
import { SvgIcon } from "../shared/SvgIcon";

export type CardProps = {
  type?: CardType;
  state?: CardState;
  theme?: string;
  interactive?: boolean;
  onToggle?: () => void;
  stretch?: boolean;
  minWidth?: number;
  maxWidth?: number;
  title?: string;
  helperText?: string;
  actionLabel?: string;
  tags?: string[];
  onAction?: MouseEventHandler<HTMLButtonElement>;
};

const DEFAULT_TAGS = ["His", "Her", "Label", "Label", "Label", "Label"];
const DEFAULT_TITLE =
  "His English teacher says that he is a good pupil and a great student who always participates in class discussions and finishes his work carefully";

const ICON_BY_TYPE: Record<CardType, "common / chevron" | "common / chevron (2)"> = {
  close: "common / chevron",
  openWithButton: "common / chevron (2)",
  openWithText: "common / chevron (2)",
};

const titleTextStyle: CSSProperties = {
  flex: "1 1 0",
  fontSize: 11,
  fontFamily: "Arial, Helvetica, sans-serif",
  fontWeight: 400,
  lineHeight: "12px",
  letterSpacing: 0.22,
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
};

const expandedTitleTextStyle: CSSProperties = {
  flex: "1 1 auto",
  fontSize: 11,
  fontFamily: "Arial, Helvetica, sans-serif",
  fontWeight: 400,
  lineHeight: "12px",
  letterSpacing: 0.22,
  display: "block",
  whiteSpace: "normal",
  overflow: "visible",
  overflowWrap: "anywhere",
};

const rowStyle: CSSProperties = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: 4,
};

const buttonLabelStyle: CSSProperties = {
  textAlign: "center",
  fontSize: 11,
  fontFamily: "Arial, Helvetica, sans-serif",
  fontWeight: 700,
  lineHeight: "16px",
  letterSpacing: 0.22,
  whiteSpace: "nowrap",
};

export const Card = ({
  type = "close",
  state = "default",
  theme = "Light",
  interactive = true,
  onToggle,
  stretch = false,
  minWidth = 236,
  maxWidth,
  title = DEFAULT_TITLE,
  helperText = "Text here",
  actionLabel = "Button",
  tags = DEFAULT_TAGS,
  onAction,
}: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const resolvedTheme = resolveCardTheme(theme);
  const tokens = cardsByTheme[resolvedTheme];
  const canToggle = typeof onToggle === "function";
  const canAction = typeof onAction === "function";

  const resolvedState: CardState = interactive && isHovered ? "hover" : state;

  const containerBackground =
    type === "close" && resolvedState === "hover"
      ? tokens.closeHoverBackground
      : tokens.background;

  const secondaryActionBackground =
    resolvedState === "hover"
      ? tokens.actionSecondaryHoverBackground
      : tokens.actionSecondaryBackground;

  const primaryActionBackground =
    resolvedState === "hover"
      ? tokens.actionPrimaryHoverBackground
      : tokens.actionPrimaryBackground;
  const isExpanded = type !== "close";

  const containerStyle: CSSProperties = {
    width: stretch ? "100%" : minWidth,
    minWidth,
    maxWidth,
    padding: 6,
    borderRadius: tokens.radius,
    border: `1px solid ${tokens.border}`,
    background: containerBackground,
    display: "inline-flex",
    flexDirection: type === "close" ? "row" : "column",
    alignItems: type === "close" ? "center" : "flex-start",
    justifyContent: "center",
    gap: type === "close" ? 4 : 10,
    cursor: "default",
    transition: "background-color 120ms ease",
  };

  const chipStyle: CSSProperties = {
    height: 24,
    minWidth: 48,
    padding: "0 12px",
    borderRadius: 31,
    border: `1px solid ${tokens.chipBorder}`,
    background: tokens.chipBackground,
    color: tokens.chipTextColor,
    fontSize: 11,
    fontFamily: "Arial, Helvetica, sans-serif",
    fontWeight: 400,
    lineHeight: "16px",
    letterSpacing: 0.22,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const actionPrimaryStyle: CSSProperties = {
    width: "100%",
    height: tokens.actionHeight,
    padding: "0 32px",
    border: "none",
    borderRadius: tokens.radius === 4 ? 4 : 1,
    background: primaryActionBackground,
    color: tokens.actionPrimaryTextColor,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 120ms ease",
    cursor: canAction ? "pointer" : "default",
  };

  const actionSecondaryStyle: CSSProperties = {
    width: "100%",
    height: tokens.actionHeight,
    padding: "0 32px",
    borderRadius: tokens.radius === 4 ? 4 : 1,
    border: `1px solid ${tokens.actionSecondaryBorder}`,
    background: secondaryActionBackground,
    color: tokens.actionSecondaryTextColor,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 120ms ease",
    cursor: canAction ? "pointer" : "default",
  };

  const handleRowKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!canToggle) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle();
    }
  };

  return (
    <div
      className="ui-card"
      style={containerStyle}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          ...rowStyle,
          alignItems: isExpanded ? "flex-start" : "center",
          cursor: canToggle ? "pointer" : "default",
        }}
        onClick={onToggle}
        onKeyDown={handleRowKeyDown}
        role={canToggle ? "button" : undefined}
        tabIndex={canToggle ? 0 : undefined}
        aria-expanded={canToggle ? type !== "close" : undefined}
      >
        <div style={{ ...(isExpanded ? expandedTitleTextStyle : titleTextStyle), color: tokens.textColor }}>{title}</div>
        <SvgIcon name={ICON_BY_TYPE[type]} size={20} color={tokens.iconColor} monochrome />
      </div>

      {type === "openWithButton" ? (
        <>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              alignContent: "flex-start",
            }}
          >
            {tags.map((tag, index) => (
              <div key={`${tag}-${index}`} style={chipStyle}>
                {tag}
              </div>
            ))}
          </div>
          <div style={{ width: "100%" }}>
            <button type="button" style={actionPrimaryStyle} onClick={onAction} disabled={!canAction}>
              <span style={{ ...buttonLabelStyle, color: tokens.actionPrimaryTextColor }}>{actionLabel}</span>
            </button>
          </div>
        </>
      ) : null}

      {type === "openWithText" ? (
        <>
          <div
            style={{
              width: "100%",
              color: tokens.subTextColor,
              fontSize: 11,
              fontFamily: "Arial, Helvetica, sans-serif",
              fontWeight: 400,
              lineHeight: "12px",
              letterSpacing: 0.22,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {helperText}
          </div>
          <div style={{ width: "100%" }}>
            <button type="button" style={actionSecondaryStyle} onClick={onAction} disabled={!canAction}>
              <span style={{ ...buttonLabelStyle, color: tokens.actionSecondaryTextColor }}>{actionLabel}</span>
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};
