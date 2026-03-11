# ONLYOFFICE Plugin UI Storybook

Storybook reference catalog for migrated ONLYOFFICE Plugin UI components.

This repository is not a publishable UI package. It is a working reference project used to:

- review migrated component states across themes
- validate layout, spacing, and typography
- document component behavior and usage through Storybook docs
- keep a stable visual catalog for further migration work

## Requirements

- Node.js 20+
- npm 10+

## Getting Started

```bash
npm install
npm run storybook
```

Open Storybook at `http://localhost:6006`.

## Available Commands

```bash
npm run storybook
npm run build-storybook
npm run build
npm run lint
npm test
```

## Repository Structure

```text
.storybook/               Storybook config, branding, manager theme, preview setup
src/components/           React components
src/data/                 Tokens, sizes, theme data, static reference values
src/stories/              Story files and foundations pages
src/styles/components/    Shared component CSS
```

## Storybook Structure

- `Foundations`
  - `Typography`
  - `Colors`
  - `Icons`
  - `Panel`
- `Components`
  - `Buttons`
  - `Actions`
  - `Form`
  - `Data Display`
  - `Layout`
  - `Feedback`

## Supported Themes

The catalog supports the following themes through the global Storybook toolbar:

- `Light`
- `Light Classic`
- `Modern Light`
- `Modern Dark`
- `Dark`
- `Dark Contrast`

Many stories also expose a local `theme` control with an `Auto` mode that follows the current toolbar theme.

## Component Coverage

The current catalog includes:

- dialog buttons
- panel buttons
- icon buttons
- link buttons
- split buttons
- cards
- checkbox
- radio
- switch
- slider
- text field
- text area
- tabs
- context menu
- preview controls
- header
- modal window
- scroll
- info block
- tooltip
- loader

## Foundations Coverage

The `Foundations` section currently documents:

- typography scale
- semantic theme colors
- icon catalog
- panel shell sizes

## Validation Workflow

Before handing off changes, verify:

- the component renders consistently across all supported themes
- hover, pressed, disabled, loading, and empty states do not break layout
- Storybook docs stay readable in light and dark themes
- interactive stories still work through controls and `play` scenarios
- `npm run lint`, `npm test`, and `npm run build-storybook` pass

## Current Quality Gates

The project currently has:

- ESLint validation
- Storybook production build validation
- a minimal Vitest smoke test layer
- Storybook `play` scenarios for a subset of interactive controls

## Notes

- This repository is intentionally focused on Plugin UI reference work, not package publishing.
- Some stories use simplified demo content on purpose to make state review faster.
- Visual parity should be checked in Storybook against expected Plugin UI behavior, not only from code.

## Next Improvements

Useful next steps if the catalog continues to grow:

- add more Vitest coverage for shared utilities and state helpers
- expand `play` coverage for remaining interactive stories
- add more usage guidance on component docs pages
- continue visual cleanup based on review screenshots
