import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch, type SwitchProps } from "../../components/Switch/Switch";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type StoryArgs = SwitchProps & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
};

const meta: Meta<StoryArgs> = {
  title: "Components/Form Controls/Switches",
  component: Switch,
  args: {
    checked: false,
    state: "default",
    interactive: true,
    themeMode: "Auto",
  },
  argTypes: {
    checked: { control: { type: "boolean" }, description: "On/off value" },
    state: {
      control: "select",
      options: ["default", "hover", "disabled"],
      description: "Visual state",
    },
    interactive: {
      control: { type: "boolean" },
      description: "Enable runtime hover interaction",
    },
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
        component: "Switch control with on/off values and state variants.",
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

const InteractiveSwitch = ({ args, theme }: { args: StoryArgs; theme: string }) => {
  const [checked, setChecked] = useState(Boolean(args.checked));
  return <Switch {...args} checked={checked} theme={theme} onChange={setChecked} />;
};

export const Default: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <InteractiveSwitch args={args} theme={theme} />;
  },
};

export const HoveredSwitches: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <Switch checked={Boolean(args.checked)} state="hover" interactive={false} theme={theme} />;
  },
};

export const DisabledSwitches: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <Switch checked={Boolean(args.checked)} state="disabled" interactive={false} theme={theme} />;
  },
};



