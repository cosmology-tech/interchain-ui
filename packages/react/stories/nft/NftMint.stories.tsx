import * as React from "react";
import BigNumber from "bignumber.js";
import type { Meta, StoryObj } from "@storybook/react";

import NftMint from "../../src/ui/nft-mint";
// @ts-expect-error
import bipz1 from "../../static/nft/bipz-1.jpeg";

const meta: Meta<typeof NftMint> = {
  component: NftMint,
  title: "nft/NftMint",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "NFT Mint",
    tag: "NOW LIVE",
    name: "Bipz",
    description:
      "Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus.",
    quantity: 5000,
    royalties: 10,
    minted: 46,
    tokenAmount: 24,
    available: 2948,
    priceDisplayAmount: 64,
    limited: 50,
    imgSrc: bipz1,
    pricePerToken: 0.01063943,
    tokenName: "STARS",
  },
  render: (props) => {
    const PRICE_PER_TOKEN = 0.2;

    const [amount, setAmount] = React.useState<number>(0);
    const [notionalAmount, setNotionalAmount] = React.useState<number>(0);

    const onChange = (value) => {
      console.log("onChange", value);
      setAmount(value);
      setNotionalAmount(
        new BigNumber(value)
          .multipliedBy(PRICE_PER_TOKEN)
          .precision(2)
          .toNumber()
      );
    };

    const onMint = () => {
      setAmount(0);
      console.log("minted and reset amount to 0");
    };

    return (
      <NftMint
        {...props}
        amount={amount}
        notionalAmount={notionalAmount}
        defaultAmount={0}
        onChange={onChange}
        onMint={onMint}
      />
    );
  },
};
