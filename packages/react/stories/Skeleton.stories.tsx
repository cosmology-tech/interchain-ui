import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Box from "../src/ui/box";
import Skeleton from "../src/ui/skeleton";

const meta: Meta<typeof Box> = {
  component: Box,
  title: "Skeleton",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (props) => {
    return (
      <Box display="flex" flexDirection="column" gap="$4">
        <Skeleton borderRadius="$sm" width="$26" height="$10" />
        <Skeleton borderRadius="$sm" width="$30" height="$10" />
        <Skeleton borderRadius="$sm" width="$20" height="$10" />
      </Box>
    );
  },
};
