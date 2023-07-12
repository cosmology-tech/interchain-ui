import {
  Show,
  useStore,
  onMount,
  onUpdate,
  useDefaultProps,
  useRef,
} from "@builder.io/mitosis";
import clsx from "clsx";
import isNil from "lodash/isNil";
import Stack from "../stack";
import Text from "../text";
import Icon from "../icon";
import Box from "../box";
import IconButton from "../icon-button";
import { sprinkles } from "../../styles/sprinkles.css";
import CicularProgressBar from "../circular-progress-bar";
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
  onMount(() => {});
  onUpdate(() => {
    if (props.progress === 0) {
      state.disabled = true;
    } else {
      state.disabled = false;
    }
  }, [props.progress]);
  return (
    <Stack flexWrap="wrap" align="center">
      <Stack
        className={clsx({ [styles.disabled]: state.disabled })}
        attributes={{
          width: "full",
          marginBottom: "7",
        }}
        justify="flex-end"
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
        <Stack align="center" className={styles.progressContainer}>
          <CicularProgressBar progress={props.progress} />
          <Stack className={styles.iconBox} align="center">
            <Stack
              className={styles.symbolBox}
              direction="column"
              justify="center"
              attributes={{
                marginLeft: "8",
                width: "17",
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
      >
        <Stack className={styles.imgBox} justify="center" align="center">
          <img className={styles.img} src={props.imgSrc} />
        </Stack>
        <Box
          className={styles.token}
          as="input"
          paddingLeft="9"
          fontSize="lg"
          attributes={{
            value: state.amount,
            disabled: state.disabled,
            onChange: (e) => state.handleTokenInput(e),
          }}
        />
        <Stack className={styles.caulator} justify="flex-end" align="center">
          <Text weight="semibold">{props.symbol} &nbsp;</Text>
          <Text color="textSecondary">≈ ${state.symbolValue}</Text>
        </Stack>
      </Stack>
    </Stack>
  );
}
