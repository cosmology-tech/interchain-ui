import type { Meta, StoryObj } from "@storybook/react";

import Link from "../src/ui/link";

const meta: Meta<typeof Link> = {
  component: Link,
  title: "Link",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    href: "google.com",
    target: "_blank",
    background: true,
    underline: true,
    color: {
      base: "$textSecondary",
      hover: "$linkHover",
    },
    children: "Go to google",
  },
};
