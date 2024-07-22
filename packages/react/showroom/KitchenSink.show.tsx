import * as React from "react";
import type { Story } from "@ladle/react";
import Box from "../src/ui/box";
import Text from "../src/ui/text";
import Stack from "../src/ui/stack";
import Select from "../src/ui/select";
import SelectOption from "../src/ui/select-option/select-option";
import Avatar from "../src/ui/avatar";
import Tabs from "../src/ui/tabs";
import TextField from "../src/ui/text-field";
import Button from "../src/ui/button";

// @ts-ignore
import COSMOS_LOGO_URL from "../static/networks/Cosmos.png";

const TabContent = ({ tabId }: { tabId: number }) => {
  return (
    <Box
      maxWidth="400px"
      color="$neutral600"
      borderColor="$divider"
      borderWidth="1px"
      borderStyle="dashed"
      py="$10"
      px="$4"
      my="$10"
    >
      Tab {tabId} content Lorem ipsum dolor sit, amet consectetur adipisicing
      elit. Adipisci quaerat eveniet beatae, magni rem quia iste, autem ea error
      in praesentium ut soluta animi, repudiandae doloribus! Enim quo maxime
      labore!
    </Box>
  );
};

const tabs = [
  {
    label: "Tab One",
    content: <TabContent tabId={1} />,
  },
  {
    label: "Tab Two",
    content: <TabContent tabId={2} />,
  },
  {
    label: "Tab Three",
    content: <TabContent tabId={3} />,
  },
];

export const KitchenSink: Story = () => {
  const [value, setValue] = React.useState("");
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <Stack
      direction="horizontal"
      space="$10"
      attributes={{
        justifyContent: "space-around",
      }}
    >
      <Stack
        direction="vertical"
        space="$10"
        attributes={{
          maxWidth: "300px",
        }}
      >
        <Button intent="none" variant="primary" size="sm">
          Button
        </Button>
        <Button intent="none" variant="secondary" size="sm">
          Button
        </Button>
        <Button intent="none" variant="unstyled" size="sm">
          Button
        </Button>

        <TextField
          id="address"
          as="input"
          label="Enter address"
          placeholder="Address..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          startAddon={
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <Avatar src={COSMOS_LOGO_URL} name="cosmos" size="xs" />
            </Box>
          }
          endAddon={
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <Text fontSize="$sm" color="$textSecondary">
                Autofill
              </Text>
            </Box>
          }
        />

        <Select width="100%" label="Favorite Animal">
          <SelectOption optionKey="Red Panda" label="Red Panda">
            Red Panda
          </SelectOption>
          <SelectOption optionKey="Cat" label="Cat" isDisabled>
            Cat
          </SelectOption>
          <SelectOption optionKey="Dog" label="Dog">
            Dog
          </SelectOption>
          <SelectOption optionKey="Aardvark" label="Aardvark">
            Aardvark
          </SelectOption>
          <SelectOption optionKey="Kangaroo" label="Kangaroo">
            Kangaroo
          </SelectOption>
          <SelectOption optionKey="Snake" label="Snake">
            Snake
          </SelectOption>
        </Select>
      </Stack>

      <Tabs
        variant="line"
        size="sm"
        tabs={tabs}
        activeTab={activeTab}
        onActiveTabChange={(tabId) => setActiveTab(tabId)}
      />
    </Stack>
  );
};
