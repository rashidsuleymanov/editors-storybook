import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, type TabsProps } from "../../components/Tabs/Tabs";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type StoryArgs = TabsProps & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
};

const meta: Meta<StoryArgs> = {
  title: "Components/Data Display/Tabs",
  component: Tabs,
  args: {
    activeId: "paragraph",
    state: "default",
    hoveredId: "table",
    interactive: true,
    withIcon: false,
    themeMode: "Auto",
  },
  argTypes: {
    activeId: { control: "text", description: "Currently selected tab id" },
    state: {
      control: "select",
      options: ["default", "hover"],
      description: "Rendered visual state used for reference-only tab styling",
    },
    hoveredId: {
      control: "text",
      description: "Tab id used when the hover state is forced for reference",
    },
    interactive: {
      control: "boolean",
      description: "Allow hover and selection changes in the canvas",
    },
    withIcon: { control: "boolean", description: "Show leading icons in the tab labels" },
    scaled: { control: "boolean", description: "Stretch tabs to fill the full container width" },
    items: { control: "object", description: "Tab definitions with ids and labels" },
    themeMode: {
      name: "theme",
      control: "select",
      options: ["Auto", ...pluginThemeOptions],
      description: "Auto = current Storybook toolbar theme",
    },
    theme: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Horizontal tabs for compact mode switching inside panels and dialogs, with optional icons and live hover behavior.",
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

const InteractiveTabs = ({ args, theme }: { args: StoryArgs; theme: string }) => {
  const [activeId, setActiveId] = useState(args.activeId ?? "paragraph");
  return <Tabs {...args} activeId={activeId} theme={theme} onChange={setActiveId} />;
};

export const Default: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <InteractiveTabs args={args} theme={theme} />;
  },
};

export const IconTabs: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <InteractiveTabs args={{ ...args, withIcon: true }} theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Tabs with leading icons for richer navigation labels.",
      },
    },
  },
};

export const HoveredTabs: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <InteractiveTabs args={{ ...args, state: "default", activeId: "paragraph", interactive: true }} theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive hover demo where a non-selected tab can be highlighted. Move the pointer over another tab in the canvas.",
      },
    },
  },
};

export const HoveredSelected: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <InteractiveTabs args={{ ...args, state: "default", activeId: "paragraph", interactive: true }} theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive hover demo when the selected tab is also under the pointer. Move the pointer over the active tab in the canvas.",
      },
    },
  },
};




