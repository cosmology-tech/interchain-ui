import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Callout from "../src/ui/callout";

const meta: Meta<typeof Callout> = {
  component: Callout,
  title: "Callout",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    title: "Visually important content",
    intent: "info",
    iconName: "lock",
    children:
      "You will need to undelegate in order for your staked assets to be liquid again. This process will take 14 days to complete.",
    attributes: {
      width: "600px",
    },
  },
};

export const Success: Story = {
  args: {
    title: "Visually important content",
    intent: "success",
    iconName: "lock",
    children:
      "You will need to undelegate in order for your staked assets to be liquid again. This process will take 14 days to complete.",
    attributes: {
      width: "600px",
    },
  },
};

export const Error: Story = {
  args: {
    title: "Visually important content",
    intent: "error",
    iconName: "lock",
    children:
      "You will need to undelegate in order for your staked assets to be liquid again. This process will take 14 days to complete.",
    attributes: {
      width: "600px",
    },
  },
};

export const Warning: Story = {
  args: {
    title: "Visually important content",
    intent: "warning",
    iconName: "lock",
    children:
      "You will need to undelegate in order for your staked assets to be liquid again. This process will take 14 days to complete.",
    attributes: {
      width: "600px",
    },
  },
};

export const None: Story = {
  args: {
    title: "Visually important content",
    intent: "none",
    iconName: "lock",
    children:
      "You will need to undelegate in order for your staked assets to be liquid again. This process will take 14 days to complete.",
    attributes: {
      width: "600px",
    },
  },
};
