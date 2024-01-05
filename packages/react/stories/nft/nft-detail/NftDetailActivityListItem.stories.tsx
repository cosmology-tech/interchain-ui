import type { Meta, StoryObj } from "@storybook/react";

import NftDetailActivityListItem from "../../../src/ui/nft-detail-activity-list-item";

const meta: Meta<typeof NftDetailActivityListItem> = {
  component: NftDetailActivityListItem,
  title: "nft/nft-detail/NftDetailActivityListItem",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    price: 200,
    event: "List",
    from: "stargaze.stars",
    date: "12 days ago",
  },
};
