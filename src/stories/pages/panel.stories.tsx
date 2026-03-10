import type { Meta, StoryObj } from "@storybook/react-vite";
import { SvgIcon } from "../../components/shared/SvgIcon";
import {
  panelBaseMetrics,
  panelSizeMetrics,
  panelThemeTokens,
  type PanelSizePreset,
  type PanelTheme,
} from "../../data/panel";

const meta: Meta = {
  title: "Pages/Panel",
};

export default meta;
type Story = StoryObj;

const resolvePanelTheme = (theme: string): PanelTheme =>
  (Object.keys(panelThemeTokens).includes(theme) ? theme : "Light") as PanelTheme;

const isModernSize = (width: number) => width === 257 || width === 553;

const PanelFrame = ({
  width,
  title,
  subtitle,
  surface,
  headerSurface,
  border,
  titleColor,
  bodyColor,
  linkColor,
  height = panelBaseMetrics.heights.panel,
}: {
  width: number;
  title: string;
  subtitle: string;
  surface: string;
  headerSurface: string;
  border: string;
  titleColor: string;
  bodyColor: string;
  linkColor: string;
  height?: number;
}) => (
  <div
    style={{
      width,
      height,
      background: surface,
      border: `1px solid ${border}`,
      borderRadius: 8,
      overflow: "hidden",
      position: "relative",
      boxSizing: "border-box",
    }}
  >
    <div
      style={{
        height: panelBaseMetrics.heights.header,
        borderBottom: `1px solid ${border}`,
        background: headerSurface,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `0 ${panelBaseMetrics.paddings.headerX}px`,
        boxSizing: "border-box",
      }}
    >
      <span
        style={{
          color: titleColor,
          fontSize: 12,
          lineHeight: "16px",
          letterSpacing: "0.24px",
          fontWeight: 700,
          fontFamily: "Arial, sans-serif",
        }}
      >
        {title}
      </span>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
        {isModernSize(width) && (
          <SvgIcon
            name="arrowLeft"
            size={16}
            color={titleColor}
            monochrome
            style={{ transform: "rotate(180deg)" }}
          />
        )}
        <SvgIcon
          name={isModernSize(width) ? "close" : "closeMin"}
          size={isModernSize(width) ? 16 : 12}
          color={titleColor}
          monochrome
        />
      </div>
    </div>

    <div
      style={{
        padding: `${panelBaseMetrics.paddings.contentY}px ${panelBaseMetrics.paddings.contentX}px`,
        display: "grid",
        gap: 8,
      }}
    >
      <div style={{ color: bodyColor, fontSize: 12, lineHeight: "16px" }}>{subtitle}</div>
    </div>

    <div
      style={{
        position: "absolute",
        left: 12,
        bottom: 10,
        color: linkColor,
        fontSize: 11,
        lineHeight: "16px",
        letterSpacing: "0.22px",
        borderBottom: `1px dashed ${linkColor}`,
      }}
    >
      Reconfigure
    </div>
  </div>
);

const PanelByPreset = ({ preset, theme }: { preset: PanelSizePreset; theme: PanelTheme }) => {
  const tokens = panelThemeTokens[theme];
  const size = panelSizeMetrics[theme][preset];

  return (
    <PanelFrame
      width={size.width}
      height={size.height}
      title="Title"
      subtitle="Content"
      surface={tokens.surface}
      headerSurface={tokens.headerSurface}
      border={tokens.border}
      titleColor={tokens.title}
      bodyColor={tokens.body}
      linkColor={tokens.link}
    />
  );
};

const resolveStoryTheme = (context: { globals: Record<string, unknown> }) => {
  const selectedTheme = String(context.globals.theme ?? "Light");
  return resolvePanelTheme(selectedTheme);
};

export const BasicSize: Story = {
  render: (_, context) => {
    const resolvedTheme = resolveStoryTheme(context);
    return <PanelByPreset preset="Basic" theme={resolvedTheme} />;
  },
};

export const WideSize: Story = {
  render: (_, context) => {
    const resolvedTheme = resolveStoryTheme(context);
    return <PanelByPreset preset="Wide" theme={resolvedTheme} />;
  },
};


