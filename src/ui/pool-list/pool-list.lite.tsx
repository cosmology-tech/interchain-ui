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
import Stack from "../stack";
import Text from "../text";
import PoolListItem from "../pool-list-item";
import { store } from "../../models/store";
import * as styles from "./pool-list.css";
import { themeVars } from "../../styles/themes.css";
import { PoolListProps } from "./pool-list.types";

export default function PoolList(props: PoolListProps) {
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

  const item = {
    token1: {
      name: "ATOM",
      imgSrc:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/agoric/images/bld.png",
    },
    token2: {
      name: "OSOM",
      imgSrc:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png",
    },
    liquidity: 168767639,
    volume: 3288612,
    fees: 59075,
    apr: 24,
  };

  return (
    <Box className={styles.container}>
      <Text color="tip" size="xl" weight="semibold">
        {props.title}
      </Text>
      <Stack className={styles.titleContainer}>
        <For each={state.titles}>
          {(item, index) => (
            <Text key={index} className={styles.title} color="tip">
              {item}
            </Text>
          )}
        </For>
      </Stack>
      <Box className={styles.listContainer}>
        <For each={props.list}>
          {(item, index) => (
            <PoolListItem
              key={index}
              token1={item.token1}
              token2={item.token2}
              poolLiquidity={item.poolLiquidity}
              volume={item.volume}
              fees={item.fees}
              apr={item.apr}
            />
          )}
        </For>

        {/* <PoolListItem {...item} /> */}
      </Box>
    </Box>
  );
}
