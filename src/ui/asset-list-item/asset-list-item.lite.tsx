import { Show, useDefaultProps, useStore, onUpdate } from "@builder.io/mitosis";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import * as styles from "./asset-list-item.css";
import type { AssetListItemProps } from "./asset-list-item.types";
import type { BoxProps } from "../box/box.types";

export default function AssetListItem(props: AssetListItemProps) {
  useDefaultProps({
    isOtherChains: false,
    needChainSpace: false,
  });

  const state = useStore<{
    size: BoxProps["fontSize"];
  }>({
    size: "$xs",
  });

  onUpdate(() => {
    state.size = props.isOtherChains ? "$xs" : "$sm";
  }, [props.isOtherChains]);

  return (
    <Stack
      attributes={{
        minWidth: "720px",
        alignItems: "center",
      }}
    >
      <Box width="$19">
        <img
          src={props.imgSrc}
          className={props.isOtherChains ? styles.smImg : styles.lgImg}
        />
      </Box>
      <Stack attributes={{ alignItems: "center", flex: 1 }}>
        <Stack
          space="$0"
          direction="vertical"
          className={styles.fieldContainer}
        >
          <Text
            fontSize={state.size}
            fontWeight="$semibold"
            attributes={{ marginBottom: "$2" }}
          >
            {props.symbol}
          </Text>
          <Text fontSize={state.size} color="$textSecondary">
            {props.denom}
          </Text>
        </Stack>
        <Show when={props.needChainSpace}>
          <Stack className={styles.fieldContainer}>
            <Show when={props.isOtherChains}>
              <Text fontSize={state.size} color="$textSecondary">
                {props.chainName}
              </Text>
            </Show>
          </Stack>
        </Show>
        <Stack
          space="$0"
          className={styles.fieldContainer}
          direction="vertical"
        >
          <Text
            fontSize={state.size}
            fontWeight="$semibold"
            attributes={{ marginBottom: "$2" }}
          >
            {props.tokenAmount}
          </Text>
          <Text fontSize={state.size} color="$textSecondary">
            ${props.tokenAmountPrice}
          </Text>
        </Stack>
        <Show when={!props.needChainSpace}>
          <Stack className={styles.fieldContainer}></Stack>
        </Show>
        <Stack
          space="$5"
          className={styles.fieldContainer}
          attributes={{
            justifyContent: "flex-end",
          }}
        >
          <Show when={!!props.onDeposit}>
            <Button
              intent="text"
              size="sm"
              onClick={() => props.onDeposit()}
            >
              Deposit
            </Button>
          </Show>
          <Show when={!!props.onWithdraw}>
            <Button
              intent="text"
              size="sm"
              onClick={() => props.onWithdraw()}
            >
              Withdraw
            </Button>
          </Show>
        </Stack>
      </Stack>
    </Stack>
  );
}
