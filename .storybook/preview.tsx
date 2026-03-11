import type { Preview } from "@storybook/react-vite";
import { globalColors } from "../src/themes/globalColors";
import { themeTokens } from "../src/data/theme-tokens";

import "./preview.css";
import "../src/styles/components/dialog-button.css";
import "../src/styles/components/plugin-buttons.css";
import "../src/styles/components/cards.css";
import "../src/styles/components/checkbox.css";
import "../src/styles/components/radio.css";
import "../src/styles/components/common-controls.css";

const DEFAULT_THEME = "Light";

const THEME_ALIASES: Record<string, keyof typeof themeTokens> = {
  light: "Light",
  lightclassic: "Light Classic",
  modernlight: "Modern Light",
  moderndark: "Modern Dark",
  dark: "Dark",
  darkcontrast: "Dark Contrast",
};

const normalizeThemeName = (
  rawTheme: string | null | undefined
): keyof typeof themeTokens => {
  if (!rawTheme) return DEFAULT_THEME;

  const cleaned = decodeURIComponent(rawTheme)
    .replace(/^!/, "")
    .trim();
  const compact = cleaned.replace(/[\s_-]+/g, "").toLowerCase();

  return THEME_ALIASES[compact] ?? DEFAULT_THEME;
};

const resolveThemeFromUrl = (): string | null => {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const globals = params.get("globals");
  if (!globals) return null;

  const match = globals.match(/(?:^|;)theme:([^;]+)/);
  if (!match?.[1]) return null;
  return decodeURIComponent(match[1]);
};

const isDocsViewFromUrl = (): boolean => {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  return params.get("viewMode") === "docs";
};

const preview: Preview = {
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global Storybook theme",
      defaultValue: "Light",
      toolbar: {
        icon: "paintbrush",
        items: [
          "Light",
          "Light Classic",
          "Modern Light",
          "Modern Dark",
          "Dark",
          "Dark Contrast",
        ],
      },
    },
  },
  parameters: {
    backgrounds: { disable: true },
    options: {
      storySort: {
        order: [
          "Foundations",
          ["Typography", "Colors", "Icons", "Panel"],
          "Components",
          [
            "Buttons",
            [
              "Dialog Buttons",
              "Panel Buttons",
              "Icon Buttons",
              "Link Buttons",
              "Split Buttons",
              ["Drop Down", "Icon Left", "Tabs"],
            ],
            "Actions",
            ["Context Menu", "Preview Controls"],
            "Form",
            ["Checkbox", "Radio", "Switches", "Slider", "Text Field", "Text Area"],
            "Data Display",
            ["Cards", "Info Block", "Tabs"],
            "Layout",
            ["Header", "Modal Window", "Scroll"],
            "Feedback",
            ["Loader", "Tooltip"],
          ],
          "*",
        ],
      },
    },
    docs: {
      story: {
        inline: true,
      },
      toc: true,
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme =
        normalizeThemeName(
          (context.globals.theme as string | undefined) ?? resolveThemeFromUrl()
        );
      const isDocs = context.viewMode === "docs" || isDocsViewFromUrl();
      const isDarkTheme = theme === "Dark" || theme === "Dark Contrast";
      const tokens = themeTokens[theme];
      const backgroundByTheme: Record<string, string> = {
        Light: globalColors.white,
        "Light Classic": globalColors.white,
        "Modern Light": globalColors.white,
        "Modern Dark": "#404040",
        Dark: "#1E1E1E",
        "Dark Contrast": "#333333",
      };
      const textByTheme: Record<string, string> = {
        Light: globalColors.black,
        "Light Classic": globalColors.black,
        "Modern Light": globalColors.black,
        "Modern Dark": "#E8E8E8",
        Dark: "rgba(255, 255, 255, 0.85)",
        "Dark Contrast": "rgba(255, 255, 255, 0.90)",
      };

      const pageBg =
        tokens.pageBg ?? backgroundByTheme[theme] ?? globalColors.white;
      const baseFg = tokens?.pageFg ?? textByTheme[theme] ?? globalColors.black;
      const pageFg = baseFg;
      const pageSurface =
        tokens?.pageSurface ?? (isDarkTheme ? "rgba(255, 255, 255, 0.04)" : "#f9fafb");
      const pageSurfaceAlt =
        tokens?.pageSurfaceAlt ?? pageSurface;
      const pageBorder =
        tokens?.pageBorder ?? (isDarkTheme ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)");
      const pageMuted =
        tokens?.pageMuted ??
        (isDarkTheme ? "rgba(255, 255, 255, 0.60)" : "rgba(0, 0, 0, 0.60)");

      if (typeof document !== "undefined") {
        const root = document.documentElement;
        root.style.setProperty("--page-bg", pageBg);
        root.style.setProperty("--page-fg", pageFg);
        root.style.setProperty("--page-border", pageBorder);
        root.style.setProperty("--page-surface", pageSurface);
        root.style.setProperty("--page-surface-alt", pageSurfaceAlt);
        root.style.setProperty("--page-muted", pageMuted);
        root.style.setProperty("--page-accent", isDarkTheme ? "#4d9dff" : "#0b6dff");
        root.dataset.pluginTheme = theme.replace(/\s+/g, "-").toLowerCase();
      }

      return (
        <div
          style={{
            backgroundColor: pageBg,
            color: pageFg,
            padding: isDocs ? "0" : "20px",
            minHeight: 0,
            width: "100%",
            ["--page-bg" as string]: pageBg,
            ["--page-fg" as string]: pageFg,
            ["--page-border" as string]: pageBorder,
            ["--page-surface" as string]: pageSurface,
            ["--page-surface-alt" as string]: pageSurfaceAlt,
            ["--page-muted" as string]: pageMuted,
          }}
        >
          <Story />
        </div>
      );
    },
  ],
  tags: ["autodocs"],
};

export default preview;
