import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Divider, Text } from "../../src";

const meta: Meta<typeof Divider> = {
  component: Divider,
  title: "web/Divider",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {},
};

export const Vertical: Story = {
  render() {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="500px"
      >
        <Divider orientation="vertical" />
      </Box>
    );
  },
};
