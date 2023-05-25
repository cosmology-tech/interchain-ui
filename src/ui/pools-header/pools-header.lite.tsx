import {
  For,
  Show,
  useStore,
  onUpdate,
  onMount,
  onUnMount,
  useRef,
} from "@builder.io/mitosis";
import { sprinkles as s } from "../../styles/sprinkles.css";
import Box from "../box";
import Stack from "../Stack";
import Text from "../Text";
import { store } from "../../models/store";
import * as styles from "./pools-header.css";
import { themeVars } from "../../styles/themes.css";
import { PoolsHeaderProps } from "./pools-header.types";

export default function PoolsHeader(props: PoolsHeaderProps) {
  const state = useStore({
    theme: "",
  });

  let cleanupRef = useRef<() => void>(null);

  onMount(() => {
    state.theme = store.getState().theme;

    cleanupRef = store.subscribe((newState, prevState) => {
      state.theme = newState.theme;
    });
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });
  // image
  // "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png",
  //         "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg",
  //         "theme": {
  //           "primary_color_hex": "#5c09a0"
  //         }

  // "png": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.png",
  //         "svg": "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.svg",
  function Semocolon() {
    return (
      <Text
        className={styles.semocolon}
        as="span"
        color="tip"
        weight="semibold"
        size="4xl"
      >
        :
      </Text>
    );
  }

  return (
    <Box>
      <Text color="content" size="xl" weight="semibold">
        Liquidity Pools
      </Text>
      <Stack className={styles.container} space="10">
        <Box className={styles.baseBox}>
          <Stack className={s({ overflow: "hidden" })} align="center">
            <img
              className={styles.image}
              src="https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.svg"
            />
            <Stack
              className={styles.flex1}
              direction="column"
              justify="center"
              lineHeight="shorter"
            >
              <Text color="tip" weight="semibold" className={styles.mb3}>
                OSMO Price
              </Text>
              <Stack align="flex-end">
                <Text
                  className={styles.dollar}
                  color="content"
                  weight="semibold"
                  lineHeight="shorter"
                >
                  $
                </Text>
                <Text
                  flex={1}
                  color="content"
                  size="4xl"
                  weight="semibold"
                  wordBreak="break-word"
                >
                  {props.price}
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
        <Box className={styles.baseBox}>
          <Stack direction="column" justify="center">
            <Text color="tip" weight="semibold" className={styles.mb3}>
              Reward distribution in
            </Text>
            <Text color="content" weight="semibold" size="4xl"
                  wordBreak="break-word">
              12 <Semocolon /> 19 <Semocolon /> 48
            </Text>
          </Stack>
        </Box>
        <Box className={styles.rewardBox}>
          <Stack direction="column" justify={"center"}>
            <Text
              className={styles.mb3}
              color="rewardContent"
              weight="semibold"
            >
              Yesterdays rewards
            </Text>
            <Stack align={"flex-end"}>
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
