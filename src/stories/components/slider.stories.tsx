import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider, type SliderProps } from "../../components/Slider/Slider";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type StoryArgs = SliderProps & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
};

const meta: Meta<StoryArgs> = {
  title: "Components/Form Controls/Slider",
  component: Slider,
  args: {
    value: 40,
    min: 0,
    max: 100,
    showValue: false,
    themeMode: "Auto",
  },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 }, description: "Current value" },
    min: { control: "number", description: "Minimum" },
    max: { control: "number", description: "Maximum" },
    showValue: { control: { type: "boolean" }, description: "Show value label on the right" },
    disabled: { control: { type: "boolean" }, description: "Disable interaction" },
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
        component: "Slider with theme-aware track/knob and optional value label.",
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

const InteractiveSlider = ({ args, theme }: { args: StoryArgs; theme: string }) => {
  const [value, setValue] = useState(args.value ?? 40);

  return <Slider {...args} value={value} theme={theme} onChange={setValue} />;
};

export const Default: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <InteractiveSlider key={String(args.value ?? 40)} args={args} theme={theme} />;
  },
};

export const WithValue: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <InteractiveSlider key={`${args.value ?? 40}-value`} args={{ ...args, showValue: true }} theme={theme} />;
  },
};

export const Min: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <Slider {...args} value={args.min ?? 0} theme={theme} />;
  },
};

export const Max: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <Slider {...args} value={args.max ?? 100} theme={theme} />;
  },
};


