import type { Meta, StoryObj } from "@storybook/react-vite";
import colors from "../../data/colors";
import { referenceThemeColors } from "../../data/reference-theme-colors";
import { DocPage } from "../_shared/DocPage";

const tokenGroups = [
  { label: "Background", prefix: "--background-" },
  { label: "Highlight", prefix: "--highlight-" },
  { label: "Border", prefix: "--border-" },
  { label: "Text", prefix: "--text-" },
  { label: "Icon", prefix: "--icon-" },
  { label: "Canvas", prefix: "--canvas-" },
  { label: "Toolbar Header", prefix: "--toolbar-header-" },
] as const;

const meta: Meta = {
  title: "Pages/Colors",
  parameters: {
    docs: {
      description: {
        component:
          "Theme color palettes and semantic color tokens.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const normalizeSwatch = (rawValue: string) => {
  const value = String(rawValue);
  const [hexRaw, alphaRaw] = value.split("|").map((part) => part.trim());
  const hex = hexRaw.startsWith("#") ? hexRaw : `#${hexRaw}`;

  if (!alphaRaw) {
    return { swatch: hex, display: value };
  }

  const alphaValue = Number.parseInt(alphaRaw.replace("%", ""), 10);
  if (Number.isNaN(alphaValue)) {
    return { swatch: hex, display: value };
  }

  const normalizedAlpha = alphaValue / 100;
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return {
    swatch: `rgba(${r}, ${g}, ${b}, ${normalizedAlpha.toFixed(2)})`,
    display: `${hex} / ${alphaValue}%`,
  };
};

export const Palette: Story = {
  render: () => (
    <DocPage
      title="Colors"
      description="Light and Light Classic tokens are from the additional export where tokens were separated from the Main sheet."
    >
      <div style={{ display: "grid", gap: 24 }}>
        <div style={{ display: "grid", gap: 16 }}>
          {Object.entries(referenceThemeColors).map(([themeName, themeTokens]) => (
            <div
              key={themeName}
              style={{
                border: "1px solid var(--page-border, #d1d5db)",
                borderRadius: 12,
                overflow: "hidden",
                background: "var(--page-surface, #f7f7f7)",
              }}
            >
              <div
                style={{
                  padding: 12,
                  fontWeight: 700,
                  borderBottom: "1px solid var(--page-border, #d1d5db)",
                }}
              >
                {themeName} tokens
              </div>

              <div style={{ display: "grid", gap: 16, padding: 12 }}>
                {tokenGroups.map((group) => {
                  const groupItems = Object.entries(themeTokens)
                    .filter(([name]) => name.startsWith(group.prefix))
                    .sort(([a], [b]) => a.localeCompare(b));

                  if (groupItems.length === 0) return null;

                  return (
                    <div key={`${themeName}-${group.prefix}`} style={{ display: "grid", gap: 8 }}>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{group.label}</div>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                          gap: 8,
                        }}
                      >
                        {groupItems.map(([tokenName, tokenValue]) => (
                          <div
                            key={tokenName}
                            style={{
                              border: "1px solid var(--page-border, #d1d5db)",
                              borderRadius: 8,
                              overflow: "hidden",
                              background: "var(--page-bg, #ffffff)",
                            }}
                          >
                            <div style={{ height: 32, background: tokenValue }} />
                            <div style={{ padding: 8, display: "grid", gap: 4 }}>
                              <div style={{ fontSize: 11, fontWeight: 700 }}>{tokenName}</div>
                              <div style={{ fontSize: 11, color: "var(--page-muted, rgba(0,0,0,0.6))" }}>
                                {tokenValue}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            border: "1px solid var(--page-border, #d1d5db)",
            borderRadius: 12,
            overflow: "hidden",
            background: "var(--page-surface, #f7f7f7)",
          }}
        >
          <div
            style={{
              padding: 12,
              fontWeight: 700,
              borderBottom: "1px solid var(--page-border, #d1d5db)",
            }}
          >
            Main export palette (legacy list)
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: 8,
              padding: 12,
            }}
          >
            {colors.items.map((item, index) => {
              const key = `${item.name}-${item.value}-${index}`;
              const swatch = normalizeSwatch(String(item.value));

              return (
                <div
                  key={key}
                  style={{
                    border: "1px solid var(--page-border, #d1d5db)",
                    borderRadius: 8,
                    overflow: "hidden",
                    background: "var(--page-bg, #ffffff)",
                  }}
                >
                  <div style={{ height: 38, background: swatch.swatch }} />
                  <div style={{ padding: 8, display: "grid", gap: 4 }}>
                    <div style={{ fontWeight: 700, fontSize: 12 }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: "var(--page-muted, rgba(0,0,0,0.6))" }}>
                      {swatch.display}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DocPage>
  ),
};

