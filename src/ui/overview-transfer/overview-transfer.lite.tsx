import { useStore, onMount, onUnMount, useRef } from "@builder.io/mitosis";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Icon from "../icon";
import TransferItem from "../transfer-item";
import * as styles from "./overview-transfer.css";
import { store } from "../../models/store";
import type { OverviewTransferProps } from "./overview-transfer.types";
import type { ThemeVariant } from "../../models/system.model";

export default function OverviewTransfer(props: OverviewTransferProps) {
  const state = useStore<{ theme: ThemeVariant }>({
    theme: "light",
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
    <Stack className={styles.overviewTransfer} direction="vertical">
      <Text
        fontSize="$xl"
        fontWeight="$semibold"
        attributes={{ marginBottom: "$10" }}
      >
        {props.type}
      </Text>
      <TransferItem
        maxBtn={true}
        availableAmount={713.32}
        symbol="UMEE"
        denom="Umee"
        imgSrc="https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.png"
      />
      <Stack
        attributes={{
          marginTop: "$11",
          marginBottom: "$13",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          className={styles.img}
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.png"
        />
        <Icon
          name="arrowRightLine"
          color="$textSecondary"
          size="$xl"
          attributes={{
            mx: "$9",
          }}
        />
        <img
          className={styles.img}
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg"
        />
      </Stack>
      <Button intent="tertiary">
        <Stack
          attributes={{
            alignItems: "center",
          }}
        >
          <Text
            className={styles.btnText[state.theme]}
            fontSize="$lg"
            fontWeight="$semibold"
          >
            Transfer
          </Text>
          <Icon
            name="timeLine"
            size="$xs"
            attributes={{
              marginLeft: "$8",
              marginRight: "$4",
            }}
          />
          <Text className={styles.btnText[state.theme]} fontSize="$xs">
            ≈ 20 seconds
          </Text>
        </Stack>
      </Button>
      <Button variant="unstyled">Cancel</Button>
    </Stack>
  );
}
