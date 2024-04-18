import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Box from "../../src/ui/box";
import Text from "../../src/ui/text";
import Stack from "../../src/ui/stack";
import Avatar from "../../src/ui/avatar";
import Combobox from "../../src/ui/combobox";
import Skeleton from "../../src/ui/skeleton";
import { useMockData } from "../stub/mock-data-client";

const meta: Meta<typeof Combobox> = {
  component: Combobox,
  title: "Combobox",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

type Option = {
  label: string;
  value: string;
};

const defaultOptions: Option[] = [
  {
    label: "Dog",
    value: "dog",
  },
  {
    label: "Cat",
    value: "cat",
  },
  {
    label: "Elephant",
    value: "elephant",
  },
  {
    label: "Lion",
    value: "lion",
  },
  {
    label: "Tiger",
    value: "tiger",
  },
  {
    label: "Giraffe",
    value: "giraffe",
  },
  {
    label: "Monkey",
    value: "monkey",
  },
  {
    label: "Horse",
    value: "horse",
  },
  {
    label: "Bear",
    value: "bear",
  },
  {
    label: "Kangaroo",
    value: "kangaroo",
  },
];

export const Default: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap="$6">
      <Combobox
        label="Favorite Animal"
        openOnFocus
        styleProps={{
          width: "350px",
        }}
      >
        {defaultOptions.map((option) => (
          <Combobox.Item key={option.value}>{option.label}</Combobox.Item>
        ))}
      </Combobox>
    </Box>
  ),
};

const ChainOption = (props: Option & { iconUrl: string }) => {
  return (
    <Stack
      direction="horizontal"
      space="$4"
      attributes={{ alignItems: "center", height: "100%" }}
    >
      <Avatar
        name={props.label}
        getInitials={(name) => name[0]}
        size="sm"
        src={props.iconUrl}
        fallbackMode="bg"
      />

      <Text fontSize="$md" fontWeight="$normal" color="$text">
        {props.label}
      </Text>
    </Stack>
  );
};

export const CustomComboboxItem: Story = {
  render: () => {
    const { isReady, comboboxAssets } = useMockData();
    const [selectedKey, setSelectedKey] = React.useState<React.Key>();

    const options = React.useMemo(
      () =>
        comboboxAssets.map((i) => ({
          iconUrl: i.iconUrl,
          label: i.tokenName,
          value: i.tokenName,
        })),
      [comboboxAssets, isReady],
    );

    if (!isReady) {
      return <div>Loading data...</div>;
    }

    const avatarUrl =
      options.find((i) => i.value === selectedKey)?.iconUrl ?? undefined;

    return (
      <Box display="flex" flexDirection="column" gap="$6">
        <Combobox
          label="Favorite Chain"
          size="md"
          openOnFocus
          onSelectionChange={(item) => {
            setSelectedKey(item ?? null);
          }}
          inputAddonStart={
            selectedKey && avatarUrl ? (
              <Avatar
                name={selectedKey as string}
                getInitials={(name) => name[0]}
                size="sm"
                src={avatarUrl}
                fallbackMode="bg"
                attributes={{
                  paddingX: "$4",
                }}
              />
            ) : selectedKey ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                px="$4"
              >
                <Skeleton width="24px" height="24px" borderRadius="$full" />
              </Box>
            ) : null
          }
          styleProps={{
            width: "350px",
          }}
        >
          {options.map((option) => (
            <Combobox.Item key={option.value} textValue={option.value}>
              <ChainOption
                iconUrl={option.iconUrl}
                label={option.label}
                value={option.value}
              />
            </Combobox.Item>
          ))}
        </Combobox>
      </Box>
    );
  },
};
