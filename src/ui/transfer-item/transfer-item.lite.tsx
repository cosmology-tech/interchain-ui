import {
  useStore,
  onMount,
  onUpdate,
  onUnMount,
  useRef,
  useDefaultProps,
  Show,
  useMetadata,
} from "@builder.io/mitosis";
import cloneDeep from "lodash/cloneDeep";
import BigNumber from "bignumber.js";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Box from "../box";

import { store } from "../../models/store";
import * as styles from "./transfer-item.css";
import {
  TransferItemProps,
  AvailableItem,
  ComboboxListType,
  ComboboxListItemType,
} from "./transfer-item.types";
import type { ThemeVariant } from "../../models/system.model";

useMetadata({
  isAttachedToShadowDom: true,
  scaffolds: ["chain-swap-combobox", "number-field"],
});

export default function TransferItem(props: TransferItemProps) {
  useDefaultProps({
    halfBtn: false,
    maxBtn: false,
    hasAvailable: false,
    title: "",
  });

  let lastItemRef = useRef<AvailableItem>(null);
  let lastValueRef = useRef<number>(0);

  const state = useStore<{
    theme: ThemeVariant;
    currentItem: AvailableItem;
    amountPrice: string;
    comboboxList: ComboboxListType;
    handleAmountInput: (value: number) => void;
    handleHalf: () => void;
    handleMax: () => void;
    getComboboxItem: (item: AvailableItem) => ComboboxListItemType;
    mapToComboboxList: (list: AvailableItem[]) => void;
    getSelectedItem: (selectedItem: ComboboxListItemType) => AvailableItem;
    itemSelected: (selectedItem: ComboboxListItemType) => void;
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
      lastItemRef = cloneDeep(state.currentItem);
      lastValueRef = value;
      props?.onChange?.(state.currentItem, value);
    },
    handleHalf() {
      let value = new BigNumber(state.currentItem.available)
        .dividedBy(2)
        .toNumber();
      state.handleAmountInput(value);
    },
    handleMax() {
      let value = new BigNumber(state.currentItem.available).toNumber();
      state.handleAmountInput(value);
    },
    getComboboxItem(item: AvailableItem) {
      let dollarAmount = new BigNumber(item?.available)
        .multipliedBy(item?.priceDisplayAmount)
        .decimalPlaces(2)
        .toString();
      dollarAmount = store.getState().formatNumber({
        value: dollarAmount,
        style: "currency",
      });
      return {
        iconUrl: item?.imgSrc,
        name: item?.denom,
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
    getSelectedItem(selectedItem: ComboboxListItemType) {
      return props.dropDownList.find(
        (item: AvailableItem) => item.symbol === selectedItem.tokenName
      );
    },
    itemSelected(selectedItem: ComboboxListItemType) {
      state.currentItem = props.dropDownList.find(
        (item) => item.symbol === selectedItem.tokenName
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
    state.mapToComboboxList(props.dropDownList);
  }, [props.dropDownList]);

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  return (
    <Stack
      space="$0"
      direction="vertical"
      className={styles.container}
      attributes={{
        backgroundColor: "$progressBg",
        borderRadius: "$lg",
        position: "relative",
        paddingTop: "$5",
      }}
    >
      <Stack
        space="$0"
        attributes={{
          minHeight: "$10",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "$9",
          paddingRight: "$5",
        }}
      >
        <Text color="$textSecondary">{props.title}</Text>
        <Stack
          space="$0"
          attributes={{
            alignItems: "center",
          }}
        >
          <Show when={props.hasAvailable}>
            <Text color="$textSecondary" fontWeight="$semibold">
              Available
            </Text>
            <Text
              fontWeight="$semibold"
              attributes={{ marginLeft: "$4", marginRight: "$9" }}
            >
              {state.currentItem?.available}
            </Text>
          </Show>
          <Show when={props.halfBtn}>
            <Button
              className={styles.textBtn[state.theme]}
              size="xs"
              onClick={() => state.handleHalf()}
            >
              Half
            </Button>
          </Show>
          <Box width="$5" />
          <Show when={props.maxBtn}>
            <Button
              className={styles.textBtn[state.theme]}
              size="xs"
              onClick={() => state.handleMax()}
            >
              Max
            </Button>
          </Show>
        </Stack>
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
            size="md"
            defaultSelected={state.comboboxList[0]}
            options={state.comboboxList}
            onItemSelected={(item) => {
              console.log("[TransferItem] onItemSelected", item);
              state.itemSelected(item);
            }}
            valueItem={state.getComboboxItem(state.currentItem)}
            endAddon={() => (
              <Stack direction="vertical" space="$0">
                {props.disabled ? (
                  <Text fontSize="$2xl">{props.amount}</Text>
                ) : (
                  <Box>
                    {/* @ts-ignore */}
                    <NumberField
                      borderless
                      isDisabled={!!props.disabled}
                      value={props.amount}
                      onChange={(value) => {
                        state.handleAmountInput(value);
                      }}
                      inputClassName={styles.transferInput}
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
          />
        </Box>
      </Show>
    </Stack>
  );
}
