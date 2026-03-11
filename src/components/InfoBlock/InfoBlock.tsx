import { resolveComponentTheme } from "../shared/pluginTheme";
import { infoBlockTokens } from "../../data/info-block";

export type InfoBlockIconMode = "none" | "left" | "right" | "both";

export type InfoBlockProps = {
  title?: string;
  description?: string;
  showTitle?: boolean;
  showDescription?: boolean;
  iconMode?: InfoBlockIconMode;
  theme?: string;
  onClose?: () => void;
};

const AlertIcon = ({ background, mark }: { background: string; mark: string }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
    <rect width="12" height="12" rx="6" fill={background} />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.14288 9.59985L6.85717 9.59985L6.85717 7.88557L5.14288 7.88557L5.14288 9.59985ZM5.14288 7.19985L6.85717 7.19985L6.85717 2.39985L5.14289 2.39985L5.14288 7.19985Z"
      fill={mark}
    />
  </svg>
);

const CloseMinIcon = ({ color }: { color: string }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.00838 8.72823L3.59718 9.14194L2.88793 8.43698L3.29914 8.02327L4.12155 7.19585L5.29498 6.01528L4.00049 4.71291L3.23857 3.94634L2.8576 3.56306L3.56686 2.8581L3.94782 3.24139L4.70974 4.00795L5.99995 5.30602L7.29024 4.00788L8.05217 3.24132L8.43314 2.85803L9.14238 3.56299L8.76142 3.94627L7.99949 4.71284L6.70492 6.01528L7.87843 7.19593L8.70085 8.02336L9.11206 8.43707L8.40281 9.14203L7.9916 8.72832L7.16918 7.90089L5.99995 6.72454L4.8308 7.90081L4.00838 8.72823Z"
      fill={color}
    />
  </svg>
);

export const InfoBlock = ({
  title = "Title",
  description = "Description",
  showTitle = true,
  showDescription = true,
  iconMode = "left",
  theme,
  onClose,
}: InfoBlockProps) => {
  const resolvedTheme = resolveComponentTheme(theme);
  const tokens = infoBlockTokens[resolvedTheme];
  const showLeftIcon = showTitle && (iconMode === "left" || iconMode === "both");
  const showRightIcon = showTitle && (iconMode === "right" || iconMode === "both");

  return (
    <div
      style={{
        width: 220,
        padding: 8,
        borderRadius: tokens.radius,
        border: `1px solid ${tokens.border}`,
        background: tokens.background,
        display: "grid",
        gap: showTitle && showDescription ? 4 : 0,
        boxSizing: "border-box",
      }}
    >
      {showTitle ? (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {showLeftIcon ? <AlertIcon background={tokens.alertBackground} mark={tokens.alertMark} /> : null}
          <span
            style={{
              flex: "1 1 0",
              minWidth: 0,
              color: tokens.titleColor,
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: tokens.titleTypography.fontSize,
              fontWeight: tokens.titleTypography.fontWeight,
              lineHeight: `${tokens.titleTypography.lineHeight}px`,
              letterSpacing: tokens.titleTypography.letterSpacing,
            }}
          >
            {title}
          </span>
          {showRightIcon ? (
            <button
              type="button"
              aria-label="Close info"
              aria-disabled={!onClose}
              disabled={!onClose}
              onClick={onClose}
              style={{
                width: 12,
                height: 12,
                padding: 0,
                border: "none",
                background: "transparent",
                cursor: onClose ? "pointer" : "default",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: onClose ? 1 : 0.5,
                flexShrink: 0,
              }}
            >
              <CloseMinIcon color={tokens.closeColor} />
            </button>
          ) : null}
        </div>
      ) : null}

      {showDescription ? (
        <div
          style={{
            color: tokens.descriptionColor,
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: tokens.descriptionTypography.fontSize,
            fontWeight: tokens.descriptionTypography.fontWeight,
            lineHeight: `${tokens.descriptionTypography.lineHeight}px`,
            letterSpacing: tokens.descriptionTypography.letterSpacing,
          }}
        >
          {description}
        </div>
      ) : null}
    </div>
  );
};
