import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, Box, Stack } from "../src";
// import BasicModal from '../scaffolds/modal/modal'

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: "Avatar",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (props) => {
    return (
      <Stack direction="horizontal" space="$4">
        <Avatar
          name="Dan Abrahmov"
          size="2xs"
          src="https://bit.ly/dan-abramov"
        />
        <Avatar
          name="Koala Titi"
          size="xs"
          src="https://bit.ly/hellasdasdasd"
        />
        <Avatar name="Abu Da" size="sm" src="https://bit.ly/hellasdasdasd" />
        <Avatar name="Baby G" size="md" src="https://bit.ly/hellasdasdasd" />
        <Avatar
          name="Dan Abrahmov"
          size="xl"
          src="https://bit.ly/dan-abramov"
        />
        <Avatar
          name="Dan Abrahmov"
          size="2xl"
          src="https://bit.ly/dan-abramov"
        />
      </Stack>
    );
  },
};
