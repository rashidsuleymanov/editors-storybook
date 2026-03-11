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
  title: "Components/Buttons/Link Buttons",
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
      description: "Visible link-style action label",
    },
    interactive: {
      control: { type: "boolean" },
      description: "Allow hover feedback directly in the canvas",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    isHovered: {
      control: { type: "boolean" },
      description: "Force hover appearance for visual review",
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
          "Text-only action styled like a link. Useful for secondary inline actions inside settings and informational blocks.",
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
    return <LinkButton label="Show advanced settings" theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive hover demo for the inline link-action style. Move the pointer over the link in the canvas.",
      },
    },
  },
};



