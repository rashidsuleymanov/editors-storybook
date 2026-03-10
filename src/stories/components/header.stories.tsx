import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header, type HeaderProps } from "../../components/Header/Header";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type StoryArgs = HeaderProps & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
};

const meta: Meta<StoryArgs> = {
  title: "Components/Layout Components/Header",
  component: Header,
  args: {
    title: "Title",
    width: 261,
    variant: "panel",
    themeMode: "Auto",
  },
  argTypes: {
    title: { control: "text", description: "Header title" },
    width: { control: "number", description: "Header width" },
    variant: {
      control: "select",
      options: ["panel", "window"],
      description: "Header layout type",
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
        component: "Header component with two variants: panel and window.",
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
  name: "Panel",
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <Header {...args} variant="panel" theme={theme} />;
  },
};

export const Window: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <Header {...args} variant="window" theme={theme} />;
  },
};

