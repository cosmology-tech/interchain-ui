import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { ClipboardCopyText } from "../src";

const meta: Meta<typeof ClipboardCopyText> = {
  component: ClipboardCopyText,
  title: "ClipboardCopyText",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "stars1lqsqpnga3c7fyjfnrxv7jdt9zmjvgpv4mv8lf4",
    truncate: "middle",
    midTruncateLimit: "md"
  },
};
