import { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Scroll, type ScrollProps } from "../../components/Scroll/Scroll";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type StoryArgs = ScrollProps & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
};

const meta: Meta<StoryArgs> = {
  title: "Components/Layout/Scroll",
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
      description: "Vertical or horizontal scrollbar layout",
    },
    size: { control: "select", options: ["XS", "S", "M"], description: "Scrollbar thickness preset" },
    type: {
      control: "select",
      options: ["withButtons", "withoutButtons"],
      description: "Scrollbar with arrow buttons or without them",
    },
    state: {
      control: "select",
      options: ["default", "hover", "pressed"],
      description: "Static visual state used when interactive mode is off",
    },
    length: { control: "number", description: "Rendered scrollbar length in px" },
    viewportSize: { control: "number", description: "Visible viewport size used to compute the thumb ratio" },
    contentSize: { control: "number", description: "Scrollable content size used to compute the thumb ratio" },
    step: { control: "number", description: "Scroll increment for arrow buttons and keyboard input" },
    interactive: {
      control: "boolean",
      description: "Allow hover, drag, click, wheel, and arrow-button interaction in the canvas",
    },
    isHovered: { control: "boolean", description: "Force hover appearance for review" },
    isPressed: { control: "boolean", description: "Force pressed appearance for review" },
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
          "Scrollbar variants for panel and canvas-like areas. Includes with-buttons and without-buttons styles, multiple thicknesses, and an interactive demo with dragging and wheel input.",
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
  parameters: {
    docs: {
      description: {
        story: "Medium scrollbar with arrow buttons.",
      },
    },
  },
};

export const WithoutButtonsM: Story = {
  name: "WithoutBtn M",
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <Scroll {...args} type="withoutButtons" size="M" theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Medium scrollbar without arrow buttons.",
      },
    },
  },
};

export const WithoutButtonsS: Story = {
  name: "WithoutBtn S",
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <Scroll {...args} type="withoutButtons" size="S" theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Slim scrollbar without arrow buttons.",
      },
    },
  },
};

export const WithoutButtonsXS: Story = {
  name: "WithoutBtn XS",
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <Scroll {...args} type="withoutButtons" size="XS" theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Extra-slim scrollbar for dense layouts.",
      },
    },
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
  parameters: {
    docs: {
      description: {
        story: "Horizontal scrollbar variant with arrow buttons.",
      },
    },
  },
};


