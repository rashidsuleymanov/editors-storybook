import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextField, type TextFieldProps } from "../../components/TextField/TextField";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type StoryArgs = TextFieldProps & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
};

const meta: Meta<StoryArgs> = {
  title: "Components/Form Controls/TextField",
  component: TextField,
  args: {
    label: "Title",
    caption: "Caption",
    errorText: "Error text",
    placeholder: "Line input",
    value: "",
    state: "default",
    placeholderState: "default",
    withIconRight: false,
    interactive: true,
    isHovered: false,
    themeMode: "Auto",
  },
  argTypes: {
    label: { control: "text", description: "Field title" },
    caption: { control: "text", description: "Caption text" },
    errorText: { control: "text", description: "Error message" },
    placeholder: { control: "text", description: "Placeholder" },
    value: { control: "text", description: "Input value" },
    state: {
      control: "select",
      options: ["default", "hover", "focused", "typing", "filled", "error", "disabled"],
      description: "Visual state",
    },
    placeholderState: {
      control: "select",
      options: ["default", "hidden"],
      description: "Placeholder view",
    },
    withIconRight: { control: { type: "boolean" }, description: "Show right icon" },
    interactive: {
      control: { type: "boolean" },
      description: "Enable runtime hover/focus interactions",
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
  parameters: {
    docs: {
      description: {
        component:
          "Text field with label, caption, hover/focus/error states, icon-right, and hidden mode.",
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

const InteractiveField = ({ args, theme }: { args: StoryArgs; theme: string }) => {
  const [value, setValue] = useState(args.value ?? "");

  return <TextField {...args} value={value} theme={theme} onChange={setValue} />;
};

export const Default: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <InteractiveField key={String(args.value ?? "")} args={args} theme={theme} />;
  },
};

export const HoveredField: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <TextField label="Hovered field" state="default" interactive theme={theme} />;
  },
};

export const FocusedField: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <TextField label="Focused field" state="focused" interactive={false} theme={theme} />;
  },
};

export const ErrorField: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <TextField label="Field with error" state="error" interactive={false} theme={theme} />;
  },
};

export const DisabledField: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <TextField label="Disabled field" state="disabled" interactive={false} theme={theme} />;
  },
};

export const IconRightField: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <TextField label="Icon right field" withIconRight theme={theme} />;
  },
};

export const HiddenPlaceholderField: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <InteractiveField key={`${args.value ?? ""}-hidden`} args={{ ...args, label: "Hidden placeholder", placeholderState: "hidden" }} theme={theme} />;
  },
};



