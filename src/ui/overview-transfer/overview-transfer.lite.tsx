import {
  Show,
  useStore,
  onMount,
  onUnMount,
  useRef,
  useDefaultProps,
  useMetadata,
} from "@builder.io/mitosis";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Icon from "../icon";
import TransferItem from "../transfer-item";
import * as styles from "./overview-transfer.css";
import { store } from "../../models/store";

import type { OverviewTransferProps } from "./overview-transfer.types";
import type { AvailableItem } from "../transfer-item/transfer-item.types";
import type { ThemeVariant } from "../../models/system.model";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<OverviewTransferProps>>({
  transferLabel: "Transfer",
  cancelLabel: "Cancel",
  inputLabel: "Select amount",
});

export default function OverviewTransfer(props: OverviewTransferProps) {
  const state = useStore<{
    theme: ThemeVariant;
    selectedItem: AvailableItem;
    amount: number;
    handleTransferChange: (item: AvailableItem, value: number) => void;
  }>({
    theme: "light",
    selectedItem: null,
    amount: 0,
    handleTransferChange(item: AvailableItem, value: number) {
      state.selectedItem = item;
      state.amount = value;
      props.onChange?.(item, value);
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
    <Stack
      direction="vertical"
      attributes={{
        width: {
          mobile: "100%",
          mdMobile: "620px",
        },
      }}
    >
      <TransferItem
        hasAvailable
        title={props.inputLabel}
        defaultSelectedItem={props.defaultSelected}
        dropdownList={props.dropdownList}
        selectedItem={props.selectedItem}
        amount={state.amount}
        onChange={(item: AvailableItem, value: number) =>
          state.handleTransferChange(item, value)
        }
        onItemSelected={(selectedItem: AvailableItem) => {
          state.selectedItem = selectedItem;
          props.onChange?.(selectedItem, state.amount);
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
        <Box
          as="img"
          width="$15"
          height="$15"
          attributes={{
            alt: "from chain",
            src: props.fromChainLogoUrl,
          }}
        />

        <Icon
          name="arrowRightLine"
          color="$textSecondary"
          size="$xl"
          attributes={{
            mx: "$9",
          }}
        />

        <Box
          as="img"
          width="$15"
          height="$15"
          attributes={{
            alt: "to asset",
            src: props.toChainLogoUrl,
          }}
        />
      </Stack>

      <Button
        variant="secondary"
        size="lg"
        disabled={props.isSubmitDisabled}
        onClick={() => props.onTransfer()}
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
            {props.transferLabel}
          </Text>

          <Icon
            name="timeLine"
            size="$xs"
            attributes={{
              marginLeft: "$8",
              marginRight: "$4",
            }}
          />

          <Show when={!!props.timeEstimateLabel}>
            <Text className={styles.btnText[state.theme]} fontSize="$xs">
              {props.timeEstimateLabel}
            </Text>
          </Show>
        </Stack>
      </Button>

      <Button variant="unstyled" onClick={() => props.onCancel()}>
        {props.cancelLabel}
      </Button>
    </Stack>
  );
}
