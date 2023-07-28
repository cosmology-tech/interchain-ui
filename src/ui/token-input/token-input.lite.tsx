import { Show, useStore, onUpdate, useDefaultProps } from "@builder.io/mitosis";
import clsx from "clsx";
import isNil from "lodash/isNil";
import uniqueId from "lodash/uniqueId"
import Stack from "../stack";
import Text from "../text";
import Box from "../box";
import IconButton from "../icon-button";
import CicularProgressBar from "../circular-progress-bar";
import TextField from "../text-field";
import * as styles from "./token-input.css";

import { TokenInputProps } from "./token-input.types";

export default function TokenInput(props: TokenInputProps) {
  useDefaultProps({
    hasProgressBar: true,
  });

  const state = useStore<{
    symbolValue: string;
    disabled: boolean;
    handleTokenInput: (Event) => void;
    handleIconClick: (MouseEvent) => void;
    amount: string;
  }>({
    symbolValue: "",
    disabled: false,
    amount: "",
    handleTokenInput(e) {
      state.symbolValue = e.target.value;
      state.amount = e.target.value;
      props.onAmountChange && props.onAmountChange(e.target.value);
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
  }, [props.progress]);

  return (
    <Stack
      attributes={{
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <Stack
        className={clsx({ [styles.disabled]: state.disabled })}
        space="0"
        attributes={{
          width: "full",
          paddingBottom: "7",
          justifyContent: "flex-end",
        }}
      >
        <Show when={!!props.title}>
          <Text
            className={styles.inputTitle}
            color="textSecondary"
            weight="semibold"
            size="lg"
          >
            {props.title}
          </Text>
        </Show>
        <Show when={!isNil(props.available)}>
          <Text color="textSecondary">Available</Text>
          <Text
            color="textSecondary"
            weight="semibold"
            attributes={{ mx: "3" }}
          >
            {props.available}
          </Text>
          <Text color="textSecondary" weight="semibold">
            {props.symbol}
          </Text>
        </Show>
      </Stack>
      <Show when={props.hasProgressBar}>
        <Stack
          className={styles.progressContainer}
          space="0"
          attributes={{
            alignItems: "center",
          }}
        >
          <CicularProgressBar progress={props.progress} />
          <Stack
            className={styles.iconBox}
            space="0"
            attributes={{
              alignItems: "center",
            }}
          >
            <Stack
              className={styles.symbolBox}
              direction="vertical"
              attributes={{
                justifyContent: "center",
                width: "20",
                px: "7",
              }}
            >
              <Text weight="semibold">{props.symbol}</Text>
              <Text color="textSecondary" size="xs">
                {props.denom}
              </Text>
            </Stack>
            <Show when={props.progress !== 100}>
              <IconButton
                intent="text"
                icon={props.progress === 0 ? "add" : "subtract"}
                onClick={(e) => state.handleIconClick(e)}
                className={styles.operationIcon}
              />
            </Show>
          </Stack>
        </Stack>
      </Show>

      <Stack
        className={clsx(styles.inputBox, { [styles.disabled]: state.disabled })}
        space="0"
      >
        <Stack
          className={styles.imgBox}
          attributes={{ justifyContent: "center", alignItems: "center" }}
        >
          <Box
            as="img"
            width="14"
            height="14"
            borderRadius="full"
            attributes={{ src: props?.imgSrc }}
          />
        </Stack>
        <TextField
          id={uniqueId("token-input-")}
          value={state.amount}
          disabled={state.disabled}
          onChange={(e) => state.handleTokenInput(e)}
          className={styles.token}
          inputContainer={styles.inputContainer}
          inputClassName={styles.inputClassName}
        />
        <Stack
          className={styles.caulator}
          space="0"
          attributes={{
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Text weight="semibold">{props.symbol} &nbsp;</Text>
          <Text color="textSecondary">≈ ${state.symbolValue}</Text>
        </Stack>
      </Stack>
    </Stack>
  );
}
