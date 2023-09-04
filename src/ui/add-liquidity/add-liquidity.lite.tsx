import { useStore, onUpdate, useRef } from "@builder.io/mitosis";
import BigNumber from "bignumber.js";
import isEqual from "lodash/isEqual";
import cloneDeep from "lodash/cloneDeep";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Box from "../box";
import TokenInput from "../token-input";
import {
  AddItem,
  AddLiquidityProps,
  onAddLiquidityItem,
} from "./add-liquidity.types";

export default function AddLiquidity(props: AddLiquidityProps) {
  // amountChangeTypeRef is represented for which amount is changing now, and it's not for UI rendering
  // e.g. Amount2 need to be updated when amount1 is changing, but we don't want to trigger handleAmount2Change function
  let amountChangeTypeRef = useRef<"1" | "2">("1");
  let lastValuesRef = useRef<AddItem[]>([]);
  const state = useStore<{
    progress1: number;
    progress2: number;
    amount1: string;
    amount2: string;
    btnText: string;
    disabled: boolean;
    isInsufficient: boolean;
    addLiquidityItem1: onAddLiquidityItem;
    addLiquidityItem2: onAddLiquidityItem;
    isUnAvailable: boolean;
    handleProgress1Change: (progress: number) => void;
    handleProgress2Change: (progress: number) => void;
    handleAmount1Change: (value: string) => void;
    handleAmount2Change: (value: string) => void;
    onChangeHandler: (value: AddItem[]) => void;
  }>({
    progress1: 50,
    progress2: 50,
    amount1: "",
    amount2: "",
    btnText: "Add liquidity",
    disabled: true,
    onChangeHandler(values) {
      if (isEqual(values, lastValuesRef)) return;
      props?.onChange(values);
      lastValuesRef = cloneDeep(values);
    },
    get addLiquidityItem1() {
      return Object.assign(props?.poolAssets[0], {
        addAmount: state.progress2 === 100 ? "0" : state.amount1,
      });
    },
    get addLiquidityItem2() {
      return Object.assign(props?.poolAssets[1], {
        addAmount: state.progress1 === 100 ? "0" : state.amount2,
      });
    },
    get isInsufficient() {
      const amount1Invalid = new BigNumber(state.amount1 || 0).gt(
        props?.poolAssets[0]?.available
      );
      const amount2Invalid = new BigNumber(state.amount2 || 0).gt(
        props?.poolAssets[1]?.available
      );
      if (state.progress1 === 100) {
        return amount1Invalid;
      }
      if (state.progress2 === 100) {
        return amount2Invalid;
      }
      return amount1Invalid || amount2Invalid;
    },
    get isUnAvailable() {
      const amount1Disabled = new BigNumber(state.amount1 || 0).eq(0);
      const amount2isabled = new BigNumber(state.amount2 || 0).eq(0);

      if (state.progress1 === 100) {
        return amount1Disabled;
      }
      if (state.progress2 === 100) {
        return amount2isabled;
      }
      return amount1Disabled || amount2isabled;
    },
    handleProgress1Change(progress) {
      state.progress1 = progress;
      state.progress2 = 100 - progress;
      state.onChangeHandler([
        {
          progress: progress,
          value: state.amount1,
        },
        {
          progress: 100 - progress,
          value: state.amount2,
        },
      ]);
    },
    handleProgress2Change(progress) {
      state.progress2 = progress;
      state.progress1 = 100 - progress;
      state.onChangeHandler([
        {
          progress: 100 - progress,
          value: state.amount1,
        },
        {
          progress: progress,
          value: state.amount2,
        },
      ]);
    },
    handleAmount1Change(value) {
      if (amountChangeTypeRef !== "1") return;
      let value1 = value;
      let value2 = state.amount2;
      if (state.progress1 === 50) {
        value2 = new BigNumber(value || 0)
          .multipliedBy(props?.poolAssets[0]?.priceDisplayAmount || 0)
          .dividedBy(props?.poolAssets[1]?.priceDisplayAmount)
          .toString();
      }
      state.onChangeHandler([
        {
          progress: state.progress1,
          value: value1,
        },
        {
          progress: state.progress2,
          value: value2,
        },
      ]);
      state.amount1 = value1;
      state.amount2 = value2;
    },
    handleAmount2Change(value) {
      if (amountChangeTypeRef !== "2") return;
      let value2 = value;
      let value1 = state.amount1;
      if (state.progress2 === 50) {
        value1 = new BigNumber(value || 0)
          .multipliedBy(props?.poolAssets[1]?.priceDisplayAmount || 0)
          .dividedBy(props?.poolAssets[0]?.priceDisplayAmount)
          .toString();
      }
      state.onChangeHandler([
        {
          progress: state.progress1,
          value: value1,
        },
        {
          progress: state.progress2,
          value: value2,
        },
      ]);
      state.amount1 = value1;
      state.amount2 = value2;
    },
  });

  onUpdate(() => {
    if (state.isInsufficient) {
      state.btnText = "Insufficient Balance";
      state.disabled = true;
    } else if (state.isUnAvailable) {
      state.btnText = "Add liquidity";
      state.disabled = true;
    } else {
      state.btnText = "Add liquidity";
      state.disabled = false;
    }
  }, [state.amount1, state.amount2, state.progress1, state.progress2]);

  return (
    <Box>
      <Stack direction="vertical" attributes={{ paddingBottom: "$10" }}>
        <Stack
          attributes={{
            alignItems: "center",
          }}
        >
          <Text color="$textSecondary">{props?.poolAssets[0]?.symbol}</Text>
          <Text color="$textSecondary" attributes={{ px: "$3" }}>
            /
          </Text>
          <Text color="$textSecondary">{props?.poolAssets[1]?.symbol}</Text>
        </Stack>
      </Stack>
      <Box paddingBottom="$14">
        <TokenInput
          availableAsMax={false}
          amount={state.amount1}
          progress={state.progress1}
          symbol={props?.poolAssets[0]?.symbol}
          denom={props?.poolAssets[0]?.denom}
          available={props?.poolAssets[0]?.available}
          tokenIcon={props?.poolAssets[0]?.imgSrc}
          priceDisplayAmount={props?.poolAssets[0]?.priceDisplayAmount}
          onProgressChange={(v) => state.handleProgress1Change(v)}
          onAmountChange={(value) => state.handleAmount1Change(value)}
          onFocus={() => {
            amountChangeTypeRef = "1";
          }}
        />
      </Box>
      <Box paddingBottom="$14">
        <TokenInput
          availableAsMax={false}
          amount={state.amount2}
          progress={state.progress2}
          symbol={props?.poolAssets[1]?.symbol}
          denom={props?.poolAssets[1]?.denom}
          available={props?.poolAssets[1]?.available}
          tokenIcon={props?.poolAssets[1]?.imgSrc}
          priceDisplayAmount={props?.poolAssets[1]?.priceDisplayAmount}
          onProgressChange={(v) => state.handleProgress2Change(v)}
          onAmountChange={(value) => state.handleAmount2Change(value)}
          onFocus={() => {
            amountChangeTypeRef = "2";
          }}
        />
      </Box>
      <Button
        size="lg"
        disabled={state.disabled}
        intent="tertiary"
        attributes={{ width: "$full" }}
        onClick={() => props.onAddLiquidity()}
        isLoading={props.isLoading}
      >
        {state.btnText}
      </Button>
    </Box>
  );
}
