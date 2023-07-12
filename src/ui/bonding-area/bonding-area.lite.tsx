import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import BondingList from "../bonding-list";
import BondingCardList from "../bonding-card-list";
import BondingListSm from "../bonding-list-sm";
import { BondingAreaProps } from "./bonding-area.types";
import * as styles from "./bonding-area.css";

export default function BondingArea(props: BondingAreaProps) {
  return (
    <Box width="full" className={styles.bondingAreaContainer}>
      <Stack className={styles.onlyDesktop} direction="column">
        <BondingCardList list={props.bondingCardList} />
        <Box height="14" />
        <BondingList list={props.bondingList} />
      </Stack>
      <Box className={styles.onlySm}>
        <BondingListSm
          list={props.bondingListSm.list}
          unbondedAmt={props.bondingListSm.unbondedAmt}
          unbondedShares={props.bondingListSm.unbondedShares}
        />
      </Box>
    </Box>
  );
}
