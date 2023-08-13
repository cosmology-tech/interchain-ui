import { useStore, onUpdate } from "@builder.io/mitosis";
import BigNumber from "bignumber.js";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Box from "../box";
import TokenInput from "../token-input";
import {
  AddLiquidityProps,
  ResponseInfo,
  onAddLiquidityItem,
} from "./add-liquidity.types";

export default function AddLiquidity(props: AddLiquidityProps) {
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
    isAddLoading: boolean;
    isUnAvailable: boolean;
    handleProgress1Change: (progress: number) => void;
    handleProgress2Change: (progress: number) => void;
    handleAmoount1Change: (value: string) => void;
    handleAmoount2Change: (value: string) => void;
    addLiquidityHandler: () => void;
  }>({
    progress1: 50,
    progress2: 50,
    amount1: "",
    amount2: "",
    btnText: "Add liquidity",
    isAddLoading: false,
    disabled: true,
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
      const amount1Invalid = new BigNumber(state.amount1).gt(
        props?.poolAssets[0]?.available
      );
      const amount2Invalid = new BigNumber(state.amount2).gt(
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
    },
    handleProgress2Change(progress) {
      state.progress2 = progress;
      state.progress1 = 100 - progress;
    },
    handleAmoount1Change(value) {
      state.amount1 = value;
      if (state.progress1 === 50) {
        state.amount2 = new BigNumber(value)
          .multipliedBy(props?.poolAssets[0]?.priceDisplayAmount || 0)
          .dividedBy(props?.poolAssets[1]?.priceDisplayAmount)
          .toString();
      }
    },
    handleAmoount2Change(value) {
      state.amount2 = value;
      if (state.progress2 === 50) {
        state.amount1 = new BigNumber(value)
          .multipliedBy(props?.poolAssets[1]?.priceDisplayAmount || 0)
          .dividedBy(props?.poolAssets[0]?.priceDisplayAmount)
          .toString();
      }
    },
    addLiquidityHandler() {
      void (async function () {
        state.isAddLoading = true;
        try {
          const res: ResponseInfo = await props?.onAddLiquidity([
            state.addLiquidityItem1,
            state.addLiquidityItem2,
          ]);
          if(res.type === "success") {
            props?.onClose?.()
          }
        } catch (error) {
          throw new Error(error)
        } finally {
          state.isAddLoading = false;
        }
      })();
    },
  });
  onUpdate(() => {
    console.log("state.amount1 && state.amount2", !!state.amount1 && state.amount2)
    if (state.isInsufficient) {
      state.btnText = "Insufficient Balance";
      state.disabled = true;
    } else if(state.isUnAvailable) {
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
          imgSrc={props?.poolAssets[0]?.imgSrc}
          priceDisplayAmount={props?.poolAssets[0]?.priceDisplayAmount}
          onProgressChange={(v) => state.handleProgress1Change(v)}
          onAmountChange={(value) => state.handleAmoount1Change(value)}
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
          imgSrc={props?.poolAssets[1]?.imgSrc}
          priceDisplayAmount={props?.poolAssets[1]?.priceDisplayAmount}
          onProgressChange={(v) => state.handleProgress2Change(v)}
          onAmountChange={(value) => state.handleAmoount2Change(value)}
        />
      </Box>
      <Button
        disabled={state.disabled}
        intent="tertiary"
        attributes={{ width: "$full" }}
        onClick={() => state.addLiquidityHandler()}
        isLoading={state.isAddLoading}
      >
        {state.btnText}
      </Button>
    </Box>
  );
}
