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
import PoolName from "../pool/components/pool-name";
import * as styles from "./pool-card.css";
import { PoolCardProps } from "./pool-card.types";

export default function PoolCard(props: PoolCardProps) {
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
    <Stack space="6" className={styles.container} direction="column" justify="center">
      <PoolName token1={props.token1} token2={props.token2} />
      <Stack justify="space-between">
        <Text color="content">APR</Text>
        <Text color="content" size="2xl" weight="semibold"  marginLeft="4" wordBreak="break-word">
          {props.apr}%
        </Text>
      </Stack>
      <Stack justify="space-between">
        <Text color="tip">Liquidity</Text>
        <Text color="content" weight="semibold" marginLeft="4" wordBreak="break-word">
          ${props.poolLiquidity.toLocaleString()}
        </Text>
      </Stack>
      <Stack justify="space-between">
        <Text color="tip">7D Fees</Text>
        <Text color="content" weight="semibold" marginLeft="4" wordBreak="break-word">
          ${props.fees.toLocaleString()}
        </Text>
      </Stack>
      <Box width="full" height="1" className={styles.divider[state.theme]} />
      <Stack justify="space-between">
        <Text color="content">Your Liquidity</Text>
        <Text color="content" weight="semibold">
          ${props.yourLiquidity.toLocaleString()}
        </Text>
      </Stack>
      <Stack justify="space-between">
        <Text color="content">Bonded</Text>
        <Text color="content" weight="semibold" marginLeft="4" wordBreak="break-word">
          ${props.bonded.toLocaleString()}
        </Text>
      </Stack>
    </Stack>
  );
}
