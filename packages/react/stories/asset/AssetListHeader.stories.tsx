import type { Meta, StoryObj } from "@storybook/react";

import AssetListHeader from "../../src/ui/asset-list-header";

const meta: Meta<typeof AssetListHeader> = {
  component: AssetListHeader,
  title: "Asset/AssetListHeader",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const SingleChainHeader: Story = {
  args: {
    title: "Your asset",
    singleChainHeader: {
      label: "Total on Osmosis",
      value: "144.23",
    },
    onDeposit: () => {
      console.log("onDeposit");
    },
    onWithdraw: () => {
      console.log("onWithdraw");
    },
  },
};

export const MultiChainHeader: Story = {
  args: {
    title: "Your assets",
    multiChainHeader: [
      {
        label: "Total on Osmosis",
        value: "144.23",
      },
      {
        label: "Total across all chains",
        value: "732.16",
      },
    ],
    onDeposit: () => {
      console.log("onDeposit");
    },
    onWithdraw: () => {
      console.log("onWithdraw");
    },
  },
};
