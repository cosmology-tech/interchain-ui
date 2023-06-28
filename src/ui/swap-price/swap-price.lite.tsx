import {
  useRef,
  onMount,
  useStore,
  Show,
  For,
  Fragment,
} from "@builder.io/mitosis";
import clsx from "clsx";
import { animate } from "motion";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import IconButton from "../icon-button";
import * as styles from "./swap-price.css";
import { SwapPriceProps, SwapPriceDetailRoute } from "./swap-price.types";

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
          <Text weight="semibold">
            {`1 ${props?.tokenOutSymbol} = ${props?.price?.priceRate} ${props?.tokenOutSymbol}`}
          </Text>
          <Text
            color="textSecondary"
            attributes={{ marginLeft: "9", marginRight: "13" }}
          >
            {`~ $${props?.price?.dollarValue}`}
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
              {props.priceImpact}
            </Text>
          </Stack>
          <Stack
            justify="space-between"
            align="center"
            attributes={{ marginBottom: "10" }}
          >
            <Text color="textSecondary">
              Swap Fee ({props?.swapFee?.percentage})
            </Text>
            <Text color="textSecondary" weight="bold">
              {`~ ${props?.swapFee?.value}`}
            </Text>
          </Stack>
          <Stack
            justify="space-between"
            align="center"
            attributes={{ marginBottom: "7" }}
          >
            <Text color="textSecondary">Expected Output</Text>
            <Text color="textSecondary" weight="bold">
              {`~ ${props?.expectedOutput} ${props?.tokenOutSymbol}`}
            </Text>
          </Stack>
          <Stack
            justify="space-between"
            align="center"
            attributes={{ marginBottom: "10" }}
          >
            <Text color="textSecondary">Minimum received after slippage</Text>
            <Text color="textSecondary" weight="bold">
              {`${props?.minimumReceived} ${props?.tokenOutSymbol}`}
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
                alt={props?.routeDetail?.tokenIn?.symbol}
                className={styles.img}
                src={props?.routeDetail?.tokenIn?.logoUrl}
              />
            </Box>
            <Box className={styles.routeDivider} />
            {/* Mapping routeDetail */}

            <For each={props?.routeDetail?.routes}>
              {(item: SwapPriceDetailRoute, index: number) => (
                <Fragment key={item.poolId}>
                  <Box
                    width="16"
                    height="12"
                    marginLeft="6"
                    marginRight="5"
                    position="relative"
                  >
                    <img
                      className={styles.img}
                      alt={item?.baseSymbol}
                      src={item?.baseLogo}
                    />
                    <img
                      className={clsx(styles.img, styles.absImg)}
                      alt={item?.quoteSymbol}
                      src={item?.quoteLogo}
                    />
                  </Box>
                  <Text
                    color="textSecondary"
                    weight="bold"
                    attributes={{ marginRight: "5" }}
                  >
                    {item?.swapFee}
                  </Text>
                  <Box className={styles.routeDivider} />
                </Fragment>
              )}
            </For>

            <Box marginLeft="6">
              <img
                alt={props?.routeDetail?.tokenOut?.symbol}
                className={styles.img}
                src={props?.routeDetail?.tokenOut?.logoUrl}
              />
            </Box>
          </Stack>
        </Stack>
      </div>
    </Stack>
  );
}
