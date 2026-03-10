import { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Scroll, type ScrollProps } from "../../components/Scroll/Scroll";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type StoryArgs = ScrollProps & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
};

const meta: Meta<StoryArgs> = {
  title: "Components/Layout Components/Scroll",
  component: Scroll,
  args: {
    orientation: "vertical",
    size: "M",
    type: "withButtons",
    state: "default",
    length: 167,
    interactive: true,
    isHovered: false,
    isPressed: false,
    viewportSize: 160,
    contentSize: 520,
    step: 24,
    themeMode: "Auto",
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
      description: "Scroll orientation",
    },
    size: { control: "select", options: ["XS", "S", "M"], description: "Lift thickness (XS/S/M)" },
    type: {
      control: "select",
      options: ["withButtons", "withoutButtons"],
      description: "With arrows or without arrows",
    },
    state: {
      control: "select",
      options: ["default", "hover", "pressed"],
      description: "Base visual state (used when interactive=false)",
    },
    length: { control: "number", description: "Total scrollbar length in px" },
    viewportSize: { control: "number", description: "Viewport size for thumb ratio" },
    contentSize: { control: "number", description: "Content size for thumb ratio" },
    step: { control: "number", description: "Scroll step for buttons/keys" },
    interactive: {
      control: { type: "boolean" },
      description: "Enable hover/pressed/drag/click/wheel interactions",
    },
    isHovered: { control: { type: "boolean" }, description: "Force hover state (demo)" },
    isPressed: { control: { type: "boolean" }, description: "Force pressed state (demo)" },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    themeMode: {
      name: "theme",
      control: "select",
      options: ["Auto", ...pluginThemeOptions],
      description: "Auto = current Storybook toolbar theme",
    },
    theme: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Scroll split by kit groups: `WithBtn M`, `WithoutBtn M/S/XS`. Interactive story supports hover, pressed, click, drag and wheel.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

const resolveStoryTheme = (argsTheme: StoryArgs["themeMode"], globalTheme: string) => {
  if (argsTheme !== "Auto") return argsTheme;
  return normalizePluginTheme(globalTheme);
};

const paragraph =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const InteractiveDemo = ({ args, theme }: { args: StoryArgs; theme: string }) => {
  const viewport = Math.max(40, args.viewportSize ?? 160);
  const content = Math.max(viewport, args.contentSize ?? 520);
  const [value, setValue] = useState(0);

  const maxValue = Math.max(0, content - viewport);
  const normalized = Math.max(0, Math.min(value, maxValue));

  const paragraphsCount = Math.max(4, Math.ceil(content / 60));
  const contentBlock = useMemo(
    () => Array.from({ length: paragraphsCount }, (_, index) => `${paragraph} ${index + 1}.`),
    [paragraphsCount],
  );

  return (
    <div style={{ display: "inline-flex", alignItems: "stretch", gap: 12 }}>
      <div
        style={{
          width: 420,
          height: viewport,
          overflow: "hidden",
          border: "1px solid var(--page-border)",
          background: "var(--page-surface)",
          padding: "8px 10px",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        <div
          style={{
            transform: `translateY(${-normalized}px)`,
            transition: "transform 60ms linear",
            willChange: "transform",
          }}
        >
          {contentBlock.map((item, index) => (
            <p key={index} style={{ margin: index === 0 ? 0 : "0 0 10px", lineHeight: 1.4 }}>
              {item}
            </p>
          ))}
        </div>
      </div>

      <Scroll
        {...args}
        theme={theme}
        orientation="vertical"
        value={normalized}
        onValueChange={setValue}
        viewportSize={viewport}
        contentSize={content}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <InteractiveDemo args={args} theme={theme} />;
  },
};

export const WithButtonsM: Story = {
  name: "WithBtn M",
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <Scroll {...args} type="withButtons" size="M" theme={theme} />;
  },
};

export const WithoutButtonsM: Story = {
  name: "WithoutBtn M",
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <Scroll {...args} type="withoutButtons" size="M" theme={theme} />;
  },
};

export const WithoutButtonsS: Story = {
  name: "WithoutBtn S",
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <Scroll {...args} type="withoutButtons" size="S" theme={theme} />;
  },
};

export const WithoutButtonsXS: Story = {
  name: "WithoutBtn XS",
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <Scroll {...args} type="withoutButtons" size="XS" theme={theme} />;
  },
};

export const Horizontal: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return (
      <Scroll
        {...args}
        orientation="horizontal"
        type="withButtons"
        size="M"
        length={240}
        viewportSize={180}
        contentSize={500}
        theme={theme}
      />
    );
  },
};

