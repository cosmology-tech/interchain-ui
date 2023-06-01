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
import Button from "../button";
import Text from "../text";
import { store } from "../../models/store";
import * as styles from "./manage-liquidity-card.css";
import { ManageLiquidityCardProps } from "./manage-liquidity-card.types";

export default function ManageLiquidityCard(props: ManageLiquidityCardProps) {
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
    <Stack className={styles.container} align="flex-end" flexWrap="wrap">
      <Stack className={styles.poolBalanceContainer} direction="column">
        <Text color="textSecondary" weight="semibold">
          Your pool balance
        </Text>
        <Stack align="baseline">
          <Text weight="semibold">$</Text>
          <Text size="4xl" weight="semibold">
            {props.pollBalance}
          </Text>
        </Stack>
        <Text>No pool shares yet</Text>
        <Button className={styles.mt11}>Add Liquidity</Button>
      </Stack>
      <Stack direction="column" align="flex-end">
        <Stack>
          <img className={styles.image} src={props.token1.imgSrc} />
          <Text px="4" color="textSecondary" weight="semibold">
            {props.token1.asset}
          </Text>
          <Text color="textSecondary">{props.token1.name}</Text>
        </Stack>
        <Box height="5" />
        <Stack>
          <img className={styles.image} src={props.token2.imgSrc} />
          <Text px="4" color="textSecondary" weight="semibold">
            {props.token2.asset}
          </Text>
          <Text color="textSecondary">{props.token2.name}</Text>
        </Stack>
        <Button className={styles.mt11}>Remove Liquidity</Button>
      </Stack>
      <Stack direction="column" className={styles.tokenContainer}>
        <Text color="textSecondary" weight="semibold">
          Available LP Tokens
        </Text>
        <Stack align="baseline">
          <Text weight="semibold">$</Text>
          <Text size="4xl" weight="semibold">
            {props.lpTokens}
          </Text>
        </Stack>
        <Text>No pool shares yet</Text>
        <Button className={styles.mt11}>Start earning</Button>
      </Stack>
    </Stack>
  );
}
