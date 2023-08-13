import { useStore } from "@builder.io/mitosis";
import Stack from "../stack";
import BigNumber from "bignumber.js";
import Button from "../button";
import Text from "../text";
import Box from "../box";
import { store } from "../../models/store";
import * as styles from "./bonding-list-item.css";
import { BondingListItemProps } from "./bonding-list-item.types";
import { ResponseInfo } from "../add-liquidity/add-liquidity.types";

export default function BondingListItem(props: BondingListItemProps) {
  const state = useStore({
    isLoading: false,
    unbondAllHandler() {
      void (async function () {
        state.isLoading = true;
        try {
          const res: ResponseInfo = await props.onUnbond({ type: props.type });
        } catch (error) {
          throw new Error(error);
        } finally {
          state.isLoading = false;
        }
      })();
    },
  });
  return (
    <Stack
      attributes={{
        alignItems: "center",
      }}
    >
      <Text
        className={styles.item}
        color="$textSecondary"
        fontWeight="$semibold"
      >
        {props.title}
      </Text>

      <Text className={styles.item} color="$textSecondary" fontSize="$xs">
        {new BigNumber(props.totalApr || 0).decimalPlaces(2).toString()}%
      </Text>

      <Text className={styles.item} color="$textSecondary" fontSize="$xs">
        ${store.getState().formatNumber({ value: props.amount || 0 })}
      </Text>

      <Text className={styles.item} color="$textSecondary" fontSize="$xs">
        {new BigNumber(props.superfluidApr || 0).decimalPlaces(2).toString()}%
      </Text>
      <Stack
        attributes={{
          width: "$21",
          justifyContent: "flex-end",
        }}
      >
        <Button
          size="xs"
          variant="unstyled"
          onClick={() => state.unbondAllHandler()}
          isLoading={state.isLoading}
        >
          Unbond All
        </Button>
      </Stack>
    </Stack>
  );
}
