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
import BigNumber from "bignumber.js";
import uniqueId from "lodash/uniqueId";
import Stack from "../stack";
import Text from "../text";
import Icon from "../icon";
import Button from "../button";
import TextField from "../text-field";
import Box from "../box";

import { store } from "../../models/store";
import * as styles from "./transfer-item.css";
import {
  TransferItemProps,
  AvailableItem,
  ComboboxListType,
} from "./transfer-item.types";
import type { ThemeVariant } from "../../models/system.model";
import { getValueByAvailable } from "../../helpers";

useMetadata({
  isAttachedToShadowDom: true,
  scaffolds: ["chain-swap-combobox"],
});

export default function TransferItem(props: TransferItemProps) {
  useDefaultProps({
    halfBtn: false,
    maxBtn: false,
    hasAvailable: false,
    title: "",
  });

  const state = useStore<{
    theme: ThemeVariant;
    swapAmount: string;
    currentItem: AvailableItem;
    amountPrice: string;
    comboboxList: ComboboxListType;
    handleAmountInput: (Event) => void;
    handleHalf: () => void;
    handleMax: () => void;
    mapToComboboxList: (list: AvailableItem[]) => void;
    itemSelected: (selectedItem: any) => void;
  }>({
    theme: "light",
    swapAmount: "0",
    currentItem: null,
    amountPrice: "",
    comboboxList: [],
    handleAmountInput(e) {
      let value = getValueByAvailable(
        e.target.value,
        state.currentItem?.available
      );

      if (value === "") {
        state.amountPrice = "";
      } else {
        state.amountPrice = new BigNumber(state.currentItem?.priceDisplayAmount)
          .multipliedBy(value)
          .decimalPlaces(2)
          .toString();
      }
      state.swapAmount = value;
      props?.onChange?.(Object.assign(state.currentItem, { value: value }));
    },
    handleHalf() {
      let value = new BigNumber(state.currentItem.available)
        .dividedBy(2)
        .toString();
      state.handleAmountInput({ target: { value: value } });
    },
    handleMax() {
      let value = new BigNumber(state.currentItem.available).toString();
      state.handleAmountInput({ target: { value: value } });
    },
    mapToComboboxList(list: AvailableItem[]) {
      let res = list.map((item: AvailableItem) => {
        let dollarAmount = new BigNumber(item.available)
          .multipliedBy(item.priceDisplayAmount)
          .decimalPlaces(2)
          .toString();
        dollarAmount = store.getState().formatNumber({
          value: dollarAmount,
          style: "currency",
        });
        return {
          iconUrl: item.imgSrc,
          name: item.denom,
          tokenName: item.symbol,
          amount: item.available,
          notionalValue: dollarAmount,
        };
      });
      console.log("mapToComboboxList", res)
      state.comboboxList = res;
    },
    itemSelected(selectedItem) {
      state.currentItem = props.dropDownList.find(
        (item) => item.symbol === selectedItem.tokenName
      );
      props?.onItemSelected?.(selectedItem)
    },
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    state.theme = store.getState().theme;
    state.currentItem = props.dropDownList[0];

    cleanupRef = store.subscribe((newState) => {
      state.theme = newState.theme;
    });
  });

  onUpdate(() => {
    // Trigger props.onChange when state.currentItem changed
    if (state.currentItem) {
      state.handleAmountInput({ target: { value: "0" } });
    }
  }, [state.currentItem]);

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
        paddingTop: "$7",
        paddingBottom: "$7",
      }}
    >
      <Stack
        space="$0"
        attributes={{
          marginBottom: "$7",
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
              attributes={{ marginRight: "$5" }}
              onClick={() => state.handleHalf()}
            >
              Half
            </Button>
          </Show>
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

      {/* <Stack
        space="$0"
        attributes={{
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Stack
          space="$0"
          attributes={{
            alignItems: "center",
          }}
        >
          <Button className={styles.dropdowBtn} variant="unstyled">
            <img className={styles.img} src={state.currentItem?.imgSrc} />
            <Stack
              space="$0"
              direction="vertical"
              attributes={{ marginLeft: "$9", alignItems: "flex-start" }}
            >
              <Stack
                space="$0"
                attributes={{
                  alignItems: "center",
                }}
              >
                <Text
                  fontSize="$2xl"
                  fontWeight="$semibold"
                  attributes={{ marginRight: "$5" }}
                >
                  {state.currentItem?.symbol}
                </Text>
                <Icon name="arrowDownS" color="$textSecondary" />
              </Stack>
              <Text color="$textSecondary">{state.currentItem?.denom}</Text>
            </Stack>
          </Button>
        </Stack>
        <Stack direction="vertical" space="$0">
          <TextField
            id={uniqueId("transfer-item-")}
            type="number"
            value={state.swapAmount}
            onChange={(e) => state.handleAmountInput(e)}
            inputClassName={styles.transferInput}
          />
          <Show when={!!state.swapAmount && state.swapAmount !== "0"}>
            <Text
              color="$textSecondary"
              fontSize="$xs"
              textAlign="right"
              attributes={{ marginTop: "$4" }}
            >
              {`≈ $${store
                .getState()
                ?.formatNumber({ value: state.amountPrice })}`}
            </Text>
          </Show>
        </Stack>
      </Stack> */}

      <Show when={state.comboboxList.length > 0}>
        <Box
          attributes={{
            borderRadius: "$lg",
          }}
        >
          {/* @ts-expect-error */}
          <ScaffoldChainSwapCombobox
            size="md"
            defaultSelected={state.comboboxList[0]}
            options={state.comboboxList}
            onItemSelected={(item) => state.itemSelected(item)}
            endAddon={() => (
              <Stack direction="vertical" space="$0">
                {props.disabled ? (
                  <Text fontSize="$2xl">{state.swapAmount}</Text>
                ) : (
                  <TextField
                    disabled={!!props.disabled}
                    id={uniqueId("transfer-item-")}
                    type="number"
                    value={state.swapAmount}
                    onChange={(e) => state.handleAmountInput(e)}
                    inputClassName={styles.transferInput}
                  />
                )}
                <div
                  style={{
                    visibility:
                      !!state.swapAmount && state.swapAmount !== "0"
                        ? "visible"
                        : "hidden",
                  }}
                >
                  <Text
                    color="$textSecondary"
                    fontSize="$xs"
                    textAlign="right"
                    attributes={{ marginTop: "$4" }}
                  >
                    {`≈ $${store
                      .getState()
                      ?.formatNumber({ value: state.amountPrice })}`}
                  </Text>
                </div>
              </Stack>
            )}
          >
            {/* @ts-expect-error */}
          </ScaffoldChainSwapCombobox>
        </Box>
      </Show>
    </Stack>
  );
}
