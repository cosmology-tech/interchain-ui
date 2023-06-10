import {
  Show,
  For,
  useStore,
  onMount,
  onUpdate,
  useDefaultProps,
  useRef,
} from "@builder.io/mitosis";
import clsx from "clsx";
import { sprinkles } from "../../styles/sprinkles.css";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Icon from "../icon";
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
    <Stack direction="column">
      <Stack direction="column">
        <Text size="xl" weight="semibold">
          Remove liquidity
        </Text>
        <Stack align="center">
          <Text color="textSecondary">{props.token1.symbol}</Text>
          <Text color="textSecondary" attributes={{ px: "3" }}>
            /
          </Text>
          <Text color="textSecondary">{props.token2.symbol}</Text>
        </Stack>
      </Stack>
      <Stack
        align="baseline"
        justify="center"
        attributes={{ marginTop: "9", marginBottom: "5" }}
      >
        <Text weight="semibold" attributes={{ marginRight: "1" }}>
          $
        </Text>
        <Text size="7xl" weight="semibold">
          {props.myLiquidity}
        </Text>
      </Stack>
      <Stack
        align="center"
        justify="center"
        attributes={{ marginBottom: "10" }}
      >
        <Text attributes={{ marginRight: "3" }}>{props.unbondedShares}</Text>
        <Text>pool shares</Text>
      </Stack>
      <Stack space="13" justify="center" attributes={{ marginBottom: "11" }}>
        <Stack align="center">
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
        <Stack align="center">
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
      <Stack space="8" justify="center" attributes={{ marginTop: "12" }}>
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
