import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Button from "../src/ui/button";
import Box from "../src/ui/box";
import ConnectModal from "../src/ui/connect-modal";
import ConnectModalQRCode from "../src/ui/connect-modal-qrcode";
import ConnectModalHead from "../src/ui/connect-modal-head";
import ConnectModalWalletList from "../src/ui/connect-modal-wallet-list";
import ConnectModalStatus from "../src/ui/connect-modal-status";
import { WalletPluginSystem } from "../src/ui/connect-modal-wallet-list";
import { wallets, qrCodeProps } from "./stub/connectWalletData";

const meta: Meta<typeof ConnectModal> = {
  component: ConnectModal,
  title: "ConnectModal",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

const LIMIT_WALLETS = 4;

function convert(ws: typeof wallets) {
  return ws
    .map((wallet) => ({
      ...wallet,
      logo: wallet.extends
        ? WalletPluginSystem[wallet.extends].logo
        : wallet.logo,
      badge: wallet.extends
        ? WalletPluginSystem[wallet.extends].text
        : undefined,
      btmLogo: wallet.extends ? wallet.logo : undefined,
    }))
    .slice(0, LIMIT_WALLETS);
}

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
              wallets={convert(wallets)}
              onWalletItemClick={onNext}
            />
          )}
        </ConnectModal>
      </Box>
    );
  },
};

export const ConnectModalStatusView: Story = {
  args: {},
  render: () => {
    return (
      <ConnectModalStatus
        status="Connected"
        connectedInfo={{
          avatar: "https://picsum.photos/id/237/200/200",
          name: "Hello name",
          address: "0x1234567890",
        }}
        wallet={{
          logo: "https://picsum.photos/id/237/200/200",
          name: "Hello name",
          mobileDisabled: true,
        }}
      />
    );
  },
};
