import { useEffect, useRef, useState, type CSSProperties } from "react";
import { getComponentSurface, pressedBgByTheme } from "../shared/pluginTheme";
import { SvgIcon } from "../shared/SvgIcon";

export type SplitButtonType = "dropDown" | "iconLeft" | "tabs";

export type DropdownItem = {
  id: string;
  label: string;
  disabled?: boolean;
};

export type SplitButtonProps = {
  label?: string;
  state?: "default" | "hover" | "pressed" | "disabled";
  type?: SplitButtonType;
  theme?: string;
  interactive?: boolean;
  tabIndex?: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Items shown in the dropdown list (dropDown type only) */
  items?: DropdownItem[];
  /** Called when a dropdown item is selected */
  onItemSelect?: (id: string) => void;
  /** Force dropdown open for static docs preview */
  isOpen?: boolean;
};

const DEFAULT_DROPDOWN_ITEMS: DropdownItem[] = [
  { id: "1", label: "Option 1" },
  { id: "2", label: "Option 2" },
  { id: "3", label: "Option 3" },
  { id: "4", label: "Disabled option", disabled: true },
];

export const SplitButton = ({
  label = "Button",
  state = "default",
  type = "dropDown",
  theme,
  interactive = true,
  tabIndex,
  onClick,
  items = DEFAULT_DROPDOWN_ITEMS,
  onItemSelect,
  isOpen: forceOpen,
}: SplitButtonProps) => {
  const tokens = getComponentSurface(theme);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(false);
  const [pressedIcon, setPressedIcon] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [itemHovered, setItemHovered] = useState<string | null>(null);
  const [itemPressed, setItemPressed] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const isDisabled = state === "disabled";
  const isModern = tokens.theme.includes("Modern");
  const radius = isModern ? 4 : 1;

  const isDropdownOpen = typeof forceOpen === "boolean" ? forceOpen : dropdownOpen;

  const defaultBg = tokens.bg;
  const hoverBg = tokens.surfaceAlt;
  const pressedBg = pressedBgByTheme[tokens.theme] ?? tokens.surfaceAlt;

  const isTabsPressed = state === "pressed" || (interactive && pressed && !isDisabled);
  const isTabsHover = state === "hover" || (interactive && hovered && !isDisabled);

  const isIconPressed = state === "pressed" || (interactive && pressedIcon && !isDisabled);
  const isIconHover = state === "hover" || (interactive && hoveredIcon && !isDisabled);

  const defaultText = tokens.fg;
  const pressedText =
    tokens.theme === "Light Classic" || tokens.theme === "Modern Dark"
      ? "#FFFFFF"
      : defaultText;

  const iconDefaultColor =
    type === "iconLeft" && tokens.theme === "Modern Dark" ? "#F3F3F3" : defaultText;

  const tabsTextColor = isDisabled ? tokens.muted : isTabsPressed ? pressedText : defaultText;
  const isIconActive = isIconPressed || (type === "dropDown" && isDropdownOpen);
  const iconTextColor = isDisabled ? tokens.muted : isIconActive ? pressedText : iconDefaultColor;

  const buttonPartBg =
    type === "tabs"
      ? isTabsPressed
        ? pressedBg
        : isTabsHover
          ? hoverBg
          : defaultBg
      : defaultBg;

  const iconPartBg =
    isIconActive
      ? pressedBg
      : isIconHover
        ? hoverBg
        : defaultBg;

  const commonButtonStyle: CSSProperties = {
    height: 24,
    border: "none",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: isModern ? 12 : 11,
    lineHeight: "16px",
    fontWeight: isModern ? 400 : type === "tabs" ? 400 : 700,
    letterSpacing: isModern ? 0.24 : 0.22,
    cursor: isDisabled ? "not-allowed" : "pointer",
    boxSizing: "border-box",
    whiteSpace: "nowrap",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const iconPartStyle: CSSProperties = {
    ...commonButtonStyle,
    background: iconPartBg,
    color: iconTextColor,
  };


  // Close dropdown on outside click
  useEffect(() => {
    if (!interactive || !dropdownOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [interactive, dropdownOpen]);

  const handleChevronClick = () => {
    if (!interactive || isDisabled) return;
    setDropdownOpen((prev) => !prev);
  };

  const handleItemClick = (item: DropdownItem) => {
    if (!interactive || item.disabled) return;
    onItemSelect?.(item.id);
    setDropdownOpen(false);
  };

  const dropdownTextStyle: CSSProperties = {
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: isModern ? 12 : 11,
    lineHeight: "16px",
    letterSpacing: isModern ? 0.24 : 0.22,
  };

  return (
    <div
      ref={type === "dropDown" ? containerRef : undefined}
      onMouseEnter={() => interactive && type === "tabs" && setHovered(true)}
      onMouseLeave={() => {
        if (!interactive) return;
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => interactive && !isDisabled && type === "tabs" && setPressed(true)}
      onMouseUp={() => interactive && !isDisabled && type === "tabs" && setPressed(false)}
      style={{
        display: "inline-block",
        position: type === "dropDown" ? "relative" : undefined,
      }}
    >
      <div
        style={{
          display: "inline-flex",
          borderRadius: type === "tabs" ? 31 : radius,
          overflow: "hidden",
          border: `1px solid ${
            type === "tabs" && isModern && isTabsPressed ? "transparent" : tokens.border
          }`,
          opacity: isDisabled ? 0.6 : 1,
        }}
      >
        {type === "tabs" ? (
          <button
            type="button"
            disabled={isDisabled}
            onClick={onClick}
            tabIndex={tabIndex}
            style={{
              ...commonButtonStyle,
              background: buttonPartBg,
              color: tabsTextColor,
              minWidth: 48,
              padding: "0 12px",
            }}
          >
            {label}
          </button>
        ) : null}

        {type === "iconLeft" ? (
          <button
            type="button"
            disabled={isDisabled}
            onClick={onClick}
            tabIndex={tabIndex}
            onMouseEnter={() => interactive && !isDisabled && setHovered(true)}
            onMouseLeave={() => {
              if (!interactive) return;
              setHovered(false);
              setPressed(false);
            }}
            onMouseDown={() => interactive && !isDisabled && setPressed(true)}
            onMouseUp={() => interactive && !isDisabled && setPressed(false)}
            style={{
              ...commonButtonStyle,
              background: isTabsPressed ? pressedBg : isTabsHover ? hoverBg : defaultBg,
              color: isDisabled ? tokens.muted : isTabsPressed ? pressedText : iconDefaultColor,
              padding: "0 12px",
              gap: 4,
              justifyContent: "flex-start",
            }}
          >
            <SvgIcon
              name="highlight"
              size={20}
              color={isDisabled ? tokens.muted : isTabsPressed ? pressedText : iconDefaultColor}
              monochrome
            />
            <span>{label}</span>
          </button>
        ) : null}

        {type === "dropDown" ? (
          <>
            <button
              type="button"
              disabled={isDisabled}
              onClick={handleChevronClick}
              tabIndex={tabIndex}
              onMouseEnter={() => interactive && !isDisabled && setHoveredIcon(true)}
              onMouseLeave={() => { setHoveredIcon(false); setPressedIcon(false); }}
              onMouseDown={() => interactive && !isDisabled && setPressedIcon(true)}
              onMouseUp={() => setPressedIcon(false)}
              style={{
                ...commonButtonStyle,
                background: defaultBg,
                color: isDisabled ? tokens.muted : defaultText,
                minWidth: 96,
                padding: "0 12px",
              }}
            >
              {label}
            </button>

            <button
              type="button"
              disabled={isDisabled}
              aria-label="Open menu"
              aria-expanded={isDropdownOpen}
              onClick={handleChevronClick}
              onMouseEnter={() => interactive && !isDisabled && setHoveredIcon(true)}
              onMouseLeave={() => { setHoveredIcon(false); setPressedIcon(false); }}
              onMouseDown={() => interactive && !isDisabled && setPressedIcon(true)}
              onMouseUp={() => setPressedIcon(false)}
              style={{
                ...iconPartStyle,
                width: 24,
                minWidth: 24,
                padding: 0,
                borderLeft: `1px solid ${tokens.border}`,
              }}
            >
              <SvgIcon
                name="chevron"
                size={8}
                color={iconTextColor}
                monochrome
                style={{
                  transform: isDropdownOpen ? "rotate(180deg)" : "none",
                  transition: "transform 120ms linear",
                }}
              />
            </button>
          </>
        ) : null}
      </div>

      {type === "dropDown" && isDropdownOpen ? (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 2px)",
            left: 0,
            zIndex: 100,
            minWidth: "100%",
            border: `1px solid ${tokens.border}`,
            background: tokens.bg,
            borderRadius: 2,
            padding: "4px 0",
            boxSizing: "border-box",
          }}
        >
          {items.map((item) => {
            const isItemHovered = itemHovered === item.id && !item.disabled;
            const isItemPressed = itemPressed === item.id && !item.disabled;
            const itemBg = item.disabled
              ? "transparent"
              : isItemPressed
                ? pressedBg
                : isItemHovered
                  ? hoverBg
                  : "transparent";

            return (
              <button
                key={item.id}
                type="button"
                disabled={item.disabled}
                onMouseEnter={() => interactive && setItemHovered(item.id)}
                onMouseLeave={() => {
                  interactive && setItemHovered(null);
                  interactive && setItemPressed(null);
                }}
                onMouseDown={() => interactive && !item.disabled && setItemPressed(item.id)}
                onMouseUp={() => interactive && setItemPressed(null)}
                onClick={() => handleItemClick(item)}
                style={{
                  ...dropdownTextStyle,
                  width: "100%",
                  minHeight: 26,
                  border: "none",
                  borderRadius: 0,
                  background: itemBg,
                  padding: "5px 20px",
                  color: item.disabled ? tokens.muted : tokens.fg,
                  display: "flex",
                  alignItems: "center",
                  boxSizing: "border-box",
                  fontWeight: 400,
                  cursor: item.disabled ? "default" : "pointer",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
