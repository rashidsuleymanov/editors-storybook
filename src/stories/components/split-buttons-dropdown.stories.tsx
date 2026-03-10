import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SplitButton, type SplitButtonProps } from "../../components/SplitButton/SplitButton";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type StoryArgs = SplitButtonProps & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
};

const meta: Meta<StoryArgs> = {
  title: "Components/Interactive Elements/Buttons/SplitButtons/Drop Down",
  component: SplitButton,
  args: {
    label: "Button",
    state: "default",
    type: "dropDown",
    interactive: true,
    themeMode: "Auto",
  },
  argTypes: {
    label: { control: "text", description: "Button label" },
    interactive: {
      control: { type: "boolean" },
      description: "Enable runtime hover/pressed behavior",
    },
    themeMode: {
      name: "theme",
      control: "select",
      options: ["Auto", ...pluginThemeOptions],
      description: "Auto = current Storybook toolbar theme",
    },
    type: { table: { disable: true } },
    state: { table: { disable: true } },
    theme: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component: "Split button: dropdown variant.",
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

const PressedToggleDemo = ({ theme, label }: { theme: string; label: string }) => {
  const [pressed, setPressed] = useState(false);

  return (
    <SplitButton
      label={label}
      type="dropDown"
      theme={theme}
      state={pressed ? "pressed" : "default"}
      interactive={false}
      onClick={() => setPressed((value) => !value)}
    />
  );
};

export const Default: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <SplitButton label={args.label} type="dropDown" state="default" interactive={args.interactive} theme={theme} />;
  },
};

export const Hovered: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <SplitButton label={args.label} type="dropDown" state="default" interactive theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Hover demo: move cursor over the split button.",
      },
    },
  },
};

export const Pressed: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <PressedToggleDemo label={args.label ?? "Button"} theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Click to toggle between default and pressed states.",
      },
    },
  },
};

export const Disabled: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <SplitButton label={args.label} type="dropDown" state="disabled" interactive={false} theme={theme} />;
  },
};


