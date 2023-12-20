import {
  useRef,
  onMount,
  onUnMount,
  useStore,
  useDefaultProps,
  useMetadata,
  For,
} from "@builder.io/mitosis";
import anime from "animejs";
import Stack from "../stack";
import Text from "../text";
import IconButton from "../icon-button";
import Box from "../box";
import Button from "../button";
import Icon from "../icon";
import SwapPrice from "../swap-price";
import { store } from "../../models/store";
import TransferItem from "../transfer-item";
import { IconProps } from "../icon/icon.types";
import type { ThemeVariant } from "../../models/system.model";

import * as styles from "./swap-token.css";
import type { SwapTokenProps } from "./swap-token.types";
import type { AvailableItem } from "../transfer-item/transfer-item.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<SwapTokenProps>>({
  toleranceLimits: [1, 2.5, 3, 5],
  slippageLabel: "Slippage tolerance",
  swapDisabledLabel: "Insufficient balance",
  swapLabel: "Swap",
});

export default function SwapToken(props: SwapTokenProps) {
  const swapIconRef = useRef(null);
  let toteranceRef = useRef(null);
  let cleanupRef = useRef<() => void>(null);

  let state = useStore<{
    theme: ThemeVariant;
    swapIcon: IconProps["name"];
    tolerance: number;
    isSetting: boolean;
    fromAmount: number;
    toAmount: number;
    fromItem: AvailableItem;
    toItem: AvailableItem;
    fromList: Array<AvailableItem>;
    toList: Array<AvailableItem>;
    toggleIcon: (deg: number, icon: IconProps["name"]) => void;
    toggleToteranceStatus: () => void;
    setToterance: (per: number) => void;
  }>({
    theme: "light",
    swapIcon: "arrowDownLine",
    tolerance: 1,
    isSetting: false,
    fromAmount: 0,
    toAmount: 0,
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
  });

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
    <Box className={props.className} paddingTop="$5">
      <TransferItem
        halfBtn
        maxBtn
        hasAvailable
        title={props.from.label ?? "From"}
        amount={props.from.amount}
        selectedItem={props.from.selected}
        dropdownList={props.from.options}
        onItemSelected={(selectedItem: AvailableItem) =>
          props.from.onItemSelected(selectedItem)
        }
        onChange={(item: AvailableItem, value: number) =>
          props.from.onAmountChange(item, value)
        }
      />

      {/* Round switch button */}
      <Stack
        className={styles.switchContainer}
        attributes={{
          justifyContent: "center",
        }}
      >
        <Box position="relative" zIndex="1" ref={swapIconRef}>
          <button
            className={styles.swapIcon[state.theme]}
            onClick={(e) => props.onToggleDirection()}
            onMouseEnter={(e) => state.toggleIcon(90, "arrowLeftRightLine")}
            onMouseLeave={(e) => state.toggleIcon(0, "arrowDownLine")}
          >
            <Icon name={state.swapIcon as IconProps["name"]} />
          </button>
        </Box>
      </Stack>

      <TransferItem
        halfBtn={false}
        maxBtn={false}
        disabled
        title={props.to.label ?? "To"}
        amount={props.to.amount}
        selectedItem={props.to.selected}
        dropdownList={props.to.options}
        onItemSelected={(selectedItem: AvailableItem) =>
          props.to.onItemSelected(selectedItem)
        }
        onChange={(item: AvailableItem, value: number) =>
          props.to.onAmountChange(item, value)
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
        <Text color="$textSecondary">{props.slippageLabel}</Text>
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
        fromItem={props.from.selected}
        toItem={props.to.selected}
        disabled={props.swapPrice.routeDisabled}
        minimumReceived={props.swapPrice.minimumReceived ?? 0}
        fromAmount={props.from.amount}
        toAmount={props.to.amount}
        hasRoute={props?.swapPrice?.hasRoute}
        priceImpact={props?.swapPrice?.priceImpact}
        swapFee={props?.swapPrice?.swapFee}
      />

      <Box width="100%">
        <Button
          fluidWidth
          onClick={() => props?.onSwap?.()}
          disabled={props.swapDisabled}
          intent="tertiary"
          size="lg"
        >
          {`${props.swapDisabled ? props.swapDisabledLabel : props.swapLabel}`}
        </Button>
      </Box>
    </Box>
  );
}
