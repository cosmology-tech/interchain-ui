import { useMetadata } from "@builder.io/mitosis";
import AssetListHeader from "../asset-list-header";
import AssetList from "../asset-list";
import Box from "../box";
import Text from "../text";
import ShowMore from "../show-more";
import type { SingleChainProps } from "./single-chain.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function SingleChain(props: SingleChainProps) {
  return (
    <ShowMore>
      <Box className={props.className} {...props.attributes}>
        <AssetListHeader
          title={props.title}
          singleChainHeader={props.singleChainHeader}
          depositButtonLabel={props.depositButtonLabel}
          withdrawButtonLabel={props.withdrawButtonLabel}
          onDeposit={() => props.onDeposit?.()}
          onWithdraw={() => props.onWithdraw?.()}
        />

        <Text
          color="$textSecondary"
          fontSize="$lg"
          fontWeight="$semibold"
          attributes={{ marginTop: "$10", marginBottom: "$9" }}
        >
          {props.listTitle}
        </Text>

        <AssetList
          needChainSpace={false}
          isOtherChains={false}
          list={props.list}
        />
      </Box>
    </ShowMore>
  );
}
