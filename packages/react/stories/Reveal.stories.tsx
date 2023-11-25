import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Reveal from "../src/ui/reveal";
import Stack from "../src/ui/stack";
import Skeleton from "../src/ui/skeleton";

const meta: Meta<typeof Reveal> = {
  component: Reveal,
  title: "Reveal",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: (
      <Stack
        direction="vertical"
        space="$5"
        attributes={{
          p: "$4",
          borderRadius: "$md",
          borderColor: "$divider",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        {Array.from(Array(20).keys()).map((item, i) => (
          <Skeleton
            key={`${item}`}
            borderRadius="$sm"
            width="$full"
            height="$10"
          />
        ))}
      </Stack>
    ),
    showMoreLabel: "Show more",
    showLessLabel: "Show less",
    hideThresholdHeight: 400,
  },
};
