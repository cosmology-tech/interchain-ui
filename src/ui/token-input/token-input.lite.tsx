import {
  Show,
  useStore,
  onUpdate,
  useDefaultProps,
  useRef,
  useMetadata,
} from "@builder.io/mitosis";
import BigNumber from "bignumber.js";
import clsx from "clsx";
import isNil from "lodash/isNil";
import uniqueId from "lodash/uniqueId";
import Stack from "../stack";
import Text from "../text";
import Box from "../box";
import Icon from "../icon";
import { ALL_ICON_NAMES } from "../icon/icon.types";
import IconButton from "../icon-button";
import CicularProgressBar from "../circular-progress-bar";
import { toNumber } from "../../helpers/number";
import * as styles from "./token-input.css";

import type { TokenInputProps } from "./token-input.types";
import type { IconName } from "../icon/icon.types";
import { store } from "../../models/store";

useMetadata({
  isAttachedToShadowDom: true,
  scaffolds: ["number-input"],
});

export default function TokenInput(props: TokenInputProps) {
  useDefaultProps({
    hasProgressBar: true,
    availableAsMax: false,
  });
  const inputIdRef = useRef(uniqueId("token-input-"));

  const state = useStore<{
    symbolValue: string;
    disabled: boolean;
    handleTokenInput: (string) => void;
    handleIconClick: (MouseEvent) => void;
  }>({
    get symbolValue() {
      return new BigNumber(props.amount || 0)
        .multipliedBy(props.priceDisplayAmount)
        .decimalPlaces(2)
        .toString();
    },
    disabled: false,
    handleTokenInput(value: string) {
      props.onAmountChange && props.onAmountChange(value);
    },
    handleIconClick(e) {
      let newProgress: number = 0;
      if (props.progress === 50) {
        newProgress = 0;
      } else {
        newProgress = 50;
      }
      props.onProgressChange(newProgress);
    },
  });

  onUpdate(() => {
    if (props.progress === 0) {
      state.disabled = true;
    } else {
      state.disabled = false;
    }
  }, [props.progress, props.amount]);

  return (
    <Stack
      space="$0"
      attributes={{
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <Stack
        className={clsx({ [styles.disabled]: state.disabled })}
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
            className={styles.inputTitle}
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
              className={styles.symbolBox}
              direction="vertical"
              attributes={{
                justifyContent: "center",
                width: "$20",
                px: "$7",
              }}
            >
              <Text fontWeight="$semibold">{props.symbol}</Text>
              <Text color="$textSecondary" fontSize="$xs">
                {props.denom}
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
                onClick={(e) => state.handleIconClick(e)}
                className={styles.operationIcon}
              />
            </div>
          </Stack>
        </Stack>
      </Show>

      <Stack
        className={clsx(styles.inputBox, { [styles.disabled]: state.disabled })}
        space="$0"
      >
        <Box width="$full">
          {/* @ts-expect-error */}
          <NumberInput
            id={inputIdRef}
            min={0}
            max={props.availableAsMax ? toNumber(props.available) : 0}
            value={props.amount}
            borderless
            disabled={state.disabled}
            startAddon={
              <Stack
                className={styles.imgBox}
                attributes={{ justifyContent: "center", alignItems: "center" }}
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
            onChange={(e) => state.handleTokenInput(e.value)}
            onFocus={() => props?.onFocus?.()}
            className={styles.token}
            inputContainer={styles.inputContainer}
            inputClassName={styles.inputClassName}
          />
        </Box>
        <Stack
          className={styles.caulator}
          space="$0"
          attributes={{
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Text fontWeight="$semibold">{props.symbol} &nbsp;</Text>
          <Show when={!!props.amount && !new BigNumber(props.amount).eq(0)}>
            <Text color="$textSecondary" attributes={{ ml: "$2" }}>
              ≈ ${store.getState().formatNumber({ value: state.symbolValue })}
            </Text>
          </Show>
        </Stack>
      </Stack>
    </Stack>
  );
}
