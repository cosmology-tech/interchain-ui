import type { Meta, StoryObj } from "@storybook/react";

import { Link } from "../src";

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
    children: "Go to google",
  },
};
