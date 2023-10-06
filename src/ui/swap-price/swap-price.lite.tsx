import { useRef, useStore, Show, For, Fragment } from "@builder.io/mitosis";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import anime from "animejs";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import IconButton from "../icon-button";
import * as styles from "./swap-price.css";
import { SwapPriceProps, SwapPriceDetailRoute } from "./swap-price.types";
import { store } from "../../models/store";
import type { AnimeInstance } from "animejs";

export default function SwapPrice(props: SwapPriceProps) {
  const priceRef = useRef(null);
  let animationRef = useRef<AnimeInstance | null>(null);

  const state = useStore<{
    isExpanded: boolean;
    toggleExpand: () => void;
    routesPath: any;
  }>({
    isExpanded: false,
    toggleExpand() {
      const curStatus = !state.isExpanded;
      state.isExpanded = curStatus;
      if (curStatus) {
        anime({
          targets: [priceRef],
          maxHeight: "1000px",
          easing: "easeInQuint",
          duration: 250,
        });
      } else {
        anime({
          targets: [priceRef],
          maxHeight: "0",
          easing: "easeOutQuint",
          duration: 250,
        });
      }
    },
    get routesPath() {
      let hasOsmo: boolean =
        props?.fromItem?.symbol === "OSMO" || props?.toItem?.symbol === "OSMO";
      const osmoImgSrc =
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png";
      const osmo = "OSMO";
      let path = [];
      if (hasOsmo) {
        path = [
          {
            swapFee: props?.swapFee?.percentage,
            baseLogo: props?.fromItem?.imgSrc,
            baseSymbol: props?.fromItem?.symbol,
            quoteLogo: props?.toItem?.imgSrc,
            quoteSymbol: props?.toItem?.symbol,
          },
        ];
      } else {
        path = [
          {
            swapFee: props?.swapFee?.percentage,
            baseLogo: props?.fromItem?.imgSrc,
            baseSymbol: props?.fromItem?.symbol,
            quoteLogo: osmoImgSrc,
            quoteSymbol: osmo,
          },
          {
            swapFee: props.swapFee.percentage,
            baseLogo: osmoImgSrc,
            baseSymbol: osmo,
            quoteLogo: props?.toItem?.imgSrc,
            quoteSymbol: props?.toItem?.symbol,
          },
        ];
      }
      return path;
    },
  });

  return (
    <Box>
      <Stack
        className={styles.swapPriceContainer}
        attributes={{
          py: "$9",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text color="$text">Price</Text>
        <Stack
          attributes={{
            alignItems: "center",
          }}
        >
          <Text fontWeight="$semibold">
            {`1 ${props?.fromItem?.symbol} = ${new BigNumber(
              props?.fromItem?.priceDisplayAmount
            )
              .dividedBy(props?.toItem?.priceDisplayAmount)
              .decimalPlaces(6)
              .toString()} ${props?.toItem?.symbol}`}
          </Text>
          <Text
            color="$textSecondary"
            attributes={{ marginLeft: "$9", marginRight: "$13" }}
          >
            {`~ $${props?.fromItem?.priceDisplayAmount}`}
          </Text>
          <IconButton
            disabled={props.disabled}
            intent={state.isExpanded ? "tertiary" : "text"}
            size="sm"
            icon="arrowDownS"
            onClick={(e) => state.toggleExpand()}
          />
        </Stack>
      </Stack>
      <div ref={priceRef} className={styles.priceContainer}>
        <Stack direction="vertical" attributes={{ paddingBottom: "$14" }}>
          <Stack
            attributes={{
              marginBottom: "$7",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text color="$textSecondary">Price Impact</Text>
            <Text color="$textSecondary" fontWeight="$bold">
              {props.priceImpact}
            </Text>
          </Stack>
          <Stack
            attributes={{
              marginBottom: "$10",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text color="$textSecondary">
              Swap Fee ({props?.swapFee?.percentage})
            </Text>
            <Text color="$textSecondary" fontWeight="$bold">
              {`~ ${props?.swapFee?.value}`}
            </Text>
          </Stack>
          <Stack
            attributes={{
              marginBottom: "$7",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text color="$textSecondary">Expected Output</Text>
            <Text color="$textSecondary" fontWeight="$bold">
              {`~ ${store.getState().formatNumber({ value: props.toAmount })} ${
                props?.toItem?.symbol
              }`}
            </Text>
          </Stack>
          <Stack
            attributes={{
              marginBottom: "$10",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text color="$textSecondary">Minimum received after slippage</Text>
            <Text color="$textSecondary" fontWeight="$bold">
              {`${props?.minimumReceived} ${props?.toItem?.symbol}`}
            </Text>
          </Stack>
          <Show when={props?.hasRoute}>
            <Text color="$textSecondary" attributes={{ py: "$10" }}>
              Route
            </Text>
            <Stack
              attributes={{
                height: "$12",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box marginRight="$6">
                <img
                  alt={props?.fromItem?.symbol}
                  className={styles.img}
                  src={props?.fromItem?.imgSrc}
                />
              </Box>
              <Box className={styles.routeDivider} />
              {/* Mapping routeDetail */}

              <For each={state.routesPath}>
                {(item: SwapPriceDetailRoute, index: number) => (
                  <Fragment key={item.poolId}>
                    <Box
                      width="$16"
                      height="$12"
                      marginLeft="$6"
                      marginRight="$5"
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
                      color="$textSecondary"
                      fontWeight="$bold"
                      attributes={{ marginRight: "$5" }}
                    >
                      {item?.swapFee}
                    </Text>
                    <Box className={styles.routeDivider} />
                  </Fragment>
                )}
              </For>

              <Box marginLeft="$6">
                <img
                  alt={props?.toItem?.symbol}
                  className={styles.img}
                  src={props?.toItem?.imgSrc}
                />
              </Box>
            </Stack>
          </Show>
        </Stack>
      </div>
    </Box>
  );
}
