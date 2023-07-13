import { useStore } from "@builder.io/mitosis";
import BigNumber from "bignumber.js";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Box from "../box";

import * as styles from "./bonding-more.css";
import { BondingMoreProps } from "./bonding-more.types";

export default function BondingMore(props: BondingMoreProps) {
  const state = useStore<{
    btnText: string;
    disabled: boolean;
    handleInputChange: (Event) => void;
  }>({
    btnText: "Amount is empty",
    disabled: true,
    handleInputChange(e) {
      const value: string = e.target.value;
      if (value === "") {
        state.disabled = true;
        state.btnText = "Amount is empty";
      } else if (BigNumber(value).eq(0)) {
        state.disabled = true;
        state.btnText = "Amount is zero";
      } else if (BigNumber(value).gt(props.available)) {
        state.disabled = true;
        state.btnText = "Insufficient mount";
      } else {
        state.disabled = false;
        state.btnText = "Bond";
      }
    },
  });
  return (
    <Stack direction="column">
      <Stack direction="column">
        <Text size="xl" weight="semibold">
          Bonding LP Tokens
        </Text>
        <Stack align="center">
          <Text color="textSecondary">{props.symbol1}</Text>
          <Text color="textSecondary" attributes={{ p: "2" }}>
            /
          </Text>
          <Text color="textSecondary">{props.symbol2}</Text>
        </Stack>
      </Stack>
      <Stack justify="space-between" attributes={{ marginTop: "13" }}>
        <Text color="textSecondary" size="lg" weight="semibold">
          Amount to bound
        </Text>
        <Stack align="center" attributes={{ marginBottom: "6" }}>
          <Text color="textSecondary">Available LP Token</Text>
          <Text color="textSecondary">{props.available}</Text>
        </Stack>
      </Stack>
      <Box className={styles.inputContainer} marginBottom="10" marginTop="5">
        <input
          className={styles.token}
          onChange={(e) => state.handleInputChange(e)}
        />
      </Box>
      <Button intent="tertiary" size="lg" disabled={state.disabled}>
        {state.btnText}
      </Button>
    </Stack>
  );
}
