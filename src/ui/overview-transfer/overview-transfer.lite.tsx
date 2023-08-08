import {
  useStore,
  onMount,
  onUnMount,
  useRef,
  onUpdate,
} from "@builder.io/mitosis";
import BigNUmber from "bignumber.js";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Icon from "../icon";
import TransferItem from "../transfer-item";
import * as styles from "./overview-transfer.css";
import { store } from "../../models/store";
import type { OverviewTransferProps } from "./overview-transfer.types";
import { AvailableItem } from "../transfer-item/transfer-item.types";
import type { ThemeVariant } from "../../models/system.model";

export default function OverviewTransfer(props: OverviewTransferProps) {
  const state = useStore<{
    theme: ThemeVariant;
    transferDisabled: boolean;
    curSelectedItem: AvailableItem;
    amount: string;
    handleTransferChange: (item: AvailableItem, value: string) => void;
  }>({
    theme: "light",
    transferDisabled: true,
    curSelectedItem: null,
    amount: "0",
    handleTransferChange(item: AvailableItem, value: string) {
      state.curSelectedItem = item;
      console.log("state.amount = value;", value)
      state.amount = value;
      state.transferDisabled =
        new BigNUmber(value).isGreaterThan(item?.available) ||
        new BigNUmber(value).isLessThanOrEqualTo(0) ||
        value === "";
    },
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    state.theme = store.getState().theme;

    cleanupRef = store.subscribe((newState) => {
      state.theme = newState.theme;
    });
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  onUpdate(() => {
    state.curSelectedItem = props.dropDownList[0];
  }, [props.dropDownList]);

  return (
    <Stack className={styles.overviewTransfer} direction="vertical">
      {/* <Text
        fontSize="$xl"
        fontWeight="$semibold"
        attributes={{ marginBottom: "$10" }}
      >
        {props.type}
      </Text> */}
      <TransferItem
        maxBtn
        hasAvailable
        dropDownList={props.dropDownList}
        selectedItem={state.curSelectedItem}
        amount={state.amount}
        onChange={(item: AvailableItem, value: string) =>
          state.handleTransferChange(item, value)
        }
        onItemSelected={(selectedItem: AvailableItem) => {
          state.curSelectedItem = selectedItem;
          state.amount = "0";
        }}
      />
      <Stack
        attributes={{
          marginTop: "$11",
          marginBottom: "$13",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img className={styles.img} src={state?.curSelectedItem?.imgSrc} />
        <Icon
          name="arrowRightLine"
          color="$textSecondary"
          size="$xl"
          attributes={{
            mx: "$9",
          }}
        />
        <img
          className={styles.img}
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg"
        />
      </Stack>
      <Button
        intent="tertiary"
        disabled={state.transferDisabled}
        onClick={() => props?.onTransfer(state.curSelectedItem, state.amount)}
      >
        <Stack
          attributes={{
            alignItems: "center",
          }}
        >
          <Text
            className={styles.btnText[state.theme]}
            fontSize="$lg"
            fontWeight="$semibold"
          >
            Transfer
          </Text>
          <Icon
            name="timeLine"
            size="$xs"
            attributes={{
              marginLeft: "$8",
              marginRight: "$4",
            }}
          />
          <Text className={styles.btnText[state.theme]} fontSize="$xs">
            ≈ 20 seconds
          </Text>
        </Stack>
      </Button>
      <Button variant="unstyled" onClick={() => props?.onCancel()}>
        Cancel
      </Button>
    </Stack>
  );
}
