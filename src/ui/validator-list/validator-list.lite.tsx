import { For, Show, useMetadata } from "@builder.io/mitosis";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import ValidatorListItem from "../validator-list-item";
import * as styles from "./validator-list.css";
import type { ValidatorListItemProps } from "../validator-list-item/validator-list-item.types";
import type { ValidatorListProps } from "./validator-list.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function BondingList(props: ValidatorListProps) {
  return (
    <Box className={styles.container}>
      <Show when={props.selfValidator}>
        <Stack
          attributes={{
            marginBottom: "$7",
            paddingRight: "$22",
          }}
        >
          <For each={["Validator", "Amount staked", "Claimable rewards"]}>
            {(item: string, index: number) => (
              <Text
                key={item}
                className={styles.title}
                color="$textSecondary"
                textAlign={index === 0 ? "left" : "right"}
              >
                {item}
              </Text>
            )}
          </For>
        </Stack>
      </Show>

      <Box
        paddingBottom="$7"
        paddingTop="$7"
        paddingLeft="$7"
        paddingRight="$9"
        backgroundColor={props.selfValidator ? "$cardBg" : "$transparent"}
        borderRadius="$lg"
      >
        <Stack direction="vertical" space="$7">
          <For each={props.list}>
            {(item: ValidatorListItemProps, index: number) => (
              <ValidatorListItem
                key={index}
                validatorName={item.validatorName}
                validatorImg={item.validatorImg}
                stakedAmount={item.stakedAmount}
                rewardsAmount={item.rewardsAmount}
                symbol={item.symbol}
              />
            )}
          </For>
        </Stack>
      </Box>
    </Box>
  );
}
