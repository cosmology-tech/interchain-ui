import type { Meta, StoryObj } from "@storybook/react";

import Spinner from "../src/ui/spinner";

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  title: "Spinner",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
