import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box, Carousel } from "../../src";

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  title: "web/Carousel",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: Array(10)
      .fill("")
      .map((_, i) => (
        <Box
          display="grid"
          placeItems="center"
          width="200px"
          height="200px"
          fontSize="$8xl"
          fontFamily="Inter"
          bg="$blue100"
          key={i}
        >
          {i}
        </Box>
      )),
    width: "800px",
  },
};
