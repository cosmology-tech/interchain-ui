import { useStore } from "@builder.io/mitosis";
import BigNumber from "bignumber.js";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import Button from "../button";
import BasicModal from "../basic-modal";
import BondingMore from "../bonding-more";
import { store } from "../../models/store";
import { BondingListItemSmProps } from "./bonding-list-item-sm.types";
import { ResponseInfo } from "../add-liquidity/add-liquidity.types";

export default function BondingListItemSm(props: BondingListItemSmProps) {
  const state = useStore<{
    unbondDisabled: boolean;
    isBondMoreOpen: boolean;
    isUnbondLoading: boolean;
    isBondLoading: boolean;
    bondingHandler: (string) => void;
    unbondHandler: () => void;
  }>({
    get unbondDisabled() {
      return new BigNumber(props.bondedValue || 0).lte(0);
    },
    isBondMoreOpen: false,
    isUnbondLoading: false,
    isBondLoading: false,
    bondingHandler(value: string) {
      void (async function () {
        state.isBondLoading = true;
        try {
          const res: ResponseInfo = await props?.onBond({
            type: props.type,
            value: value,
          });
          console.log("res====", res);
          if (res.type === "success") {
            state.isBondMoreOpen = false;
          }
        } catch (error) {
          throw new Error(error);
        } finally {
          state.isBondLoading = false;
        }
      })();
    },
    unbondHandler() {
      void (async function () {
        state.isUnbondLoading = true;
        try {
          const res: ResponseInfo = await props.onUnbond({ type: props.type });
        } catch (error) {
          throw new Error(error);
        } finally {
          state.isUnbondLoading = false;
        }
      })();
    },
  });
  return (
    <Box
      px="$8"
      py="$10"
      backgroundColor="$cardBg"
      borderRadius="$lg"
      minWidth="350px"
    >
      <Stack
        space="$0"
        attributes={{
          justifyContent: "space-between",
        }}
      >
        <Box>
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
            intent="secondary"
            variant="outlined"
            disabled={state.unbondDisabled}
            onClick={() => state.unbondHandler()}
            isLoading={state.isUnbondLoading}
          >
            Unbond
          </Button>
        </Box>
        <Stack direction="vertical" space="$0">
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
            intent="tertiary"
            onClick={() => (state.isBondMoreOpen = true)}
          >
            Bond more
          </Button>
        </Stack>
      </Stack>
      <BasicModal
        title="Bonding LP Tokens"
        isOpen={state.isBondMoreOpen}
        onClose={() => (state.isBondMoreOpen = false)}
      >
        <BondingMore
          bondingName={props.bondingName}
          available={props.bondedShares}
          onBond={(bondingValue) => state.bondingHandler(bondingValue)}
          isLoading={state.isBondLoading}
        />
      </BasicModal>
    </Box>
  );
}
