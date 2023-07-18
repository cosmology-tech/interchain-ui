import { Show, useStore, onUpdate, useDefaultProps } from "@builder.io/mitosis";
import clsx from "clsx";
import Stack from "../stack";
import Text from "../text";
import Icon from "../icon";
import Box from "../box";
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
  }>({
    symbolValue: "",
    disabled: false,
    handleTokenInput(e) {
      state.symbolValue = e.target.value;
      props.onAmountChange(e.target.value);
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
        <Show when={!props.hasProgressBar}>
          <Text
            className={styles.inputTitle}
            color="textSecondary"
            weight="semibold"
            size="lg"
          >
            Select amount
          </Text>
        </Show>
        <Text color="textSecondary">Available&nbsp;</Text>
        <Text color="textSecondary" weight="semibold">
          {props.available}&nbsp;
        </Text>
        <Text color="textSecondary" weight="semibold">
          {props.symbol}
        </Text>
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
              direction="vertical"
              space="0"
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
            <Box
              className={styles.icon}
              attributes={{
                onClick: (e) => state.handleIconClick(e),
              }}
            >
              <Show when={props.progress === 0}>
                <Icon name="add" color="text" size="3xl" />
              </Show>
              <Show when={props.progress === 50}>
                <Icon name="subtract" color="text" size="3xl" />
              </Show>
            </Box>
          </Stack>
        </Stack>
      </Show>
      <Box className={styles.smSpace} />

      <Stack
        className={clsx(styles.inputBox, { [styles.disabled]: state.disabled })}
        space="0"
      >
        <Stack
          className={styles.imgBox}
          space="0"
          attributes={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img className={styles.img} src={props.imgSrc} />
        </Stack>
        <input
          value={props.amount}
          disabled={state.disabled}
          className={styles.token}
          onChange={(e) => state.handleTokenInput(e)}
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
