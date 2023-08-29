import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Select, SelectOption, Box } from "../../src";

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
    <Box width="30" height="700px">
      <Select width={300} label="Favorite Animal">
        <SelectOption label="Red Panda">Red Panda</SelectOption>
        <SelectOption label="Cat">Cat</SelectOption>
        <SelectOption label="Dog">Dog</SelectOption>
        <SelectOption label="Aardvark">Aardvark</SelectOption>
        <SelectOption label="Kangaroo">Kangaroo</SelectOption>
        <SelectOption label="Snake">Snake</SelectOption>
        <SelectOption label="Kangaroo 2">Kangaroo 2</SelectOption>
        <SelectOption label="Snake 2">Snake 2</SelectOption>
        <SelectOption label="Kangaroo 3">Kangaroo 3</SelectOption>
        <SelectOption label="Snake 3">Snake 3</SelectOption>
        <SelectOption label="Kangaroo 4">Kangaroo 4</SelectOption>
        <SelectOption label="Snake 4">Snake 4</SelectOption>
        <SelectOption label="Kangaroo 5">Kangaroo 5</SelectOption>
        <SelectOption label="Snake 5">Snake 5</SelectOption>
      </Select>
    </Box>
  ),
};
