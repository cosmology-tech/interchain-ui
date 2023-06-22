import Stack from "../stack";
import Text from "../text";
import Icon from "../icon";
import Box from "../box";
import TransferItem from "../transfer-item";

import * as styles from "./swap-token.css";
import { SwapTokenProps } from "./swap-token.types";

export default function SwapToken(props: SwapTokenProps) {
  return (
    <Stack direction="column">
      <Text size="lg" weight="semibold" attributes={{ marginBottom: "8" }}>
        Swap
      </Text>
      <TransferItem
        maxBtn={true}
        availableAmount={713.32}
        symbol="UMEE"
        denom="Umee"
        imgSrc="https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.png"
      />
      <Stack className={styles.switchContainer} justify="center">
        <Box position="relative">
          <Icon name="arrowDownS" />
        </Box>
      </Stack>
      <TransferItem
        maxBtn={true}
        availableAmount={713.32}
        symbol="UMEE"
        denom="Umee"
        imgSrc="https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.png"
      />
    </Stack>
  );
}
