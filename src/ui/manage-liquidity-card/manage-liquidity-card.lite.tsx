import {
  useStore,
  onMount,
  onUnMount,
  useRef,
  Show,
  useMetadata,
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

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function ManageLiquidityCard(props: ManageLiquidityCardProps) {
  const state = useStore<{
    theme: ThemeVariant;
    hasTotalShares: boolean;
    hasLPTokenShares: boolean;
  }>({
    theme: "light",
    get hasTotalShares() {
      return new BigNumber(props.totalShares || 0).gt(0);
    },
    get hasLPTokenShares() {
      return new BigNumber(props.lpTokenShares || 0).gt(0);
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
        px: "$10",
        py: "$9",
        borderRadius: "$lg",
        ...props.attributes,
      }}
    >
      {/* ==== Pool balance column */}
      <Box
        maxWidth={{
          mobile: "100%",
          tablet: "330px",
        }}
        width="100%"
        flexGrow={{
          mobile: "1",
          tablet: "0",
          desktop: "0",
        }}
        flexBasis={{
          mobile: "100%",
          tablet: "50%",
          desktop: "50%",
        }}
      >
        {/* === Title */}
        <Text color="$textSecondary" fontWeight="$semibold">
          Your pool balance
        </Text>

        {/* === First row info */}
        <Box
          display="flex"
          gap="$12"
          justifyContent="space-between"
          alignItems="baseline"
        >
          {/* == col 1 */}
          <Stack
            direction="horizontal"
            space="$0"
            attributes={{
              flex: "0 0 calc(50% - 20px)",
              justifyContent: "flex-start",
              alignItems: "baseline",
            }}
          >
            <Text fontWeight="$semibold" attributes={{ marginRight: "$1" }}>
              $
            </Text>
            <Text fontSize="$4xl" fontWeight="$semibold">
              {store
                .getState()
                .formatNumber({ value: props.totalBalance || 0 })}
            </Text>
          </Stack>

          {/* == col 2 */}
          <Stack
            space="$0"
            attributes={{
              flex: "0 0 calc(50% - 20px)",
              justifyContent: "flex-end",
            }}
          >
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
        </Box>

        {/* === Second row info */}
        <Box
          display="flex"
          gap="$12"
          justifyContent="space-between"
          alignItems="baseline"
        >
          {/* == col 1 */}
          <Box flex="0 0 calc(50% - 20px)" justifyContent="flex-start">
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
          </Box>

          {/* == col 2 */}
          <Stack
            space="$0"
            attributes={{
              flex: "0 0 calc(50% - 20px)",
              justifyContent: "flex-end",
            }}
          >
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
        </Box>

        {/* === Third row info (CTA) */}
        <Box
          display="flex"
          flexWrap={{
            mobile: "wrap",
            tablet: "nowrap",
            desktop: "nowrap",
          }}
          gap="$8"
          justifyContent="space-between"
          alignItems="baseline"
          paddingTop="$11"
        >
          <Box
            flex={{
              mobile: "0 0 calc(50% - 20px)",
              desktop: "auto",
            }}
            justifyContent="flex-start"
          >
            <Button
              fluidWidth
              variant="secondary"
              onClick={() => {
                props?.onAdd?.();
              }}
            >
              Add Liquidity
            </Button>
          </Box>

          <Box
            flex={{
              mobile: "0 0 calc(50% - 20px)",
              desktop: "auto",
            }}
            justifyContent="flex-end"
          >
            <Button
              fluidWidth
              variant="secondary"
              onClick={() => {
                props?.onRemove?.();
              }}
            >
              Remove Liquidity
            </Button>
          </Box>
        </Box>
      </Box>

      {/* ==== Pool avail LP column */}
      <Stack
        direction="vertical"
        className={styles.tokenContainer}
        space="$0"
        attributes={{
          justifyContent: "space-between",
        }}
      >
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

        <Box pt="$10" width="100%">
          <Button
            fluidWidth
            variant="secondary"
            onClick={() => props?.onStartEarning()}
            isLoading={props.isEarningLoading}
          >
            Start earning
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
}
