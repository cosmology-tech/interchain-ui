import { For } from "@builder.io/mitosis";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import PoolCard from "../pool-card";
import { PoolCardListProps } from "./pool-card-list.types";
import { PoolCardProps } from "../pool-card/pool-card.types";

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
        space="$0"
        attributes={{
          flexWrap: "wrap",
          gap: "$10",
        }}
      >
        <For each={props.list}>
          {(item: PoolCardProps, index: number) => (
            <PoolCard
              id={item.id}
              key={index}
              token1={item.token1}
              token2={item.token2}
              poolLiquidity={item.poolLiquidity}
              fees={item.fees}
              apr={item.apr}
              yourLiquidity={item.yourLiquidity}
              bonded={item.bonded}
            />
          )}
        </For>
      </Stack>
    </Box>
  );
}
