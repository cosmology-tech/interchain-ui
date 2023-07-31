import type { Meta, StoryObj } from "@storybook/react";

import { OverviewTransfer } from "../../src";
import { TransferDetail } from "../../src/ui/transfer-item/transfer-item.types";

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
    ],
    onTransfer(transferDetail: TransferDetail) {
      console.log("transferDetail===", transferDetail);
    },
  },
};
