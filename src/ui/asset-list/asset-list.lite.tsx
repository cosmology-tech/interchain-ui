import { For, useDefaultProps, Show } from "@builder.io/mitosis";
import clsx from "clsx";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import AssetListItem from "../asset-list-item";
import * as styles from "./asset-list.css";
import { AssetListProps } from "./asset-list.types";
import { AssetListItemProps } from "../asset-list-item/asset-list-item.types";

export default function AssetList(props: AssetListProps) {
  useDefaultProps({
    isOtherChains: false,
  });
  return (
    <Stack direction="column">
      <Stack>
        <Box width="19" />
        <Stack flex={1} attributes={{ marginBottom: "12" }}>
          <Text attributes={{ width: "1/4" }} color="textSecondary">
            Asset
          </Text>
          <Show when={props.needChainSpace}>
            <Box width="1/4">
              <Show when={props.isOtherChains}>
                <Text color="textSecondary">Chain</Text>
              </Show>
            </Box>
          </Show>
          <Text attributes={{ width: "1/4" }} color="textSecondary">
            Balance
          </Text>
        </Stack>
      </Stack>
      <Stack space="10" direction="column">
        <For each={props.list}>
          {(item: AssetListItemProps, index: number) => (
            <Box key={index}>
              <AssetListItem
                needChainSpace={props.needChainSpace}
                isOtherChains={props.isOtherChains}
                imgSrc={item.imgSrc}
                symbol={item.symbol}
                denom={item.denom}
                amount={item.amount}
                dollarAmount={item.dollarAmount}
                canDeposit={item.canDeposit}
                canWithdraw={item.canWithdraw}
                chainName={item?.chainName}
              />
            </Box>
          )}
        </For>
      </Stack>
    </Stack>
  );
}
