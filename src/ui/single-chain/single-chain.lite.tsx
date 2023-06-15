import AssetListHeader from "../asset-list-header";
import AssetList from "../asset-list";
import Stack from "../stack";
import Text from "../text";
import ShowMore from "../show-more";
import * as styles from './single-chain.css'
import { SingleChainProps } from "./single-chain.types";

export default function SingleChain(props: SingleChainProps) {
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
          attributes={{ marginTop: "10", marginBottom: "9" }}
        >
          On Osmosis
        </Text>
        <AssetList
          needChainSpace={false}
          isOtherChains={false}
          list={props.list}
        />
      </Stack>
    </ShowMore>
  );
}
