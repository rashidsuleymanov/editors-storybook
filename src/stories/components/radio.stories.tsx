import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio, type RadioProps } from "../../components/Radio/Radio";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type StoryArgs = RadioProps & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
};

const meta: Meta<StoryArgs> = {
  title: "Components/Form Controls/Radio",
  component: Radio,
  args: {
    label: "Default radio button",
    selected: "no",
    state: "default",
    interactive: true,
    themeMode: "Auto",
  },
  argTypes: {
    label: {
      control: "text",
      description: "Radio label",
    },
    selected: {
      control: "select",
      options: ["no", "yes"],
      description: "Selection state",
    },
    state: {
      control: "select",
      options: ["default", "hover", "disabled"],
      description: "Visual state",
    },
    interactive: {
      control: { type: "boolean" },
      description: "Enable hover and click behavior",
      table: {
        defaultValue: { summary: "true" },
      },
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
      table: {
        defaultValue: { summary: "Auto" },
      },
    },
    theme: {
      table: { disable: true },
    },
    onChange: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Radio control with clear state-based stories.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

const resolveStoryTheme = (
  argsTheme: StoryArgs["themeMode"],
  globalTheme: string
) => {
  if (argsTheme !== "Auto") return argsTheme;
  return normalizePluginTheme(globalTheme);
};

const Template = ({ args, theme }: { args: StoryArgs; theme: string }) => {
  const [selected, setSelected] = useState(args.selected ?? "no");

  return (
    <Radio
      {...args}
      selected={selected}
      theme={theme}
      onChange={(next) => setSelected(next)}
    />
  );
};

export const Default: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(
      args.themeMode,
      String(context.globals.theme ?? "Light")
    );
    return <Template key={String(args.selected ?? "no")} args={args} theme={theme} />;
  },
  args: {
    label: "Default radio button",
    selected: "no",
    state: "default",
    interactive: true,
  },
};

export const Checked: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(
      args.themeMode,
      String(context.globals.theme ?? "Light")
    );
    return <Template key={String(args.selected ?? "yes")} args={args} theme={theme} />;
  },
  args: {
    label: "Checked radio button",
    selected: "yes",
    state: "default",
    interactive: true,
  },
};

export const Hovered: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(
      args.themeMode,
      String(context.globals.theme ?? "Light")
    );
    return <Template key={String(args.selected ?? "no")} args={args} theme={theme} />;
  },
  args: {
    label: "Hovered radio button",
    selected: "no",
    state: "default",
    interactive: true,
    isHovered: false,
  },
};

export const Disabled: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(
      args.themeMode,
      String(context.globals.theme ?? "Light")
    );
    return <Template key={String(args.selected ?? "no")} args={args} theme={theme} />;
  },
  args: {
    label: "Disabled",
    selected: "no",
    state: "disabled",
    interactive: false,
  },
};


