import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { ConnectedWallet } from "../src";

const meta: Meta<typeof ConnectedWallet> = {
  component: ConnectedWallet,
  title: "ConnectedWallet",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary ConnectedWallet */
export const Primary: Story = {
  args: {
    avatar: "",
    name: "Name",
    address: "stars1lqsqpnga3c7fyjfnrxv7jdt9zmjvgpv4mv8lf4",
    onCopied() {
      console.log("onCopied");
    },
  },
};
