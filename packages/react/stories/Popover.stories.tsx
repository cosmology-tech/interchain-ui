import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Box from "../src/ui/box";
import Button from "../src/ui/button";
import Popover from "../src/ui/popover";
import PopoverTrigger from "../src/ui/popover-trigger";
import PopoverContent from "../src/ui/popover-content";

const meta: Meta<typeof Popover> = {
  component: Popover,
  title: "Popover",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

const content = (
  <Box
    width="200px"
    height="100px"
    borderRadius="6px"
    backgroundColor="lightblue"
    fontFamily="$body"
    display="grid"
    alignItems="center"
    justifyContent="center"
  >
    Popover content
  </Box>
);

export const Primary: Story = {
  args: {
    offset: 20,
    children: (
      <>
        <PopoverTrigger>
          <Button>Open popver</Button>
        </PopoverTrigger>
        <PopoverContent arrowStyles={{ fill: "lightblue" }}>
          {content}
        </PopoverContent>
      </>
    ),
  },
};

export const ClickTrigger: Story = {
  args: {
    offset: 20,
    triggerType: "click",
    children: (
      <>
        <PopoverTrigger>
          <Button>open popver</Button>
        </PopoverTrigger>
        <PopoverContent arrowStyles={{ fill: "lightblue" }}>
          {content}
        </PopoverContent>
      </>
    ),
  },
};
