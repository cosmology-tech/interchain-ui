import {
  Show,
  useStore,
  useDefaultProps,
  useRef,
  useMetadata,
} from "@builder.io/mitosis";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import { uniqueId, isNil } from "lodash";
import Stack from "../stack";
import Text from "../text";
import Box from "../box";
import Icon from "../icon";
import { ALL_ICON_NAMES } from "../icon/icon.types";
import IconButton from "../icon-button";
import CicularProgressBar from "../circular-progress-bar";
import * as styles from "./token-input.css";

import type { TokenInputProps } from "./token-input.types";
import type { IconName } from "../icon/icon.types";
import { store } from "../../models/store";

useMetadata({
  isAttachedToShadowDom: true,
  scaffolds: ["number-field"],
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<TokenInputProps>>({
  hasProgressBar: true,
});

export default function TokenInput(props: TokenInputProps) {
  const inputIdRef = useRef(uniqueId("token-input-"));

  const state = useStore<{
    notionalValue: string;
    isDisabled: boolean;
    handleTokenInput: (value: number) => void;
    handleIconClick: () => void;
  }>({
    get notionalValue() {
      if (props.notionalValue) {
        return props.notionalValue;
      }

      const defaultFormat = (tokenAmount: number, pricePerToken: number) => {
        return new BigNumber(tokenAmount ?? 0)
          .multipliedBy(pricePerToken)
          .decimalPlaces(4)
          .toString();
      };

      const formatter =
        typeof props.formatNotionalValue === "function"
          ? props.formatNotionalValue
          : defaultFormat;

      return formatter(props.amount, props.priceDisplayAmount);
    },
    get isDisabled() {
      return props.progress === 0;
    },
    handleTokenInput(value: number) {
      props.onAmountChange?.(value);
    },
    handleIconClick() {
      let newProgress: number = 0;
      if (props.progress === 50) {
        newProgress = 0;
      } else {
        newProgress = 50;
      }
      props.onProgressChange(newProgress);
    },
  });

  return (
    <Stack
      space="$0"
      attributes={{
        flexWrap: "wrap",
        alignItems: "center",
        ...props.attributes,
      }}
    >
      <Stack
        className={clsx({ [styles.disabled]: state.isDisabled })}
        space="$0"
        attributes={{
          width: "$full",
          paddingBottom: "$7",
          justifyContent: "flex-end",
        }}
      >
        <Show when={!!props.title}>
          <Box
            as="label"
            flex="1"
            color="$textSecondary"
            fontWeight="$semibold"
            fontSize="$lg"
            fontFamily="$body"
            attributes={{
              htmlFor: inputIdRef,
            }}
          >
            {props.title}
          </Box>
        </Show>

        <Show when={!isNil(props.available)}>
          <Stack space="$3" attributes={{ alignItems: "center" }}>
            <Text color="$textSecondary">Available</Text>
            <Text color="$textSecondary" fontWeight="$semibold">
              {props.available}
            </Text>
            <Text color="$textSecondary" fontWeight="$semibold">
              {props.symbol}
            </Text>
          </Stack>
        </Show>
      </Stack>

      <Show when={props.hasProgressBar}>
        <Stack
          className={styles.progressContainer}
          space="$0"
          attributes={{
            alignItems: "center",
          }}
        >
          <CicularProgressBar progress={props.progress} />
          <Stack
            className={styles.iconBox}
            space="$0"
            attributes={{
              alignItems: "center",
            }}
          >
            <Stack
              direction="vertical"
              attributes={{
                flex: 1,
                justifyContent: "center",
                width: "$20",
                px: "$7",
              }}
            >
              <Text fontWeight="$semibold">{props.symbol}</Text>
              <Text color="$textSecondary" fontSize="$xs">
                {props.name}
              </Text>
            </Stack>
            <div
              style={{
                visibility: props.progress !== 100 ? "visible" : "hidden",
              }}
            >
              <IconButton
                intent="text"
                icon={props.progress === 0 ? "add" : "subtract"}
                onClick={() => state.handleIconClick()}
                attributes={{
                  fontSize: "$3xl",
                }}
              />
            </div>
          </Stack>
        </Stack>
      </Show>

      <Stack
        className={clsx(styles.inputBox, {
          [styles.disabled]: state.isDisabled,
        })}
        space="$0"
      >
        <Box width="$full">
          {/* @ts-expect-error */}
          <ScaffoldNumberField
            id={inputIdRef}
            size="lg"
            minValue={props.minValue}
            maxValue={props.maxValue}
            value={props.amount}
            borderless
            isDisabled={state.isDisabled}
            decrementButton={
              <Stack
                className={clsx(styles.imgBox, props.imgClass)}
                attributes={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexShrink: "0",
                  height: "$17",
                  width: "$18",
                  borderColor: "$inputBorder",
                }}
              >
                {props.tokenIcon &&
                ALL_ICON_NAMES.includes(props.tokenIcon as IconName) ? (
                  <Icon
                    name={props.tokenIcon as IconName}
                    size="$9xl"
                    attributes={{
                      borderRadius: "$full",
                      backgroundColor:
                        props.tokenIcon === "stargazePixel"
                          ? "$black"
                          : "transparent",
                    }}
                  />
                ) : typeof props.tokenIcon === "string" ? (
                  <Box
                    as="img"
                    width="$14"
                    height="$14"
                    borderRadius="$full"
                    attributes={{
                      src: props.tokenIcon,
                    }}
                  />
                ) : null}
              </Stack>
            }
            onChange={(value: number) => {
              state.handleTokenInput(value);
            }}
            onFocus={(e?: any) => props?.onFocus?.(e)}
            className={styles.token}
            inputContainer={styles.inputContainer}
            inputClassName={clsx(styles.inputClassName, props.inputClass)}
          />
        </Box>

        <Stack
          space="$0"
          attributes={{
            justifyContent: "flex-end",
            alignItems: "center",
            position: "absolute",
            height: "100%",
            right: "$9",
          }}
        >
          <Text fontWeight="$semibold">{props.symbol} &nbsp;</Text>

          <Show when={!!props.amount && !new BigNumber(props.amount).eq(0)}>
            <Show when={!props.notionalValue && !props.formatNotionalValue}>
              <Text color="$textSecondary" attributes={{ ml: "$2" }}>
                ≈ $
                {store.getState().formatNumber({ value: state.notionalValue })}
              </Text>
            </Show>

            <Show when={props.notionalValue || props.formatNotionalValue}>
              {store.getState().formatNumber({ value: state.notionalValue })}
            </Show>
          </Show>
        </Stack>
      </Stack>
    </Stack>
  );
}
