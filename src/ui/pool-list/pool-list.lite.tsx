import { For, useStore } from "@builder.io/mitosis";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import PoolListItem from "../pool-list-item";
import * as styles from "./pool-list.css";
import { PoolListProps } from "./pool-list.types";

export default function PoolList(props: PoolListProps) {
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
      <Text color="textSecondary" size="xl" weight="semibold">
        {props.title}
      </Text>
      <Stack className={styles.titleContainer}>
        <For each={state.titles}>
          {(item, index) => (
            <Text key={index} className={styles.title} color="textSecondary">
              {item}
            </Text>
          )}
        </For>
      </Stack>
      <Box className={styles.listContainer}>
        <For each={props.list}>
          {(item, index) => (
            <PoolListItem
              id={item.id}
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
