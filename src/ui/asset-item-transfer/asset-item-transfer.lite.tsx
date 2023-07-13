import { useStore, onMount, onUnMount, useRef } from "@builder.io/mitosis";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Icon from "../icon";
import TokenInput from "../token-input";
import * as styles from "./asset-item-transfer.css";
import { store } from "../../models/store";
import { sprinkles } from "../../styles/sprinkles.css";
import { AssetItemTransferProps } from "./asset-item-transfer.types";

export default function AssetItemTransfer(props: AssetItemTransferProps) {
  const state = useStore({
    theme: "",
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
    <Stack direction="column" className={styles.container}>
      <Stack>
        <Text size="xl" weight="semibold" attributes={{ marginRight: "3" }}>
          {props.type}
        </Text>
        <Text size="xl" weight="semibold">
          ATOM
        </Text>
      </Stack>

      <Stack
        className={styles.onlySm}
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
      <Stack
        justify="center"
        align="flex-end"
        className={styles.onlyLg}
        attributes={{ marginTop: "13", marginBottom: "10" }}
      >
        <Stack direction="column" className={styles.flex1}>
          <Text
            color="textSecondary"
            weight="semibold"
            attributes={{ marginBottom: "6" }}
          >
            From Cosmos Hub
          </Text>
          <Stack
            align="center"
            attributes={{
              p: "6",
              backgroundColor: "cardBg",
              borderRadius: "lg",
            }}
          >
            <img
              className={styles.smImg}
              src="https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.png"
            />
            <Text color="textSecondary">atom1xy5y...m6wwz9a</Text>
          </Stack>
        </Stack>
        <Icon
          name="arrowRightLine"
          color="textSecondary"
          size="md"
          className={sprinkles({
            mx: "4",
            marginBottom: "9",
          })}
        />
        <Stack direction="column" className={styles.flex1}>
          <Text
            color="textSecondary"
            weight="semibold"
            attributes={{ marginBottom: "6" }}
          >
            From Cosmos Hub
          </Text>
          <Stack
            align="center"
            attributes={{
              p: "6",
              backgroundColor: "cardBg",
              borderRadius: "lg",
            }}
          >
            <img
              className={styles.smImg}
              src="https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.png"
            />
            <Text color="textSecondary">atom1xy5y...m6wwz9a</Text>
          </Stack>
        </Stack>
      </Stack>
      <TokenInput
        title="Select amount"
        hasProgressBar={false}
        progress={50}
        symbol="OMSO"
        denom="Osmosis"
        available={0.71263}
        imgSrc="https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png"
      />

      <Stack
        justify="flex-end"
        space="5"
        attributes={{ marginTop: "5", marginBottom: "11" }}
      >
        <Button intent="text" size="xs">
          Max
        </Button>
        <Button intent="text" size="xs">
          1/2
        </Button>
        <Button intent="text" size="xs">
          1/3
        </Button>
      </Stack>
      <Stack
        className={styles.onlyLg}
        align="center"
        attributes={{
          p: "6",
          borderRadius: "md",
          backgroundColor: "cardBg",
          marginBottom: "9",
        }}
      >
        <Icon
          name="timeLine"
          size="md"
          className={sprinkles({
            marginRight: "7",
          })}
        />
        <Text>Estimated time:</Text>
        <Text weight="semibold"> 20 seconds</Text>
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

          <Stack className={styles.onlyLg} align="center">
            <Icon
              name="timeLine"
              size="xs"
              className={sprinkles({
                marginLeft: "8",
                marginRight: "4",
              })}
            />

            <Text size="xs" className={styles.btnText[state.theme]}>
              ≈ 20 seconds
            </Text>
          </Stack>
        </Stack>
      </Button>
      <Button variant="unstyled">Cancel</Button>
    </Stack>
  );
}
