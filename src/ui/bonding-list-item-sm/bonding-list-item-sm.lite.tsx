import { useStore, useMetadata } from "@builder.io/mitosis";
import BigNumber from "bignumber.js";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import Button from "../button";
import { store } from "../../models/store";
import { BondingListItemSmProps } from "./bonding-list-item-sm.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function BondingListItemSm(props: BondingListItemSmProps) {
  const state = useStore<{
    unbondDisabled: boolean;
  }>({
    get unbondDisabled() {
      return new BigNumber(props.bondedValue || 0).lte(0);
    },
  });
  return (
    <Box
      px="$8"
      py="$10"
      backgroundColor="$cardBg"
      borderRadius="$lg"
      minWidth={{
        tablet: "350px",
      }}
    >
      <Stack
        space="$0"
        attributes={{
          justifyContent: "space-between",
        }}
      >
        {/* APR section */}
        <Box flexShrink="0">
          <Text color="$textSecondary" fontWeight="$semibold">
            {props.title}
          </Text>
          <Stack
            space="$0"
            attributes={{
              alignItems: "baseline",
              marginTop: "$3",
              marginBottom: "$9",
            }}
          >
            <Text
              color="$textSecondary"
              fontWeight="$semibold"
              attributes={{ marginRight: "$5" }}
            >
              APR
            </Text>
            <Text
              fontSize="$4xl"
              color="$textSecondary"
              fontWeight="$semibold"
              attributes={{ marginRight: "$3" }}
            >
              {new BigNumber(props.totalApr || 0).decimalPlaces(2).toString()}
            </Text>
            <Text color="$textSecondary" fontWeight="$semibold">
              %
            </Text>
          </Stack>
          <Button
            size="sm"
            variant="secondary"
            disabled={state.unbondDisabled}
            onClick={() => props?.onUnbond?.()}
            isLoading={props.isUnbondLoading}
          >
            Unbond
          </Button>
        </Box>

        {/* Shares section */}
        <Stack
          direction="vertical"
          space="$0"
          attributes={{
            flexShrink: "0",
          }}
        >
          <Stack
            space="0"
            attributes={{
              alignItems: "baseline",
            }}
          >
            <Text fontWeight="$semibold" attributes={{ marginRight: "$1" }}>
              $
            </Text>
            <Text fontWeight="$semibold" fontSize="$4xl">
              {store.getState().formatNumber({ value: props.bondedValue })}
            </Text>
          </Stack>
          <Stack
            space="$0"
            attributes={{
              marginTop: "$3",
              marginBottom: "$9",
            }}
          >
            <Text fontWeight="$semibold">{props.bondedShares}&nbsp;</Text>
            <Text>pool shares</Text>
          </Stack>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => props.onBond?.()}
            isLoading={props.isBondLoading}
          >
            Bond more
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
