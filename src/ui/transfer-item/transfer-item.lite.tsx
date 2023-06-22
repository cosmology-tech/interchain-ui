import { useDefaultProps, Show } from "@builder.io/mitosis";
import Stack from "../stack";
import Text from "../text";
import Icon from "../icon";
import Button from "../button";

import * as styles from "./transfer-item.css";
import { TransferItemProps } from "./transfer-item.types";

export default function TransferItem(props: TransferItemProps) {
  useDefaultProps({
    halfBtn: false,
    maxBtn: false,
    title: "",
  });
  return (
    <Stack
      direction="column"
      className={styles.container}
      attributes={{
        backgroundColor: "progressBg",
        borderRadius: "lg",
        paddingTop: "7",
        paddingLeft: "9",
        paddingRight: "5",
        paddingBottom: "8",
      }}
    >
      <Stack
        justify="space-between"
        align="center"
        attributes={{ marginBottom: "5" }}
      >
        <Text color="textSecondary">{props.title}</Text>
        <Stack align="center">
          <Text color="textSecondary" weight="semibold">
            Available
          </Text>
          <Text
            weight="semibold"
            attributes={{ marginLeft: "4", marginRight: "9" }}
          >
            {props.availableAmount}
          </Text>
          <Show when={props.halfBtn}>
            <Button
              className={styles.textBtn}
              size="xs"
              attributes={{ marginRight: "5" }}
            >
              Half
            </Button>
          </Show>
          <Show when={props.maxBtn}>
            <Button className={styles.textBtn} size="xs">
              Max
            </Button>
          </Show>
        </Stack>
      </Stack>
      <Stack justify="space-between" align="center">
        <Stack align="center">
          <Button className={styles.dropdowBtn} variant="unstyled">
            <img className={styles.img} src={props.imgSrc} />
            <Stack
              direction="column"
              align="flex-start"
              attributes={{ marginLeft: "9" }}
            >
              <Stack align="center">
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
        <Stack direction="column">
          <input />
          <Text
            color="textSecondary"
            size="xs"
            align="right"
            attributes={{ marginTop: "1" }}
          >
            ~ $98.23
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
}
