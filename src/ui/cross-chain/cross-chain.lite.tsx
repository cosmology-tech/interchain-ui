import { useMetadata } from "@builder.io/mitosis";
import AssetListHeader from "../asset-list-header";
import AssetList from "../asset-list";
import Box from "../box";
import Text from "../text";
import type { CrossChainProps } from "./cross-chain.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function CrossChain(props: CrossChainProps) {
  return (
    <Box className={props.className} {...props.attributes}>
      <AssetListHeader
        title={props.title}
        multiChainHeader={props.multiChainHeader}
        depositButtonLabel={props.depositButtonLabel}
        withdrawButtonLabel={props.withdrawButtonLabel}
        onDeposit={() => props.onDeposit?.()}
        onWithdraw={() => props.onWithdraw?.()}
      />
      <Text
        color="$textSecondary"
        fontSize="$lg"
        fontWeight="$semibold"
        attributes={{ my: "$9" }}
      >
        {props.listTitle}
      </Text>
      <AssetList
        needChainSpace={true}
        isOtherChains={false}
        list={props.list}
      />
      <Text
        color="$textSecondary"
        fontSize="$lg"
        fontWeight="$semibold"
        attributes={{ marginTop: "$15", marginBottom: "$9" }}
      >
        {props.otherListTitle}
      </Text>
      <AssetList
        needChainSpace={true}
        isOtherChains={true}
        list={props.otherList}
      />
    </Box>
  );
}
