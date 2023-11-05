import { For, useMetadata } from "@builder.io/mitosis";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import PoolCard from "../pool-card";
import { PoolCardListProps } from "./pool-card-list.types";
import { PoolCardProps } from "../pool-card/pool-card.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

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
              liquidity={item.liquidity}
              myLiquidity={item.myLiquidity}
              apr={item.apr}
              fees7D={item.fees7D}
              volume24H={item.volume24H}
              unbondedBalance={item.unbondedBalance}
              onClick={() => item.onClick()}
            />
          )}
        </For>
      </Stack>
    </Box>
  );
}
