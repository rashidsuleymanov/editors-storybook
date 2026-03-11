import type { Meta, StoryObj } from "@storybook/react-vite";
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
  title: "Foundations/Colors",
  parameters: {
    docs: {
      description: {
        component: "Semantic token comparison by theme.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const themeEntries = Object.entries(referenceThemeColors);

const prettifyTokenName = (tokenName: string, prefix: string) =>
  tokenName
    .replace(prefix, "")
    .replace(/^-+/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

export const Palette: Story = {
  render: () => (
    <DocPage title="Colors" description="Сравнение семантических токенов по темам.">
      <div style={{ display: "grid", gap: 20 }}>
        {tokenGroups.map((group) => {
          const tokenNames = Array.from(
            new Set(
              themeEntries.flatMap(([, tokens]) =>
                Object.keys(tokens).filter((tokenName) => tokenName.startsWith(group.prefix)),
              ),
            ),
          ).sort((a, b) => a.localeCompare(b));

          if (tokenNames.length === 0) {
            return null;
          }

          return (
            <section
              key={group.prefix}
              style={{
                border: "1px solid var(--page-border, #d1d5db)",
                borderRadius: 12,
                overflow: "hidden",
                background: "var(--page-bg, #ffffff)",
              }}
            >
              <div
                style={{
                  padding: "12px 14px",
                  fontWeight: 700,
                  borderBottom: "1px solid var(--page-border, #d1d5db)",
                  background: "var(--page-surface, #f7f7f7)",
                }}
              >
                {group.label}
              </div>

              <div style={{ overflowX: "auto" }}>
                <div
                  style={{
                    minWidth: 760,
                    display: "grid",
                    gridTemplateColumns: `220px repeat(${themeEntries.length}, minmax(220px, 1fr))`,
                  }}
                >
                  <div
                    style={{
                      padding: "10px 12px",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "var(--page-muted, rgba(0,0,0,0.7))",
                      borderBottom: "1px solid var(--page-border, #d1d5db)",
                    }}
                  >
                    Token
                  </div>
                  {themeEntries.map(([themeName]) => (
                    <div
                      key={`${group.prefix}-${themeName}-header`}
                      style={{
                        padding: "10px 12px",
                        fontSize: 12,
                        fontWeight: 700,
                        color: "var(--page-muted, rgba(0,0,0,0.7))",
                        borderBottom: "1px solid var(--page-border, #d1d5db)",
                        borderLeft: "1px solid var(--page-border, #d1d5db)",
                      }}
                    >
                      {themeName}
                    </div>
                  ))}

                  {tokenNames.map((tokenName, index) => (
                    <FragmentRow
                      key={tokenName}
                      index={index}
                      tokenLabel={prettifyTokenName(tokenName, group.prefix)}
                      tokenName={tokenName}
                    />
                  ))}
                </div>
              </div>
            </section>
          );
        })}

      </div>
    </DocPage>
  ),
};

type FragmentRowProps = {
  index: number;
  tokenLabel: string;
  tokenName: string;
};

const FragmentRow = ({ index, tokenLabel, tokenName }: FragmentRowProps) => {
  const rowBackground = index % 2 === 0 ? "var(--page-bg, #ffffff)" : "var(--page-surface, #fafafa)";

  return (
    <>
      <div
        style={{
          padding: "10px 12px",
          fontSize: 12,
          fontWeight: 700,
          background: rowBackground,
          borderBottom: "1px solid var(--page-border, #d1d5db)",
        }}
      >
        <div>{tokenLabel}</div>
        <div style={{ marginTop: 2, fontSize: 11, fontWeight: 400, color: "var(--page-muted, rgba(0,0,0,0.6))" }}>
          {tokenName}
        </div>
      </div>

      {themeEntries.map(([themeName, tokens]) => {
        const rawValue = tokens[tokenName as keyof typeof tokens];

        return (
          <div
            key={`${themeName}-${tokenName}`}
            style={{
              display: "grid",
              gridTemplateColumns: "56px 1fr",
              gap: 10,
              alignItems: "center",
              padding: "10px 12px",
              background: rowBackground,
              borderLeft: "1px solid var(--page-border, #d1d5db)",
              borderBottom: "1px solid var(--page-border, #d1d5db)",
            }}
          >
            {rawValue ? (
              <>
                <div
                  style={{
                    height: 28,
                    borderRadius: 6,
                    border: "1px solid rgba(0,0,0,0.08)",
                    background: String(rawValue),
                  }}
                />
                <div style={{ fontSize: 11, color: "var(--page-muted, rgba(0,0,0,0.75))" }}>{String(rawValue)}</div>
              </>
            ) : (
              <>
                <div
                  style={{
                    height: 28,
                    borderRadius: 6,
                    border: "1px dashed var(--page-border, #d1d5db)",
                    background: "transparent",
                  }}
                />
                <div style={{ fontSize: 11, color: "var(--page-muted, rgba(0,0,0,0.5))" }}>Not set</div>
              </>
            )}
          </div>
        );
      })}
    </>
  );
};
