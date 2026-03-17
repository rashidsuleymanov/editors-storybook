import type { Meta, StoryObj } from "@storybook/react-vite";
import { ContextMenu, type ContextMenuProps } from "../../components/ContextMenu/ContextMenu";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type StoryArgs = ContextMenuProps & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
};

const meta: Meta<StoryArgs> = {
  title: "Components/Actions/Context Menu",
  component: ContextMenu,
  args: {
    themeMode: "Auto",
    interactive: true,
    isHoveredIndex: undefined,
    isClickedIndex: undefined,
  },
  argTypes: {
    items: { control: "object", description: "Menu items" },
    interactive: { control: { type: "boolean" }, description: "Enable real hover/press in canvas" },
    isHoveredIndex: {
      control: { type: "number", min: 0 },
      description: "Force-hover item by index (0-based) for docs preview",
    },
    isClickedIndex: {
      control: { type: "number", min: 0 },
      description: "Force-pressed item by index (0-based) for docs preview",
    },
    themeMode: {
      name: "theme",
      control: "select",
      options: ["Auto", ...pluginThemeOptions],
      description: "Auto = current Storybook toolbar theme",
    },
    theme: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Context menu for compact action lists. Includes plain items, left-icon items, submenu-style dual-icon items, and disabled rows.",
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

const mixedItems: ContextMenuProps["items"] = [
  { id: "1", label: "Menu item", type: "iconLeft" },
  { id: "2", label: "Menu item", type: "iconsBoth" },
  { id: "3", label: "Menu item", type: "noIcon" },
  { id: "4", label: "Disabled item", type: "iconLeft", disabled: true },
];

const iconLeftItems: ContextMenuProps["items"] = [
  { id: "1", label: "Menu item", type: "iconLeft" },
  { id: "2", label: "Another item", type: "iconLeft" },
  { id: "3", label: "Disabled item", type: "iconLeft", disabled: true },
];

const iconsBothItems: ContextMenuProps["items"] = [
  { id: "1", label: "Menu item", type: "iconsBoth" },
  { id: "2", label: "Submenu item", type: "iconsBoth" },
  { id: "3", label: "Disabled item", type: "iconsBoth", disabled: true },
];

const noIconItems: ContextMenuProps["items"] = [
  { id: "1", label: "Menu item", type: "noIcon" },
  { id: "2", label: "Another item", type: "noIcon" },
  { id: "3", label: "Disabled item", type: "noIcon", disabled: true },
];

export const Default: Story = {
  args: {
    items: mixedItems,
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <ContextMenu {...args} theme={theme} />;
  },
};

export const IconLeftItems: Story = {
  args: {
    items: iconLeftItems,
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <ContextMenu {...args} theme={theme} />;
  },
};

export const IconsBothItems: Story = {
  args: {
    items: iconsBothItems,
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <ContextMenu {...args} theme={theme} />;
  },
};

export const NoIconItems: Story = {
  args: {
    items: noIconItems,
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <ContextMenu {...args} theme={theme} />;
  },
};


