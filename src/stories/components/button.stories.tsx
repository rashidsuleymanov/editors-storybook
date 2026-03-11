import { useRef, useState, type ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  DialogButton,
  type DialogButtonProps,
} from "../../components/DialogButton/DialogButton";
import { normalizePluginTheme } from "../_shared/theme";

const meta: Meta<DialogButtonProps> = {
  title: "Components/Buttons/Dialog Buttons",
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
      description: "Visible action label",
    },
    size: {
      control: "select",
      options: [22, 24],
      description: "Compact or regular dialog button height",
      table: {
        defaultValue: { summary: "24" },
      },
    },
    variant: {
      control: "select",
      options: ["primary", "secondary"],
      description: "Primary for the main action, secondary for alternative actions",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    interactive: {
      control: { type: "boolean" },
      description: "Allow the story to react to hover and click in the canvas",
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
    isDisabled: {
      control: { type: "boolean" },
      description: "Show the disabled state",
    },
    isLoading: {
      control: { type: "boolean" },
      description: "Replace the label with the loading indicator",
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
          "Dialog action buttons used in modal footers and compact plugin flows. Use primary for confirm actions and secondary for cancel or auxiliary actions.",
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

const noop = () => {};

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
  return <DialogButton {...args} theme={theme} onClick={noop} />;
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
        story: "Primary buttons for the main decision in a dialog.",
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
        story: "Secondary buttons for cancel, back, or less prominent actions.",
      },
    },
  },
};

export const HoveredButtons: Story = {
  render: (_, context) => {
    const theme = resolveDialogTheme(String(context.globals.theme ?? "Light"));
    return (
      <Wrapper isScale={false}>
        <DialogButton label="Hovered Small" size={22} variant="primary" theme={theme} />
        <DialogButton label="Hovered Normal" size={24} variant="primary" theme={theme} />
      </Wrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive hover demo for both dialog button sizes. Move the pointer over each button in the canvas.",
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
        story: "Pressed-state demo. Click a button to preview the active press moment.",
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
        story: "Disabled buttons keep layout but should not invite interaction.",
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
        story: "Loading state for actions that are already in progress.",
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
        story: "Full-width layout variant for dense footers or narrow dialog flows.",
      },
    },
  },
};



