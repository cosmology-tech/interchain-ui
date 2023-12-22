import { For, useStore, useMetadata } from "@builder.io/mitosis";
import BigNumber from "bignumber.js";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Box from "../box";
import ProgressBar from "../progress-bar";
import { store } from "../../models/store";

import * as styles from "./remove-liquidity.css";
import type { RemoveLiquidityProps } from "./remove-liquidity.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function RemoveLiquidity(props: RemoveLiquidityProps) {
  const state = useStore<{
    progress: number;
    handeProgressClick: (number) => void;
    removedBalance: string;
    removedShares: string;
    removedAmount0: string;
    removedAmount1: string;
  }>({
    progress: 50,
    handeProgressClick(value: number) {
      state.progress = value;
      props?.onChange(value);
    },
    get removedBalance() {
      return new BigNumber(state.progress)
        .dividedBy(100)
        .multipliedBy(props.unbondedBalance)
        .decimalPlaces(6)
        .toString();
    },
    get removedShares() {
      return new BigNumber(state.progress)
        .dividedBy(100)
        .multipliedBy(props.unbondedShares)
        .decimalPlaces(6)
        .toString();
    },
    get removedAmount0() {
      return new BigNumber(state.progress)
        .dividedBy(100)
        .multipliedBy(props.myLiquidityCoins[0]?.displayAmount || 0)
        .decimalPlaces(6)
        .toString();
    },
    get removedAmount1() {
      return new BigNumber(state.progress)
        .dividedBy(100)
        .multipliedBy(props.myLiquidityCoins[1]?.displayAmount || 0)
        .decimalPlaces(6)
        .toString();
    },
  });

  return (
    <Box className={styles.container}>
      <Stack direction="vertical">
        <Stack
          attributes={{
            alignItems: "center",
          }}
        >
          <Text color="$textSecondary">
            {props?.myLiquidityCoins[0]?.symbol}
          </Text>
          <Text color="$textSecondary" attributes={{ px: "$3" }}>
            /
          </Text>
          <Text color="$textSecondary">
            {props?.myLiquidityCoins[1]?.symbol}
          </Text>
        </Stack>
      </Stack>
      <Stack
        attributes={{
          marginTop: "$9",
          marginBottom: "$5",
          alignItems: "baseline",
          justifyContent: "center",
        }}
      >
        <Text fontWeight="$semibold" attributes={{ marginRight: "$1" }}>
          $
        </Text>
        <Text fontSize="$7xl" fontWeight="$semibold">
          {store.getState().formatNumber({ value: state.removedBalance || 0 })}
        </Text>
      </Stack>
      <Stack
        attributes={{
          marginBottom: "$10",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text attributes={{ marginRight: "$3" }}>{state.removedBalance}</Text>
        <Text>pool shares</Text>
      </Stack>
      <Stack
        space="$13"
        attributes={{ marginBottom: "$11", justifyContent: "center" }}
      >
        <Stack
          attributes={{
            alignItems: "center",
          }}
        >
          <img
            className={styles.img}
            src={props?.myLiquidityCoins[0]?.imgSrc}
          />
          <Text
            color="$textSecondary"
            fontWeight="$semibold"
            attributes={{ mx: "$4" }}
          >
            {state.removedAmount0}
          </Text>
          <Text color="$textSecondary">
            {props?.myLiquidityCoins[0]?.symbol}
          </Text>
        </Stack>
        <Stack
          attributes={{
            alignItems: "center",
          }}
        >
          <img
            className={styles.img}
            src={props?.myLiquidityCoins[1]?.imgSrc}
          />
          <Text
            color="$textSecondary"
            fontWeight="$semibold"
            attributes={{ mx: "$4" }}
          >
            {state.removedAmount1}
          </Text>
          <Text color="$textSecondary">
            {props?.myLiquidityCoins[1]?.symbol}
          </Text>
        </Stack>
      </Stack>
      <ProgressBar
        progress={state.progress}
        onProgressChange={(v) => state.handeProgressClick(v)}
      />
      <Stack
        space="$8"
        attributes={{ marginTop: "$12", justifyContent: "center" }}
      >
        <For each={[25, 50, 75, 100]}>
          {(value: number, index: number) => (
            <Button
              size="xs"
              intent="text"
              onClick={() => state.handeProgressClick(value)}
            >
              {value}%
            </Button>
          )}
        </For>
      </Stack>
      <Box height="$18" />
      <Button
        fluidWidth
        size="lg"
        intent="tertiary"
        onClick={() => props.onRemoveLiquidity()}
        isLoading={props.isLoading}
      >
        Remove Liquidity
      </Button>
    </Box>
  );
}
