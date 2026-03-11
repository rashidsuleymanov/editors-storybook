import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header, type HeaderProps } from "../../components/Header/Header";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type StoryArgs = HeaderProps & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
};

const meta: Meta<StoryArgs> = {
  title: "Components/Layout/Header",
  component: Header,
  args: {
    title: "Title",
    width: 261,
    variant: "panel",
    themeMode: "Auto",
  },
  argTypes: {
    title: { control: "text", description: "Visible header title" },
    width: { control: "number", description: "Rendered header width" },
    variant: {
      control: "select",
      options: ["panel", "window"],
      description: "Panel header or standalone window header layout",
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
        component: "Header shell used at the top of plugin panels and standalone windows.",
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
  parameters: {
    docs: {
      description: {
        story: "Standalone window-style header with different chrome treatment.",
      },
    },
  },
};

