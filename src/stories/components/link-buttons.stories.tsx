import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  LinkButton,
  type LinkButtonProps,
} from "../../components/LinkButton/LinkButton";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type StoryArgs = LinkButtonProps & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
};

const meta: Meta<StoryArgs> = {
  title: "Components/Interactive Elements/Buttons/LinkButtons",
  component: LinkButton,
  args: {
    label: "Show advanced settings",
    state: "default",
    interactive: true,
    themeMode: "Auto",
  },
  argTypes: {
    label: {
      control: "text",
      description: "Link button label",
    },
    interactive: {
      control: { type: "boolean" },
      description: "Enable hover interaction for demo",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    isHovered: {
      control: { type: "boolean" },
      description: "Force hover state (demo)",
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
    state: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      story: {
        inline: true,
      },
      description: {
        component:
          "Link-style button with theme-aware states.",
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

export const Default: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <LinkButton {...args} theme={theme} />;
  },
};

export const HoveredButtons: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <LinkButton label="Show advanced settings" interactive theme={theme} />;
  },
};



