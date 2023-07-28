import {
  useStore,
  onMount,
  onUnMount,
  useRef,
  useDefaultProps,
  Show,
} from "@builder.io/mitosis";
import uniqueId from "lodash/uniqueId";
import Stack from "../stack";
import Text from "../text";
import Icon from "../icon";
import Button from "../button";
import TextField from "../text-field";

import { store } from "../../models/store";
import * as styles from "./transfer-item.css";
import { TransferItemProps } from "./transfer-item.types";
import type { ThemeVariant } from "../../models/system.model";

export default function TransferItem(props: TransferItemProps) {
  useDefaultProps({
    halfBtn: false,
    maxBtn: false,
    hasAvailable: false,
    title: "",
  });

  const state = useStore<{
    theme: ThemeVariant;
    swapAmount: string;
    handleAmountInput: (Event) => void;
  }>({
    theme: "light",
    swapAmount: "0",
    handleAmountInput(e) {
      state.swapAmount = e.target.value;
    },
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    state.theme = store.getState().theme;

    cleanupRef = store.subscribe((newState) => {
      state.theme = newState.theme;
    });
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  return (
    <Stack
      direction="vertical"
      className={styles.container}
      attributes={{
        backgroundColor: "progressBg",
        borderRadius: "lg",
        paddingTop: "7",
        paddingLeft: "9",
        paddingRight: "5",
        paddingBottom: "9",
      }}
    >
      <Stack
        attributes={{
          marginBottom: "7",
          minHeight: "10",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text color="textSecondary">{props.title}</Text>
        <Stack
          attributes={{
            alignItems: "center",
          }}
        >
          <Show when={props.hasAvailable}>
            <Text color="textSecondary" weight="semibold">
              Available
            </Text>
            <Text
              weight="semibold"
              attributes={{ marginLeft: "4", marginRight: "9" }}
            >
              {props.availableAmount}
            </Text>
          </Show>
          <Show when={props.halfBtn}>
            <Button
              className={styles.textBtn[state.theme]}
              size="xs"
              attributes={{ marginRight: "5" }}
            >
              Half
            </Button>
          </Show>
          <Show when={props.maxBtn}>
            <Button className={styles.textBtn[state.theme]} size="xs">
              Max
            </Button>
          </Show>
        </Stack>
      </Stack>
      <Stack
        attributes={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack
          attributes={{
            alignItems: "center",
          }}
        >
          <Button className={styles.dropdowBtn} variant="unstyled">
            <img className={styles.img} src={props.imgSrc} />
            <Stack
              direction="vertical"
              attributes={{ marginLeft: "9", alignItems: "flex-start" }}
            >
              <Stack
                attributes={{
                  alignItems: "center",
                }}
              >
                <Text
                  size="2xl"
                  weight="semibold"
                  attributes={{ marginRight: "5" }}
                >
                  {props.symbol}
                </Text>
                <Icon name="arrowDownS" color="textSecondary" />
              </Stack>
              <Text color="textSecondary">{props.denom}</Text>
            </Stack>
          </Button>
        </Stack>
        <Stack direction="vertical">
          <TextField
            id={uniqueId("transfer-item-")}
            type="number"
            value={state.swapAmount}
            onChange={(e) => state.handleAmountInput(e)}
            inputClassName={styles.transferInput}
          />
          <Text
            color="textSecondary"
            size="xs"
            align="right"
            attributes={{ marginTop: "2" }}
          >
            ~ $98.23
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
}
