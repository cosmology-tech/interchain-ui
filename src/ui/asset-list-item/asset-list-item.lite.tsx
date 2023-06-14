import {
  For,
  Show,
  useDefaultProps,
  useStore,
  onMount,
} from "@builder.io/mitosis";
import clsx from "clsx";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import { sprinkles } from "../../styles/sprinkles.css";
import * as styles from "./asset-list-item.css";
import { AssetListItemProps } from "./asset-list-item.types";
import { BoxProps } from "../box/box.types";

export default function AssetListItem(props: AssetListItemProps) {
  useDefaultProps({
    isOtherChains: false,
    needChainSpace: false,
  });
  const state = useStore<{
    size: BoxProps["fontSize"];
  }>({
    size: "xs",
  });
  onMount(() => {
    state.size = props.isOtherChains ? "xs" : "sm";
  });
  return (
    <Stack align="center">
      <Box className={styles.imageContainer}>
        <img
          src={props.imgSrc}
          className={props.isOtherChains ? styles.smImg : styles.lgImg}
        />
      </Box>
      <Stack className={sprinkles({ flex: 1 })} align="center">
        <Stack className={styles.fieldContainer} direction="column">
          <Text
            size={state.size}
            weight="semibold"
            attributes={{ marginBottom: "2" }}
          >
            {props.symbol}
          </Text>
          <Text size={state.size} color="textSecondary">
            {props.denom}
          </Text>
        </Stack>
        <Show when={props.needChainSpace}>
          <Stack className={styles.fieldContainer}>
            <Show when={props.isOtherChains}>
              <Text size={state.size} color="textSecondary">
                {props.chainName}
              </Text>
            </Show>
          </Stack>
        </Show>
        <Stack className={styles.fieldContainer} direction="column">
          <Text
            size={state.size}
            weight="semibold"
            attributes={{ marginBottom: "2" }}
          >
            {props.amount}
          </Text>
          <Text size={state.size} color="textSecondary">
            ${props.dollarAmount}
          </Text>
        </Stack>
        <Show when={!props.needChainSpace}>
          <Stack className={styles.fieldContainer}></Stack>
        </Show>
        <Stack space="5" className={styles.fieldContainer} justify="flex-end">
          <Show when={props.canDeposit}>
            <Button
              intent="text"
              size="sm"
              onClick={() => console.log("deposit")}
            >
              Deposit
            </Button>
          </Show>
          <Show when={props.canWithdraw}>
            <Button
              intent="text"
              size="sm"
              onClick={() => console.log("withdraw")}
            >
              Withdraw
            </Button>
          </Show>
        </Stack>
      </Stack>
    </Stack>
  );
}
