import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import {
  ConnectModal,
  Box,
  ConnectModalQRCode,
  ConnectModalHead,
  ConnectModalWalletButton,
  ConnectModalWalletList,
  ConnectModalStatus,
  Button,
} from "../src";
import {
  wallets,
  modalStatusProps,
  qrCodeProps,
} from "./stub/connectWalletData";

const meta: Meta<typeof ConnectModal> = {
  component: ConnectModal,
  title: "ConnectModal",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [hasBack, setHasBack] = useState<boolean>(false);
    const onClose = () => setIsOpen(false);
    const onBack = () => setHasBack(false);
    const onNext = () => setHasBack(true);
    return (
      <Box>
        <Button onClick={() => setIsOpen(true)}>Open modal</Button>
        {/* <ConnectModal
          isOpen={isOpen}
          onClose={onClose}
          header={
            <ConnectModalHead
              title="Hello"
              hasCloseButton
              hasBackButton
              onClose={() => {}}
            />
          }
        >
          <ConnectModalQRCode
            status="Error"
            description="Hello there"
            link="https://google.com"
            errorTitle={"Seems something went wrong :("}
            errorDesc={
              "Dolor lorem ipsum sit amet consectetur adipisicing elit. Eos necessitatibus eveniet ipsa itaque provident recusandae exercitationem numquam aperiam officia facere."
            }
          />
        </ConnectModal> */}
        <ConnectModal
          isOpen={isOpen}
          onClose={onClose}
          header={
            <ConnectModalHead
              title="Select your wallet"
              hasCloseButton
              hasBackButton={hasBack}
              onBack={onBack}
              onClose={onClose}
            />
          }
        >
          {hasBack ? (
            <ConnectModalQRCode {...qrCodeProps} />
          ) : (
            // <ConnectModalStatus {...modalStatusProps} />
            <ConnectModalWalletList
              wallets={wallets}
              onWalletItemClick={onNext}
            />
          )}
        </ConnectModal>
      </Box>
    );
  },
};
