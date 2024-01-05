import type { Meta, StoryObj } from "@storybook/react";

import NftDetailActivityList from "../../../src/ui/nft-detail-activity-list";

const meta: Meta<typeof NftDetailActivityList> = {
  component: NftDetailActivityList,
  title: "nft/nft-detail/NftDetailActivityList",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    list: [
      {
        price: 200,
        event: "List",
        from: "stargaze.stars",
        date: "12 days ago",
      },
      {
        price: 200,
        event: "List",
        from: "stargaze.stars",
        to: "shane",
        date: "12 days ago",
      },
    ],
  },
};
