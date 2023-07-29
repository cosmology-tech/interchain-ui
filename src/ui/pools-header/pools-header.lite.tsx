import { useStore, onMount, onUnMount, useRef } from "@builder.io/mitosis";
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
        color="$textSecondary"
        fontWeight="$semibold"
        fontSize="$4xl"
      >
        :
      </Text>
    );
  }

  return (
    <Box>
      <Text
        color="$text"
        fontSize="$xl"
        fontWeight="$semibold"
        attributes={{ marginBottom: "$10" }}
      >
        Liquidity Pools
      </Text>
      <Stack className={styles.container} space="$10">
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
            <Box lineHeight="$shorter">
              <Text
                color="$textSecondary"
                fontWeight="$semibold"
                fontSize="$sm"
                className={styles.mb3}
              >
                OSMO Price
              </Text>
              <Stack
                space="$0"
                attributes={{
                  alignItems: "flex-end",
                }}
              >
                <Text
                  className={styles.dollar}
                  color="$text"
                  fontWeight="$semibold"
                  lineHeight="$shorter"
                >
                  $
                </Text>
                <Text color="$text" fontSize="$4xl" fontWeight="$semibold">
                  {store.getState()?.formatNumber?.({ value: props.price })}
                </Text>
              </Stack>
            </Box>
          </Stack>
        </Box>
        <Box className={styles.baseBox}>
          <Stack
            space="$0"
            direction="vertical"
            attributes={{
              justifyContent: "center",
            }}
          >
            <Text
              color="$textSecondary"
              fontWeight="$semibold"
              lineHeight="$normal"
              fontSize="$sm"
              className={styles.mb3}
            >
              Reward distribution in
            </Text>
            <Text
              color="$text"
              fontWeight="$semibold"
              fontSize="$4xl"
              lineHeight="$normal"
            >
              12
              <Text
                className={styles.semocolon}
                as="span"
                color="$textSecondary"
                fontWeight="$semibold"
                fontSize="$4xl"
              >
                :
              </Text>
              19
              <Text
                className={styles.semocolon}
                as="span"
                color="$textSecondary"
                fontWeight="$semibold"
                fontSize="$4xl"
              >
                :
              </Text>
              48
            </Text>
          </Stack>
        </Box>
        <Box className={styles.rewardBox}>
          <Stack
            direction="vertical"
            space="$0"
            attributes={{
              justifyContent: "center",
            }}
          >
            <Text
              color="$rewardContent"
              fontWeight="$semibold"
              lineHeight="$normal"
              fontSize="$sm"
              className={styles.mb3}
            >
              Yesterdays rewards
            </Text>
            <Stack
              space="$0"
              attributes={{
                alignItems: "flex-end",
              }}
            >
              <Text
                color="$rewardContent"
                fontSize="$4xl"
                fontWeight="$semibold"
              >
                {props.rewards}
              </Text>
              <Text
                className={styles.osom}
                color="$rewardContent"
                fontWeight="$semibold"
              >
                OSMO
              </Text>
              <Text
                color="$rewardContent"
                className={styles.mb3}
              >
                {props.$rewards}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
