import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { NftMakeOffer, BasicModal, Button } from "../../../src";

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
    imgSrc:
      "https://res.cloudinary.com/stargaze/image/upload/erom1wypzaxaratnm7dg.jpg",
    tokenName: "KUJIRANS #763",
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
      <>
        <Button onClick={() => setIsOpen(true)}>Make Offer</Button>
        <BasicModal
          isOpen={isOpen}
          title="Make Offer"
          onClose={() => setIsOpen(false)}
        >
          <NftMakeOffer {...props} />
        </BasicModal>
      </>
    );
  },
};
