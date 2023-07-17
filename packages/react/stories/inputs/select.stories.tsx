import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Select, Item, Box } from "../../src";

const meta: Meta<typeof Select> = {
  component: Select,
  title: "Select",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is Default FieldLabel */
export const Default: Story = {
  render: () => (
    <Box width="30">
      <Select label="Favorite Animal">
        <Item key="red panda">Red Panda</Item>
        <Item key="cat">Cat</Item>
        <Item key="dog">Dog</Item>
        <Item key="aardvark">Aardvark</Item>
        <Item key="kangaroo">Kangaroo</Item>
        <Item key="snake">Snake</Item>
      </Select>
    </Box>
  ),
};
