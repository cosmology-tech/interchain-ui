import Stack from "../stack";
import Box from "../box";
import BondingList from "../bonding-list";
import BondingCardList from "../bonding-card-list";
import BondingListSm from "../bonding-list-sm";
import { BondingAreaProps } from "./bonding-area.types";
import * as styles from "./bonding-area.css";

export default function BondingArea(props: BondingAreaProps) {
  return (
    <Box width="$full" className={styles.bondingAreaContainer}>
      <Stack className={styles.onlyDesktop} direction="vertical">
        <BondingCardList list={props.bondingCardList} />
        <Box height="$14" />
        <BondingList list={props.bondingList.list} onUnbond={(detail) => props.bondingList?.onUnbond?.(detail)} />
      </Stack>
      <Box className={styles.onlySm}>
        <BondingListSm
        onBond={(detail) => props.bondingListSm?.onBond?.(detail)}
        onUnbond={(detail) => props.bondingListSm?.onUnbond?.(detail)}
          bondingName={props.bondingListSm.bondingName}
          list={props.bondingListSm.list}
          unbondedBalance={props.bondingListSm.unbondedBalance}
          unbondedShares={props.bondingListSm.unbondedShares}
        />
      </Box>
    </Box>
  );
}
