import { For, useStore, useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import PoolListItem from "../pool-list-item";
import * as styles from "./pool-list.css";
import type { PoolListProps } from "./pool-list.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function PoolList(props: PoolListProps) {
  const state = useStore({
    titles: ["Pool", "Liquidity", "24H Volume", "7D Fees", "APR"],
  });

  return (
    <Box className={styles.container} p="$6">
      <Text color="$textSecondary" fontSize="$xl" fontWeight="$semibold">
        {props.title}
      </Text>
      <Stack className={styles.titleContainer} space="$0">
        <For each={state.titles}>
          {(item, index) => (
            <Text key={index} className={styles.title} color="$textSecondary">
              {item}
            </Text>
          )}
        </For>
      </Stack>

      <Box overflowX="auto">
        <For each={props.list}>
          {(item, index) => (
            <PoolListItem
              key={item.id}
              id={item?.id}
              poolAssets={item.poolAssets}
              liquidity={item.liquidity}
              apr={item.apr}
              fees7D={item.fees7D}
              volume24H={item.volume24H}
              onClick={() => item.onClick()}
            />
          )}
        </For>
      </Box>
    </Box>
  );
}
