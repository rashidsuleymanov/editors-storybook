import type { Meta, StoryObj } from "@storybook/react-vite";
import { SvgIcon } from "../../components/shared/SvgIcon";
import { iconSvgs } from "../../data/icon-svgs";

const meta: Meta = {
  title: "Pages/Icons",
  parameters: {
    docs: {
      description: {
        component: "Icon catalog used by components across the kit.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const iconEntries = Object.keys(iconSvgs)
  .sort((left, right) => left.localeCompare(right))
  .map((name) => ({ name }));

export const Catalog: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ color: "var(--page-muted)", fontSize: 12 }}>
        Total icons: {iconEntries.length}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 10,
        }}
      >
        {iconEntries.map(({ name }) => (
          <div
            key={name}
            style={{
              border: "1px solid var(--page-border)",
              background: "var(--page-surface)",
              borderRadius: 6,
              padding: 8,
              display: "grid",
              gridTemplateColumns: "24px 1fr",
              gap: 8,
              alignItems: "center",
            }}
          >
            <span
              style={{
                width: 24,
                height: 24,
                borderRadius: 4,
                background: "var(--page-bg)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid var(--page-border)",
              }}
            >
              <SvgIcon name={name} size={16} />
            </span>
            <span style={{ fontSize: 11, lineHeight: "16px", color: "var(--page-fg)" }}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

