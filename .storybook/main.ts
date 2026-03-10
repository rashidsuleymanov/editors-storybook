import type { StorybookConfig } from '@storybook/react-vite';
import type { UserConfig } from 'vite';

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {},
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  async viteFinal(config) {
    const allowedHosts = new Set(
      Array.isArray(config.server?.allowedHosts) ? config.server.allowedHosts : []
    );

    // Allow all ngrok subdomains
    allowedHosts.add(".ngrok-free.app");

    return {
      ...config,
      server: {
        ...(config.server ?? {}),
        allowedHosts: Array.from(allowedHosts),
      },
    } satisfies UserConfig;
  },
};
export default config;
