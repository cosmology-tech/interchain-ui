import {
  For,
  Show,
  useStore,
  onUpdate,
  onMount,
  onUnMount,
  useRef,
} from "@builder.io/mitosis";
import { sprinkles as s } from "../../styles/sprinkles.css";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import { store } from "../../models/store";
import * as styles from "./pool-info-header.css";
import { PoolInfoHeaderProps } from "./pool-info-header.types";

export default function PoolsHeader(props: PoolInfoHeaderProps) {
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
      <Stack direction="column">
        <Text size="xl" weight="semibold">
          {props.token1.name} / {props.token2.name}
        </Text>
        <Text color="textSecondary" marginBottom="13">
          Pool #{props.id}
        </Text>
      </Stack>
      <Stack flexWrap="wrap" align="center">
        <Box className={styles.imageBox}>
          <img className={styles.image1} src={props.token1.imgSrc} />
          <img className={styles.image2} src={props.token2.imgSrc} />
        </Box>
        <Stack className={styles.longText} direction="column">
          <Text color="textSecondary">Pool liquidity</Text>
          <Stack align="baseline">
            <Text>$</Text>
            <Text size="4xl" weight="semibold">
              {store.getState()?.formatNumber?.({value: props.poolLiquidity})}
            </Text>
          </Stack>
        </Stack>
        <Box className={styles.onlysm} width="full" height="8" />
        <Stack className={styles.shortText} direction="column">
          <Text color="textSecondary">Swap fee</Text>
          <Stack align="baseline">
            <Text size="4xl" weight="semibold">
              {props.swapFee}
            </Text>
            <Text>%</Text>
          </Stack>
        </Stack>
        <Stack className={styles.longText} direction="column">
          <Text color="textSecondary">24h trading volume</Text>
          <Stack align="baseline">
            <Text>$</Text>
            <Text size="4xl" weight="semibold">
              {store.getState()?.formatNumber?.({value: props.volume24H})}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
