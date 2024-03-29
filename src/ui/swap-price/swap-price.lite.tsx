import {
  useRef,
  useStore,
  useDefaultProps,
  Show,
  For,
  Fragment,
  useMetadata,
} from "@builder.io/mitosis";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import anime from "animejs";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import IconButton from "../icon-button";
import { store } from "../../models/store";
import * as styles from "./swap-price.css";

import type { SwapPriceProps, SwapPriceDetailRoute } from "./swap-price.types";
import type { AnimeInstance } from "animejs";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<SwapPriceProps>>({
  title: "Price",
  priceImpactLabel: "Price Impact",
  swapFeeLabel: "Swap Fee",
  expectedOutputLabel: "Expected Output",
  minimumReceivedLabel: "Minimum received after slippage",
  routeLabel: "Route",
});

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
    <Box className={props.className}>
      {/* Desktop accordion */}
      <Stack
        className={styles.swapPriceContainer}
        attributes={{
          position: "relative",
          py: "$9",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          fontSize={{
            mobile: "$xs",
            tablet: "$sm",
          }}
          color="$text"
        >
          {props.title}
        </Text>

        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          paddingRight={{
            mobile: "$14",
            mdMobile: "$19",
          }}
          rowGap="$0"
          columnGap="$9"
        >
          <Text
            fontSize={{
              mobile: "$xs",
              tablet: "$sm",
            }}
            fontWeight="$semibold"
            attributes={{
              flexShrink: "0",
            }}
          >
            {`1 ${props?.fromItem?.symbol} = ${new BigNumber(
              props?.fromItem?.priceDisplayAmount
            )
              .dividedBy(props?.toItem?.priceDisplayAmount)
              .decimalPlaces(6)
              .toString()} ${props?.toItem?.symbol}`}
          </Text>

          <Text
            fontSize={{
              mobile: "$xs",
              tablet: "$sm",
            }}
            color="$textSecondary"
          >
            {`~ $${props?.fromItem?.priceDisplayAmount}`}
          </Text>
        </Box>

        <Box
          position={{
            mobile: "absolute",
          }}
          top={{
            mobile: "50%",
          }}
          right={{
            mobile: "$0",
          }}
          transform="translateY(-50%)"
        >
          <IconButton
            disabled={props.disabled}
            intent={state.isExpanded ? "tertiary" : "text"}
            size="sm"
            icon="arrowDownS"
            onClick={(e) => state.toggleExpand()}
          />
        </Box>
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
            <Text color="$textSecondary">{props.priceImpactLabel}</Text>
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
              {props.swapFeeLabel} ({props?.swapFee?.percentage})
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
            <Text color="$textSecondary">{props.expectedOutputLabel}</Text>
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
            <Text color="$textSecondary">{props.minimumReceivedLabel}</Text>
            <Text color="$textSecondary" fontWeight="$bold">
              {`${props?.minimumReceived ?? 0} ${props?.toItem?.symbol}`}
            </Text>
          </Stack>
          <Show when={props?.hasRoute}>
            <Text color="$textSecondary" attributes={{ py: "$10" }}>
              {props.routeLabel}
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
