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
    <Stack
      space="6"
      className={styles.container}
      direction="vertical"
      attributes={{
        justifyContent: "center",
      }}
    >
      <PoolName id={props.id} token1={props.token1} token2={props.token2} />
      <Stack
        attributes={{
          justifyContent: "space-between",
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
        attributes={{
          justifyContent: "space-between",
        }}
      >
        <Text color="textSecondary">Liquidity</Text>
        <Text
          color="text"
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
          color="text"
          weight="semibold"
          marginLeft="4"
          wordBreak="break-word"
        >
          ${props.fees.toLocaleString()}
        </Text>
      </Stack>
      <Box width="full" height="1" className={styles.divider[state.theme]} />
      <Stack
        attributes={{
          justifyContent: "space-between",
        }}
      >
        <Text color="text">Your Liquidity</Text>
        <Text color="text" weight="semibold">
          ${props.yourLiquidity.toLocaleString()}
        </Text>
      </Stack>
      <Stack
        attributes={{
          justifyContent: "space-between",
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
    </Stack>
  );
}
