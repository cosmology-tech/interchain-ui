import AssetListHeader from "../asset-list-header";
import AssetList from "../asset-list";
import Box from "../box";
import Text from "../text";
import ShowMore from "../show-more";
import * as styles from "./single-chain.css";
import { SingleChainProps } from "./single-chain.types";
import {
  AvailableItem,
} from "../transfer-item/transfer-item.types";

export default function SingleChain(props: SingleChainProps) {
  return (
    <ShowMore className={styles.container}>
      <Box>
        <AssetListHeader
          isSingle={true}
          total={props.header.total}
          // totalOnAll={props.header.totalOnAll}
          dropDownList={props.header.dropDownList}
          onDeposit={(item: AvailableItem, value: string) =>
            props?.header?.onDeposit?.(item, value)
          }
          onDepositCancel={() => props?.header?.onDepositCancel?.()}
          onWithdraw={(item: AvailableItem, value: string) =>
            props?.header?.onWithdraw?.(item, value)
          }
          onWithdrawCancel={() => props?.header?.onWithdrawCancel?.()}
        />
        <Text
          color="$textSecondary"
          fontSize="$lg"
          fontWeight="$semibold"
          attributes={{ marginTop: "$10", marginBottom: "$9" }}
        >
          On Osmosis
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
