import { For, useStore } from "@builder.io/mitosis";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import ProgressBar from "../progress-bar";

import * as styles from "./remove-liquidity.css";
import { RemoveLiquidityProps } from "./remove-liquidity.types";

export default function RemoveLiquidity(props: RemoveLiquidityProps) {
  const state = useStore({
    progress: 50,
    handeProgressClick(value: number) {
      state.progress = value;
    },
  });

  return (
    <Stack direction="vertical">
      <Stack direction="vertical">
        <Text size="xl" weight="semibold">
          Remove liquidity
        </Text>
        <Stack
          attributes={{
            alignItems: "center",
          }}
        >
          <Text color="textSecondary">{props.token1.symbol}</Text>
          <Text color="textSecondary" attributes={{ px: "3" }}>
            /
          </Text>
          <Text color="textSecondary">{props.token2.symbol}</Text>
        </Stack>
      </Stack>
      <Stack
        attributes={{
          marginTop: "9",
          marginBottom: "5",
          alignItems: "baseline",
          justifyContent: "center",
        }}
      >
        <Text weight="semibold" attributes={{ marginRight: "1" }}>
          $
        </Text>
        <Text size="7xl" weight="semibold">
          {props.myLiquidity}
        </Text>
      </Stack>
      <Stack
        attributes={{
          marginBottom: "10",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text attributes={{ marginRight: "3" }}>{props.unbondedShares}</Text>
        <Text>pool shares</Text>
      </Stack>
      <Stack
        space="13"
        attributes={{ marginBottom: "11", justifyContent: "center" }}
      >
        <Stack
          attributes={{
            alignItems: "center",
          }}
        >
          <img className={styles.img} src={props.token1.imgSrc} />
          <Text
            color="textSecondary"
            weight="semibold"
            attributes={{ mx: "4" }}
          >
            {props.token1.amount}
          </Text>
          <Text color="textSecondary">{props.token1.symbol}</Text>
        </Stack>
        <Stack
          attributes={{
            alignItems: "center",
          }}
        >
          <img className={styles.img} src={props.token2.imgSrc} />
          <Text
            color="textSecondary"
            weight="semibold"
            attributes={{ mx: "4" }}
          >
            {props.token2.amount}
          </Text>
          <Text color="textSecondary">{props.token2.symbol}</Text>
        </Stack>
      </Stack>
      <ProgressBar
        progress={state.progress}
        onProgressChange={(v) => state.handeProgressClick(v)}
      />
      <Stack
        space="8"
        attributes={{ marginTop: "12", justifyContent: "center" }}
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
      <Button size="lg" intent="tertiary" attributes={{ marginTop: "18" }}>
        Remove Liquidity
      </Button>
    </Stack>
  );
}
