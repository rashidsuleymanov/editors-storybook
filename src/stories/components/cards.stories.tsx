import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Card, type CardProps } from "../../components/Card/Card";
import type { CardType } from "../../data/cards";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type OpenCardType = Exclude<CardType, "close">;

type StoryArgs = Omit<CardProps, "type" | "theme"> & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
  openType: OpenCardType;
  startExpanded: boolean;
};

const meta: Meta<StoryArgs> = {
  title: "Components/Data Display/Cards",
  component: Card,
  args: {
    state: "default",
    interactive: true,
    stretch: false,
    minWidth: 236,
    themeMode: "Auto",
    openType: "openWithButton",
    startExpanded: false,
    title: "His English teacher says that he is a good pupil great student...",
    helperText: "Text here",
    actionLabel: "Button",
  },
  argTypes: {
    openType: {
      control: "select",
      options: ["openWithButton", "openWithText"],
      description: "Expanded content variant after card opens",
    },
    startExpanded: {
      control: { type: "boolean" },
      description: "Initial state of the card",
    },
    state: {
      control: "select",
      options: ["default", "hover"],
      description: "Fallback state when hover interaction is disabled",
    },
    interactive: {
      control: { type: "boolean" },
      description: "Enable runtime hover interaction",
    },
    stretch: {
      control: { type: "boolean" },
      description: "Stretch card to the available container width",
    },
    minWidth: {
      control: { type: "number" },
      description: "Minimum card width",
    },
    maxWidth: {
      control: { type: "number" },
      description: "Maximum card width",
    },
    title: {
      control: "text",
      description: "Main card text",
    },
    helperText: {
      control: "text",
      description: "Secondary text for `openWithText` mode",
    },
    actionLabel: {
      control: "text",
      description: "Action button label",
    },
    tags: {
      control: "object",
      description: "Tag list for `openWithButton` mode",
    },
    themeMode: {
      name: "theme",
      control: "select",
      options: ["Auto", ...pluginThemeOptions],
      description: "Auto = current Storybook toolbar theme",
    },
    onToggle: { table: { disable: true } },
    onAction: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Interactive cards with collapsible content and two open modes: button or text.",
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

const InteractiveCard = ({
  openType,
  startExpanded,
  ...props
}: CardProps & { openType: OpenCardType; startExpanded: boolean }) => {
  const [isOpen, setIsOpen] = useState(startExpanded);

  return (
    <Card
      {...props}
      type={isOpen ? openType : "close"}
      onToggle={() => setIsOpen((prev) => !prev)}
    />
  );
};

const renderInteractive = (args: StoryArgs, globalTheme: unknown) => {
  const theme = resolveStoryTheme(args.themeMode, String(globalTheme ?? "Light"));
  const { openType, startExpanded, ...cardArgs } = args;

  return (
    <InteractiveCard
      key={`${openType}-${startExpanded}`}
      {...cardArgs}
      theme={theme}
      openType={openType}
      startExpanded={startExpanded}
    />
  );
};

export const Default: Story = {
  render: (args, context) => renderInteractive(args, context.globals.theme),
};

export const CloseVariant: Story = {
  args: {
    openType: "openWithButton",
    startExpanded: false,
  },
  render: (args, context) => renderInteractive(args, context.globals.theme),
};

export const OpenWithTagsAndButton: Story = {
  args: {
    openType: "openWithButton",
    startExpanded: true,
  },
  render: (args, context) => renderInteractive(args, context.globals.theme),
};

export const OpenWithTextAndButton: Story = {
  args: {
    openType: "openWithText",
    startExpanded: true,
  },
  render: (args, context) => renderInteractive(args, context.globals.theme),
};

export const StretchLayout: Story = {
  args: {
    stretch: true,
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    const { openType, startExpanded, ...cardArgs } = args;

    return (
      <div style={{ display: "grid", gap: 16 }}>
        <div style={{ width: 236 }}>
          <InteractiveCard
            key={`narrow-${openType}-${startExpanded}`}
            {...cardArgs}
            theme={theme}
            openType={openType}
            startExpanded={startExpanded}
          />
        </div>
        <div style={{ width: "min(100%, 760px)" }}>
          <InteractiveCard
            key={`wide-${openType}-${startExpanded}`}
            {...cardArgs}
            theme={theme}
            openType={openType}
            startExpanded={startExpanded}
          />
        </div>
      </div>
    );
  },
};


