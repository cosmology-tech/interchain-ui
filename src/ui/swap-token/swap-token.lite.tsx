import { useRef, onMount, useStore, Show, For } from "@builder.io/mitosis";
import { animate } from "motion";
import clsx from "clsx";
import Stack from "../stack";
import Text from "../text";
import IconButton from "../icon-button";
import Box from "../box";
import Button from "../button";
import SwapPrice from "../swap-price";
import { sprinkles } from "../../styles/sprinkles.css";
import TransferItem from "../transfer-item";
import { IconProps } from "../icon/icon.types";

import * as styles from "./swap-token.css";
import { SwapTokenProps } from "./swap-token.types";

export default function SwapToken(props: SwapTokenProps) {
  const swapIconRef = useRef(null);
  let animationRef = useRef(null);
  let toteranceRef = useRef(null);
  let state = useStore<{
    swapIcon: IconProps["name"];
    tolerance: number;
    isSetting: boolean;
    toggleIcon: (deg: number, icon: IconProps["name"]) => void;
    toggleToteranceStatus: () => void;
    setToterance: (per: number) => void;
  }>({
    swapIcon: "arrowDownLine",
    tolerance: 1,
    isSetting: false,
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
  });

  onMount(() => {});
  return (
    <Stack direction="column" className={styles.swapTokenContainer}>
      <Text size="lg" weight="semibold" attributes={{ marginBottom: "8" }}>
        Swap
      </Text>
      <TransferItem
        maxBtn={true}
        availableAmount={713.32}
        symbol="UMEE"
        denom="Umee"
        imgSrc="https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.png"
      />
      <Stack className={styles.switchContainer} justify="center">
        <div className={sprinkles({ position: "relative" })} ref={swapIconRef}>
          <IconButton
            className={styles.swapIcon}
            icon={state.swapIcon}
            isRound={true}
            intent="text"
            onClick={(e) => console.log("onclick")}
            onHoverStart={(e) => state.toggleIcon(90, "arrowLeftRightLine")}
            onHoverEnd={(e) => state.toggleIcon(0, "arrowDownLine")}
          />
        </div>
      </Stack>
      <TransferItem
        maxBtn={true}
        availableAmount={713.32}
        symbol="UMEE"
        denom="Umee"
        imgSrc="https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.png"
      />
      <Stack
        justify="space-between"
        align="center"
        attributes={{ my: "9", height: "12" }}
      >
        <Text color="textSecondary">Slippage tolerance</Text>
        <Stack
          className={styles.settingContainer}
          justify="flex-end"
          align="center"
          attributes={{ position: "relative" }}
        >
          <Show when={!state.isSetting}>
            <Stack space="7" align="center">
              <Text color="textSecondary" weight="bold">
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
            <Stack align="center" space="5">
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
      <SwapPrice />
      <Button intent="tertiary" size="lg">
        Swap
      </Button>
    </Stack>
  );
}
