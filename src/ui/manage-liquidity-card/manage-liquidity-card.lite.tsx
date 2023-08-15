import {
  useStore,
  onMount,
  onUnMount,
  useRef,
  Show,
} from "@builder.io/mitosis";
import BigNumber from "bignumber.js";

import Box from "../box";
import Stack from "../stack";
import Button from "../button";
import Text from "../text";
import { store } from "../../models/store";
import type { ThemeVariant } from "../../models/system.model";
import * as styles from "./manage-liquidity-card.css";
import { ManageLiquidityCardProps } from "./manage-liquidity-card.types";
import { ResponseInfo } from "../add-liquidity/add-liquidity.types";

export default function ManageLiquidityCard(props: ManageLiquidityCardProps) {
  const state = useStore<{
    theme: ThemeVariant;
    hasTotalShares: boolean;
    hasLPTokenShares: boolean;
    isAddOpen: boolean;
    isRemoveOpen: boolean;
    isEarningLoading: boolean;
    startEarningHandler: () => void;
  }>({
    theme: "light",
    isAddOpen: false,
    isRemoveOpen: false,
    isEarningLoading: false,
    get hasTotalShares() {
      return new BigNumber(props.totalShares || 0).gt(0);
    },
    get hasLPTokenShares() {
      return new BigNumber(props.lpTokenShares || 0).gt(0);
    },
    startEarningHandler() {
      void (async function () {
        state.isEarningLoading = true;
        try {
          const res: ResponseInfo = await await props?.onStartEarning();
        } catch (error) {
          throw new Error(error);
        } finally {
          state.isEarningLoading = false;
        }
      })();
    },
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
      space="$0"
      className={styles.container}
      attributes={{
        alignItems: "flex-end",
        flexWrap: "wrap",
        marginTop: "$16",
        marginBottom: "$10",
        borderRadius: "$lg",
      }}
    >
      <Stack
        className={styles.poolBalanceContainer}
        direction="vertical"
        space="$0"
      >
        <Text color="$textSecondary" fontWeight="$semibold">
          Your pool balance
        </Text>
        <Stack attributes={{ my: "$2", alignItems: "baseline" }} space="$0">
          <Text fontWeight="$semibold" attributes={{ marginRight: "$1" }}>
            $
          </Text>
          <Text fontSize="$4xl" fontWeight="$semibold">
            {store.getState().formatNumber({ value: props.totalBalance || 0 })}
          </Text>
        </Stack>
        <Show when={state.hasTotalShares}>
          <Text>
            {" "}
            {`${new BigNumber(props.totalShares)
              .decimalPlaces(6)
              .toString()} pool shares`}
          </Text>
        </Show>
        <Show when={!state.hasTotalShares}>
          <Text>No pool shares yet</Text>
        </Show>
        <Button
          attributes={{ marginTop: "$11" }}
          intent="tertiary"
          onClick={() => {
            props?.onAdd?.()
          }}
        >
          Add Liquidity
        </Button>
      </Stack>
      <Stack
        direction="vertical"
        attributes={{
          alignItems: "flex-end",
        }}
        space="$0"
      >
        <Stack space="$0">
          <img
            className={styles.image}
            src={props.totalBalanceCoins[0]?.imgSrc}
          />
          <Text
            color="$textSecondary"
            fontWeight="$semibold"
            attributes={{ px: "$4" }}
          >
            {new BigNumber(props.totalBalanceCoins[0]?.displayAmount || 0)
              .decimalPlaces(4)
              .toString()}
          </Text>
          <Text color="$textSecondary">
            {props.totalBalanceCoins[0]?.symbol}
          </Text>
        </Stack>
        <Box height="$5" />
        <Stack space="$0">
          <img
            className={styles.image}
            src={props.totalBalanceCoins[1]?.imgSrc}
          />
          <Text
            attributes={{ px: "$4" }}
            color="$textSecondary"
            fontWeight="$semibold"
          >
            {new BigNumber(props.totalBalanceCoins[1]?.displayAmount || 0)
              .decimalPlaces(4)
              .toString()}
          </Text>
          <Text color="$textSecondary">
            {props.totalBalanceCoins[1]?.symbol}
          </Text>
        </Stack>
        <Button
          attributes={{ marginTop: "$11" }}
          intent="tertiary"
          onClick={() => {
            props?.onRemove?.()
          }}
        >
          Remove Liquidity
        </Button>
      </Stack>
      <Stack direction="vertical" className={styles.tokenContainer} space="$0">
        <Text color="$textSecondary" fontWeight="$semibold">
          Available LP Tokens
        </Text>
        <Stack
          attributes={{
            alignItems: "baseline",
          }}
          space="$0"
        >
          <Text fontWeight="$semibold" attributes={{ marginRight: "$1" }}>
            $
          </Text>
          <Text fontSize="$4xl" fontWeight="$semibold">
            {store
              .getState()
              .formatNumber({ value: props.lpTokenBalance || 0 })}
          </Text>
        </Stack>
        <Show when={state.hasLPTokenShares}>
          <Text>{`${new BigNumber(props.lpTokenShares)
            .decimalPlaces(6)
            .toString()} pool shares`}</Text>
        </Show>
        <Show when={!state.hasLPTokenShares}>
          <Text>No pool shares yet</Text>
        </Show>
        <Button
          attributes={{ marginTop: "$11" }}
          intent="secondary"
          variant="outlined"
          onClick={() => state.startEarningHandler()}
          isLoading={state.isEarningLoading}
        >
          Start earning
        </Button>
      </Stack>
    </Stack>
  );
}
