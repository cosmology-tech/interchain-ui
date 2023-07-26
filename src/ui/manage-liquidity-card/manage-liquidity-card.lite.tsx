import { useStore, onMount, onUnMount, useRef } from "@builder.io/mitosis";
import Box from "../box";
import Stack from "../stack";
import Button from "../button";
import Text from "../text";
import { store } from "../../models/store";
import type { ThemeVariant } from "../../models/system.model";
import * as styles from "./manage-liquidity-card.css";
import { ManageLiquidityCardProps } from "./manage-liquidity-card.types";

export default function ManageLiquidityCard(props: ManageLiquidityCardProps) {
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
      className={styles.container}
      attributes={{
        alignItems: "flex-end",
        flexWrap: "wrap",
        marginTop: "$16",
        marginBottom: "$10",
        borderRadius: "$lg",
      }}
    >
      <Stack className={styles.poolBalanceContainer} direction="vertical">
        <Text color="$textSecondary" fontWeight="$semibold">
          Your pool balance
        </Text>
        <Stack attributes={{ my: "$2", alignItems: "baseline" }}>
          <Text fontWeight="$semibold" attributes={{ marginRight: "$1" }}>
            $
          </Text>
          <Text fontSize="$4xl" fontWeight="$semibold">
            {props.pollBalance}
          </Text>
        </Stack>
        <Text>No pool shares yet</Text>
        <Button attributes={{ marginTop: "$11" }} intent="tertiary">
          Add Liquidity
        </Button>
      </Stack>
      <Stack
        direction="vertical"
        attributes={{
          alignItems: "flex-end",
        }}
      >
        <Stack>
          <img className={styles.image} src={props.token1.imgSrc} />
          <Text
            color="$textSecondary"
            fontWeight="$semibold"
            attributes={{ px: "$4" }}
          >
            {props.token1.asset}
          </Text>
          <Text color="$textSecondary">{props.token1.name}</Text>
        </Stack>
        <Box height="$5" />
        <Stack>
          <img className={styles.image} src={props.token2.imgSrc} />
          <Text
            attributes={{ px: "$4" }}
            color="$textSecondary"
            fontWeight="$semibold"
          >
            {props.token2.asset}
          </Text>
          <Text color="$textSecondary">{props.token2.name}</Text>
        </Stack>
        <Button
          attributes={{ marginTop: "$11" }}
          intent="tertiary"
          variant="outlined"
        >
          Remove Liquidity
        </Button>
      </Stack>
      <Stack direction="vertical" className={styles.tokenContainer}>
        <Text color="$textSecondary" fontWeight="$semibold">
          Available LP Tokens
        </Text>
        <Stack
          attributes={{
            alignItems: "baseline",
          }}
        >
          <Text fontWeight="$semibold" attributes={{ marginRight: "$1" }}>
            $
          </Text>
          <Text fontSize="$4xl" fontWeight="$semibold">
            {props.lpTokens}
          </Text>
        </Stack>
        <Text>No pool shares yet</Text>
        <Button
          attributes={{ marginTop: "$11" }}
          intent="tertiary"
          variant="outlined"
        >
          Start earning
        </Button>
      </Stack>
    </Stack>
  );
}
