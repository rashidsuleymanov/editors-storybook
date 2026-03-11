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
    title:
      "His English teacher says that he is a good pupil and a great student who always participates in class discussions and finishes his work carefully",
    helperText: "Text here",
    actionLabel: "Button",
  },
  argTypes: {
    openType: {
      control: "select",
      options: ["openWithButton", "openWithText"],
      description: "Expanded layout: tags + action button, or helper text + action button",
    },
    startExpanded: {
      control: { type: "boolean" },
      description: "Open the card on first render",
    },
    state: {
      control: "select",
      options: ["default", "hover"],
      description: "Static visual state used when interactive mode is off",
    },
    interactive: {
      control: { type: "boolean" },
      description: "Allow hover and expand/collapse interaction in the canvas",
    },
    stretch: {
      control: { type: "boolean" },
      description: "Let the card fill the available row width",
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
      description: "Main title shown in collapsed and expanded states",
    },
    helperText: {
      control: "text",
      description: "Helper copy used in the text-based expanded variant",
    },
    actionLabel: {
      control: "text",
      description: "Label for the action button inside the expanded card",
    },
    tags: {
      control: "object",
      description: "Tag pills used in the tags-and-button expanded variant",
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
          "Collapsible information cards with a compact closed state and two expanded patterns: helper text or tag list plus action button.",
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

const renderStatic = (args: StoryArgs, globalTheme: unknown) => {
  const theme = resolveStoryTheme(args.themeMode, String(globalTheme ?? "Light"));
  const { openType, startExpanded, ...cardArgs } = args;

  return (
    <Card
      {...cardArgs}
      theme={theme}
      type={startExpanded ? openType : "close"}
      interactive={Boolean(cardArgs.interactive)}
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
    interactive: false,
  },
  render: (args, context) => renderStatic(args, context.globals.theme),
  parameters: {
    docs: {
      description: {
        story: "Collapsed card state with title preview only.",
      },
    },
  },
};

export const OpenWithTagsAndButton: Story = {
  args: {
    openType: "openWithButton",
    startExpanded: true,
    interactive: false,
  },
  render: (args, context) => renderStatic(args, context.globals.theme),
  parameters: {
    docs: {
      description: {
        story: "Expanded card with tags and a single action button.",
      },
    },
  },
};

export const OpenWithTextAndButton: Story = {
  args: {
    openType: "openWithText",
    startExpanded: true,
    interactive: false,
  },
  render: (args, context) => renderStatic(args, context.globals.theme),
  parameters: {
    docs: {
      description: {
        story: "Expanded card with helper copy and a single action button.",
      },
    },
  },
};

export const StretchLayout: Story = {
  args: {
    stretch: true,
    interactive: false,
  },
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    const { openType, startExpanded, ...cardArgs } = args;

    return (
      <div style={{ display: "grid", gap: 16 }}>
        <div style={{ width: 236 }}>
          <Card
            {...cardArgs}
            theme={theme}
            type={startExpanded ? openType : "close"}
          />
        </div>
        <div style={{ width: "min(100%, 760px)" }}>
          <Card
            {...cardArgs}
            theme={theme}
            type={startExpanded ? openType : "close"}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Compare the same card in narrow and wide containers.",
      },
    },
  },
};


