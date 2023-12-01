import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Tabs from "../src/ui/tabs";
import Button from "../src/ui/button";
import Stack from "../src/ui/stack";

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

export const ControlledTabs: Story = {
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
  render: (props) => {
    const [activeTab, setActiveTab] = React.useState(0);

    return (
      <>
        <Tabs
          tabs={props.tabs}
          activeTab={activeTab}
          onActiveTabChange={(tabId) => setActiveTab(tabId)}
        />
        Click to change tab
        <Stack direction="horizontal" space="$4">
          <Button size="sm" onClick={() => setActiveTab(0)}>
            tab 1
          </Button>
          <Button size="sm" onClick={() => setActiveTab(1)}>
            tab 2
          </Button>
          <Button size="sm" onClick={() => setActiveTab(2)}>
            tab 3
          </Button>
        </Stack>
      </>
    );
  },
};
