import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SplitButton, type SplitButtonProps } from "../../components/SplitButton/SplitButton";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type StoryArgs = SplitButtonProps & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
};

const meta: Meta<StoryArgs> = {
  title: "Components/Buttons/Split Buttons/Drop Down",
  component: SplitButton,
  args: {
    label: "Button",
    state: "default",
    type: "dropDown",
    interactive: true,
    themeMode: "Auto",
  },
  argTypes: {
    label: { control: "text", description: "Visible split-button label" },
    interactive: {
      control: "boolean",
      description: "Allow hover and press feedback directly in the canvas",
    },
    themeMode: {
      name: "theme",
      control: "select",
      options: ["Auto", ...pluginThemeOptions],
      description: "Auto = current Storybook toolbar theme",
    },
    type: { table: { disable: true } },
    state: { table: { disable: true } },
    items: { table: { disable: true } },
    isOpen: { table: { disable: true } },
    onItemSelect: { table: { disable: true } },
    theme: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Split button with a dropdown affordance. Clicking the chevron opens a plain context-menu-style list of options.",
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

const defaultItems: SplitButtonProps["items"] = [
  { id: "1", label: "Option 1" },
  { id: "2", label: "Option 2" },
  { id: "3", label: "Option 3" },
  { id: "4", label: "Disabled option", disabled: true },
];

const InteractiveDemo = ({ args, theme }: { args: StoryArgs; theme: string }) => {
  const [label, setLabel] = useState(args.label ?? "Button");

  return (
    <SplitButton
      label={label}
      type="dropDown"
      state="default"
      interactive={args.interactive}
      theme={theme}
      items={defaultItems}
      onItemSelect={(id) => {
        const item = defaultItems?.find((i) => i.id === id);
        if (item) setLabel(item.label);
      }}
    />
  );
};

export const Default: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return (
      <div style={{ paddingBottom: 120 }}>
        <InteractiveDemo args={args} theme={theme} />
      </div>
    );
  },
};

export const Open: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return (
      <div style={{ paddingBottom: 120 }}>
        <SplitButton
          label={args.label}
          type="dropDown"
          state="default"
          interactive={false}
          isOpen={true}
          items={defaultItems}
          theme={theme}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Dropdown in the open state. Switch the toolbar theme to preview across themes.",
      },
    },
  },
};

export const Disabled: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return (
      <SplitButton
        label={args.label}
        type="dropDown"
        state="disabled"
        interactive={false}
        items={defaultItems}
        theme={theme}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled dropdown split button.",
      },
    },
  },
};
