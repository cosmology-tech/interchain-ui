import {
  Show,
  useStore,
  onMount,
  onUpdate,
  useDefaultProps,
  useRef,
} from "@builder.io/mitosis";
import clsx from "clsx";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import ProgressBar from "../progress-bar";

import * as styles from "./remove-liquidity.css";
import { RemoveLiquidityProps } from "./remove-liquidity.types";

export default function RemoveLiquidity(props: RemoveLiquidityProps) {
  const state = useStore({
    progress: 50,
  })
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
      <Stack direction="column" justify="center">
        <Stack align="baseline">
          <Text weight="semibold">$</Text>
          <Text size="7xl" weight="semibold">
            {props.myLiquidity}
          </Text>
        </Stack>
      </Stack>
      <Stack align="center">
        <Text attributes={{ marginRight: "3" }}>{props.unbondedShares}</Text>
        <Text>pool shares</Text>
      </Stack>
      <ProgressBar progress={state.progress} />
    </Stack>
  );
}
