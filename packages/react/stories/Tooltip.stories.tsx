import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Tooltip, Icon, Stack } from "../src";

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  title: "Tooltip",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "Hover text",
    placement: "top",
  },
  render: (props) => {
    return (
      <Stack justify="center" attributes={{ p: "8" }}>
        <Tooltip {...props}>
          <Icon name="informationLine" size="xl" />
        </Tooltip>
      </Stack>
    );
  },
};
