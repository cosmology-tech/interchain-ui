import type { Meta, StoryObj } from "@storybook/react";

import TokenNumberField from "../src/ui/token-number-field";

const meta: Meta<typeof TokenNumberField> = {
  component: TokenNumberField,
  title: "TokenNumberField",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
