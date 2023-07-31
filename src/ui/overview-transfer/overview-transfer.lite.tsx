import { useStore, onMount, onUnMount, useRef } from "@builder.io/mitosis";
import BigNUmber from "bignumber.js";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Icon from "../icon";
import TransferItem from "../transfer-item";
import * as styles from "./overview-transfer.css";
import { store } from "../../models/store";
import type { OverviewTransferProps } from "./overview-transfer.types";
import { TransferDetail } from "../transfer-item/transfer-item.types";
import type { ThemeVariant } from "../../models/system.model";

export default function OverviewTransfer(props: OverviewTransferProps) {
  const state = useStore<{
    theme: ThemeVariant;
    transferDisabled: boolean;
    curTransferDetail: TransferDetail;
    handleTransferChange: (data: TransferDetail) => void;
  }>({
    theme: "light",
    transferDisabled: true,
    curTransferDetail: null,
    handleTransferChange(data: TransferDetail) {
      state.curTransferDetail = data;
      state.transferDisabled =
        new BigNUmber(data.value).isGreaterThan(data.available) ||
        new BigNUmber(data.value).isLessThanOrEqualTo(0) ||
        data.value === "";
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
        onChange={(detail: TransferDetail) =>
          state.handleTransferChange(detail)
        }
      />
      <Stack
        attributes={{
          marginTop: "$11",
          marginBottom: "$13",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img className={styles.img} src={state?.curTransferDetail?.imgSrc} />
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
        onClick={() => props?.onTransfer(state.curTransferDetail)}
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
      <Button variant="unstyled" onClick={() => props?.onCancel()}>Cancel</Button>
    </Stack>
  );
}
