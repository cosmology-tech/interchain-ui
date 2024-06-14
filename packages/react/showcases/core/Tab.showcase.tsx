import * as React from "react";
import type { Story, StoryDefault } from "@ladle/react";

import Tabs from "../../src/ui/tabs";
import Box from "../../src/ui/box";

export default {
  title: "Tab",
  meta: {},
} satisfies StoryDefault;

const TabContent = ({ tabIndex }: { tabIndex: number }) => {
  return (
    <Box
      fontFamily="$body"
      borderWidth="1px"
      borderStyle="dashed"
      borderColor="$accent"
    >
      Tab {tabIndex} <br /> <br />
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt officiis
      quod deleniti ullam est iusto quaerat qui alias magni, asperiores
      voluptatem nobis provident accusantium fugit sint reprehenderit aliquid
      sit. Cupiditate. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
      Sunt officiis quod deleniti ullam est iusto quaerat qui alias magni,
      asperiores voluptatem nobis provident accusantium fugit sint reprehenderit
      aliquid sit. Cupiditate.
    </Box>
  );
};

export const DefaultTabs: Story = () => (
  <Tabs
    tabs={[
      {
        label: "Tab One",
        content: <TabContent tabIndex={1} />,
      },
      {
        label: "Tab Two",
        content: <TabContent tabIndex={2} />,
      },
      {
        label: "Tab Three",
        content: <TabContent tabIndex={3} />,
      },
    ]}
  />
);

export const LimitTabsWidth: Story = () => (
  <Tabs
    tabsContainerAttributes={{
      maxWidth: "300px",
    }}
    tabs={[
      {
        label: "Tab One",
        content: <TabContent tabIndex={1} />,
      },
      {
        label: "Tab Two",
        content: <TabContent tabIndex={2} />,
      },
      {
        label: "Tab Three",
        content: <TabContent tabIndex={3} />,
      },
    ]}
  />
);
