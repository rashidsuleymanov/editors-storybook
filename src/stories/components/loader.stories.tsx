import type { Meta, StoryObj } from "@storybook/react-vite";
import { Loader, type LoaderProps } from "../../components/Loader/Loader";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type StoryArgs = LoaderProps & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
};

const meta: Meta<StoryArgs> = {
  title: "Components/Feedback/Loader",
  component: Loader,
  args: {
    size: "S",
    label: "Loading...",
    overlay: false,
    themeMode: "Auto",
  },
  argTypes: {
    size: { control: "select", options: ["S", "M"], description: "Compact or regular loader size" },
    label: { control: "text", description: "Visible loading message" },
    overlay: { control: { type: "boolean" }, description: "Use the blocking overlay presentation" },
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
        component: "Loader for inline busy states and blocking overlay states.",
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

export const Default: Story = {
  name: "S",
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <Loader {...args} size="S" overlay={false} theme={theme} />;
  },
};

export const Medium: Story = {
  name: "M",
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <Loader {...args} size="M" overlay={false} theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Regular inline loader size.",
      },
    },
  },
};

export const OverlayLoader: Story = {
  name: "Loader With Background",
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <Loader size="M" overlay label="Loading..." theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Blocking overlay loader for modal or full-surface waiting states.",
      },
    },
  },
};

