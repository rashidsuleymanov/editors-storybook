import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Checkbox, type CheckboxProps } from "../../components/Checkbox/Checkbox";
import { checkboxSelections, checkboxStates } from "../../data/checkbox";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type StoryArgs = CheckboxProps & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
};

const meta: Meta<StoryArgs> = {
  title: "Components/Form/Checkbox",
  component: Checkbox,
  args: {
    label: "Checkbox",
    selected: "no",
    state: "default",
    interactive: true,
    themeMode: "Auto",
  },
  argTypes: {
    label: { control: "text", description: "Visible checkbox label" },
    selected: { control: "select", options: checkboxSelections, description: "Unchecked, checked, or indeterminate state" },
    state: { control: "select", options: checkboxStates, description: "Rendered visual state" },
    interactive: {
      control: "boolean",
      description: "Allow hover and toggle behavior directly in the canvas",
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox", { name: "Checkbox" });

    await expect(checkbox).toHaveAttribute("aria-checked", "false");
    await userEvent.click(checkbox);
    await expect(checkbox).toHaveAttribute("aria-checked", "true");
  },
  parameters: {
    docs: {
      description: {
        component:
          "Checkbox control for independent on/off selections, including checked, indeterminate, and disabled states.",
      },
    },
  },
};

export const Checked: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <InteractiveCheckbox key="checked-checkbox" args={{ ...args, label: "Selected", selected: "yes", state: "default", interactive: true }} theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive checked-state demo for an active standalone selection.",
      },
    },
  },
};

export const Disabled: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <Checkbox label="Disabled" selected="no" state="disabled" interactive={false} theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled checkbox that preserves layout without allowing selection changes.",
      },
    },
  },
};

export const Indeterminate: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <InteractiveCheckbox key="indeterminate-checkbox" args={{ ...args, label: "Indeterminate", selected: "partial", state: "default", interactive: true }} theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive indeterminate-state demo for partial selection in grouped lists.",
      },
    },
  },
};



