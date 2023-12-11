import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import NftMakeOffer from "../../../src/ui/nft-make-offer";
import Button from "../../../src/ui/button";
import BasicModal from "../../../src/ui/basic-modal";
import badkid1 from "../../../static/nft/badkid-3543.jpeg";

const meta: Meta<typeof NftMakeOffer> = {
  component: NftMakeOffer,
  title: "nft/nft-detail/NftMakeOffer",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    imgSrc: badkid1,
    tokenName: "BadKid #3543",
    onChange(value) {
      console.log("onChange", value);
    },
    onMakeOffer() {
      console.log("onMakeOffer");
    },
    onCancel() {
      console.log("onCancel");
    },
  },
  render: (props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <BasicModal
        renderTrigger={(triggerProps) => (
          <Button {...triggerProps} onClick={() => setIsOpen(true)}>
            Make Offer
          </Button>
        )}
        isOpen={isOpen}
        title="Make Offer"
        onClose={() => setIsOpen(false)}
      >
        <NftMakeOffer {...props} />
      </BasicModal>
    );
  },
};
