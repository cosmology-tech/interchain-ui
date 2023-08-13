import { useStore, onMount, onUnMount, useRef } from "@builder.io/mitosis";
import BigNumber from "bignumber.js";
import { store } from "../../models/store";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import PoolName from "../pool/components/pool-name";
import * as styles from "./pool-card.css";
import type { PoolCardProps } from "./pool-card.types";
import type { ThemeVariant } from "../../models/system.model";
import PoolDetailModal from "../pool-detail-modal";
import {
  OnBondDetail,
  OnUnBondDetail,
} from "../bonding-list-item-sm/bonding-list-item-sm.types";

export default function PoolCard(props: PoolCardProps) {
  const state = useStore<{ theme: ThemeVariant; isOpen: boolean }>({
    theme: "light",
    isOpen: false,
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
    <Box
      className={styles.container}
      attributes={{
        onClick: () => (state.isOpen = true),
      }}
    >
      <Box marginBottom="$13">
        <PoolName id={props.id} coins={props.totalBalanceCoins} />
      </Box>
      <Stack
        space="$0"
        attributes={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "$4",
        }}
      >
        <Text color="$text">APR</Text>
        <Text
          color="$text"
          fontSize="$2xl"
          fontWeight="$semibold"
          wordBreak="break-word"
          attributes={{
            marginLeft: "$4",
          }}
        >
          {new BigNumber(props.apr[14].totalApr).decimalPlaces(2).toString()}%
        </Text>
      </Stack>
      <Stack
        space="$0"
        attributes={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "$4",
        }}
      >
        <Text color="$textSecondary">Liquidity</Text>
        <Text
          color="$textSecondary"
          fontWeight="$semibold"
          wordBreak="break-word"
          attributes={{
            marginLeft: "$4",
          }}
        >
          ${store.getState().formatNumber({ value: props.liquidity })}
        </Text>
      </Stack>
      <Stack
        attributes={{
          justifyContent: "space-between",
        }}
      >
        <Text color="$textSecondary">7D Fees</Text>
        <Text
          color="$textSecondary"
          fontWeight="$semibold"
          wordBreak="break-word"
          attributes={{
            marginLeft: "$4",
          }}
        >
          ${store.getState().formatNumber({ value: props.fees7D })}
        </Text>
      </Stack>
      <Box
        width="$full"
        height="$1"
        my="$6"
        className={styles.divider[state.theme]}
      />
      <Stack
        space="$0"
        attributes={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "$6",
        }}
      >
        <Text color="$text">Your Liquidity</Text>
        <Text color="$text" fontWeight="$semibold">
          ${store.getState().formatNumber({ value: props.myLiquidity })}
        </Text>
      </Stack>
      <Stack
        space="$0"
        attributes={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text color="$text">Bonded</Text>
        <Text
          color="$text"
          fontWeight="$semibold"
          wordBreak="break-word"
          attributes={{
            marginLeft: "$4",
          }}
        >
          ${store.getState().formatNumber({ value: props.unbondedBalance })}
        </Text>
      </Stack>
      <PoolDetailModal
        isOpen={state.isOpen}
        onClose={() => (state.isOpen = false)}
        id={props?.id}
        poolAssets={props.poolAssets}
        swapFee={props?.swapFee}
        liquidity={props.liquidity}
        myLiquidity={props.myLiquidity}
        bonded={props.bonded}
        apr={props.apr}
        fees7D={props.fees7D}
        volume24H={props.volume24H}
        totalBalance={props.totalBalance}
        totalShares={props.totalShares}
        lpTokenBalance={props.lpTokenBalance}
        lpTokenShares={props.lpTokenShares}
        totalBalanceCoins={props.totalBalanceCoins}
        unbondedBalance={props.unbondedBalance}
        unbondedShares={props.unbondedShares}
        myLiquidityCoins={props.myLiquidityCoins}
        onAddLiquidity={(assets) => props?.onAddLiquidity?.(assets)}
        onRemoveLiquidity={(percent) => props?.onRemoveLiquidity?.(percent)}
        onUnbond={(detail: OnUnBondDetail) => props?.onUnbond?.(detail)}
        onBond={(detail: OnBondDetail) => props?.onBond?.(detail)}
        onStartEarning={() => props?.onStartEarning?.()}
      />
    </Box>
  );
}
