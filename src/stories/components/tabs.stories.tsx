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
    activeId: { control: "text", description: "Active tab id" },
    state: {
      control: "select",
      options: ["default", "hover"],
      description: "Visual state",
    },
    hoveredId: {
      control: "text",
      description: "When state=hover, which tab id should be rendered as hovered",
    },
    interactive: {
      control: { type: "boolean" },
      description: "Enable runtime hover behavior",
    },
    withIcon: { control: { type: "boolean" }, description: "Show icon in tabs" },
    items: { control: "object", description: "Tab items" },
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
        component: "Tabs component with selected, hover, and icon variants.",
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
};

export const HoveredTabs: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <Tabs {...args} state="hover" hoveredId="table" interactive activeId="paragraph" theme={theme} />;
  },
};

export const HoveredSelected: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <Tabs {...args} state="hover" interactive activeId="paragraph" hoveredId="paragraph" theme={theme} />;
  },
};



