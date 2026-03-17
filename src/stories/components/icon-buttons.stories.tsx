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
  title: "Components/Buttons/Icon Buttons",
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
      description: "Visual style and icon-button role",
      table: {
        defaultValue: { summary: "outline" },
      },
    },
    interactive: {
      control: { type: "boolean" },
      description: "Allow hover and click feedback directly in the canvas",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    isHovered: {
      control: { type: "boolean" },
      description: "Force hover appearance for visual review",
    },
    isClicked: {
      control: { type: "boolean" },
      description: "Force pressed appearance for visual review",
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
          "Compact icon-only actions for panel chrome and small utility controls. Includes outline, solid, and right-expander variants.",
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
  parameters: {
    docs: {
      description: {
        story: "Outline icon action for low-emphasis utility controls.",
      },
    },
  },
};

export const SolidButtons: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <PluginIconButton type="solid" state="default" theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Solid icon action with stronger emphasis.",
      },
    },
  },
};

export const SolidStates: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return (
      <div style={{ display: "flex", gap: 12 }}>
        <PluginIconButton type="solid" state="default" interactive={false} theme={theme} />
        <PluginIconButton type="solid" state="hover" interactive={false} theme={theme} />
        <PluginIconButton type="solid" state="pressed" interactive={false} theme={theme} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Solid variant in all visual states: Default, Hover, and Pressed.",
      },
    },
  },
};

export const RightExpanderButtons: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <PluginIconButton type="rightExpander" state="default" theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Chevron-style expander used for disclosure and nested sections.",
      },
    },
  },
};

export const HoveredButtons: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <PluginIconButton type="rightExpander" theme={theme} />;
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive hover demo for the icon-only control. Move the pointer over the button in the canvas.",
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
        story: "Pressed-state demo for the right-expander variant.",
      },
    },
  },
};



