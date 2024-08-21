import * as React from "react";
import type { Story } from "@ladle/react";
import Box from "../src/ui/box";
import ChainListItem from "../src/ui/chain-list-item";
import { ChainListItemProps } from "../src/ui/chain-list-item/chain-list-item.types";

// @ts-ignore
import ATOM_ICON from "../static/networks/Cosmos.png";

const chainItem: Pick<
  ChainListItemProps,
  "iconUrl" | "name" | "tokenName" | "amount" | "notionalValue"
> = {
  iconUrl: ATOM_ICON,
  name: "Cosmos",
  tokenName: "ATOM",
  amount: "0.00000000022",
};

export const DefaultChainListItem: Story<{
  width: number;
  size: ChainListItemProps["size"];
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
      <ChainListItem
        size={props.size}
        _css={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
        {...chainItem}
      />

      <ChainListItem
        size={props.size}
        isDisabled
        _css={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
        {...chainItem}
      />

      <ChainListItem
        size={props.size}
        isSelected
        _css={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
        {...chainItem}
      />

      <ChainListItem
        size={props.size}
        isActive
        _css={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
        {...chainItem}
      />
    </Box>
  </Box>
);

DefaultChainListItem.meta = {
  component: "ListItem",
};

DefaultChainListItem.args = {
  size: "sm",
};

DefaultChainListItem.argTypes = {
  width: {
    control: { type: "number" },
    defaultValue: 200,
  },
  size: {
    options: ["sm", "md"] satisfies ChainListItemProps["size"][],
    control: { type: "select" },
    defaultValue: "md",
  },
};
