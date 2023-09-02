import type { Meta, StoryObj } from "@storybook/react";

import { Label } from "../../src";

const meta: Meta<typeof Label> = {
  component: Label,
  title: "web/Label",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "75,000+ Downloads",
  },
};

export const CustomColor: Story = {
  args: {
    text: "75,000+ Downloads",
    color: "#FFF",
    backgroundColor: "#5F14C9",
  },
};
