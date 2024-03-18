import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Avatar from "../src/ui/avatar";
import AvatarBadge from "../src/ui/avatar-badge";
import Box from "../src/ui/box";
import Stack from "../src/ui/stack";

const dogImage = `https://picsum.photos/id/237/200/200`;

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
        <Avatar name="Puppy" size="2xs" src={dogImage} />
        <Avatar
          name="Koala Titi"
          size="xs"
          src="https://bit.ly/hellasdasdasd"
        />
        <Avatar name="Abu Da" size="sm" src="https://bit.ly/hellasdasdasd" />
        <Avatar name="Baby G" size="md" src="https://bit.ly/hellasdasdasd" />
        <Avatar name="Baby G" size="lg" src="https://bit.ly/hellasdasdasd" />
        <Avatar name="Puppy" size="xl" src={dogImage} />
        <Avatar name="Puppy" size="2xl" src={dogImage} />
      </Stack>
    );
  },
};

export const WithBadge: Story = {
  args: {},
  render: (props) => {
    return (
      <Stack direction="horizontal" space="$4">
        <Avatar name="Dan" size="md" src={dogImage}>
          <AvatarBadge
            attributes={{
              backgroundColor: "$green400",
            }}
          />
        </Avatar>
        <Avatar name="Dog" size="md" src={dogImage}>
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
                alt: "Dog small",
                src: dogImage,
              }}
            />
          </AvatarBadge>
        </Avatar>
      </Stack>
    );
  },
};
