import type { Meta, StoryObj } from "@storybook/react";

import { ListForSale } from "../../../../src";

const meta: Meta<typeof ListForSale> = {
  component: ListForSale,
  title: "nft/nft-detail/list-for-sale/ListForSale",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
  },
};
