import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Select from "../../src/ui/select";
import SelectOption from "../../src/ui/select-option";
import Box from "../../src/ui/box";

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
      <Select
        width={300}
        optionsWidth={500}
        // defaultSelectedItem={{
        //   key: "Dog",
        //   label: "Dog",
        //   index: 2,
        // }}
        label="Favorite Animal"
      >
        <SelectOption optionKey="Red Panda" label="Red Panda">
          Red Panda
        </SelectOption>
        <SelectOption optionKey="Cat" label="Cat" isDisabled>
          Cat
        </SelectOption>
        <SelectOption optionKey="Dog" label="Dog">
          Dog
        </SelectOption>
        <SelectOption optionKey="Aardvark" label="Aardvark">
          Aardvark
        </SelectOption>
        <SelectOption optionKey="Kangaroo" label="Kangaroo">
          Kangaroo
        </SelectOption>
        <SelectOption optionKey="Snake" label="Snake">
          Snake
        </SelectOption>
      </Select>
    </Box>
  ),
};
