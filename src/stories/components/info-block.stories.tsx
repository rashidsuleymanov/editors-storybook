import type { Meta, StoryObj } from "@storybook/react-vite";
import { InfoBlock, type InfoBlockProps } from "../../components/InfoBlock/InfoBlock";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type StoryArgs = InfoBlockProps & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
};

const meta: Meta<StoryArgs> = {
  title: "Components/Data Display/InfoBlock",
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
    title: { control: "text", description: "Info block title" },
    description: { control: "text", description: "Info block description" },
    showTitle: { control: { type: "boolean" }, description: "Show title row" },
    showDescription: { control: { type: "boolean" }, description: "Show description row" },
    iconMode: {
      control: "select",
      options: ["none", "left", "right", "both"],
      description: "Title icon layout",
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
          "Info block with all key variants: with/without icon, right icon, title only, description only, and title + description.",
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
};

export const IconRight: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <InfoBlock {...args} iconMode="right" showTitle showDescription theme={theme} />;
  },
};

export const IconLeft: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <InfoBlock {...args} iconMode="left" showTitle showDescription theme={theme} />;
  },
};

export const IconBoth: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <InfoBlock {...args} iconMode="both" showDescription={false} theme={theme} />;
  },
};

export const TitleOnly: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <InfoBlock {...args} showTitle showDescription={false} iconMode="none" theme={theme} />;
  },
};

export const DescriptionOnly: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <InfoBlock {...args} showTitle={false} showDescription iconMode="none" theme={theme} />;
  },
};


