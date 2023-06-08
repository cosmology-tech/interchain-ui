import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { ShowMore, Stack, Box, Text } from "../src";

const meta: Meta<typeof ShowMore> = {
  component: ShowMore,
  title: "ShowMore",
  tags: ["autodocs"],
  argTypes: {
    initialHeightPercent: {
      options: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      control: { type: "select" },
      table: {
        summary: "PoolListItemProps []",
      }
    },
    children: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: (
      <Stack direction="column" space="5">
        {Array.from(Array(10).keys()).map((item, i) => (
          <Text color="text" size="4xl" weight="semibold">
            {" "}
            {i + 1}{" "}
          </Text>
        ))}
      </Stack>
    ),
    showMoreTitle: "Show more",
    showLessTitle: "Show less",
    initialHeightPercent: 0.5,
  },
  // render: () => {
  //   return (
  //     <ShowMore initialHeightPercent={0.5} >

  //     </ShowMore>
  //   );
  // },
};
