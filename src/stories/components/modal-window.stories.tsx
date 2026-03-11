import type { Meta, StoryObj } from "@storybook/react-vite";
import { ModalWindow, type ModalWindowProps } from "../../components/ModalWindow/ModalWindow";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type StoryArgs = ModalWindowProps & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
};

const meta: Meta<StoryArgs> = {
  title: "Components/Layout/Modal Window",
  component: ModalWindow,
  args: {
    title: "Title",
    contentLabel: "Content",
    notificationText: "Text\nText",
    primaryLabel: "Button",
    secondaryLabel: "Button",
    size: "M",
    notification: false,
    footerMode: "auto",
    themeMode: "Auto",
  },
  argTypes: {
    title: { control: "text", description: "Main dialog title" },
    contentLabel: { control: "text", description: "Placeholder copy for the main content area" },
    notificationText: { control: "text", description: "Inline warning or notification message" },
    primaryLabel: { control: "text", description: "Primary footer action label" },
    secondaryLabel: { control: "text", description: "Secondary footer action label" },
    size: { control: "select", options: ["S", "M", "L"], description: "Modal width preset" },
    notification: { control: { type: "boolean" }, description: "Show the notification block above the footer" },
    footerMode: {
      control: "select",
      options: ["auto", "single", "double"],
      description: "One-button or two-button footer layout",
    },
    themeMode: {
      name: "theme",
      control: "select",
      options: ["Auto", ...pluginThemeOptions],
      description: "Auto = current Storybook toolbar theme",
    },
    onClose: { table: { disable: true } },
    onPrimaryClick: { table: { disable: true } },
    onSecondaryClick: { table: { disable: true } },
    theme: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Dialog window shell with size presets, optional notification block, and single or double action footers.",
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

const noop = () => {};

const renderModal = (args: StoryArgs, globalTheme: string) => {
  const theme = resolveStoryTheme(args.themeMode, globalTheme);
  return (
    <ModalWindow
      {...args}
      theme={theme}
      onClose={noop}
      onPrimaryClick={noop}
      onSecondaryClick={noop}
    />
  );
};

export const Default: Story = {
  args: {
    size: "M",
    notification: false,
    footerMode: "single",
  },
  render: (args, context) => {
    return renderModal(args, String(context.globals.theme ?? "Light"));
  },
  parameters: {
    docs: {
      description: {
        story: "Medium modal preset for standard confirmation and settings flows.",
      },
    },
  },
};

export const Small: Story = {
  args: {
    size: "S",
    notification: false,
    footerMode: "single",
  },
  render: (args, context) => {
    return renderModal(args, String(context.globals.theme ?? "Light"));
  },
  parameters: {
    docs: {
      description: {
        story: "Small modal for short confirmations and compact messages.",
      },
    },
  },
};

export const Large: Story = {
  args: {
    size: "L",
    notification: false,
    footerMode: "double",
  },
  render: (args, context) => {
    return renderModal(args, String(context.globals.theme ?? "Light"));
  },
  parameters: {
    docs: {
      description: {
        story: "Large modal for richer content and double-action layouts.",
      },
    },
  },
};

export const WithNotification: Story = {
  args: {
    size: "S",
    notification: true,
    footerMode: "single",
  },
  render: (args, context) => {
    return renderModal(args, String(context.globals.theme ?? "Light"));
  },
  parameters: {
    docs: {
      description: {
        story: "Modal with an inline warning or explanatory notification block.",
      },
    },
  },
};

