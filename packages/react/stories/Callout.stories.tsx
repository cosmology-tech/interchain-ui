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

export const Primary: Story = {
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
