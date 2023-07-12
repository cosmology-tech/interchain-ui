import type { Meta, StoryObj } from "@storybook/react";

import { Tabs } from "../src";

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
        Component: () => <h1>Tab1</h1>,
      },
      {
        label: "Tab Two",
        Component: () => <h1>Tab2</h1>,
      },
      {
        label: "Tab Three",
        Component: () => <h1>Tab3</h1>,
      },
    ],
  },
};
