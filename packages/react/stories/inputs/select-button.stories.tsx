import type { Meta, StoryObj } from "@storybook/react";

import { SelectButton } from "../../src";

const meta: Meta<typeof SelectButton> = {
  component: SelectButton,
  title: "SelectButton",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is Default SelectButton */
export const Default: Story = {
  args: {
    fieldId: "name",
    label: "Select name",
    placeholder: "Select a name option",
    onClick: () => {
      console.log("Clicked");
    },
    size: "sm",
  },
};
