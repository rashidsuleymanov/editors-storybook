import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Radio, type RadioProps } from "../../components/Radio/Radio";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type StoryArgs = RadioProps & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
};

const meta: Meta<StoryArgs> = {
  title: "Components/Form/Radio",
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
      description: "Visible radio label",
    },
    selected: {
      control: "select",
      options: ["no", "yes"],
      description: "Unchecked or selected state",
    },
    state: {
      control: "select",
      options: ["default", "hover", "disabled"],
      description: "Rendered visual state",
    },
    interactive: {
      control: "boolean",
      description: "Allow hover and selection behavior directly in the canvas",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    isHovered: {
      control: "boolean",
      description: "Force hover appearance for review",
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
          "Radio control for mutually exclusive choices. Use it inside groups where one option should stay selected.",
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole("radio", { name: "Default radio button" });

    await expect(radio).toHaveAttribute("aria-checked", "false");
    await userEvent.click(radio);
    await expect(radio).toHaveAttribute("aria-checked", "true");
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
  parameters: {
    docs: {
      description: {
        story: "Selected radio option inside a choice group.",
      },
    },
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
  parameters: {
    docs: {
      description: {
        story: "Interactive hover demo for an unselected radio option. Move the pointer over the control in the canvas.",
      },
    },
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
  parameters: {
    docs: {
      description: {
        story: "Disabled radio option that remains visible but unavailable.",
      },
    },
  },
};



