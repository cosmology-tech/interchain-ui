import {
  useRef,
  onUpdate,
  onMount,
  onUnMount,
  useStore,
  useDefaultProps,
  For,
} from "@builder.io/mitosis";
import BigNumber from "bignumber.js";
import anime from "animejs";
import cloneDeep from "lodash/cloneDeep";
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
import { SwapTokenProps } from "./swap-token.types";
import { AvailableItem } from "../transfer-item/transfer-item.types";

useDefaultProps<Partial<SwapTokenProps>>({
  toleranceLimits: [1, 2.5, 3, 5],
});

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
    fromAmount: number;
    toAmount: number;
    fromDollarValue: BigNumber;
    minimumReceived: number;
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
    handleFromAmountChange: (item: AvailableItem, value: number) => void;
    handleToAmountChange: (item: AvailableItem, value: number) => void;
  }>({
    theme: "light",
    swapIcon: "arrowDownLine",
    tolerance: 1,
    isSetting: false,
    fromAmount: 0,
    toAmount: 0,
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
        .toNumber();
    },
    fromItem: null,
    toItem: null,
    fromList: [],
    toList: [],
    toggleIcon(deg, icon) {
      anime({
        targets: [swapIconRef],
        rotate: deg,
      });
      state.swapIcon = icon;
    },
    toggleToteranceStatus() {
      let curSetting: boolean = !state.isSetting;
      if (curSetting) {
        anime({
          targets: [toteranceRef],
          opacity: 1,
          right: 0,
          easing: "easeInQuint",
          duration: 300,
        });
      } else {
        anime({
          targets: [toteranceRef],
          opacity: 0,
          right: -300,
          easing: "easeOutQuint",
          duration: 250,
        });
      }
      state.isSetting = curSetting;
    },
    setToterance(per) {
      state.tolerance = per;
      state.toggleToteranceStatus();
    },
    exchange() {
      if (!new BigNumber(state.fromAmount).eq(state.toAmount)) {
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
        .toNumber();

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
        .toNumber();
      state.toAmount = newTo;
      props?.onChange?.({
        fromItem: state.fromItem,
        toItem: selectedItem,
        fromAmount: state.fromAmount,
        toAmount: newTo,
      });
    },
    handleFromAmountChange(item: AvailableItem, value: number) {
      if (isSwitchingRef) {
        isSwitchingRef = false;
        return;
      }
      state.fromAmount = value;
      let newToAmount = new BigNumber(value || 0)
        .multipliedBy(item.priceDisplayAmount)
        .dividedBy(state.toItem.priceDisplayAmount)
        .decimalPlaces(6)
        .toNumber();
      state.toAmount = newToAmount;
      props?.onChange?.({
        fromItem: item,
        toItem: state.toItem,
        fromAmount: value,
        toAmount: newToAmount,
      });
    },
    handleToAmountChange(item: AvailableItem, value: number) {
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
        onChange={(item: AvailableItem, value: number) =>
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
            icon={state.swapIcon as IconProps["name"]}
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
        onChange={(item: AvailableItem, value: number) =>
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
          <Stack
            space="$7"
            attributes={{
              display: state.isSetting ? "none" : "flex",
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

          <div ref={toteranceRef} className={styles.percentContainer}>
            <Stack
              attributes={{
                alignItems: "center",
              }}
              space="$5"
            >
              <For each={props.toleranceLimits}>
                {(percent) => (
                  <Button
                    onClick={(e) => {
                      state.setToterance(percent);
                      props?.onToleranceChange?.(percent);
                    }}
                    key={percent}
                    size="sm"
                    intent={state.tolerance === percent ? "tertiary" : "text"}
                  >
                    {percent}%
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
        onClick={() => props?.onSwap?.()}
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
