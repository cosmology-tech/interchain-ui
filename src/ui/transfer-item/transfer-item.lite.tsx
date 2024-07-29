import {
  useStore,
  onMount,
  onUpdate,
  onUnMount,
  useRef,
  useDefaultProps,
  Show,
  For,
  useMetadata,
} from "@builder.io/mitosis";
import clx from "clsx";
import BigNumber from "bignumber.js";
import Stack from "../stack";
import Text from "../text";
import Box from "../box";

import { store } from "../../models/store";
import * as styles from "./transfer-item.css";
import {
  TransferItemProps,
  AvailableItem,
  ComboboxListItem,
  PartialAmount,
} from "./transfer-item.types";
import type { ThemeVariant } from "../../models/system.model";

useMetadata({
  isAttachedToShadowDom: true,
  scaffolds: ["chain-swap-combobox", "number-field"],
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<TransferItemProps>>({
  hasAvailable: false,
  title: "",
  partials: [
    {
      label: "Half",
      percentage: 0.5,
    },
    {
      label: "Max",
      percentage: 1,
    },
  ],
});

export default function TransferItem(props: TransferItemProps) {
  let lastValueRef = useRef<number>(0);

  const state = useStore<{
    currentItem: AvailableItem;
    amountPrice: number;
    comboboxList: ComboboxListItem[];
    handlePartialAmountChange: (partial: PartialAmount) => void;
    handleAmountInput: (value: number) => void;
    getComboboxItem: (item: AvailableItem) => ComboboxListItem;
    mapToComboboxList: (list: AvailableItem[]) => void;
    getSelectedItem: (selectedItem: ComboboxListItem) => AvailableItem;
    itemSelected: (selectedItem: ComboboxListItem) => void;
    // === UI states
    theme: ThemeVariant;
  }>({
    theme: "light",
    currentItem: null,
    comboboxList: [],
    get amountPrice() {
      if (props.amount === 0) {
        return 0;
      } else {
        return new BigNumber(state.currentItem?.priceDisplayAmount)
          .multipliedBy(props.amount)
          .decimalPlaces(6)
          .toNumber();
      }
    },
    handleAmountInput(value: number) {
      if (value === lastValueRef) {
        return;
      }
      lastValueRef = value;
      props?.onChange?.(state.currentItem, value);
    },
    handlePartialAmountChange(partial: PartialAmount) {
      const value = new BigNumber(state.currentItem?.available)
        .multipliedBy(partial.percentage)
        .toNumber();
      state.handleAmountInput(value);
    },
    getComboboxItem(item: AvailableItem) {
      let dollarAmount = new BigNumber(item?.available)
        .multipliedBy(item?.priceDisplayAmount)
        .toString();

      dollarAmount = store.getState().formatNumber({
        value: dollarAmount,
        style: "currency",
      });

      return {
        iconUrl: item?.imgSrc,
        name: item?.name,
        tokenName: item?.symbol,
        amount: `${item?.available}`,
        notionalValue: dollarAmount,
      };
    },
    mapToComboboxList(list: AvailableItem[]) {
      let res = list.map((item: AvailableItem) => {
        return state.getComboboxItem(item);
      });
      state.comboboxList = res;
    },
    getSelectedItem(selectedItem: ComboboxListItem) {
      return props.dropdownList.find(
        (item: AvailableItem) => item.symbol === selectedItem.tokenName,
      );
    },
    itemSelected(selectedItem: ComboboxListItem) {
      state.currentItem = props.dropdownList.find(
        (item) => item.symbol === selectedItem.tokenName,
      );
      props?.onItemSelected?.(state.getSelectedItem(selectedItem));
    },
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    state.theme = store.getState().theme;

    cleanupRef = store.subscribe((newState) => {
      state.theme = newState.theme;
    });
  });

  onUpdate(() => {
    state.currentItem = props.selectedItem;
  }, [props.selectedItem]);

  onUpdate(() => {
    state.mapToComboboxList(props.dropdownList ?? []);
  }, [props.dropdownList]);

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  return (
    <Box
      gap="$0"
      display="flex"
      flexDirection="column"
      backgroundColor="$progressBg"
      borderRadius="$lg"
      position="relative"
      paddingTop="$5"
      bg="$cardBg"
      attributes={{
        "data-part-id": "transfer-item-root",
      }}
      className={clx(props.className, styles.root)}
    >
      <Stack
        space="$0"
        direction="horizontal"
        attributes={{
          flexWrap: "wrap",
          minHeight: "$10",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: props.isSmall ? "$6" : "$9",
          paddingRight: props.isSmall ? "$4" : "$5",
        }}
      >
        <Text
          fontSize={props.isSmall ? "$xs" : "$sm"}
          color="$textSecondary"
          attributes={{
            flexGrow: 1,
            flexShrink: 0,
          }}
        >
          {props.title}
        </Text>

        <Box display="flex" flexWrap="wrap" gap="$2">
          {/* Available amount */}
          <Show when={props.hasAvailable}>
            <Stack
              direction="horizontal"
              space="$4"
              attributes={{
                flexGrow: "1",
                overflow: "auto",
                flexShrink: "0",
                alignItems: "center",
              }}
            >
              <Text
                fontSize={props.isSmall ? "$2xs" : "$sm"}
                color="$textSecondary"
                fontWeight="$semibold"
                attributes={{
                  flexShrink: "0",
                }}
              >
                {props.availableLabel ?? "Available"}
              </Text>

              <Text
                fontWeight="$semibold"
                fontSize={props.isSmall ? "$2xs" : "$sm"}
                attributes={{
                  marginRight: props.isSmall ? "$2" : "$9",
                  flexShrink: "0",
                }}
              >
                {state.currentItem?.available}
              </Text>
            </Stack>
          </Show>

          {/* Partial amounts */}
          <Show when={props.partials && props.partials.length > 0}>
            <Stack
              direction="horizontal"
              space="$4"
              align="center"
              attributes={{
                justifyContent: "flex-end",
                flexGrow: "0",
                flexShrink: "1",
              }}
            >
              <For each={props.partials}>
                {(partial, index) => (
                  <button
                    key={index}
                    className={styles.textBtn[state.theme]}
                    onClick={() => state.handlePartialAmountChange(partial)}
                  >
                    <Box as="span" fontSize={props.isSmall ? "$2xs" : "$sm"}>
                      {partial.label}
                    </Box>
                  </button>
                )}
              </For>
            </Stack>
          </Show>
        </Box>
      </Stack>

      <Show when={state.comboboxList.length > 0}>
        <Box
          attributes={{
            borderRadius: "$lg",
          }}
        >
          {/* @ts-expect-error */}
          <ScaffoldChainSwapCombobox
            className={styles.comboboxContainer}
            size={props.isSmall ? "sm" : "md"}
            filterFn={props.filterFn}
            placeholder={props.placeholder}
            selectedItem={state.getComboboxItem(state.currentItem)}
            defaultSelected={props.defaultSelectedItem ?? state.comboboxList[0]}
            options={state.comboboxList}
            onItemSelected={(item) => {
              state.itemSelected(item);
            }}
            valueItem={state.getComboboxItem(state.currentItem)}
            endAddon={() => (
              <Stack direction="vertical" space="$0">
                {props.disabled ? (
                  <Box
                    width="auto"
                    flex="1"
                    display="flex"
                    justifyContent="flex-end"
                  >
                    <Text fontSize={props.isSmall ? "$lg" : "$2xl"}>
                      {props.amount}
                    </Text>
                  </Box>
                ) : (
                  <Box>
                    {/* @ts-ignore */}
                    <NumberField
                      borderless
                      size="sm"
                      isDisabled={!!props.disabled}
                      value={props.amount}
                      onInput={(event) => {
                        if (typeof props.onInput === "function") {
                          props.onInput(
                            state.currentItem,
                            (event.target as HTMLInputElement).value,
                          );
                        }
                      }}
                      onChange={(value) => {
                        state.handleAmountInput(value);
                      }}
                      inputClassName={clx(
                        styles.transferInput,
                        props.isSmall ? styles.smComboboxInput : null,
                      )}
                      minValue={0}
                      maxValue={
                        props.availableAsMax
                          ? state.currentItem?.available
                          : undefined
                      }
                    />
                  </Box>
                )}
                <div
                  style={{
                    display:
                      !!props.amount && props.amount > 0 ? "block" : "none",
                  }}
                >
                  <Text color="$textSecondary" fontSize="$xs" textAlign="right">
                    {`≈ $${store
                      .getState()
                      ?.formatNumber({ value: state.amountPrice })}`}
                  </Text>
                </div>
              </Stack>
            )}
            attributes={
              props.isSmall
                ? {
                    pr: "10px",
                    pl: "12px",
                    py: "8px",
                  }
                : {
                    pr: "10px",
                    pl: "20px",
                    py: "14px",
                  }
            }
          />
        </Box>
      </Show>
    </Box>
  );
}
