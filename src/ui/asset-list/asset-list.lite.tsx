import { For, useDefaultProps, Show, useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import AssetListItem from "../asset-list-item";
import { AssetListProps } from "./asset-list.types";
import { AssetListItemProps } from "../asset-list-item/asset-list-item.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function AssetList(props: AssetListProps) {
  useDefaultProps({
    isOtherChains: false,
  });

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
              Asset
            </Text>
            <Show when={props.needChainSpace}>
              <Box width="25%">
                <Show when={props.isOtherChains}>
                  <Text color="$textSecondary">Chain</Text>
                </Show>
              </Box>
            </Show>
            <Text attributes={{ width: "25%" }} color="$textSecondary">
              Balance
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
                  onDeposit={() => item?.onDeposit()}
                  onWithdraw={() => item?.onWithdraw()}
                />
              </Box>
            )}
          </For>
        </Stack>
      </Box>
    </Box>
  );
}
