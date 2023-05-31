import {
  For,
  Show,
  useStore,
  onUpdate,
  onMount,
  onUnMount,
  useRef,
} from "@builder.io/mitosis";
import { store } from "../../models/store";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import PoolCard from "../pool-card";
import * as styles from "./pool-card-list.css";
import { PoolCardListProps } from "./pool-card-list.types";
import { PoolCardProps } from "../pool-card/pool-card.types";

export default function PoolCardList(props: PoolCardListProps) {
  const state = useStore({
    theme: "",
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    state.theme = store.getState().theme;

    cleanupRef = store.subscribe((newState, prevState) => {
      state.theme = newState.theme;
    });
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });
  return (
    <Box>
      <Text size="lg" color="textSecondary" weight="semibold" marginBottom="10">
        Highlighted Pools
      </Text>
      <Stack space="10" flexWrap="wrap">
        <For each={props.list}>
          {(item: PoolCardProps, index: number) => (
            <PoolCard
              key={index}
              token1={item.token1}
              token2={item.token2}
              poolLiquidity={item.poolLiquidity}
              fees={item.fees}
              apr={item.apr}
              yourLiquidity={item.yourLiquidity}
              bonded={item.bonded}
            />
          )}
        </For>
      </Stack>
    </Box>
  );
}
