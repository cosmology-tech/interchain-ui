import {
  Show,
  useStore,
  onMount,
  onUnMount,
  useMetadata,
  useRef,
} from "@builder.io/mitosis";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Icon from "../icon";
import TransferItem from "../transfer-item";
import * as styles from "./overview-transfer.css";
import { sprinkles } from "../../styles/sprinkles.css";
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
    <Stack className={styles.overviewTransfer} direction="column">
      <Text size="xl" weight="semibold" attributes={{ marginBottom: "10" }}>
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
        justify="center"
        align="center"
        attributes={{ marginTop: "11", marginBottom: "13" }}
      >
        <img
          className={styles.img}
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.png"
        />
        <Icon
          name="arrowRightLine"
          color="textSecondary"
          size="xl"
          className={sprinkles({ mx: "9" })}
        />
        <img
          className={styles.img}
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg"
        />
      </Stack>
      <Button intent="tertiary">
        <Stack align="center">
          <Text
            className={styles.btnText[state.theme]}
            size="lg"
            weight="semibold"
          >
            Transfer
          </Text>
          <Icon
            name="timeLine"
            size="xs"
            className={sprinkles({
              marginLeft: "8",
              marginRight: "4",
            })}
          />
          <Text className={styles.btnText[state.theme]} size="xs">
            ≈ 20 seconds
          </Text>
        </Stack>
      </Button>
      <Button variant="unstyled">Cancel</Button>
    </Stack>
  );
}
