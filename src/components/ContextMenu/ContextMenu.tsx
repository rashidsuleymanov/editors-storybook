import { useState } from "react";
import { getComponentSurface, pressedBgByTheme } from "../shared/pluginTheme";
import { SvgIcon } from "../shared/SvgIcon";

export type ContextMenuItemType = "iconLeft" | "iconsBoth" | "noIcon";

export type ContextMenuItem = {
  id: string;
  label: string;
  type?: ContextMenuItemType;
  disabled?: boolean;
  items?: ContextMenuItem[];
};

export type ContextMenuProps = {
  items?: ContextMenuItem[];
  theme?: string;
  interactive?: boolean;
  /** Force hover appearance for the item at this zero-based index (for docs/previews) */
  isHoveredIndex?: number;
  /** Force pressed appearance for the item at this zero-based index (for docs/previews) */
  isClickedIndex?: number;
  /** Force a submenu open by item id (for docs/previews) */
  defaultOpenId?: string;
};

const DEFAULT_ITEMS: ContextMenuItem[] = [
  { id: "1", label: "Menu item", type: "iconLeft" },
  { id: "2", label: "Menu item", type: "iconsBoth" },
  { id: "3", label: "Menu item", type: "noIcon" },
  { id: "4", label: "Menu item", type: "iconLeft", disabled: true },
];


export const ContextMenu = ({
  items = DEFAULT_ITEMS,
  theme,
  interactive = true,
  isHoveredIndex,
  isClickedIndex,
  defaultOpenId,
}: ContextMenuProps) => {
  const tokens = getComponentSurface(theme);
  const isModern = tokens.theme.includes("Modern");
  const [hovered, setHovered] = useState<string | null>(null);
  const [pressed, setPressed] = useState<string | null>(null);
  const [openSubmenuId, setOpenSubmenuId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div
      style={{
        minWidth: 180,
        border: `1px solid ${tokens.border}`,
        background: tokens.bg,
        borderRadius: 2,
        padding: "4px 0",
        display: "inline-grid",
        boxSizing: "border-box",
      }}
    >
      {items.map((item, index) => {
        const hasSubmenu = Boolean(item.items && item.items.length > 0);
        const isSubmenuOpen = openSubmenuId === item.id;
        const forcedHover = typeof isHoveredIndex === "number" && isHoveredIndex === index;
        const forcedPressed = typeof isClickedIndex === "number" && isClickedIndex === index;
        const isItemHovered = (hovered === item.id && interactive) || forcedHover || isSubmenuOpen;
        const isItemPressed = (pressed === item.id && interactive) || forcedPressed;
        const iconColor = item.disabled ? tokens.muted : tokens.fg;
        const bg = item.disabled
          ? "transparent"
          : isItemPressed
            ? pressedBgByTheme[tokens.theme] ?? tokens.surfaceAlt
            : isItemHovered
              ? tokens.surfaceAlt
              : "transparent";

        const showRightIcon = item.type === "iconsBoth" || hasSubmenu;

        const button = (
          <button
            type="button"
            disabled={item.disabled}
            onMouseEnter={() => {
              if (!interactive || item.disabled) return;
              setHovered(item.id);
              if (!hasSubmenu) setOpenSubmenuId(null);
            }}
            onMouseLeave={() => {
              if (!hasSubmenu) {
                interactive && setHovered(null);
              }
            }}
            onMouseDown={() => interactive && !item.disabled && setPressed(item.id)}
            onMouseUp={() => interactive && setPressed(null)}
            style={{
              width: "100%",
              minHeight: 26,
              border: "none",
              borderRadius: 0,
              background: bg,
              padding: item.type === "noIcon" ? "5px 20px" : "3px 10px 3px 10px",
              color: item.disabled ? tokens.muted : tokens.fg,
              display: "flex",
              alignItems: "center",
              gap: 4,
              boxSizing: "border-box",
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: isModern ? 12 : 11,
              lineHeight: "16px",
              letterSpacing: isModern ? 0.24 : 0.22,
              cursor: item.disabled ? "default" : "pointer",
              textAlign: "left",
            }}
          >
            {item.type !== "noIcon" ? (
              <span style={{ width: 20, display: "inline-flex", justifyContent: "center" }}>
                <SvgIcon name="highlight" size={20} color={iconColor} monochrome />
              </span>
            ) : null}
            <span style={{ flex: 1, minWidth: 0 }}>{item.label}</span>
            {showRightIcon ? (
              <span style={{ width: 20, display: "inline-flex", justifyContent: "center" }}>
                <SvgIcon
                  name="submenu"
                  size={6}
                  color={iconColor}
                  monochrome
                  style={{ transform: "rotate(-90deg)" }}
                />
              </span>
            ) : null}
          </button>
        );

        if (hasSubmenu) {
          return (
            <div
              key={item.id}
              style={{ position: "relative" }}
              onMouseEnter={() => {
                if (!interactive || item.disabled) return;
                setHovered(item.id);
                setOpenSubmenuId(item.id);
              }}
              onMouseLeave={() => {
                if (!interactive) return;
                setHovered(null);
                setOpenSubmenuId(null);
              }}
            >
              {button}
              {isSubmenuOpen && (
                <div style={{ position: "absolute", left: "100%", top: 0, zIndex: 1 }}>
                  <ContextMenu
                    items={item.items}
                    theme={theme}
                    interactive={interactive}
                  />
                </div>
              )}
            </div>
          );
        }

        return <div key={item.id}>{button}</div>;
      })}
    </div>
  );
};
