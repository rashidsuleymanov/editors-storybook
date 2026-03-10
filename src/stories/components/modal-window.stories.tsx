import type { Meta, StoryObj } from "@storybook/react-vite";
import { ModalWindow, type ModalWindowProps } from "../../components/ModalWindow/ModalWindow";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type StoryArgs = ModalWindowProps & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
};

const meta: Meta<StoryArgs> = {
  title: "Components/Layout Components/ModalWindow",
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
    title: { control: "text", description: "Modal title" },
    contentLabel: { control: "text", description: "Content placeholder text" },
    notificationText: { control: "text", description: "Notification text (multiline supported)" },
    primaryLabel: { control: "text", description: "Primary button label" },
    secondaryLabel: { control: "text", description: "Secondary button label" },
    size: { control: "select", options: ["S", "M", "L"], description: "Modal size" },
    notification: { control: { type: "boolean" }, description: "Show warning icon + notification text" },
    footerMode: {
      control: "select",
      options: ["auto", "single", "double"],
      description: "Footer buttons layout",
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
          "Modal windows in S/M/L sizes with content and notification layouts.",
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

const notifyModalClick = (label: string) => {
  if (typeof window !== "undefined" && typeof window.alert === "function") {
    window.alert(label);
  }
};

const renderModal = (args: StoryArgs, globalTheme: string) => {
  const theme = resolveStoryTheme(args.themeMode, globalTheme);
  return (
    <ModalWindow
      {...args}
      theme={theme}
      onClose={() => notifyModalClick("Modal closed")}
      onPrimaryClick={() => notifyModalClick("Primary button clicked")}
      onSecondaryClick={() => notifyModalClick("Secondary button clicked")}
    />
  );
};

export const Medium: Story = {
  args: {
    size: "M",
    notification: false,
    footerMode: "single",
  },
  render: (args, context) => {
    return renderModal(args, String(context.globals.theme ?? "Light"));
  },
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
};

