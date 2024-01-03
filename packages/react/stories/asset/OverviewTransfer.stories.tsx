import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Button from "../../src/ui/button";
import BasicModal from "../../src/ui/basic-modal";
import Stack from "../../src/ui/stack";
import Box from "../../src/ui/box";
import Skeleton from "../../src/ui/skeleton";
import OverviewTransfer from "../../src/ui/overview-transfer";
import type { AvailableItem } from "../../src/ui/transfer-item/transfer-item.types";
import { useMockData } from "../stub/mock-data-client";

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
    timeEstimateLabel: "~ 20 seconds",
    onTransfer() {
      console.log("onTransfer");
    },
    onCancel() {
      console.log("onCancel");
    },
  },
  render: (props) => {
    const [selected, setSelected] = useState<AvailableItem | null>(null);

    const { isReady, assets } = useMockData({
      onReady: (assets) => {
        setSelected(assets[15]);
      },
    });

    const stride = assets.find((item) => item.symbol === "STRD");

    const [isDepositOpen, setIsDepositOpen] = useState(false);
    const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

    const onChange = (selectedItem, value) => {
      console.log("onChange", selectedItem, value);
      setSelected(selectedItem);
    };

    return (
      <Stack space="$10">
        <BasicModal
          renderTrigger={(triggerProps) => (
            <Button {...triggerProps} onClick={() => setIsDepositOpen(true)}>
              Deposit
            </Button>
          )}
          isOpen={isDepositOpen}
          title="Deposit"
          onClose={() => setIsDepositOpen(false)}
        >
          {isReady && selected != null ? (
            <OverviewTransfer
              {...props}
              dropdownList={assets}
              selectedItem={selected}
              fromChainLogoUrl={selected?.imgSrc}
              toChainLogoUrl={stride?.imgSrc ?? ""}
              onChange={onChange}
            />
          ) : (
            <Box display="flex" flexDirection="column" gap="$4">
              <Skeleton borderRadius="$sm" width="$26" height="$10" />
              <Skeleton borderRadius="$sm" width="$30" height="$10" />
              <Skeleton borderRadius="$sm" width="$20" height="$10" />
            </Box>
          )}
        </BasicModal>
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
          {isReady && selected != null ? (
            <OverviewTransfer
              {...props}
              dropdownList={assets}
              selectedItem={selected}
              fromChainLogoUrl={selected?.imgSrc}
              toChainLogoUrl={stride?.imgSrc ?? ""}
              onChange={onChange}
            />
          ) : (
            <Box display="flex" flexDirection="column" gap="$4">
              <Skeleton borderRadius="$sm" width="$26" height="$10" />
              <Skeleton borderRadius="$sm" width="$30" height="$10" />
              <Skeleton borderRadius="$sm" width="$20" height="$10" />
            </Box>
          )}
        </BasicModal>
      </Stack>
    );
  },
};
