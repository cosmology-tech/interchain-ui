import * as React from "react";
import type { Story } from "@ladle/react";
import Box from "../src/ui/box";
import ListItem from "../src/ui/list-item";
import {
  ListItemSize,
  ListItemShape,
} from "../src/ui/list-item/list-item.types";

export const DefaultListItem: Story<{
  width: number;
  size: ListItemSize;
  shape: ListItemShape;
}> = (props) => (
  <Box>
    <Box
      backgroundColor="$background"
      boxShadow="$sm"
      p="$4"
      borderRadius="$lg"
      width={`${props.width}px`}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap="$4"
    >
      <ListItem
        as="li"
        size={props.size}
        _css={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Box>Item 1</Box>
      </ListItem>

      <ListItem
        as="li"
        size={props.size}
        isDisabled
        _css={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Box>Item 2 (disabled)</Box>
      </ListItem>

      <ListItem
        as="li"
        size={props.size}
        isActive
        _css={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Box>Item 3 (active)</Box>
      </ListItem>

      <ListItem
        as="li"
        size={props.size}
        isSelected
        _css={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Box>Item 4 (selected)</Box>
      </ListItem>
    </Box>
  </Box>
);

DefaultListItem.meta = {
  component: "ListItem",
};

DefaultListItem.args = {
  size: "sm",
  shape: "default",
};

DefaultListItem.argTypes = {
  width: {
    control: { type: "number" },
    defaultValue: 200,
  },
  size: {
    options: ["sm", "md"] satisfies ListItemSize[],
    control: { type: "select" },
    defaultValue: "md",
  },
  shape: {
    options: ["default", "rounded"] satisfies ListItemShape[],
    control: { type: "select" },
    defaultValue: "default",
  },
};
