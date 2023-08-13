import { useStore, onMount, onUnMount, useRef } from "@builder.io/mitosis";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import PoolName from "../pool/components/pool-name";
import APR from "./components/apr";
import CellWithTitle from "./components/cell-with-title";
import PoolDetailModal from "../pool-detail-modal";
import { store } from "../../models/store";
import * as styles from "./pool-list-item.css";
import type { PoolListItemProps } from "./pool-list-item.types";
import type { ThemeVariant } from "../../models/system.model";
import { OnBondDetail, OnUnBondDetail } from "../bonding-list-item-sm/bonding-list-item-sm.types";

export default function PoolListItem(props: PoolListItemProps) {
  const state = useStore<{ theme: ThemeVariant; isOpen: boolean; apr14 }>({
    theme: "light",
    isOpen: false,
    get apr14() {
      return new BigNumber(props?.apr["14"].totalApr || 0)
        .decimalPlaces(2)
        .toString();
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
    <Box
      className={styles.container}
      attributes={{
        alignItems: "center",
        onClick: () => (state.isOpen = true),
      }}
    >
      <PoolName
        id={props.id}
        className={styles.nameContainer}
        coins={props.totalBalanceCoins}
      />
      <Box className={clsx(styles.responsiveText, styles.onlySm)}>
        <APR
          title="APR"
          className={styles.onlySm}
          apr={state.apr14}
          innerClassName={styles.iconContainer[state.theme]}
        />
      </Box>

      <Box className={styles.onlySm} width="$full" height="$9" />

      <CellWithTitle
        className={styles.responsiveText}
        innerClassName={styles.onlySm}
        title="Liquidity"
      >
        <Text
          color="$text"
          fontWeight="$semibold"
          wordBreak="break-word"
          attributes={{
            marginRight: "$4",
          }}
        >
          {store
            .getState()
            .formatNumber({ value: props?.liquidity, style: "currency" })}
        </Text>
      </CellWithTitle>
      <CellWithTitle
        className={styles.responsiveText}
        innerClassName={styles.onlySm}
        title="24H Volume"
      >
        <Text
          color="$text"
          fontWeight="$semibold"
          wordBreak="break-word"
          attributes={{
            marginRight: "$4",
          }}
        >
        {store
          .getState()
          .formatNumber({ value: props?.volume24H, style: "currency" })}
        </Text>
      </CellWithTitle>
      <CellWithTitle
        className={styles.responsiveText}
        innerClassName={styles.onlySm}
        title="7D Fees"
      >
        <Text
          color="$text"
          fontWeight="$semibold"
          wordBreak="break-word"
          attributes={{
            marginRight: "$4",
          }}
        >
        {store
          .getState()
          .formatNumber({ value: props?.fees7D, style: "currency" })}
        </Text>
      </CellWithTitle>
      {/* 14 day totalApr */}
      <APR
        className={clsx(styles.responsiveText, styles.lgAPR)}
        apr={state.apr14}
        innerClassName={styles.iconContainer[state.theme]}
      />
      <Box className={styles.onlySm} width="$full" height="$4" />
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
