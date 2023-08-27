import { useStore, useMetadata } from "@builder.io/mitosis";
import BigNumber from "bignumber.js";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Box from "../box";

import * as styles from "./bonding-more.css";
import { BondingMoreProps } from "./bonding-more.types";

useMetadata({
  isAttachedToShadowDom: true,
  scaffolds: ["number-input"],
});

export default function BondingMore(props: BondingMoreProps) {
  const state = useStore<{
    btnText: string;
    disabled: boolean;
    handleInputChange: (string) => void;
  }>({
    btnText: "Amount is empty",
    disabled: true,
    handleInputChange(value: string) {
      if (value === "") {
        state.disabled = true;
        state.btnText = "Amount is empty";
      } else if (new BigNumber(value).eq(0)) {
        state.disabled = true;
        state.btnText = "Amount is zero";
      } else if (new BigNumber(value).gt(props.available)) {
        state.disabled = true;
        state.btnText = "Insufficient mount";
      } else {
        state.disabled = false;
        state.btnText = "Bond";
      }
      props?.onChange(value);
    },
  });

  return (
    <Box className={styles.container}>
      <Stack direction="vertical" space="$0">
        <Stack attributes={{ alignItems: "center" }} space="$0">
          <Text color="$textSecondary">{props.bondingName}</Text>
        </Stack>
      </Stack>
      <Stack
        attributes={{
          paddingTop: "$13",
          justifyContent: "space-between",
        }}
        space="$0"
      >
        <Text color="$textSecondary" fontSize="$lg" fontWeight="$semibold">
          <label htmlFor="bonding-input">Amount to bound</label>
        </Text>
        <Stack space="$0" attributes={{ alignItems: "center" }}>
          <Text color="$textSecondary">Available LP Token</Text>
          <Text
            color="$textSecondary"
            attributes={{ marginLeft: "$3" }}
            fontWeight="$semibold"
          >
            {props.available}
          </Text>
        </Stack>
      </Stack>
      <Box marginBottom="$10" marginTop="$5">
        {/* @ts-expect-error */}
        <NumberInput
          id="bonding-input"
          min={0}
          value={props?.value}
          onChange={(e) => state.handleInputChange(e.value)}
        />
      </Box>
      <Button
        intent="tertiary"
        size="lg"
        disabled={state.disabled}
        attributes={{ width: "$full" }}
        onClick={() => props?.onBond?.()}
        isLoading={props.isLoading}
      >
        {state.btnText}
      </Button>
    </Box>
  );
}
