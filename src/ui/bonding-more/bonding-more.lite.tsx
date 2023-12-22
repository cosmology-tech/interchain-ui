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
  scaffolds: ["number-field"],
  rsc: {
    componentType: "client",
  },
});

export default function BondingMore(props: BondingMoreProps) {
  const state = useStore<{
    btnText: string;
    disabled: boolean;
    handleInputChange: (value: number) => void;
  }>({
    btnText: "Amount is empty",
    disabled: true,
    handleInputChange(value: number) {
      if (value === 0) {
        state.disabled = true;
        state.btnText = "Amount is zero";
      } else if (new BigNumber(value).gt(props.available)) {
        state.disabled = true;
        state.btnText = "Insufficient amount";
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
        <ScaffoldNumberField
          id="bonding-input"
          minValue={0}
          value={props?.value}
          onChange={(value) => state.handleInputChange(value)}
        />
      </Box>

      <Button
        fluidWidth
        intent="tertiary"
        size="lg"
        disabled={state.disabled}
        onClick={() => props?.onBond?.()}
        isLoading={props.isLoading}
      >
        {state.btnText}
      </Button>
    </Box>
  );
}
