import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { TextArea, type TextAreaProps } from "../../components/TextArea/TextArea";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type StoryArgs = TextAreaProps & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
};

const meta: Meta<StoryArgs> = {
  title: "Components/Form/Text Area",
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
    label: { control: "text", description: "Label above the text area" },
    caption: { control: "text", description: "Supporting text below the field" },
    value: { control: "text", description: "Current controlled text value" },
    state: {
      control: "select",
      options: ["default", "hover", "disabled", "scroll", "no-scroll"],
      description: "Rendered visual state",
    },
    width: { control: "number", description: "Outer component width" },
    height: { control: "number", description: "Visible text area height" },
    showLabel: { control: { type: "boolean" }, description: "Show the label row" },
    showCaption: { control: { type: "boolean" }, description: "Show the caption below the field" },
    showCopyButton: { control: { type: "boolean" }, description: "Show the copy action button" },
    interactive: {
      control: { type: "boolean" },
      description: "Allow hover behavior directly in the canvas",
    },
    isHovered: {
      control: { type: "boolean" },
      description: "Force hover appearance for visual review",
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
          "Multi-line text field with optional copy action, caption, and themed scroll treatment for longer content.",
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    await expect(input).toBeInTheDocument();
    await userEvent.clear(input);
    await userEvent.type(input, "Short note");
    await expect(input).toHaveValue("Short note");
  },
};

export const HoveredArea: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <InteractiveArea key="hovered-area" args={{ ...args, state: "default", interactive: false, isHovered: false }} theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Hover is disabled for the text area. Only the copy button has hover feedback.",
      },
    },
  },
};

export const ScrollArea: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <TextArea {...args} state="scroll" theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Fixed scroll reference state for longer content.",
      },
    },
  },
};

export const NoScrollArea: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <TextArea {...args} state="no-scroll" theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Fixed no-scroll reference state without visible scrollbar treatment.",
      },
    },
  },
};

export const DisabledArea: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <TextArea {...args} state="disabled" interactive={false} theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Fixed disabled reference state that preserves layout without accepting input.",
      },
    },
  },
};

export const NoCaption: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <TextArea {...args} showCaption={false} theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Variant without supporting caption text.",
      },
    },
  },
};

export const NoCopyButton: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <TextArea {...args} showCopyButton={false} theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Variant without the copy action button.",
      },
    },
  },
};


