import { describe, expect, it } from "vitest";
import { normalizePluginTheme } from "./theme";

describe("normalizePluginTheme", () => {
  it("maps compact aliases to known themes", () => {
    expect(normalizePluginTheme("Light")).toBe("Light");
    expect(normalizePluginTheme("light_classic")).toBe("Light Classic");
    expect(normalizePluginTheme("modern-dark")).toBe("Modern Dark");
    expect(normalizePluginTheme("dark contrast")).toBe("Dark Contrast");
  });

  it("falls back to Light for unknown values", () => {
    expect(normalizePluginTheme(undefined)).toBe("Light");
    expect(normalizePluginTheme("unknown-theme")).toBe("Light");
  });

  it("uses a custom fallback when provided", () => {
    expect(normalizePluginTheme("unknown-theme", "Dark")).toBe("Dark");
  });
});
