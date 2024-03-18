import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Tooltip from "../src/ui/tooltip";
import Button from "../src/ui/button";
import Text from "../src/ui/text";
import Stack from "../src/ui/stack";

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
    title: <Text color="$textInverse">Hurray!</Text>,
    placement: "bottom",
  },
  render: (props) => {
    return (
      <Stack justify="center" attributes={{ p: "8" }}>
        <Tooltip {...props}>
          <Button>Hover me my friend</Button>
        </Tooltip>
      </Stack>
    );
  },
};
