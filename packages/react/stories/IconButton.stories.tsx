import type { Meta, StoryObj } from "@storybook/react";

import { IconButton } from "../src";

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: "IconButton",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    icon: "copy",
  },
};
