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
import TokenInput from "../token-input";

import * as styles from "./add-liquidity.css";
import { AddLiquidityProps } from "./add-liquidity.types";

export default function AddLiquidity(props: AddLiquidityProps) {
  const state = useStore<{
    progress1: number;
    progress2: number;
    amount1: string;
    amount2: string;
    btnText: string;
    disabled: boolean;
    handleProgress1Change: (progress: number) => void;
    handleProgress2Change: (progress: number) => void;
    handleAmoount1Change: (value: string) => void;
    handleAmoount2Change: (value: string) => void;
  }>({
    progress1: 50,
    progress2: 50,
    amount1: "",
    amount2: "",
    btnText: "Amount is empty",
    disabled: false,
    handleProgress1Change(progress) {
      state.progress1 = progress;
      state.progress2 = 100 - progress;
    },
    handleProgress2Change(progress) {
      state.progress2 = progress;
      state.progress1 = 100 - progress;
    },
    handleAmoount1Change(value) {
      state.amount1 = value;
      if (state.progress1 === 50) {
        state.amount2 = value;
      }
    },
    handleAmoount2Change(value) {
      state.amount2 = value;
      if (state.progress2 === 50) {
        state.amount1 = value;
      }
    },
  });
  onUpdate(() => {
    if (state.amount1 && state.amount2) {
      state.btnText = "Add liquidity";
      state.disabled = false;
    } else {
      state.btnText = "Amount is empty";
      state.disabled = true;
    }
  }, [state.amount1, state.amount2]);
  return (
    <Stack direction="column" space="10">
      <Stack direction="column">
        <Text size="xl" weight="semibold">
          Add liquidity
        </Text>
        <Stack align="center">
          <Text color="textSecondary">{props.token1.symbol}</Text>
          <Text color="textSecondary" attributes={{ px: "3" }}>
            /
          </Text>
          <Text color="textSecondary">{props.token2.symbol}</Text>
        </Stack>
      </Stack>
      <TokenInput
        progress={state.progress1}
        symbol={props.token1.symbol}
        denom={props.token1.denom}
        available={props.token1.available}
        imgSrc={props.token1.imgSrc}
        amount={state.amount1}
        onProgressChange={(v) => state.handleProgress1Change(v)}
        onAmountChange={(value) => state.handleAmoount1Change(value)}
      />
      <TokenInput
        progress={state.progress2}
        symbol={props.token2.symbol}
        denom={props.token2.denom}
        available={props.token2.available}
        imgSrc={props.token2.imgSrc}
        amount={state.amount2}
        onProgressChange={(v) => state.handleProgress2Change(v)}
        onAmountChange={(value) => state.handleAmoount2Change(value)}
      />
      <Button disabled={state.disabled} intent="tertiary">
        {state.btnText}
      </Button>
    </Stack>
  );
}
