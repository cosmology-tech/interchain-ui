import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverTrigger, PopoverContent, Button, Box } from "../src";

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
    placeItems="center"
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
