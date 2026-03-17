import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch, type SwitchProps } from "../../components/Switch/Switch";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type StoryArgs = SwitchProps & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
};

const meta: Meta<StoryArgs> = {
  title: "Components/Form/Switches",
  component: Switch,
  args: {
    checked: false,
    state: "default",
    interactive: true,
    themeMode: "Auto",
  },
  argTypes: {
    checked: { control: "boolean", description: "Current on/off value" },
    state: {
      control: "select",
      options: ["default", "hover", "disabled"],
      description: "Rendered visual state",
    },
    interactive: {
      control: "boolean",
      description: "Allow hover and toggle behavior directly in the canvas",
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

export const HoveredSwitch: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <InteractiveSwitch args={{ ...args, state: "default", interactive: true }} theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive hover demo for the switch. Move the pointer over the control in the canvas.",
      },
    },
  },
};

export const DisabledSwitches: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <Switch checked={Boolean(args.checked)} state="disabled" interactive={false} theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Fixed disabled reference state for the switch.",
      },
    },
  },
};




