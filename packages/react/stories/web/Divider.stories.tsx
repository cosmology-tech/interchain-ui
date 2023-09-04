import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "../../src";

const meta: Meta<typeof Divider> = {
  component: Divider,
  title: "web/Divider",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
