import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Slider, type SliderProps } from "../../components/Slider/Slider";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type StoryArgs = SliderProps & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
};

const meta: Meta<StoryArgs> = {
  title: "Components/Form/Slider",
  component: Slider,
  args: {
    value: 40,
    min: 0,
    max: 100,
    showValue: false,
    themeMode: "Auto",
  },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 }, description: "Current slider value" },
    min: { control: "number", description: "Minimum allowed value" },
    max: { control: "number", description: "Maximum allowed value" },
    step: { control: "number", description: "Step increment between values" },
    showValue: { control: "boolean", description: "Show the numeric value on the right" },
    disabled: { control: "boolean", description: "Show the disabled state" },
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
        component: "Single-value slider for compact numeric adjustment with optional inline value display.",
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole("slider");

    await expect(slider).toHaveValue("40");
    await userEvent.click(slider);
    await userEvent.keyboard("{ArrowRight}{ArrowRight}");
    await expect(slider).toHaveValue("42");
  },
};

export const WithValue: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <InteractiveSlider key={`${args.value ?? 40}-value`} args={{ ...args, showValue: true }} theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Slider with the current numeric value shown inline.",
      },
    },
  },
};

export const Min: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <Slider {...args} value={args.min ?? 0} theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Slider positioned at the minimum value.",
      },
    },
  },
};

export const Max: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <Slider {...args} value={args.max ?? 100} theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Slider positioned at the maximum value.",
      },
    },
  },
};



