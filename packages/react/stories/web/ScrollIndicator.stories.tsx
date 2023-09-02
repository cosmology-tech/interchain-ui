import type { Meta, StoryObj } from "@storybook/react";

import { ScrollIndicator } from "../../src";

const meta: Meta<typeof ScrollIndicator> = {
  component: ScrollIndicator,
  title: "web/ScrollIndicator",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Left: Story = {
  args: {
    direction: "left",
  },
};

export const Right: Story = {
  args: {
    direction: "right",
  },
};

export const NoShadow: Story = {
  args: {
    direction: "right",
    noShadow: true,
  },
};
