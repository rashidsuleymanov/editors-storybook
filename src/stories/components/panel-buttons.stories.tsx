import { useRef, useState, type ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  PanelButton,
  type PanelButtonProps,
} from "../../components/PanelButton/PanelButton";
import { normalizePluginTheme } from "../_shared/theme";

type StoryArgs = PanelButtonProps & {
  themeMode: "Auto" | "Light" | "Light Classic" | "Dark" | "Dark Contrast";
};

const meta: Meta<StoryArgs> = {
  title: "Components/Interactive Elements/Buttons/PanelButtons",
  component: PanelButton,
  args: {
    label: "Button",
    size: 24,
    state: "default",
    interactive: true,
    themeMode: "Auto",
  },
  argTypes: {
    label: {
      control: "text",
      description: "Button text label",
    },
    size: {
      control: "select",
      options: [24, 30],
      description: "Panel button size",
      table: {
        defaultValue: { summary: "24" },
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
    isDisabled: {
      control: { type: "boolean" },
      description: "Disable the button",
    },
    isLoading: {
      control: { type: "boolean" },
      description: "Show loader state",
    },
    scale: {
      control: { type: "boolean" },
      description: "Stretch button to the full row width",
    },
    themeMode: {
      name: "theme",
      control: "select",
      options: ["Auto", "Light", "Light Classic", "Dark", "Dark Contrast"],
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
          "Panel buttons in 24/30 sizes with all core states.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

const ClickedRuntimeDemo = ({ theme }: { theme: string }) => {
  const [pressed24, setPressed24] = useState(false);
  const [pressed30, setPressed30] = useState(false);
  const timers = useRef<number[]>([]);

  const triggerPressed = (setter: (value: boolean) => void) => {
    setter(true);
    const timer = window.setTimeout(() => setter(false), 180);
    timers.current.push(timer);
  };

  return (
    <Wrapper isScale={false}>
      <PanelButton
        label="Button"
        size={24}
        theme={theme}
        isClicked={pressed24}
        onClick={() => triggerPressed(setPressed24)}
      />
      <PanelButton
        label="Button"
        size={30}
        theme={theme}
        isClicked={pressed30}
        onClick={() => triggerPressed(setPressed30)}
      />
    </Wrapper>
  );
};

const Wrapper = (props: { isScale: boolean; children: ReactNode }) => {
  const { isScale, children } = props;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isScale ? "1fr" : "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 16,
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};

const resolveStoryTheme = (
  argsTheme: StoryArgs["themeMode"],
  globalTheme: string
) => {
  if (argsTheme !== "Auto") return argsTheme;
  const normalized = normalizePluginTheme(globalTheme);
  if (normalized === "Modern Light") return "Light";
  if (normalized === "Modern Dark") return "Dark";
  return normalized;
};

export const Default: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return <PanelButton {...args} theme={theme} />;
  },
};

export const HoveredButtons: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return (
      <Wrapper isScale={false}>
        <PanelButton label="Hovered Small" size={24} interactive theme={theme} />
        <PanelButton label="Hovered Normal" size={30} interactive theme={theme} />
      </Wrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Hover preview: move cursor over the buttons.",
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

export const DisabledButtons: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return (
      <Wrapper isScale={false}>
        <PanelButton label="Button" size={24} isDisabled theme={theme} />
        <PanelButton label="Button" size={30} isDisabled theme={theme} />
      </Wrapper>
    );
  },
};

export const IsLoadingButtons: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return (
      <Wrapper isScale={false}>
        <PanelButton label="Button" size={24} isLoading theme={theme} />
        <PanelButton label="Button" size={30} isLoading theme={theme} />
      </Wrapper>
    );
  },
};

export const ScaleButtons: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return (
      <Wrapper isScale>
        <PanelButton label="Scale Small" size={24} scale theme={theme} />
        <PanelButton label="Scale Normal" size={30} scale theme={theme} />
      </Wrapper>
    );
  },
};



