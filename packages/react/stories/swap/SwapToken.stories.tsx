import React, { useMemo, useState } from "react";
import { getTransferList } from "../stub/assetData";

import type { Meta, StoryObj } from "@storybook/react";

import Box from "../../src/ui/box";
import SwapToken from "../../src/ui/swap-token";
import { SwapTokenProps } from "../../src/ui/swap-token/swap-token.types";
import BasicModal from "../../src/ui/basic-modal";
import Button from "../../src/ui/button";

const meta: Meta<typeof SwapToken> = {
  component: SwapToken,
  title: "swap/SwapToken",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary SwapToken */
export const Primary: Story = {
  args: {
    swapPrice: {
      hasRoute: true,
      priceImpact: "< 0.001%",
      swapFee: {
        percentage: "0.2%",
        value: "< $0.01",
      },
      routeDisabled: false,
      minimumReceived: 250.4,
    },
    onSwap: () => {
      console.log("Swap");
    },
    onToggleDirection: () => {
      console.log("ToggleDirection");
    },
    onToleranceChange: (percent) => {
      console.log("onToleranceChange", percent);
    },
  },
  render: (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownList = useMemo(() => getTransferList(), []);
    const [to, setTo] = useState<SwapTokenProps["to"]>({
      label: "To",
      options: dropdownList,
      selected: dropdownList[0],
      amount: 0,
      onItemSelected: (selectedItem) => {
        setTo((prev) => ({ ...prev, selected: selectedItem }));
      },
      onAmountChange: (selectedItem, amount) => {
        setTo((prev) => ({ ...prev, amount }));
      },
    });

    const [from, setFrom] = useState<SwapTokenProps["to"]>({
      label: "To",
      options: dropdownList,
      selected: dropdownList[1],
      amount: 0,
      onItemSelected: (selectedItem) => {
        setFrom((prev) => ({ ...prev, selected: selectedItem }));
      },
      onAmountChange: (selectedItem, amount) => {
        setFrom((prev) => ({ ...prev, amount }));
      },
    });

    return (
      // <BasicModal
      //   renderTrigger={(triggerProps) => (
      //     <Button {...triggerProps} onClick={() => setIsOpen(true)}>
      //       Swap
      //     </Button>
      //   )}
      //   isOpen={isOpen}
      //   title="Swap"
      //   onClose={() => setIsOpen(false)}
      // >
      // </BasicModal>
      <Box width="500px">
        <SwapToken {...props} from={from} to={to} />
      </Box>
    );
  },
};
