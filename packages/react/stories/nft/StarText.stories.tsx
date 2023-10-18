import type { Meta, StoryObj } from "@storybook/react";

import StarText from "../../src/ui/star-text";

const meta: Meta<typeof StarText> = {
  component: StarText,
  title: "nft/StarText",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Floor price",
    value: 100,
  },
};
