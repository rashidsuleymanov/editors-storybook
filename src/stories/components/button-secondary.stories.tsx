import { useRef, useState, type ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  DialogButton,
  type DialogButtonProps,
} from "../../components/DialogButton/DialogButton";
import { normalizePluginTheme } from "../_shared/theme";

const meta: Meta<DialogButtonProps> = {
  title: "Components/Buttons/Dialog Buttons/Secondary",
  component: DialogButton,
  args: {
    label: "Button",
    size: 24,
    variant: "secondary",
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
    interactive: {
      control: "boolean",
      description: "Allow the story to react to hover and click in the canvas",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    isHovered: {
      control: "boolean",
      description: "Force hover appearance for visual review",
    },
    isClicked: {
      control: "boolean",
      description: "Force pressed appearance for visual review",
    },
    isDisabled: {
      control: "boolean",
      description: "Show the disabled state",
    },
    isLoading: {
      control: "boolean",
      description: "Replace the label with the loading indicator",
    },
    scale: {
      table: { disable: true },
    },
    minWidth: {
      control: "text",
      description: "Override minimum button width (e.g. \"120px\")",
    },
    variant: {
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
          "Secondary dialog action button for cancel, back, or less prominent actions in modal footers and compact plugin flows.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<DialogButtonProps>;

const Wrapper = (props: { isScale?: boolean; children: ReactNode }) => {
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

const resolveTheme = (rawTheme: string | undefined): NonNullable<DialogButtonProps["theme"]> =>
  normalizePluginTheme(rawTheme);

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
    <Wrapper>
      <DialogButton
        label="Button"
        size={22}
        variant="secondary"
        theme={theme}
        isClicked={smallPressed}
        onClick={() => triggerPressed(setSmallPressed)}
      />
      <DialogButton
        label="Button"
        size={24}
        variant="secondary"
        theme={theme}
        isClicked={normalPressed}
        onClick={() => triggerPressed(setNormalPressed)}
      />
    </Wrapper>
  );
};

export const Default: Story = {
  render: (args, context) => {
    const theme = resolveTheme(String(context.globals.theme ?? "Light"));
    return <DialogButton {...args} variant="secondary" theme={theme} onClick={noop} />;
  },
};

export const Hovered: Story = {
  render: (_, context) => {
    const theme = resolveTheme(String(context.globals.theme ?? "Light"));
    return (
      <Wrapper>
        <DialogButton label="Button" size={22} variant="secondary" isHovered theme={theme} />
        <DialogButton label="Button" size={24} variant="secondary" isHovered theme={theme} />
      </Wrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Hover state for both sizes. Move the pointer over buttons in the canvas for the live effect.",
      },
    },
  },
};

export const Clicked: Story = {
  render: (_, context) => {
    const theme = resolveTheme(String(context.globals.theme ?? "Light"));
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

export const Disabled: Story = {
  render: (_, context) => {
    const theme = resolveTheme(String(context.globals.theme ?? "Light"));
    return (
      <Wrapper>
        <DialogButton label="Button" size={22} variant="secondary" isDisabled theme={theme} />
        <DialogButton label="Button" size={24} variant="secondary" isDisabled theme={theme} />
      </Wrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled secondary buttons keep layout but should not invite interaction.",
      },
    },
  },
};

export const Loading: Story = {
  render: (_, context) => {
    const theme = resolveTheme(String(context.globals.theme ?? "Light"));
    return (
      <Wrapper>
        <DialogButton label="Button" size={22} variant="secondary" isLoading theme={theme} />
        <DialogButton label="Button" size={24} variant="secondary" isLoading theme={theme} />
      </Wrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Loading state while the secondary action is in progress.",
      },
    },
  },
};

export const Scale: Story = {
  render: (_, context) => {
    const theme = resolveTheme(String(context.globals.theme ?? "Light"));
    return (
      <Wrapper isScale>
        <DialogButton label="Button" size={22} variant="secondary" scale theme={theme} />
        <DialogButton label="Button" size={24} variant="secondary" scale theme={theme} />
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
