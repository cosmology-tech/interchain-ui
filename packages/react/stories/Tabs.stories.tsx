import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Tabs from "../src/ui/tabs";

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: "Tabs",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    tabs: [
      {
        label: "Tab One",
        content: <h1>Tab1</h1>,
      },
      {
        label: "Tab Two",
        content: <h1>Tab2</h1>,
      },
      {
        label: "Tab Three",
        content: <h1>Tab3</h1>,
      },
    ],
  },
};
