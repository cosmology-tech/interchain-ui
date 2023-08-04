import {
  useRef,
  onUpdate,
  onMount,
  onUnMount,
  useStore,
  Show,
  For,
} from "@builder.io/mitosis";
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
import { SwapItemProps, SwapTokenProps } from "./swap-token.types";
import {
  AvailableItem,
  ComboboxListItemType,
} from "../transfer-item/transfer-item.types";

export default function SwapToken(props: SwapTokenProps) {
  const swapIconRef = useRef(null);
  let animationRef = useRef(null);
  let toteranceRef = useRef(null);
  let cleanupRef = useRef<() => void>(null);

  let state = useStore<{
    theme: ThemeVariant;
    swapIcon: IconProps["name"];
    tolerance: number;
    isSetting: boolean;
    fromItem: ComboboxListItemType;
    toItem: ComboboxListItemType;
    fromList: Array<AvailableItem>;
    toList: Array<AvailableItem>;
    toggleIcon: (deg: number, icon: IconProps["name"]) => void;
    toggleToteranceStatus: () => void;
    setToterance: (per: number) => void;
    exchange: () => void;
    handleFromListItemSelected: (selectedItem: ComboboxListItemType) => void;
    handleToListItemSelected: (selectedItem: ComboboxListItemType) => void;
  }>({
    theme: "light",
    swapIcon: "arrowDownLine",
    tolerance: 1,
    isSetting: false,
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
      const copyFrom: SwapItemProps = cloneDeep(state.fromItem);
      const copyTo: SwapItemProps = cloneDeep(state.toItem);
      state.fromItem = copyTo;
      state.toItem = copyFrom;
    },
    handleFromListItemSelected(selectedItem) {
      state.toList = props.dropDownList.filter(
        (item) => item.symbol !== selectedItem.tokenName
      );
      state.fromItem = selectedItem;
    },
    handleToListItemSelected(selectedItem) {
      state.fromList = props.dropDownList.filter(
        (item) => item.symbol !== selectedItem.tokenName
      );
      state.toItem = selectedItem;
    },
  });

  onMount(() => {
    state.fromItem = {
      symbol: "OSMO",
      denom: "Osmosis",
      imgSrc:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
      availableAmount: 0.696742,
    };
    state.toItem = {
      symbol: "ATMO",
      denom: "Cosmos Hub",
      imgSrc:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
      availableAmount: 0.00633,
    };

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
  }, [props.dropDownList]);

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  return (
    <Box className={styles.swapTokenContainer}>
      <Text
        fontSize="$lg"
        fontWeight="$semibold"
        attributes={{ marginBottom: "$8" }}
      >
        Swap
      </Text>
      <TransferItem
        halfBtn
        maxBtn
        hasAvailable
        title="From"
        dropDownList={state.fromList}
        onItemSelected={(selectedItem) =>
          state.handleFromListItemSelected(selectedItem)
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
            size="lg"
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
        dropDownList={state.toList}
        onItemSelected={(selectedItem) =>
          state.handleToListItemSelected(selectedItem)
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
                    onClick={(e) => state.setToterance(per)}
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
        price={props?.swapPrice?.price}
        priceImpact={props?.swapPrice?.priceImpact}
        swapFee={props?.swapPrice?.swapFee}
        expectedOutput={props?.swapPrice?.expectedOutput}
        tokenOutSymbol={props?.swapPrice?.tokenOutSymbol}
        minimumReceived={props?.swapPrice?.minimumReceived}
        routeDetail={props?.swapPrice?.routeDetail}
      />
      <Button intent="tertiary" size="lg" attributes={{ width: "$full" }}>
        Swap
      </Button>
    </Box>
  );
}
