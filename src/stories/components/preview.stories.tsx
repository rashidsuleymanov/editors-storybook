import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { PreviewControl, type PreviewControlProps } from "../../components/PreviewControl/PreviewControl";
import { normalizePluginTheme, pluginThemeOptions } from "../_shared/theme";

type StoryArgs = PreviewControlProps & {
  themeMode: "Auto" | (typeof pluginThemeOptions)[number];
};

const meta: Meta<StoryArgs> = {
  title: "Components/Interactive Elements/Preview",
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
    direction: { control: "select", options: ["back", "next"], description: "Arrow direction (single-button stories)" },
    interactive: {
      control: { type: "boolean" },
      description: "Enable hover/pressed interaction",
    },
    isHovered: { control: { type: "boolean" }, description: "Force hover state" },
    isClicked: { control: { type: "boolean" }, description: "Force pressed state" },
    isDisabled: { control: { type: "boolean" }, description: "Disable control" },
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
        component: "Preview navigation controls (Back/Next).",
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

const notifyPreviewClick = () => {
  if (typeof window !== "undefined" && typeof window.alert === "function") {
    window.alert("Preview control clicked");
  }
};

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
          onClick={notifyPreviewClick}
        />
        <PreviewControl
          direction="next"
          theme={theme}
          interactive={args.interactive}
          isHovered={args.isHovered}
          isClicked={args.isClicked}
          isDisabled={args.isDisabled}
          onClick={notifyPreviewClick}
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
        onClick={notifyPreviewClick}
      />
    );
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
        onClick={notifyPreviewClick}
      />
    );
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
};


