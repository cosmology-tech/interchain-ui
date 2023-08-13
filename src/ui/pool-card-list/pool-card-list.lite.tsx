import { For } from "@builder.io/mitosis";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import PoolCard from "../pool-card";
import { PoolCardListProps } from "./pool-card-list.types";
import { PoolCardProps } from "../pool-card/pool-card.types";
import { OnBondDetail, OnUnBondDetail } from "../bonding-list-item-sm/bonding-list-item-sm.types";

export default function PoolCardList(props: PoolCardListProps) {
  return (
    <Box>
      <Text
        fontSize="$lg"
        color="$textSecondary"
        fontWeight="$semibold"
        attributes={{
          marginBottom: "$10",
        }}
      >
        Highlighted Pools
      </Text>
      <Stack
        space="$10"
        attributes={{
          flexWrap: "wrap",
        }}
      >
        <For each={props.list}>
          {(item: PoolCardProps, index: number) => (
            <PoolCard
            key={item.id}
            id={item?.id}
            poolAssets={item.poolAssets}
            swapFee={item?.swapFee}
            liquidity={item.liquidity}
            myLiquidity={item.myLiquidity}
            bonded={item.bonded}
            apr={item.apr}
            fees7D={item.fees7D}
            volume24H={item.volume24H}
            totalBalance={item.totalBalance}
            totalShares={item.totalShares}
            lpTokenBalance={item.lpTokenBalance}
            lpTokenShares={item.lpTokenShares}
            totalBalanceCoins={item.totalBalanceCoins}
            unbondedBalance={item.unbondedBalance}
            unbondedShares={item.unbondedShares}
            myLiquidityCoins={item.myLiquidityCoins}
            onAddLiquidity={(assets) => item?.onAddLiquidity?.(assets)}
            onRemoveLiquidity={(percent) => item?.onRemoveLiquidity?.(percent)}
            onUnbond={(detail: OnUnBondDetail) => item?.onUnbond?.(detail)}
            onBond={(detail: OnBondDetail) => item?.onBond?.(detail)}
            onStartEarning={() => item?.onStartEarning?.()}
            />
          )}
        </For>
      </Stack>
    </Box>
  );
}
