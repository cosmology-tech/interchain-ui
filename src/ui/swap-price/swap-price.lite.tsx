import { useRef, onMount, useStore, Show, For } from "@builder.io/mitosis";
import clsx from "clsx";
import { animate } from "motion";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import IconButton from "../icon-button";
import * as styles from "./swap-price.css";
import { SwapPriceProps } from "./swap-price.types";

export default function SwapPrice(props: SwapPriceProps) {
  const priceRef = useRef(null);
  const state = useStore<{
    isExpanded: boolean;
    toggleExpand: () => void;
  }>({
    isExpanded: false,
    toggleExpand() {
      const curStatus = !state.isExpanded;
      state.isExpanded = curStatus;
      if (curStatus) {
        animate(
          priceRef,
          { maxHeight: "1000px" },
          { duration: 0.1, easing: "ease-in-out" }
        );
      } else {
        animate(
          priceRef,
          { maxHeight: "0" },
          { duration: 0.1, easing: "ease-in-out" }
        );
      }
    },
  });
  return (
    <Stack direction="column">
      <Stack
        className={styles.swapPriceContainer}
        justify="space-between"
        align="center"
        attributes={{ py: "9" }}
      >
        <Text color="text">Price</Text>
        <Stack align="center">
          <Text weight="semibold">1 OSMO = 1.6423 USDC</Text>
          <Text
            color="textSecondary"
            attributes={{ marginLeft: "9", marginRight: "13" }}
          >
            ~ $1,013
          </Text>
          <IconButton
            intent={state.isExpanded ? "tertiary" : "text"}
            size="sm"
            icon="arrowDownS"
            onClick={(e) => state.toggleExpand()}
          />
        </Stack>
      </Stack>
      <div ref={priceRef} className={styles.priceContainer}>
        <Stack direction="column" attributes={{ paddingBottom: "14" }}>
          <Stack
            justify="space-between"
            align="center"
            attributes={{ marginBottom: "7" }}
          >
            <Text color="textSecondary">Price Impact</Text>
            <Text color="textSecondary" weight="bold">
              -0.07
            </Text>
          </Stack>
          <Stack
            justify="space-between"
            align="center"
            attributes={{ marginBottom: "10" }}
          >
            <Text color="textSecondary">Swap Fee (0.199%)</Text>
            <Text color="textSecondary" weight="bold">
              ~ $0.01
            </Text>
          </Stack>
          <Stack
            justify="space-between"
            align="center"
            attributes={{ marginBottom: "7" }}
          >
            <Text color="textSecondary">Expected Output</Text>
            <Text color="textSecondary" weight="bold">
              ~ 0.00096882373984234982 HUAHUA
            </Text>
          </Stack>
          <Stack
            justify="space-between"
            align="center"
            attributes={{ marginBottom: "10" }}
          >
            <Text color="textSecondary">Minimum received after slippage</Text>
            <Text color="textSecondary" weight="bold">
              0.00096882373984234982 HUAHUA
            </Text>
          </Stack>
          <Text color="textSecondary" attributes={{ py: "10" }}>
            Route
          </Text>
          <Stack
            justify="space-between"
            align="center"
            attributes={{ height: "12" }}
          >
            <Box marginRight="6">
              <img
                className={styles.img}
                src="https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png"
              />
            </Box>
            <Box className={styles.routeDivider} />
            <Box
              width="16"
              height="12"
              marginLeft="6"
              marginRight="5"
              position="relative"
            >
              <img
                className={styles.img}
                src="https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png"
              />
              <img
                className={clsx(styles.img, styles.absImg)}
                src="https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png"
              />
            </Box>
            <Box className={styles.routeDivider} />
            <Box
              width="16"
              height="12"
              marginLeft="6"
              marginRight="5"
              position="relative"
            >
              <img
                className={styles.img}
                src="https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png"
              />
              <img
                className={clsx(styles.img, styles.absImg)}
                src="https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png"
              />
            </Box>
            <Box className={styles.routeDivider} />
            <Box marginLeft="6">
              <img
                className={styles.img}
                src="https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png"
              />
            </Box>
          </Stack>
        </Stack>
      </div>
    </Stack>
  );
}
