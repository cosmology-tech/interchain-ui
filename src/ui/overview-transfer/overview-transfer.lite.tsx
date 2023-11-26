import {
  Show,
  useStore,
  onMount,
  onUnMount,
  useRef,
  useDefaultProps,
  onUpdate,
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
import { AvailableItem } from "../transfer-item/transfer-item.types";
import type { ThemeVariant } from "../../models/system.model";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<OverviewTransferProps>>({
  transferLabel: "Transfer",
  cancelLabel: "Cancel",
});

export default function OverviewTransfer(props: OverviewTransferProps) {
  const state = useStore<{
    theme: ThemeVariant;
    curSelectedItem: AvailableItem;
    amount: number;
    handleTransferChange: (item: AvailableItem, value: number) => void;
  }>({
    theme: "light",
    curSelectedItem: null,
    amount: 0,
    handleTransferChange(item: AvailableItem, value: number) {
      state.curSelectedItem = item;
      state.amount = value;
      props.onChange?.(item, value);
    },
  });

  let cleanupRef = useRef<() => void>(null);
  let selectedItemRef = useRef<AvailableItem | null>(null);

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
    state.curSelectedItem = props.selectedItem ?? props.dropdownList[0];
  }, [props.dropdownList, props.selectedItem]);

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
        maxBtn
        hasAvailable
        defaultSelectedItem={props.defaultSelected}
        dropdownList={props.dropdownList}
        selectedItem={state.curSelectedItem}
        amount={state.amount}
        onChange={(item: AvailableItem, value: number) =>
          state.handleTransferChange(item, value)
        }
        onItemSelected={(selectedItem: AvailableItem) => {
          state.curSelectedItem = selectedItem;
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
        intent="tertiary"
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
