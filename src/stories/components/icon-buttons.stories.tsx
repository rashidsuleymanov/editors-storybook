import { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  PluginIconButton,
  type PluginIconButtonProps,
} from "../../components/IconButton/IconButton";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type StoryArgs = PluginIconButtonProps & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
};

const meta: Meta<StoryArgs> = {
  title: "Components/Interactive Elements/Buttons/IconButtons",
  component: PluginIconButton,
  args: {
    type: "outline",
    state: "default",
    interactive: true,
    themeMode: "Auto",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["outline", "solid", "rightExpander"],
      description: "Icon button type",
      table: {
        defaultValue: { summary: "outline" },
      },
    },
    interactive: {
      control: { type: "boolean" },
      description: "Enable runtime hover/pressed interactions",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    isHovered: {
      control: { type: "boolean" },
      description: "Force hover state (demo)",
    },
    isClicked: {
      control: { type: "boolean" },
      description: "Force pressed state (demo)",
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
      description: {
        component:
          "Icon buttons with Outline, Solid, and Right Expander variants.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

const ClickedRuntimeDemo = ({ theme }: { theme: string }) => {
  const [pressed, setPressed] = useState(false);
  const timers = useRef<number[]>([]);

  const triggerPressed = (setter: (value: boolean) => void) => {
    setter(true);
    const timer = window.setTimeout(() => setter(false), 180);
    timers.current.push(timer);
  };

  return (
    <PluginIconButton
      type="rightExpander"
      theme={theme}
      isClicked={pressed}
      onClick={() => triggerPressed(setPressed)}
    />
  );
};

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
    return <PluginIconButton {...args} theme={theme} />;
  },
};

export const OutlineButtons: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <PluginIconButton type="outline" state="default" theme={theme} />;
  },
};

export const SolidButtons: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <PluginIconButton type="solid" state="default" theme={theme} />;
  },
};

export const RightExpanderButtons: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <PluginIconButton type="rightExpander" state="default" theme={theme} />;
  },
};

export const HoveredButtons: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <PluginIconButton type="rightExpander" interactive theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Hover preview: move cursor over the button.",
      },
    },
  },
};

export const ClickedButtons: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <ClickedRuntimeDemo theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Runtime pressed state demo: click button to show Clicked state.",
      },
    },
  },
};



