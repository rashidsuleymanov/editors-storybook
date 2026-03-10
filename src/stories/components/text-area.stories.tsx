import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextArea, type TextAreaProps } from "../../components/TextArea/TextArea";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type StoryArgs = TextAreaProps & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
};

const meta: Meta<StoryArgs> = {
  title: "Components/Form Controls/TextArea",
  component: TextArea,
  args: {
    label: "Title",
    caption: "Caption",
    state: "no-scroll",
    width: 236,
    height: 188,
    showLabel: true,
    showCaption: true,
    showCopyButton: true,
    interactive: true,
    isHovered: false,
    themeMode: "Auto",
  },
  argTypes: {
    label: { control: "text", description: "Top label" },
    caption: { control: "text", description: "Bottom caption text" },
    value: { control: "text", description: "Text content" },
    state: {
      control: "select",
      options: ["default", "hover", "disabled", "scroll", "no-scroll"],
      description: "Visual state",
    },
    width: { control: "number", description: "Outer width" },
    height: { control: "number", description: "Text area height" },
    showLabel: { control: { type: "boolean" }, description: "Show title row" },
    showCaption: { control: { type: "boolean" }, description: "Show caption under the field" },
    showCopyButton: { control: { type: "boolean" }, description: "Show copy icon button" },
    interactive: {
      control: { type: "boolean" },
      description: "Enable runtime hover behavior",
    },
    isHovered: {
      control: { type: "boolean" },
      description: "Force hover state (demo)",
    },
    themeMode: {
      name: "theme",
      control: "select",
      options: ["Auto", ...pluginThemeOptions],
      description: "Auto = current Storybook toolbar theme",
    },
    theme: { table: { disable: true } },
    onChange: { table: { disable: true } },
    onCopy: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Text area with fixed sizing, themed scrollbar, optional copy action, and caption.",
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

const InteractiveArea = ({ args, theme }: { args: StoryArgs; theme: string }) => {
  const [value, setValue] = useState(args.value ?? "");

  return <TextArea {...args} value={value} theme={theme} onChange={setValue} />;
};

export const Default: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <InteractiveArea key={String(args.value ?? "")} args={args} theme={theme} />;
  },
};

export const HoveredArea: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <TextArea {...args} state="hover" interactive={false} theme={theme} />;
  },
};

export const ScrollArea: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <TextArea {...args} state="scroll" theme={theme} />;
  },
};

export const NoScrollArea: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <TextArea {...args} state="no-scroll" theme={theme} />;
  },
};

export const DisabledArea: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <TextArea {...args} state="disabled" interactive={false} theme={theme} />;
  },
};

export const NoCaption: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <TextArea {...args} showCaption={false} theme={theme} />;
  },
};

export const NoCopyButton: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <TextArea {...args} showCopyButton={false} theme={theme} />;
  },
};


