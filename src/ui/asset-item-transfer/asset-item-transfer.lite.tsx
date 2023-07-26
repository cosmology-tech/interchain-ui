import { useStore, onMount, onUnMount, useRef } from "@builder.io/mitosis";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Icon from "../icon";
import Box from "../box";
import TokenInput from "../token-input";
import * as styles from "./asset-item-transfer.css";
import { store } from "../../models/store";
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
    <Box className={styles.container}>
      <Stack>
        <Text
          fontSize="$xl"
          fontWeight="$semibold"
          attributes={{
            marginRight: "$3",
          }}
        >
          {props.type}
        </Text>
        <Text fontSize="$xl" fontWeight="$semibold">
          ATOM
        </Text>
      </Stack>

      <Stack
        className={styles.onlySm}
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
          color="textSecondary"
          size="xl"
          attributes={{
            mx: "$9",
          }}
        />
        <img
          className={styles.img}
          src="https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg"
        />
      </Stack>
      <Stack
        className={styles.onlyLg}
        attributes={{
          marginTop: "13",
          marginBottom: "10",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack direction="vertical" className={styles.flex1}>
          <Text
            color="$textSecondary"
            fontWeight="$semibold"
            attributes={{
              marginBottom: "$6",
            }}
          >
            From Cosmos Hub
          </Text>
          <Stack
            attributes={{
              p: "$6",
              backgroundColor: "$cardBg",
              borderRadius: "$lg",
              alignItems: "center",
            }}
          >
            <img
              className={styles.smImg}
              src="https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.png"
            />
            <Text color="$textSecondary">atom1xy5y...m6wwz9a</Text>
          </Stack>
        </Stack>
        <Icon
          name="arrowRightLine"
          color="$textSecondary"
          size="$md"
          attributes={{
            mx: "$4",
            marginBottom: "$9",
          }}
        />
        <Stack direction="vertical" className={styles.flex1}>
          <Text
            color="$textSecondary"
            fontWeight="$semibold"
            attributes={{
              marginBottom: "$6",
            }}
          >
            From Cosmos Hub
          </Text>
          <Stack
            attributes={{
              p: "$6",
              backgroundColor: "$cardBg",
              borderRadius: "$lg",
              alignItems: "$center",
            }}
          >
            <img
              className={styles.smImg}
              src="https://raw.githubusercontent.com/cosmos/chain-registry/master/umee/images/umee.png"
            />
            <Text color="$textSecondary">atom1xy5y...m6wwz9a</Text>
          </Stack>
        </Stack>
      </Stack>
      <TokenInput
        hasProgressBar={false}
        progress={50}
        symbol="OMSO"
        denom="Osmosis"
        available={0.71263}
        amount={10}
        imgSrc="https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png"
      />

      <Stack
        space="$5"
        attributes={{
          marginTop: "$5",
          marginBottom: "$11",
          justifyContent: "flex-end",
        }}
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
        attributes={{
          p: "$6",
          marginBottom: "$9",
          borderRadius: "$md",
          backgroundColor: "$cardBg",
          alignItems: "center",
        }}
      >
        <Icon
          name="timeLine"
          size="md"
          attributes={{
            marginRight: "$7",
          }}
        />
        <Text>Estimated time:</Text>
        <Text fontWeight="$semibold"> 20 seconds</Text>
      </Stack>

      <Button intent="tertiary" attributes={{ width: "full" }}>
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

          <Stack
            className={styles.onlyLg}
            attributes={{
              alignItems: "center",
            }}
          >
            <Icon
              name="timeLine"
              size="$xs"
              attributes={{
                marginLeft: "$8",
                marginRight: "$4",
              }}
            />

            <Text fontSize="$xs" className={styles.btnText[state.theme]}>
              ≈ 20 seconds
            </Text>
          </Stack>
        </Stack>
      </Button>
      <Button variant="unstyled" attributes={{ width: "full" }}>
        Cancel
      </Button>
    </Box>
  );
}
