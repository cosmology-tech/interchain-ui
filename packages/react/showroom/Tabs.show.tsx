import * as React from "react";
import type { Story } from "@ladle/react";
import Box from "../src/ui/box";
import Tabs from "../src/ui/tabs";
import { TabVariant, TabSize } from "../src/ui/tabs/tabs.types";

const Content = ({ tabId }: { tabId: number }) => {
  return (
    <Box
      color="$neutral600"
      borderColor="$divider"
      borderWidth="1px"
      borderStyle="solid"
      py="$10"
      px="$4"
      my="$10"
    >
      Tab {tabId} content
    </Box>
  );
};

const tabs = [
  {
    label: "Tab One",
    content: <Content tabId={1} />,
  },
  {
    label: "Tab Two",
    content: <Content tabId={2} />,
  },
  {
    label: "Tab Three",
    content: <Content tabId={3} />,
  },
];

export const DefaultTabs: Story<{
  variant: TabVariant;
  size: TabSize;
  tabs: Array<{
    label: string;
    content: React.ReactNode;
  }>;
}> = (props) => {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <Box>
      <Tabs
        variant={props.variant}
        size={props.size}
        tabs={tabs}
        activeTab={activeTab}
        onActiveTabChange={(tabId) => setActiveTab(tabId)}
      />
    </Box>
  );
};

DefaultTabs.args = {
  variant: "pill",
  size: "sm",
};

DefaultTabs.argTypes = {
  variant: {
    options: ["pill", "line"] as TabVariant[],
    control: { type: "select" },
    defaultValue: "pill",
  },
  size: {
    options: ["sm", "md"] as TabSize[],
    control: { type: "select" },
    defaultValue: "sm",
  },
};
