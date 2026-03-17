import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { TextField, type TextFieldProps } from "../../components/TextField/TextField";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type StoryArgs = TextFieldProps & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
};

const meta: Meta<StoryArgs> = {
  title: "Components/Form/Text Field",
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
    label: { control: "text", description: "Label above the field" },
    caption: { control: "text", description: "Supporting text below the field" },
    errorText: { control: "text", description: "Validation message for the error state" },
    placeholder: { control: "text", description: "Placeholder text shown inside the field" },
    value: { control: "text", description: "Current controlled input value" },
    state: {
      control: "select",
      options: ["default", "hover", "focused", "typing", "filled", "error", "disabled"],
      description: "Rendered visual state of the field",
    },
    placeholderState: {
      control: "select",
      options: ["default", "hidden"],
      description: "Show the placeholder normally or hide it for a denser layout",
    },
    withIconRight: { control: "boolean", description: "Show the trailing icon button" },
    interactive: {
      control: "boolean",
      description: "Allow hover/focus behavior directly in the canvas",
    },
    isHovered: { control: "boolean", description: "Force hover appearance for review" },
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
          "Single-line input with label, caption, error messaging, optional trailing icon, and theme-aware control states.",
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    await expect(input).toHaveValue("");
    await userEvent.click(input);
    await userEvent.type(input, "Plugin");
    await expect(input).toHaveValue("Plugin");
  },
};

export const HoveredField: Story = {
  args: {
    state: "hover",
    isHovered: true,
    interactive: false,
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(
      args.themeMode,
      String(context.globals.theme ?? "Light")
    );

    return <TextField {...args} theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Fixed hover reference state for the single-line field.",
      },
    },
  },
};

export const FocusedField: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <TextField label="Focused field" state="focused" interactive={false} theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Fixed focused reference state used when the field is ready for typing.",
      },
    },
  },
};

export const ErrorField: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <TextField label="Field with error" state="error" interactive={false} theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Fixed error reference state with validation messaging and error border.",
      },
    },
  },
};

export const DisabledField: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <TextField label="Disabled field" state="disabled" interactive={false} theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Fixed disabled reference state that preserves layout but removes interaction.",
      },
    },
  },
};

export const IconRightField: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <TextField label="Icon right field" withIconRight theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Field with a trailing icon action.",
      },
    },
  },
};

export const HiddenPlaceholderField: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <InteractiveField key={`${args.value ?? ""}-hidden`} args={{ ...args, label: "Hidden placeholder", placeholderState: "hidden" }} theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Variant with hidden placeholder treatment for denser layouts.",
      },
    },
  },
};




