import { useState } from "react";
import { getComponentSurface } from "../shared/pluginTheme";
import { SvgIcon } from "../shared/SvgIcon";

export type ContextMenuItemType = "iconLeft" | "iconsBoth" | "noIcon";

export type ContextMenuItem = {
  id: string;
  label: string;
  type?: ContextMenuItemType;
  disabled?: boolean;
};

export type ContextMenuProps = {
  items?: ContextMenuItem[];
  theme?: string;
};

const DEFAULT_ITEMS: ContextMenuItem[] = [
  { id: "1", label: "Menu item", type: "iconLeft" },
  { id: "2", label: "Menu item", type: "iconsBoth" },
  { id: "3", label: "Menu item", type: "noIcon" },
  { id: "4", label: "Menu item", type: "iconLeft", disabled: true },
];

export const ContextMenu = ({ items = DEFAULT_ITEMS, theme }: ContextMenuProps) => {
  const tokens = getComponentSurface(theme);
  const [hovered, setHovered] = useState<string | null>(null);

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
      {items.map((item) => {
        const isHovered = hovered === item.id && !item.disabled;
        const iconColor = item.disabled ? tokens.muted : tokens.fg;

        return (
          <button
            key={item.id}
            type="button"
            disabled={item.disabled}
            onMouseEnter={() => !item.disabled && setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              width: "100%",
              minHeight: 26,
              border: "none",
              borderRadius: 0,
              background: isHovered ? tokens.surfaceAlt : "transparent",
              padding: item.type === "noIcon" ? "5px 20px" : "3px 10px 3px 10px",
              color: item.disabled ? tokens.muted : tokens.fg,
              display: "flex",
              alignItems: "center",
              gap: 4,
              boxSizing: "border-box",
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: 11,
              lineHeight: "16px",
              letterSpacing: 0.22,
              cursor: item.disabled ? "default" : "pointer",
              textAlign: "left",
            }}
          >
            {item.type !== "noIcon" ? (
              <span style={{ width: 20, display: "inline-flex", justifyContent: "center" }}>
                <SvgIcon name="highlight" size={14} color={iconColor} monochrome />
              </span>
            ) : null}
            <span style={{ flex: 1, minWidth: 0 }}>{item.label}</span>
            {item.type === "iconsBoth" ? (
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
      })}
    </div>
  );
};
