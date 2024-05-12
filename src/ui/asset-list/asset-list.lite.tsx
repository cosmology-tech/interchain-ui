import { For, useDefaultProps, Show, useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import AssetListItem from "../asset-list-item";
import type { AssetListProps } from "./asset-list.types";
import type { AssetListItemProps } from "../asset-list-item/asset-list-item.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<AssetListProps>>({
  isOtherChains: false,
  titles: ["Asset", "Balance"],
});

export default function AssetList(props: AssetListProps) {
  return (
    <Box
      overflowX={{
        mobile: "scroll",
        tablet: "auto",
        desktop: "auto",
      }}
      className={props.className}
      {...props.attributes}
    >
      <Box display="flex" flexDirection="column" minWidth="720px">
        <Stack>
          <Box width="$19" />
          <Stack space="$0" attributes={{ marginBottom: "$12", flex: 1 }}>
            <Text attributes={{ width: "25%" }} color="$textSecondary">
              {props.titles[0]}
            </Text>
            <Show when={props.needChainSpace}>
              <Box width="25%">
                <Show when={props.isOtherChains}>
                  <Text color="$textSecondary">Chain</Text>
                </Show>
              </Box>
            </Show>
            <Text attributes={{ width: "25%" }} color="$textSecondary">
              {props.titles[1]}
            </Text>
          </Stack>
        </Stack>

        <Stack space="$10" direction="vertical">
          <For each={props.list}>
            {(item: AssetListItemProps, index: number) => (
              <Box key={index}>
                <AssetListItem
                  needChainSpace={props.needChainSpace}
                  isOtherChains={props.isOtherChains}
                  imgSrc={item.imgSrc}
                  symbol={item.symbol}
                  name={item.name}
                  tokenAmount={item.tokenAmount}
                  tokenAmountPrice={item.tokenAmountPrice}
                  chainName={item?.chainName}
                  showDeposit={item.showDeposit}
                  showWithdraw={item.showWithdraw}
                  onDeposit={() => item?.onDeposit()}
                  onWithdraw={() => item?.onWithdraw()}
                  withdrawLabel={item.withdrawLabel ?? AssetListItem.defaultProps.withdrawLabel}
                  depositLabel={item.depositLabel ?? AssetListItem.defaultProps.depositLabel}
                />
              </Box>
            )}
          </For>
        </Stack>
      </Box>
    </Box>
  );
}
