import type { Meta, StoryObj } from "@storybook/react";

import { NftMint } from "../../src";

const meta: Meta<typeof NftMint> = {
  component: NftMint,
  title: "nft/NftMint",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
  },
};
