import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip, type TooltipProps } from "../../components/Tooltip/Tooltip";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type StoryArgs = TooltipProps & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
};

const meta: Meta<StoryArgs> = {
  title: "Components/Feedback/Tooltip",
  component: Tooltip,
  args: {
    text: "Texts",
    themeMode: "Auto",
  },
  argTypes: {
    text: { control: "text", description: "Tooltip text" },
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
          "Compact tooltip for short helper text near controls and icon buttons. Use it for hints, not for long explanatory copy.",
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
    return <Tooltip {...args} theme={theme} />;
  },
};

