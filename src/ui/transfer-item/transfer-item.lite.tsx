import {
  useStore,
  onMount,
  onUpdate,
  onUnMount,
  useRef,
  useDefaultProps,
  Show,
} from "@builder.io/mitosis";
import BigNumber from "bignumber.js";
import uniqueId from "lodash/uniqueId";
import Stack from "../stack";
import Text from "../text";
import Icon from "../icon";
import Button from "../button";
import TextField from "../text-field";

import { store } from "../../models/store";
import * as styles from "./transfer-item.css";
import { TransferItemProps, AvailableItem } from "./transfer-item.types";
import type { ThemeVariant } from "../../models/system.model";
import { getValueByAvailable } from "../../helpers";

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
    currentItem: AvailableItem;
    amountPrice: string;
    handleAmountInput: (Event) => void;
    handleHalf: () => void;
    handleMax: () => void;
  }>({
    theme: "light",
    swapAmount: "0",
    currentItem: null,
    amountPrice: "",
    handleAmountInput(e) {
      let value = getValueByAvailable(e.target.value, state.currentItem?.available);

      if (value === "") {
        state.amountPrice = "";
      } else {
        state.amountPrice = new BigNumber(state.currentItem?.priceDisplayAmount)
          .multipliedBy(value)
          .decimalPlaces(2)
          .toString();
      }
      state.swapAmount = value;
      props?.onChange?.(Object.assign(state.currentItem, { value: value }));
    },
    handleHalf() {
      let value = new BigNumber(state.currentItem.available)
        .dividedBy(2)
        .toString();
      state.handleAmountInput({ target: { value: value } });
    },
    handleMax() {
      let value = new BigNumber(state.currentItem.available).toString();
      state.handleAmountInput({ target: { value: value } });
    },
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    state.theme = store.getState().theme;
    state.currentItem = props.dropDownList[0];

    cleanupRef = store.subscribe((newState) => {
      state.theme = newState.theme;
    });
  });

  onUpdate(() => {
    if(state.currentItem) {
      state.handleAmountInput({ target: { value: state.swapAmount } });
    }
  }, [state.currentItem ])

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  return (
    <Stack
      space="$0"
      direction="vertical"
      className={styles.container}
      attributes={{
        backgroundColor: "$progressBg",
        borderRadius: "$lg",
        paddingTop: "$7",
        paddingLeft: "$9",
        paddingRight: "$5",
        paddingBottom: "$9",
      }}
    >
      <Stack
        space="$0"
        attributes={{
          marginBottom: "$7",
          minHeight: "$10",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text color="$textSecondary">{props.title}</Text>
        <Stack
          space="$0"
          attributes={{
            alignItems: "center",
          }}
        >
          <Show when={props.hasAvailable}>
            <Text color="$textSecondary" fontWeight="$semibold">
              Available
            </Text>
            <Text
              fontWeight="$semibold"
              attributes={{ marginLeft: "$4", marginRight: "$9" }}
            >
              {state.currentItem?.available}
            </Text>
          </Show>
          <Show when={props.halfBtn}>
            <Button
              className={styles.textBtn[state.theme]}
              size="xs"
              attributes={{ marginRight: "$5" }}
              onClick={() => state.handleHalf()}
            >
              Half
            </Button>
          </Show>
          <Show when={props.maxBtn}>
            <Button
              className={styles.textBtn[state.theme]}
              size="xs"
              onClick={() => state.handleMax()}
            >
              Max
            </Button>
          </Show>
        </Stack>
      </Stack>
      <Stack
        space="$0"
        attributes={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack
          space="$0"
          attributes={{
            alignItems: "center",
          }}
        >
          <Button className={styles.dropdowBtn} variant="unstyled">
            <img className={styles.img} src={state.currentItem?.imgSrc} />
            <Stack
              space="$0"
              direction="vertical"
              attributes={{ marginLeft: "$9", alignItems: "flex-start" }}
            >
              <Stack
                space="$0"
                attributes={{
                  alignItems: "center",
                }}
              >
                <Text
                  fontSize="$2xl"
                  fontWeight="$semibold"
                  attributes={{ marginRight: "$5" }}
                >
                  {state.currentItem?.symbol}
                </Text>
                <Icon name="arrowDownS" color="$textSecondary" />
              </Stack>
              <Text color="$textSecondary">{state.currentItem?.denom}</Text>
            </Stack>
          </Button>
        </Stack>
        <Stack direction="vertical" space="$0">
          <TextField
            id={uniqueId("transfer-item-")}
            type="number"
            value={state.swapAmount}
            onChange={(e) => state.handleAmountInput(e)}
            inputClassName={styles.transferInput}
          />
          <Show when={!!state.swapAmount && state.swapAmount !== "0"}>
            <Text
              color="$textSecondary"
              fontSize="$xs"
              textAlign="right"
              attributes={{ marginTop: "$4" }}
            >
              {`≈ $${store
                .getState()
                ?.formatNumber({ value: state.amountPrice })}`}
            </Text>
          </Show>
        </Stack>
      </Stack>
    </Stack>
  );
}
