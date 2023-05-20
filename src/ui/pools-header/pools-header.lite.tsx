import {
  For,
  Show,
  useStore,
  onUpdate,
  onMount,
  onUnMount,
  useRef,
} from "@builder.io/mitosis";
import Box from "../box";
import Stack from "../Stack";
import Text from "../Text";
import { store } from "../../models/store";
import * as styles from "./pools-header.css";
import { themeVars } from "../../styles/themes.css";

export default function PoolsHeader(props) {
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
      <Text className={styles.semocolon} as="span" color="tip" weight="semibold" size="4xl">
        :
      </Text>
    );
  }

  return (
    <Stack space="10" width="1" backgroundColor="primary">
      <Box p="10" className={styles.greyBox}>
        <Stack align="center">
          <img
            className={styles.image}
            src="https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/ion.svg"
          />
          <Stack direction="column" justify="center" lineHeight="shorter">
            <Text color="tip" weight="semibold">
              OSMO Price
            </Text>
            <Stack align="flex-end">
              <Text className={styles.dollar} color="content" weight="semibold" lineHeight="shorter">
                $
              </Text>
              <Text
                color="content"
                size="4xl"
                weight="semibold"
                lineHeight="short"
              >
                0.98
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <Box p="10" className={styles.greyBox}>
        <Stack direction="column" justify="center">
          <Text color="tip" weight="semibold">
            Reward distribution in
          </Text>
          <Text color="content" weight="semibold" size="4xl">
            12 <Semocolon /> 19 <Semocolon /> 48
          </Text>
        </Stack>
      </Box>
      <Box p="10" className={styles.greenBox}>
        <Stack direction="column" justify={"center"}>
          <Text>Yesterdays rewards</Text>
          <Stack align={"flex-end"}>
            <Text>12.87</Text>
            <Text>OSMO</Text>
            <Text>$12.87</Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
