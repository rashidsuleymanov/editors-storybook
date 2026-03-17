import { useState } from "react";
import { resolveComponentTheme } from "../shared/pluginTheme";
import { switchTokens, type SwitchState } from "../../data/switches";

export type SwitchProps = {
  checked?: boolean;
  state?: SwitchState;
  interactive?: boolean;
  theme?: string;
  onChange?: (next: boolean) => void;
};

export const Switch = ({
  checked = false,
  state = "default",
  interactive = true,
  theme,
  onChange,
}: SwitchProps) => {
  const [hovered, setHovered] = useState(false);
  const resolvedTheme = resolveComponentTheme(theme);

  const isDisabled = state === "disabled";
  const isHover = state === "hover" || (interactive && hovered && !isDisabled);
  const effectiveState: SwitchState = isDisabled ? "disabled" : isHover ? "hover" : "default";
  const stateTokens = switchTokens[resolvedTheme][effectiveState];
  const token = checked ? stateTokens.on : stateTokens.off;


  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className="ui-switch"
      disabled={isDisabled}
      onMouseEnter={() => interactive && setHovered(true)}
      onMouseLeave={() => interactive && setHovered(false)}
      onClick={() => {
        if (isDisabled) return;
        onChange?.(!checked);
      }}
      onKeyDown={(event) => {
        if (isDisabled) return;
        if (event.key === " " || event.key === "Enter") {
          event.preventDefault();
          onChange?.(!checked);
        }
      }}
      style={{
        width: 30,
        height: 16,
        borderRadius: 8,
        border: token.trackBorder ? `1px solid ${token.trackBorder}` : "none",
        background: token.track,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: checked ? "flex-end" : "flex-start",
        padding: 1,
        boxSizing: "border-box",
        cursor: isDisabled ? "default" : "pointer",
        opacity: token.opacity ?? 1,
        transition: "all 120ms ease",
      }}
    >
      <span
        style={{
          width: 12,
          height: 12,
          borderRadius: 6,
          background: token.thumb,
          flexShrink: 0,
        }}
      />
    </button>
  );
};
