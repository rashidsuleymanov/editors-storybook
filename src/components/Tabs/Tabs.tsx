import { useState } from "react";
import { resolveComponentTheme } from "../shared/pluginTheme";
import { SvgIcon } from "../shared/SvgIcon";
import { tabsByTheme } from "../../data/tabs";

export type TabState = "default" | "hover";

export type TabItem = {
  id: string;
  label: string;
};

export type TabsProps = {
  items?: TabItem[];
  activeId?: string;
  state?: TabState;
  hoveredId?: string;
  theme?: string;
  interactive?: boolean;
  withIcon?: boolean;
  scaled?: boolean;
  onChange?: (id: string) => void;
};

export const Tabs = ({
  items = [
    { id: "paragraph", label: "Paragraph" },
    { id: "table", label: "Table" },
    { id: "style", label: "Style" },
  ],
  activeId = "paragraph",
  state = "default",
  hoveredId: hoveredTabId,
  theme,
  interactive = true,
  withIcon = false,
  scaled = false,
  onChange,
}: TabsProps) => {
  const resolvedTheme = resolveComponentTheme(theme);
  const tokens = tabsByTheme[resolvedTheme];
  const forcedHoveredId =
    hoveredTabId ?? items.find((item) => item.id !== activeId)?.id ?? activeId;
  const [runtimeHoveredId, setRuntimeHoveredId] = useState<string | null>(
    state === "hover" ? forcedHoveredId : null,
  );
  const isModern = resolvedTheme === "Modern Light" || resolvedTheme === "Modern Dark";

  const focusTabByOffset = (currentIndex: number, offset: number) => {
    const nextIndex = (currentIndex + offset + items.length) % items.length;
    onChange?.(items[nextIndex].id);
  };

  return (
    <div
      className="ui-tabs"
      role="tablist"
      style={{
        display: scaled ? "flex" : "inline-flex",
        width: scaled ? "100%" : undefined,
        background: "transparent",
      }}
    >
      {items.map((item, index) => {
        const isActive = item.id === activeId;
        const effectiveHoveredId =
          interactive && runtimeHoveredId
            ? runtimeHoveredId
            : state === "hover"
              ? forcedHoveredId
              : null;
        const isHovered = effectiveHoveredId === item.id;
        const bg = isHovered ? tokens.hoverBg : isActive ? tokens.selectedBg : tokens.unselectedBg;
        const showIndicator = isModern && isActive;
        const contentHeight = showIndicator ? 37 : 40;

        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onMouseEnter={() => interactive && setRuntimeHoveredId(item.id)}
            onMouseLeave={() => interactive && setRuntimeHoveredId(null)}
            onClick={() => onChange?.(item.id)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                focusTabByOffset(index, 1);
              }

              if (event.key === "ArrowLeft") {
                event.preventDefault();
                focusTabByOffset(index, -1);
              }

              if (event.key === "Home") {
                event.preventDefault();
                onChange?.(items[0].id);
              }

              if (event.key === "End") {
                event.preventDefault();
                onChange?.(items[items.length - 1].id);
              }
            }}
	            style={{
	              appearance: "none",
	              WebkitAppearance: "none",
	              outline: "none",
	              position: "relative",
	              flex: scaled ? 1 : undefined,
	              height: 40,
	              padding: 0,
	              border: `1px solid ${tokens.border}`,
	              borderBottom:
	                isActive || showIndicator ? "none" : `1px solid ${tokens.border}`,
	              background: bg,
	              color: tokens.text,
	              boxSizing: "border-box",
	              display: "inline-flex",
	              flexDirection: "column",
	              alignItems: "stretch",
	              justifyContent: "flex-start",
	              cursor: onChange ? "pointer" : "default",
	            }}
	          >
	            <span
	              style={{
	                height: contentHeight,
                padding: "0 12px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
	                gap: 4,
	                fontSize: tokens.typography.fontSize,
	                fontFamily: "Arial, Helvetica, sans-serif",
	                fontWeight: tokens.typography.fontWeight,
	                lineHeight: `${tokens.typography.lineHeight}px`,
	                letterSpacing: tokens.typography.letterSpacing,
	                color: tokens.text,
	                whiteSpace: "nowrap",
              }}
            >
              {withIcon ? (
                <SvgIcon
                  name="common / btn-copy"
                  size={20}
                  color={tokens.text}
                  monochrome
                />
              ) : null}
              {item.label}
            </span>
            {showIndicator ? (
              <span
                aria-hidden
                style={{
                  height: tokens.indicatorHeight ?? 3,
                  width: "100%",
                  background: tokens.indicatorColor ?? "transparent",
                }}
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
};
