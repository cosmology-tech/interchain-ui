import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Stack from "../../src/ui/stack";
import ListItem from "../../src/ui/list-item";

const meta: Meta<typeof ListItem> = {
  component: ListItem,
  title: "ListItem",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is Default FieldLabel */
export const Default: Story = {
  render: () => (
    <Stack as="ul" space="2" direction="vertical">
      <ListItem isActive>Item 1 (Active)</ListItem>
      <ListItem>Item 2</ListItem>
      <ListItem>Item 3</ListItem>
      <ListItem>Item 4</ListItem>
      <ListItem>Item 5</ListItem>
      <ListItem>Item 6</ListItem>
      <ListItem>Item 7</ListItem>
      <ListItem isDisabled>Item 8 (disabled)</ListItem>
    </Stack>
  ),
};
