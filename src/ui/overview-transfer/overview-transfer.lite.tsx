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
      <Stack
        direction="column"
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
          justify="flex-end"
          align="center"
          attributes={{ marginBottom: "7" }}
        >
          <Text color="textSecondary" weight="semibold">
            Available
          </Text>
          <Text
            weight="semibold"
            attributes={{ marginLeft: "4", marginRight: "9" }}
          >
            713.32
          </Text>
          <Button className={styles.textBtn[state.theme]} size="xs">
            Max
          </Button>
        </Stack>
        <Stack justify="space-between" align="center">
          <Stack align="center">
            <img
              className={styles.img}
              src="https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.png"
            />
            <Stack direction="column" attributes={{ marginLeft: "9" }}>
              <Stack align="center">
                <Text
                  size="2xl"
                  weight="semibold"
                  attributes={{ marginRight: "5" }}
                >
                  UMEE
                </Text>
                <Icon name="arrowDownS" color="textSecondary" />
              </Stack>
              <Text color="textSecondary">Umee</Text>
            </Stack>
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
