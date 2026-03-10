import { useRef, useState, type ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  DialogButton,
  type DialogButtonProps,
} from "../../components/DialogButton/DialogButton";
import { normalizePluginTheme } from "../_shared/theme";

const meta: Meta<DialogButtonProps> = {
  title: "Components/Interactive Elements/Buttons/DialogButtons",
  component: DialogButton,
  args: {
    label: "Button",
    size: 24,
    variant: "primary",
    state: "default",
    interactive: true,
    isHovered: false,
    isClicked: false,
    isDisabled: false,
    isLoading: false,
  },
  argTypes: {
    label: {
      control: "text",
      description: "Button text label",
    },
    size: {
      control: "select",
      options: [22, 24],
      description: "Dialog button size",
      table: {
        defaultValue: { summary: "24" },
      },
    },
    variant: {
      control: "select",
      options: ["primary", "secondary"],
      description: "Button style variant",
      table: {
        defaultValue: { summary: "primary" },
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
      description: "Show loading state",
    },
    scale: {
      table: { disable: true },
    },
    theme: {
      table: { disable: true },
    },
    state: {
      table: { disable: true },
    },
    onClick: {
      table: { disable: true },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "DialogButtons are compact action buttons used in dialogs and toolbars. They support multiple themes, sizes, and visual states for consistent plugin UI.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<DialogButtonProps>;

const Wrapper = (props: { isScale: boolean; children: ReactNode }) => {
  const { isScale, children } = props;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isScale
          ? "1fr"
          : "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 16,
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};

const resolveDialogTheme = (rawTheme: string | undefined): NonNullable<DialogButtonProps["theme"]> => {
  const normalized = normalizePluginTheme(rawTheme);
  return normalized === "Modern Dark" ? "Dark" : normalized;
};

const notifyButtonClick = () => {
  if (typeof window !== "undefined" && typeof window.alert === "function") {
    window.alert("Button clicked");
  }
};

const ClickedRuntimeDemo = ({
  theme,
}: {
  theme: NonNullable<DialogButtonProps["theme"]>;
}) => {
  const [smallPressed, setSmallPressed] = useState(false);
  const [normalPressed, setNormalPressed] = useState(false);
  const timers = useRef<number[]>([]);

  const triggerPressed = (setter: (value: boolean) => void) => {
    setter(true);
    const timer = window.setTimeout(() => setter(false), 180);
    timers.current.push(timer);
  };

  return (
    <Wrapper isScale={false}>
      <DialogButton
        label="Button"
        size={22}
        variant="primary"
        theme={theme}
        isClicked={smallPressed}
        onClick={() => triggerPressed(setSmallPressed)}
      />
      <DialogButton
        label="Button"
        size={24}
        variant="primary"
        theme={theme}
        isClicked={normalPressed}
        onClick={() => triggerPressed(setNormalPressed)}
      />
    </Wrapper>
  );
};

const Template = (args: DialogButtonProps, rawTheme: string | undefined) => {
  const theme = resolveDialogTheme(rawTheme);
  return <DialogButton {...args} theme={theme} onClick={notifyButtonClick} />;
};

export const Default: Story = {
  render: (args, context) => Template(args, String(context.globals.theme ?? "Light")),
};

export const PrimaryButtons: Story = {
  render: (_, context) => {
    const theme = resolveDialogTheme(String(context.globals.theme ?? "Light"));
    return (
      <Wrapper isScale={false}>
        <DialogButton label="Primary Small" size={22} variant="primary" theme={theme} />
        <DialogButton label="Primary Normal" size={24} variant="primary" theme={theme} />
      </Wrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Primary dialog buttons for the main action.",
      },
    },
  },
};

export const SecondaryButtons: Story = {
  render: (_, context) => {
    const theme = resolveDialogTheme(String(context.globals.theme ?? "Light"));
    return (
      <Wrapper isScale={false}>
        <DialogButton label="Secondary Small" size={22} variant="secondary" theme={theme} />
        <DialogButton label="Secondary Normal" size={24} variant="secondary" theme={theme} />
      </Wrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Secondary dialog buttons for alternative actions.",
      },
    },
  },
};

export const HoveredButtons: Story = {
  render: (_, context) => {
    const theme = resolveDialogTheme(String(context.globals.theme ?? "Light"));
    return (
      <Wrapper isScale={false}>
        <DialogButton label="Hovered Small" size={22} variant="primary" interactive theme={theme} />
        <DialogButton label="Hovered Normal" size={24} variant="primary" interactive theme={theme} />
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
  render: (_, context) => {
    const theme = resolveDialogTheme(String(context.globals.theme ?? "Light"));
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
  render: (_, context) => {
    const theme = resolveDialogTheme(String(context.globals.theme ?? "Light"));
    return (
      <Wrapper isScale={false}>
        <DialogButton label="Disabled Small" size={22} variant="primary" isDisabled theme={theme} />
        <DialogButton label="Disabled Normal" size={24} variant="primary" isDisabled theme={theme} />
      </Wrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled buttons cannot be interacted with.",
      },
    },
  },
};

export const LoadingButtons: Story = {
  render: (_, context) => {
    const theme = resolveDialogTheme(String(context.globals.theme ?? "Light"));
    return (
      <Wrapper isScale={false}>
        <DialogButton label="Loading Small" size={22} variant="primary" isLoading theme={theme} />
        <DialogButton label="Loading Normal" size={24} variant="primary" isLoading theme={theme} />
      </Wrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Loading buttons show a spinner and block interaction.",
      },
    },
  },
};

export const ScaleButtons: Story = {
  render: (_, context) => {
    const theme = resolveDialogTheme(String(context.globals.theme ?? "Light"));
    return (
      <Wrapper isScale>
        <DialogButton label="Scale Small" size={22} variant="primary" scale theme={theme} />
        <DialogButton label="Scale Normal" size={24} variant="primary" scale theme={theme} />
      </Wrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Scale stretches dialog buttons to the container width.",
      },
    },
  },
};



