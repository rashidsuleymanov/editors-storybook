export const pluginThemeOptions = [
  "Light",
  "Light Classic",
  "Modern Light",
  "Modern Dark",
  "Dark",
  "Dark Contrast",
] as const;

type PluginTheme = (typeof pluginThemeOptions)[number];

const THEME_ALIASES: Record<string, PluginTheme> = {
  light: "Light",
  lightclassic: "Light Classic",
  modernlight: "Modern Light",
  moderndark: "Modern Dark",
  dark: "Dark",
  darkcontrast: "Dark Contrast",
};

export const normalizePluginTheme = (
  rawTheme: string | undefined,
  fallback: PluginTheme = "Light"
): PluginTheme => {
  if (!rawTheme) return fallback;
  const compact = rawTheme.replace(/[\s_-]+/g, "").toLowerCase();
  return THEME_ALIASES[compact] ?? fallback;
};

