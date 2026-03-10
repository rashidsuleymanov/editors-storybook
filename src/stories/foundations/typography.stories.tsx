import type { Meta, StoryObj } from "@storybook/react-vite";
import { DocPage } from "../_shared/DocPage";
import {
  typographyContentExample,
  typographyTokens,
} from "../../data/typography";

const meta: Meta = {
  title: "Pages/Typography",
  parameters: {
    docs: {
      description: {
        component:
          "Typography styles and text hierarchy across all themes.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Preview: Story = {
  render: () => (
    <DocPage
      title="Typography"
      description="Base type scale for plugin UI and content examples for light/dark surfaces."
    >
      <div style={{ display: "grid", gap: 20 }}>
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
            Text styles
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "140px 110px 110px 1fr" }}>
            <div style={{ padding: 10, fontWeight: 700, borderBottom: "1px solid var(--page-border, #d1d5db)" }}>
              Role
            </div>
            <div style={{ padding: 10, fontWeight: 700, borderBottom: "1px solid var(--page-border, #d1d5db)" }}>
              Size
            </div>
            <div style={{ padding: 10, fontWeight: 700, borderBottom: "1px solid var(--page-border, #d1d5db)" }}>
              Weight
            </div>
            <div style={{ padding: 10, fontWeight: 700, borderBottom: "1px solid var(--page-border, #d1d5db)" }}>
              Preview
            </div>
          </div>
          {typographyTokens.map((style, index) => (
            <div
              key={style.id}
              style={{
                display: "grid",
                gridTemplateColumns: "140px 110px 110px 1fr",
                background:
                  index % 2 === 0
                    ? "var(--page-bg, #ffffff)"
                    : "var(--page-surface-alt, #efefef)",
                borderBottom:
                  index === typographyTokens.length - 1
                    ? "none"
                    : "1px solid var(--page-border, #d1d5db)",
              }}
            >
              <div style={{ padding: 10 }}>{style.role}</div>
              <div style={{ padding: 10 }}>{style.sizeLabel}</div>
              <div style={{ padding: 10 }}>{style.weightLabel}</div>
              <div style={{ padding: 10 }}>
                <div
                  style={{
                    fontFamily: style.fontFamily,
                    fontSize: style.fontSize,
                    fontWeight: style.fontWeight,
                    lineHeight: `${style.lineHeight}px`,
                    letterSpacing: `${style.letterSpacing}px`,
                    color: "var(--page-fg, #111111)",
                  }}
                >
                  Lorem ipsum dolor sit amet
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gap: 12,
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          {[
            { title: "Content example (light)", tokens: typographyContentExample.light },
            { title: "Content example (dark)", tokens: typographyContentExample.dark },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                border: "1px solid var(--page-border, #d1d5db)",
                borderRadius: 12,
                padding: 16,
                background: item.tokens.background,
                display: "grid",
                gap: 8,
              }}
            >
              <div style={{ color: item.tokens.titleColor, fontSize: 14, fontWeight: 700 }}>
                Navigation
              </div>
              <div style={{ color: item.tokens.bodyColor, fontSize: 12, fontWeight: 700 }}>
                Header
              </div>
              <div style={{ color: item.tokens.captionColor, fontSize: 11 }}>
                Caption caption. Caption caption.
              </div>
              <div style={{ color: item.tokens.bodyColor, fontSize: 11, lineHeight: "16px" }}>
                Text block text block. Text block text block. Text block text block.
              </div>
            </div>
          ))}
        </div>
      </div>
    </DocPage>
  ),
};

