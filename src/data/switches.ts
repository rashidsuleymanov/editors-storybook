import { type PluginTheme } from "../components/shared/pluginTheme";

type SwitchVisual = {
  track: string;
  thumb: string;
  opacity?: number;
};

type SwitchStateTokens = {
  off: SwitchVisual;
  on: SwitchVisual;
};

export type SwitchState = "default" | "hover" | "disabled";

export const switchTokens: Record<PluginTheme, Record<SwitchState, SwitchStateTokens>> = {
  Light: {
    default: {
      off: { track: "#C0C0C0", thumb: "#FFFFFF" },
      on: { track: "rgba(0, 0, 0, 0.80)", thumb: "#FFFFFF" },
    },
    hover: {
      off: { track: "#C0C0C0", thumb: "#FFFFFF" },
      on: { track: "rgba(0, 0, 0, 0.80)", thumb: "#FFFFFF" },
    },
    disabled: {
      off: { track: "#EFEFEF", thumb: "#FFFFFF" },
      on: { track: "rgba(0, 0, 0, 0.50)", thumb: "#FFFFFF" },
    },
  },
  "Light Classic": {
    default: {
      off: { track: "#CFCFCF", thumb: "#FFFFFF" },
      on: { track: "#444444", thumb: "#FFFFFF" },
    },
    hover: {
      off: { track: "#CFCFCF", thumb: "#FFFFFF" },
      on: { track: "#444444", thumb: "#FFFFFF" },
    },
    disabled: {
      off: { track: "#F1F1F1", thumb: "#FFFFFF" },
      on: { track: "#A5A5A5", thumb: "#FFFFFF" },
    },
  },
  Dark: {
    default: {
      off: { track: "#666666", thumb: "#333333" },
      on: { track: "rgba(255, 255, 255, 0.80)", thumb: "#333333" },
    },
    hover: {
      off: { track: "#666666", thumb: "#333333" },
      on: { track: "rgba(255, 255, 255, 0.80)", thumb: "#333333" },
    },
    disabled: {
      off: { track: "#505050", thumb: "#333333" },
      on: { track: "rgba(255, 255, 255, 0.50)", thumb: "#333333" },
    },
  },
  "Dark Contrast": {
    default: {
      off: { track: "#696969", thumb: "#1E1E1E" },
      on: { track: "#E8E8E8", thumb: "#1E1E1E" },
    },
    hover: {
      off: { track: "#696969", thumb: "#1E1E1E" },
      on: { track: "#E8E8E8", thumb: "#1E1E1E" },
    },
    disabled: {
      off: { track: "#2A2A2A", thumb: "#1E1E1E" },
      on: { track: "#888888", thumb: "#1E1E1E" },
    },
  },
  "Modern Light": {
    default: {
      off: { track: "#92B7F0", thumb: "#FFFFFF" },
      on: { track: "#4A87E7", thumb: "#FFFFFF" },
    },
    hover: {
      off: { track: "#92B7F0", thumb: "#FFFFFF" },
      on: { track: "#4A87E7", thumb: "#FFFFFF" },
    },
    disabled: {
      off: { track: "#92B7F0", thumb: "#FFFFFF", opacity: 0.4 },
      on: { track: "#4A87E7", thumb: "#FFFFFF", opacity: 0.4 },
    },
  },
  "Modern Dark": {
    default: {
      off: { track: "#92B7F0", thumb: "#404040" },
      on: { track: "#6E9FEC", thumb: "#404040" },
    },
    hover: {
      off: { track: "#92B7F0", thumb: "#404040" },
      on: { track: "#6E9FEC", thumb: "#404040" },
    },
    disabled: {
      off: { track: "#92B7F0", thumb: "#404040", opacity: 0.4 },
      on: { track: "#6E9FEC", thumb: "#404040", opacity: 0.4 },
    },
  },
};
