import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Box from "../../src/ui/box";
import Carousel from "../../src/ui/carousel";

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  title: "marketing/Carousel",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

const content = Array(10)
  .fill("")
  .map((_, i) => (
    <Box
      display="grid"
      placeItems="center"
      width="200px"
      height={i % 2 === 0 ? "200px" : "150px"}
      fontSize="$8xl"
      fontFamily="Inter"
      bg="$blue100"
      key={i}
    >
      {i}
    </Box>
  ));

export const Default: Story = {
  args: {
    children: content,
    width: "800px",
  },
};

export const FadeOut: Story = {
  args: {
    children: content,
    width: "800px",
    showFadeOut: true,
  },
};
