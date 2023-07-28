import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../src";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Button",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary button */
export const Primary: Story = {
  args: {
    children: "Button",
  },
};

export const Secondary: Story = {
  args: {
    children: "Button",
    intent: "secondary",
  },
};

export const Tertiary: Story = {
  args: {
    children: "Button",
    intent: "tertiary",
  },
};

export const SecondaryGhost: Story = {
  args: {
    children: "Button",
    intent: "secondary",
    variant: "ghost",
  },
};

export const Outlined: Story = {
  args: {
    children: "Button",
    intent: "secondary",
    variant: "outlined",
  },
};

export const ConnectWallet: Story = {
  args: {
    children: "Connect Wallet",
    leftIcon: "walletFilled",
  },
};

export const Large: Story = {
  args: {
    children: "Button",
    size: "lg",
  },
};

export const Middle: Story = {
  args: {
    children: "Button",
    size: "md",
  },
};

export const Small: Story = {
  args: {
    children: "Button",
    size: "sm",
  },
};

export const Unstyled: Story = {
  args: {
    variant: "unstyled",
    children: "Unbond All",
  },
};

export const Text: Story = {
  args: {
    children: "100%",
    intent: "text",
    size: "xs",
  },
};
