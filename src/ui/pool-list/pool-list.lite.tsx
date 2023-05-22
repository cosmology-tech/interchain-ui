import {
  For,
  Show,
  useStore,
  onUpdate,
  onMount,
  onUnMount,
  useRef,
} from "@builder.io/mitosis";
import { sprinkles } from "../../styles/sprinkles.css";
import Box from "../box";
import Stack from "../Stack";
import Text from "../Text";
import PoolListItem from "../pool-list-item";
import { store } from "../../models/store";
import * as styles from "./pool-list.css";
import { themeVars } from "../../styles/themes.css";

export default function PoolList(props) {
  // image
  // "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
  //         "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg",
  //         "theme": {
  //           "primary_color_hex": "#5c09a0"
  //         }

  // "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.png",
  //         "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.svg",
  const state = useStore({
    titles: ["Pool", "Liquidity", "24H Volume", "7D Fees", "APR"],
  });

  return (
    <Box className={styles.container}>
      <Text color="tip" size="xl" weight="semibold">
        Your Pools
      </Text>
      <Stack className={styles.titleContainer}>
        {/* <Text color="tip">Pool</Text>
        <Text color="tip">Liquidity</Text>
        <Text color="tip">24H Volume</Text>
        <Text color="tip">7D Fees</Text>
        <Text color="tip">APR</Text> */}
        <For each={state.titles}>
          {(item, index) => (
            <Text className={styles.title} color="tip">
              {item}
            </Text>
          )}
        </For>
      </Stack>
      <Box className={styles.listContainer}>
        <PoolListItem />
        <PoolListItem />
      </Box>
    </Box>
  );
}
