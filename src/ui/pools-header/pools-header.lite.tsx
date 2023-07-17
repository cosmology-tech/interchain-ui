import { useStore, onMount, onUnMount, useRef } from "@builder.io/mitosis";
import { sprinkles as s } from "../../styles/sprinkles.css";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import { store } from "../../models/store";
import * as styles from "./pools-header.css";
import type { PoolsHeaderProps } from "./pools-header.types";
import type { ThemeVariant } from "../../models/system.model";

export default function PoolsHeader(props: PoolsHeaderProps) {
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

  function Semocolon() {
    return (
      <Text
        className={styles.semocolon}
        as="span"
        color="textSecondary"
        weight="semibold"
        size="4xl"
      >
        :
      </Text>
    );
  }

  return (
    <Box>
      <Text color="text" size="xl" weight="semibold">
        Liquidity Pools
      </Text>
      <Stack className={styles.container} space="10">
        <Box className={styles.baseBox}>
          <Stack
            attributes={{
              overflow: "hidden",
              alignItems: "center",
            }}
          >
            <img
              className={styles.image}
              src="https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.svg"
            />
            <Stack
              direction="vertical"
              attributes={{
                justifyContent: "center",
                lineHeight: "shorter",
              }}
            >
              <Text
                color="textSecondary"
                weight="semibold"
                className={styles.mb3}
              >
                OSMO Price
              </Text>
              <Stack
                attributes={{
                  alignItems: "flex-end",
                }}
              >
                <Text
                  className={styles.dollar}
                  color="text"
                  weight="semibold"
                  lineHeight="shorter"
                >
                  $
                </Text>
                <Text color="text" size="4xl" weight="semibold">
                  {store.getState()?.formatNumber?.({ value: props.price })}
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
        <Box className={styles.baseBox}>
          <Stack
            direction="vertical"
            attributes={{
              justifyContent: "center",
            }}
          >
            <Text
              color="textSecondary"
              weight="semibold"
              className={styles.mb3}
            >
              Reward distribution in
            </Text>
            <Text color="text" weight="semibold" size="4xl">
              12 <Semocolon /> 19 <Semocolon /> 48
            </Text>
          </Stack>
        </Box>
        <Box className={styles.rewardBox}>
          <Stack
            direction="vertical"
            attributes={{
              justifyContent: "center",
            }}
          >
            <Text
              className={styles.mb3}
              color="rewardContent"
              weight="semibold"
            >
              Yesterdays rewards
            </Text>
            <Stack
              attributes={{
                alignItems: "flex-end",
              }}
            >
              <Text color="rewardContent" size="4xl" weight="semibold">
                {props.rewards}
              </Text>
              <Text
                className={styles.osom}
                color="rewardContent"
                weight="semibold"
              >
                OSMO
              </Text>
              <Text className={styles.mb3} color="rewardContent">
                {props.$rewards}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
