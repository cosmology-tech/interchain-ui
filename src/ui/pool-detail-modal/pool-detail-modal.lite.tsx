import { useStore } from "@builder.io/mitosis";
import BasicModal from "../basic-modal";
import BondingArea from "../bonding-area";
import ManageLiquidityCard from "../manage-liquidity-card";
import PoolInfoHeader from "../pool-info-header";

import { PoolDetailModalProps } from "./pool-detail-modal.types";
import {
  OnBondDetail,
  OnUnBondDetail,
} from "../bonding-list-item-sm/bonding-list-item-sm.types";

export default function PoolDetailModal(props: PoolDetailModalProps) {
  const state = useStore<{
    unbondHandler: (string) => void;
  }>({
    unbondHandler(v) {
      console.log("day====", v);
    },
  });
  return (
    <BasicModal
      isOpen={props.isOpen}
      title={`${props.totalBalanceCoins[0]?.symbol} / ${props.totalBalanceCoins[1]?.symbol}`}
      onClose={() => props?.onClose()}
    >
      <PoolInfoHeader
        id="1"
        coins={props.totalBalanceCoins}
        liquidity={props?.liquidity}
        swapFee={props.swapFee}
        volume24H={props?.volume24H}
      />
      <ManageLiquidityCard
        onAddLiquidity={(assets) => props?.onAddLiquidity?.(assets)}
        poolAssets={props.poolAssets}
        totalBalanceCoins={props.totalBalanceCoins}
        totalBalance={props.totalBalance}
        totalShares={props.totalShares}
        lpTokenBalance={props.lpTokenBalance}
        lpTokenShares={props.lpTokenShares}
        // Remove liquidity
        unbondedBalance={props.unbondedBalance}
        unbondedShares={props.unbondedShares}
        myLiquidityCoins={props.myLiquidityCoins}
        onRemoveLiquidity={(percent) => props?.onRemoveLiquidity?.(percent)}
        onStartEarning={() => props?.onStartEarning?.()}
      />
      <BondingArea
        bondingCardList={[
          {
            title: "a day bonding",
            value: props.apr["1"]?.totalApr,
          },
          {
            title: "7 days",
            value: props.apr["7"]?.totalApr,
          },
          {
            title: "14 days",
            value: props.apr["14"]?.totalApr,
          },
        ]}
        bondingList={{
          onUnbond: (detail: OnUnBondDetail) => props?.onUnbond(detail),
          list: [
            {
              title: "A day",
              totalApr: props.apr["1"].totalApr,
              amount: props.apr["1"].amount,
              superfluidApr: props.apr["1"].superfluidApr,
              type: "1",
            },
            {
              title: "7 days",
              totalApr: props.apr["7"].totalApr,
              amount: props.apr["7"].amount,
              superfluidApr: props.apr["7"].superfluidApr,
              type: "7",
            },
            {
              title: "14 days",
              totalApr: props.apr["14"].totalApr,
              amount: props.apr["14"].amount,
              superfluidApr: props.apr["14"].superfluidApr,
              type: "14",
            },
          ],
        }}
        bondingListSm={{
          onBond: (detail: OnBondDetail) => props?.onBond(detail),
          onUnbond: (detail: OnUnBondDetail) => props?.onUnbond(detail),
          bondingName: `${props.totalBalanceCoins[0]?.symbol} / ${props.totalBalanceCoins[1]?.symbol}`,
          unbondedBalance: props.unbondedBalance,
          unbondedShares: props.unbondedShares,
          list: [
            {
              title: "Bonded 1 day",
              bondedValue: props.apr["1"]?.bondedValue,
              bondedShares: props.apr["1"]?.bondedShares,
              totalApr: props.apr["1"]?.totalApr,
              type: "1",
            },
            {
              title: "Bonded 7 days",
              bondedValue: props.apr["7"]?.bondedValue,
              bondedShares: props.apr["7"]?.bondedShares,
              totalApr: props.apr["7"]?.totalApr,
              type: "7",
            },
            {
              title: "Bonded 14 days",
              bondedValue: props.apr["14"]?.bondedValue,
              bondedShares: props.apr["14"]?.bondedShares,
              totalApr: props.apr["14"]?.totalApr,
              type: "14",
            },
          ],
        }}
      />
    </BasicModal>
  );
}
