import { useStore, onMount, onUnMount, useRef } from "@builder.io/mitosis";
import { store } from "../../models/store";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import PoolName from "../pool/components/pool-name";
import * as styles from "./pool-card.css";
import type { PoolCardProps } from "./pool-card.types";
import type { ThemeVariant } from "../../models/system.model";

export default function PoolCard(props: PoolCardProps) {
  const state = useStore<{ theme: ThemeVariant }>({
    theme: "light",
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    state.theme = store.getState().theme;

    cleanupRef = store.subscribe((newState) => {
      state.theme = newState.theme;
    });
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  return (
    <Box className={styles.container}>
      <Box marginBottom="13">
        <PoolName id={props.id} token1={props.token1} token2={props.token2} />
      </Box>
      <Stack
        space="0"
        attributes={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "4",
        }}
      >
        <Text color="text">APR</Text>
        <Text
          color="text"
          size="2xl"
          weight="semibold"
          marginLeft="4"
          wordBreak="break-word"
        >
          {props.apr}%
        </Text>
      </Stack>
      <Stack
        space="0"
        attributes={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "4",
        }}
      >
        <Text color="textSecondary">Liquidity</Text>
        <Text
          color="textSecondary"
          weight="semibold"
          marginLeft="4"
          wordBreak="break-word"
        >
          ${props.poolLiquidity.toLocaleString()}
        </Text>
      </Stack>
      <Stack
        attributes={{
          justifyContent: "space-between",
        }}
      >
        <Text color="textSecondary">7D Fees</Text>
        <Text
          color="textSecondary"
          weight="semibold"
          marginLeft="4"
          wordBreak="break-word"
        >
          ${props.fees.toLocaleString()}
        </Text>
      </Stack>
      <Box
        width="full"
        height="1"
        my="6"
        className={styles.divider[state.theme]}
      />
      <Stack
        space="0"
        attributes={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "6",
        }}
      >
        <Text color="text">Your Liquidity</Text>
        <Text color="text" weight="semibold">
          ${props.yourLiquidity.toLocaleString()}
        </Text>
      </Stack>
      <Stack
        space="0"
        attributes={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text color="text">Bonded</Text>
        <Text
          color="text"
          weight="semibold"
          wordBreak="break-word"
          attributes={{
            marginLeft: "4",
          }}
        >
          ${props.bonded.toLocaleString()}
        </Text>
      </Stack>
    </Box>
  );
}
