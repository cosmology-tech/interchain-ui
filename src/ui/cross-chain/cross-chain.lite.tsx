import AssetListHeader from "../asset-list-header";
import AssetList from "../asset-list";
import Stack from "../stack";
import Text from "../text";
import ShowMore from "../show-more";
import * as styles from "./cross-chain.css";
import { CrossChainProps } from "./cross-chain.types";

export default function CrossChain(props: CrossChainProps) {
  return (
    <ShowMore>
      <Stack className={styles.container} direction="column">
        <AssetListHeader
          isSingle={props.header.isSingle}
          total={props.header.total}
          totalOnAll={props.header.totalOnAll}
          canWithdraw={props.header.canWithdraw}
          canDeposit={props.header.canDeposit}
        />
        <Text
          color="textSecondary"
          size="lg"
          weight="semibold"
          attributes={{ my: "9" }}
        >
          On Osmosis
        </Text>
        <AssetList
          needChainSpace={true}
          isOtherChains={false}
          list={props.list}
        />
        <Text
          color="textSecondary"
          size="lg"
          weight="semibold"
          attributes={{ marginTop: "15", marginBottom: "9" }}
        >
          On other chains
        </Text>
        <AssetList
          needChainSpace={true}
          isOtherChains={true}
          list={props.otherList}
        />
      </Stack>
    </ShowMore>
  );
}
