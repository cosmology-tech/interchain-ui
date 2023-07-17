import type { Meta, StoryObj } from "@storybook/react";

import { FieldLabel } from "../../src";

const meta: Meta<typeof FieldLabel> = {
  component: FieldLabel,
  title: "FieldLabel",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is Default FieldLabel */
export const Default: Story = {
  args: {
    id: "field1-label",
    htmlFor: "field1",
    label: "Select amount",
  },
};
