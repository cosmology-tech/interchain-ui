import { useMetadata } from "@builder.io/mitosis";
import AssetListHeader from "../asset-list-header";
import AssetList from "../asset-list";
import Box from "../box";
import Text from "../text";
import * as styles from "./cross-chain.css";
import type { CrossChainProps } from "./cross-chain.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function CrossChain(props: CrossChainProps) {
  return (
    <Box className={styles.container}>
      <AssetListHeader
        isSingle={false}
        total={props.header.total}
        totalOnAll={props.header.totalOnAll}
        onDeposit={() => props?.header?.onDeposit?.()}
        onWithdraw={() => props?.header?.onWithdraw?.()}
      />
      <Text
        color="$textSecondary"
        fontSize="$lg"
        fontWeight="$semibold"
        attributes={{ my: "$9" }}
      >
        On Osmosis
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
        On other chains
      </Text>
      <AssetList
        needChainSpace={true}
        isOtherChains={true}
        list={props.otherList}
      />
    </Box>
  );
}
