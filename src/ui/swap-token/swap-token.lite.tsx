import {
  useRef,
  onUpdate,
  onMount,
  onUnMount,
  useStore,
  Show,
  For,
} from "@builder.io/mitosis";
import BigNumber from "bignumber.js";
import { animate } from "motion";
import cloneDeep from "lodash/cloneDeep";
import clsx from "clsx";
import Stack from "../stack";
import Text from "../text";
import IconButton from "../icon-button";
import Box from "../box";
import Button from "../button";
import SwapPrice from "../swap-price";
import { store } from "../../models/store";
import TransferItem from "../transfer-item";
import { IconProps } from "../icon/icon.types";
import type { ThemeVariant } from "../../models/system.model";

import * as styles from "./swap-token.css";
import {
  SwapTokenProps,
} from "./swap-token.types";
import {
  AvailableItem,
} from "../transfer-item/transfer-item.types";

export default function SwapToken(props: SwapTokenProps) {
  const swapIconRef = useRef(null);
  let isSwitchingRef = useRef(false);
  let toteranceRef = useRef(null);
  let cleanupRef = useRef<() => void>(null);

  let state = useStore<{
    theme: ThemeVariant;
    swapIcon: IconProps["name"];
    swapDisabled: boolean;
    tolerance: number;
    isSetting: boolean;
    fromAmount: string;
    toAmount: string;
    fromDollarValue: BigNumber;
    minimumReceived: string;
    fromItem: AvailableItem;
    toItem: AvailableItem;
    fromList: Array<AvailableItem>;
    toList: Array<AvailableItem>;
    toggleIcon: (deg: number, icon: IconProps["name"]) => void;
    toggleToteranceStatus: () => void;
    setToterance: (per: number) => void;
    exchange: () => void;
    handleFromListItemSelected: (selectedItem: AvailableItem) => void;
    handleToListItemSelected: (selectedItem: AvailableItem) => void;
    handleFromAmountChange: (item: AvailableItem, value: string) => void;
    handleToAmountChange: (item: AvailableItem, value: string) => void;
  }>({
    theme: "light",
    swapIcon: "arrowDownLine",
    tolerance: 1,
    isSetting: false,
    fromAmount: "0",
    toAmount: "0",
    get swapDisabled() {
      return new BigNumber(state.fromAmount).gt(state?.fromItem?.available);
    },
    get fromDollarValue() {
      return new BigNumber(state.fromAmount).multipliedBy(
        state.fromItem?.priceDisplayAmount
      );
    },
    get minimumReceived() {
      return new BigNumber(state.toAmount)
        .multipliedBy(100 - state.tolerance)
        .dividedBy(100)
        .decimalPlaces(6)
        .toString();
    },
    fromItem: null,
    toItem: null,
    fromList: [],
    toList: [],
    toggleIcon(deg, icon) {
      animate(
        swapIconRef,
        { rotate: deg },
        { duration: 0.1, easing: "ease-in-out" }
      );
      state.swapIcon = icon;
    },
    toggleToteranceStatus() {
      let curSetting: boolean = !state.isSetting;
      if (curSetting) {
        animate(
          toteranceRef,
          { right: 0, opacity: 1 },
          { duration: 0.2, easing: "ease-in-out" }
        );
      } else {
        animate(
          toteranceRef,
          { right: "-300px", opacity: 0 },
          { duration: 0.2, easing: "ease-in-out" }
        );
      }
      state.isSetting = curSetting;
    },
    setToterance(per) {
      state.tolerance = per;
      state.toggleToteranceStatus();
    },
    exchange() {
      if(!new BigNumber(state.fromAmount).eq(state.toAmount)) {
        isSwitchingRef = true;
      }
      const copyFrom: AvailableItem = cloneDeep(state.fromItem);
      const copyTo: AvailableItem = cloneDeep(state.toItem);
      const copyFromList: AvailableItem[] = cloneDeep(state.fromList);
      const copyToList: AvailableItem[] = cloneDeep(state.toList);
      const copyFromAmount = state.fromAmount;
      const copyToAmount = state.toAmount;

      state.fromItem = copyTo;
      state.toItem = copyFrom;
      state.fromList = copyToList;
      state.toList = copyFromList;
      state.fromAmount = copyToAmount;
      state.toAmount = copyFromAmount;
      props?.onChange?.({
        fromItem: copyTo,
        toItem: copyFrom,
        fromAmount: copyToAmount,
        toAmount: copyFromAmount,
      });
    },
    handleFromListItemSelected(selectedItem) {
      state.toList = props.dropDownList.filter(
        (item) => item.symbol !== selectedItem.symbol
      );
      state.fromItem = selectedItem;
      let newTo = new BigNumber(state.fromAmount)
        .multipliedBy(selectedItem.priceDisplayAmount)
        .dividedBy(state.toItem.priceDisplayAmount)
        .decimalPlaces(6)
        .toString();
      state.toAmount = newTo;
      props?.onChange?.({
        fromItem: selectedItem,
        toItem: state.toItem,
        fromAmount: state.fromAmount,
        toAmount: newTo,
      });
    },
    handleToListItemSelected(selectedItem) {
      state.fromList = props.dropDownList.filter(
        (item) => item.symbol !== selectedItem.symbol
      );
      state.toItem = selectedItem;
      let newTo = state.fromDollarValue
        .dividedBy(selectedItem.priceDisplayAmount)
        .decimalPlaces(6)
        .toString();
      state.toAmount = newTo
        props?.onChange?.({
          fromItem: state.fromItem,
          toItem: selectedItem,
          fromAmount: state.fromAmount,
          toAmount: newTo,
        });
    },
    handleFromAmountChange(item: AvailableItem, value: string) {
      if (isSwitchingRef) {
        isSwitchingRef = false;
        return;
      }
      state.fromAmount = value;
      let newToAmount = new BigNumber(value || 0)
        .multipliedBy(item.priceDisplayAmount)
        .dividedBy(state.toItem.priceDisplayAmount)
        .decimalPlaces(6)
        .toString();
      state.toAmount = newToAmount;
      props?.onChange?.({
        fromItem: item,
        toItem: state.toItem,
        fromAmount: value,
        toAmount: newToAmount,
      });
    },
    handleToAmountChange(item: AvailableItem, value: string) {
      state.toAmount = value;
      props?.onChange?.({
        fromItem: state.fromItem,
        toItem: item,
        fromAmount: state.fromAmount,
        toAmount: value,
      });
    },
  });

  onMount(() => {
    state.theme = store.getState().theme;

    cleanupRef = store.subscribe((newState) => {
      state.theme = newState.theme;
    });
  });

  onUpdate(() => {
    let initialFromList = cloneDeep(props.dropDownList);
    initialFromList.splice(1, 1);
    let initialToList = cloneDeep(props.dropDownList);
    initialToList.splice(0, 1);
    state.fromList = initialFromList;
    state.toList = initialToList;
    state.fromItem = initialFromList[0];
    state.toItem = initialToList[0];
  }, [props.dropDownList]);

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  return (
    <Box className={styles.swapTokenContainer} paddingTop="$5">
      <TransferItem
        halfBtn
        maxBtn
        hasAvailable
        title="From"
        amount={state.fromAmount}
        selectedItem={state.fromItem}
        dropDownList={state.fromList}
        onItemSelected={(selectedItem: AvailableItem) =>
          state.handleFromListItemSelected(selectedItem)
        }
        onChange={(item: AvailableItem, value: string) =>
          state.handleFromAmountChange(item, value)
        }
      />
      <Stack
        className={styles.switchContainer}
        attributes={{
          justifyContent: "center",
        }}
      >
        <div className={styles.rel} ref={swapIconRef}>
          <IconButton
            className={styles.swapIcon[state.theme]}
            icon={state.swapIcon}
            isRound={true}
            intent="text"
            onClick={(e) => state.exchange()}
            onHoverStart={(e) => state.toggleIcon(90, "arrowLeftRightLine")}
            onHoverEnd={(e) => state.toggleIcon(0, "arrowDownLine")}
          />
        </div>
      </Stack>
      <TransferItem
        halfBtn={false}
        maxBtn={false}
        disabled
        title="To"
        amount={state.toAmount}
        selectedItem={state.toItem}
        dropDownList={state.toList}
        onItemSelected={(selectedItem: AvailableItem) =>
          state.handleToListItemSelected(selectedItem)
        }
        onChange={(item: AvailableItem, value: string) =>
          state.handleToAmountChange(item, value)
        }
      />
      <Stack
        attributes={{
          my: "$9",
          height: "$12",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text color="$textSecondary">Slippage tolerance</Text>
        <Stack
          className={styles.settingContainer}
          attributes={{
            position: "relative",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Show when={!state.isSetting}>
            <Stack
              space="$7"
              attributes={{
                alignItems: "center",
              }}
            >
              <Text color="$textSecondary" fontWeight="$bold">
                {state.tolerance}%
              </Text>
              <IconButton
                icon="settingFill"
                size="sm"
                intent="text"
                onClick={(e) => state.toggleToteranceStatus()}
              />
            </Stack>
          </Show>
          <div ref={toteranceRef} className={styles.percentContainer}>
            <Stack
              attributes={{
                alignItems: "center",
              }}
              space="$5"
            >
              <For each={[1, 2.5, 3, 5]}>
                {(per) => (
                  <Button
                    onClick={(e) => {
                      state.setToterance(per);
                      props?.onToteranceChange?.(per)
                    }}
                    key={per}
                    size="sm"
                    intent={state.tolerance === per ? "tertiary" : "text"}
                  >
                    {per}%
                  </Button>
                )}
              </For>
              <IconButton
                icon="closeFilled"
                size="sm"
                intent="text"
                onClick={(e) => state.toggleToteranceStatus()}
              />
            </Stack>
          </div>
        </Stack>
      </Stack>
      <SwapPrice
        fromItem={state.fromItem}
        toItem={state.toItem}
        disabled={state.fromDollarValue.isLessThanOrEqualTo(0)}
        minimumReceived={state.minimumReceived}
        fromAmount={state.fromAmount}
        toAmount={state.toAmount}
        hasRoute={props?.swapPrice?.hasRoute}
        priceImpact={props?.swapPrice?.priceImpact}
        swapFee={props?.swapPrice?.swapFee}
      />
      <Button
        onClick={() =>
          props?.onSwap?.()
        }
        disabled={state.swapDisabled || new BigNumber(state.fromAmount).eq(0)}
        intent="tertiary"
        size="lg"
        attributes={{ width: "$full" }}
      >
        {`${state.swapDisabled ? "Insufficient balance" : "Swap"}`}
      </Button>
    </Box>
  );
}
