import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Button from "../../src/ui/button";
import BasicModal from "../../src/ui/basic-modal";
import Stack from "../../src/ui/stack";
import OverviewTransfer from "../../src/ui/overview-transfer";
import type { AvailableItem } from "../../src/ui/transfer-item/transfer-item.types";
import { getTransferList } from "../stub/assetData";

const meta: Meta<typeof OverviewTransfer> = {
  component: OverviewTransfer,
  title: "Asset/OverviewTransfer",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

const dropdownList = getTransferList();
const stride = dropdownList.find((item) => item.name === "Stride");

export const Primary: Story = {
  args: {
    dropdownList: dropdownList,
    timeEstimateLabel: "~ 20 seconds",
    onTransfer() {
      console.log("onTransfer");
    },
    onCancel() {
      console.log("onCancel");
    },
  },
  render: (props) => {
    const [isDepositOpen, setIsDepositOpen] = useState(false);
    const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

    const [selected, setSelected] = useState<AvailableItem>(dropdownList[1]);

    const onChange = (selectedItem, value) => {
      console.log("onChange", selectedItem, value);
      setSelected(selectedItem);
    };

    return (
      <Stack space="$10">
        <OverviewTransfer
          {...props}
          selectedItem={selected}
          fromChainLogoUrl={selected.imgSrc}
          toChainLogoUrl={stride.imgSrc}
          onChange={onChange}
        />
        {/* <BasicModal
          renderTrigger={(triggerProps) => (
            <Button {...triggerProps} onClick={() => setIsDepositOpen(true)}>
              Deposit
            </Button>
          )}
          isOpen={isDepositOpen}
          title="Deposit"
          onClose={() => setIsDepositOpen(false)}
        >

        </BasicModal> */}
        <BasicModal
          renderTrigger={(triggerProps) => (
            <Button {...triggerProps} onClick={() => setIsWithdrawOpen(true)}>
              Withdraw
            </Button>
          )}
          isOpen={isWithdrawOpen}
          title="Withdraw"
          onClose={() => setIsWithdrawOpen(false)}
        >
          <OverviewTransfer {...props} />
        </BasicModal>
      </Stack>
    );
  },
};
