import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import ShowMore from "../src/ui/show-more";
import Stack from "../src/ui/stack";
import Text from "../src/ui/text";

const meta: Meta<typeof ShowMore> = {
  component: ShowMore,
  title: "ShowMore",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: (
      <Stack direction="vertical" space="5">
        {Array.from(Array(10).keys()).map((item, i) => (
          <Text color="$text" fontSize="$4xl" fontWeight="$semibold">
            {" "}
            {i + 1}{" "}
          </Text>
        ))}
      </Stack>
    ),
    showMoreTitle: "Show more",
    showLessTitle: "Show less",
    heightToShowMore: 100,
  },
};
