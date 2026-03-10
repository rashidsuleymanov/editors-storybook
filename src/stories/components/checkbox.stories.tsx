import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox, type CheckboxProps } from "../../components/Checkbox/Checkbox";
import { checkboxSelections, checkboxStates } from "../../data/checkbox";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type StoryArgs = CheckboxProps & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
};

const meta: Meta<StoryArgs> = {
  title: "Components/Form Controls/Checkbox",
  component: Checkbox,
  args: {
    label: "Checkbox",
    selected: "no",
    state: "default",
    interactive: true,
    themeMode: "Auto",
  },
  argTypes: {
    label: { control: "text", description: "Checkbox label" },
    selected: { control: "select", options: checkboxSelections, description: "Selection state" },
    state: { control: "select", options: checkboxStates, description: "Visual state" },
    interactive: {
      control: { type: "boolean" },
      description: "Enable hover and click behavior",
    },
    isHovered: { control: { type: "boolean" }, description: "Force hover state (demo)" },
    themeMode: {
      name: "theme",
      control: "select",
      options: ["Auto", ...pluginThemeOptions],
      description: "Auto = current Storybook toolbar theme",
    },
    theme: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

const resolveStoryTheme = (argsTheme: StoryArgs["themeMode"], globalTheme: string) => {
  if (argsTheme !== "Auto") return argsTheme;
  return normalizePluginTheme(globalTheme);
};

const InteractiveCheckbox = ({ args, theme }: { args: StoryArgs; theme: string }) => {
  const [selected, setSelected] = useState(args.selected ?? "no");

  return <Checkbox {...args} selected={selected} theme={theme} onChange={(next) => setSelected(next)} />;
};

export const Default: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <InteractiveCheckbox key={String(args.selected ?? "no")} args={args} theme={theme} />;
  },
};

export const Checked: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <Checkbox label="Selected" selected="yes" state="default" interactive theme={theme} />;
  },
};

export const Disabled: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <Checkbox label="Disabled" selected="no" state="disabled" interactive={false} theme={theme} />;
  },
};

export const Indeterminate: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <Checkbox label="Indeterminate" selected="partial" state="default" interactive theme={theme} />;
  },
};


