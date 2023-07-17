import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Stack, ListItem } from "../../src";

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
      <ListItem isActive>1 (Active)</ListItem>
      <ListItem>2</ListItem>
      <ListItem>3</ListItem>
      <ListItem>4</ListItem>
      <ListItem>5</ListItem>
      <ListItem>6</ListItem>
      <ListItem>7</ListItem>
    </Stack>
  ),
};
