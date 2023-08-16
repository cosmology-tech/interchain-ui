import type { Meta, StoryObj } from "@storybook/react";

import { OverviewTransfer } from "../../src";
import { AvailableItem } from "../../src/ui/transfer-item/transfer-item.types";

const meta: Meta<typeof OverviewTransfer> = {
  component: OverviewTransfer,
  title: "Asset/OverviewTransfer",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: "withdraw",
    dropDownList: [
      {
        available: "713.32",
        symbol: "UMEE",
        denom: "Umee",
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.png",
        priceDisplayAmount: 0.5,
      },
      {
        available: "89.66",
        symbol: "USTC",
        denom: "Terra Classic",
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/terra/images/ust.png",
        priceDisplayAmount: 10,
      },
      {
        available: "102.61",
        symbol: "TORI",
        denom: "Teritori",
        imgSrc:
          "https://raw.githubusercontent.com/cosmos/chain-registry/master/teritori/images/utori.png",
        priceDisplayAmount: 5,
      },
    ],
    onTransfer() {
      console.log("onTransfer");
    },
    onCancel() {
      console.log("onCancel");
    },
    onChange(selectedItem, value) {
      console.log("onChange", selectedItem, value);
    },
  },
};
