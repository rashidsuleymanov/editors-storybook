import type { Meta, StoryObj } from "@storybook/react-vite";
import { InfoBlock, type InfoBlockProps } from "../../components/InfoBlock/InfoBlock";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type StoryArgs = InfoBlockProps & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
};

const meta: Meta<StoryArgs> = {
  title: "Components/Data Display/Info Block",
  component: InfoBlock,
  args: {
    title: "Title",
    description: "Description",
    showTitle: true,
    showDescription: true,
    iconMode: "left",
    themeMode: "Auto",
  },
  argTypes: {
    title: { control: "text", description: "Main heading text" },
    description: { control: "text", description: "Supporting descriptive copy" },
    showTitle: { control: { type: "boolean" }, description: "Show the title row" },
    showDescription: { control: { type: "boolean" }, description: "Show the description row" },
    iconMode: {
      control: "select",
      options: ["none", "left", "right", "both"],
      description: "Icon placement around the title row",
    },
    themeMode: {
      name: "theme",
      control: "select",
      options: ["Auto", ...pluginThemeOptions],
      description: "Auto = current Storybook toolbar theme",
    },
    theme: { table: { disable: true } },
    onClose: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Compact informational block for notices, inline explanations, and dismissible helper content.",
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
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <InfoBlock {...args} theme={theme} />;
  },
};

export const WithoutIcon: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <InfoBlock {...args} iconMode="none" theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Plain informational block without icons.",
      },
    },
  },
};

export const IconRight: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <InfoBlock {...args} iconMode="right" showTitle showDescription theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Variant with a dismiss or action icon on the right.",
      },
    },
  },
};

export const IconLeft: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <InfoBlock {...args} iconMode="left" showTitle showDescription theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Variant with an informational icon on the left.",
      },
    },
  },
};

export const IconBoth: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <InfoBlock {...args} iconMode="both" showDescription={false} theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Title row with icons on both sides.",
      },
    },
  },
};

export const TitleOnly: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <InfoBlock {...args} showTitle showDescription={false} iconMode="none" theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Title-only informational block.",
      },
    },
  },
};

export const DescriptionOnly: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <InfoBlock {...args} showTitle={false} showDescription iconMode="none" theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Description-only helper text block.",
      },
    },
  },
};


