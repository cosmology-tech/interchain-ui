import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarBadge, Box, Stack } from "../src";
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

export const WithBadge: Story = {
  args: {},
  render: (props) => {
    return (
      <Stack direction="horizontal" space="$4">
        <Avatar name="Dan Abrahmov" size="md" src="https://bit.ly/dan-abramov">
          <AvatarBadge
            attributes={{
              backgroundColor: "$green400",
            }}
          />
        </Avatar>
        <Avatar name="Dan Abrahmov" size="md" src="https://bit.ly/dan-abramov">
          <AvatarBadge
            size="2em"
            attributes={{
              backgroundColor: "transparent",
            }}
          >
            <Box
              as="img"
              width="100%"
              height="100%"
              borderRadius="$full"
              attributes={{
                alt: "Dan small",
                src: "https://bit.ly/dan-abramov",
              }}
            />
          </AvatarBadge>
        </Avatar>
      </Stack>
    );
  },
};
