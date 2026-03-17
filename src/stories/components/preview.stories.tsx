import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { PreviewControl, type PreviewControlProps } from "../../components/PreviewControl/PreviewControl";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type StoryArgs = PreviewControlProps & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
};

const meta: Meta<StoryArgs> = {
  title: "Components/Actions/Preview Controls",
  component: PreviewControl,
  args: {
    direction: "back",
    interactive: true,
    isHovered: false,
    isClicked: false,
    isDisabled: false,
    themeMode: "Auto",
  },
  argTypes: {
    direction: { control: "select", options: ["back", "next"], description: "Arrow direction for single-button previews" },
    interactive: {
      control: "boolean",
      description: "Allow hover and click feedback directly in the canvas",
    },
    isHovered: { control: "boolean", description: "Force hover appearance for review" },
    isClicked: { control: "boolean", description: "Force pressed appearance for review" },
    isDisabled: { control: "boolean", description: "Show the disabled state" },
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
        component: "Pair of compact navigation controls used in preview galleries and step-through viewers.",
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

const ControlsRow = ({ children }: { children: ReactNode }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 40 }}>{children}</div>
);

const noop = () => {};

export const Default: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return (
      <ControlsRow>
        <PreviewControl
          direction="back"
          theme={theme}
          interactive={args.interactive}
          isHovered={args.isHovered}
          isClicked={args.isClicked}
          isDisabled={args.isDisabled}
          onClick={noop}
        />
        <PreviewControl
          direction="next"
          theme={theme}
          interactive={args.interactive}
          isHovered={args.isHovered}
          isClicked={args.isClicked}
          isDisabled={args.isDisabled}
          onClick={noop}
        />
      </ControlsRow>
    );
  },
};

export const Back: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return (
      <PreviewControl
        direction="back"
        theme={theme}
        interactive={args.interactive}
        isHovered={args.isHovered}
        isClicked={args.isClicked}
        isDisabled={args.isDisabled}
        onClick={noop}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Single back control.",
      },
    },
  },
};

export const Next: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return (
      <PreviewControl
        direction="next"
        theme={theme}
        interactive={args.interactive}
        isHovered={args.isHovered}
        isClicked={args.isClicked}
        isDisabled={args.isDisabled}
        onClick={noop}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Single next control.",
      },
    },
  },
};

export const Disabled: Story = {
  render: (args, context) => {
    const theme = resolveStoryTheme(args.themeMode, String(context.globals.theme ?? "Light"));
    return (
      <ControlsRow>
        <PreviewControl direction="back" theme={theme} interactive={false} isDisabled />
        <PreviewControl direction="next" theme={theme} interactive={false} isDisabled />
      </ControlsRow>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled pair used when navigation is unavailable.",
      },
    },
  },
};



