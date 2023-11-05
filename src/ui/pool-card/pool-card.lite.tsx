import {
  useStore,
  onMount,
  onUnMount,
  useRef,
  Show,
  useMetadata,
} from "@builder.io/mitosis";
import clsx from "clsx";
import BigNumber from "bignumber.js";
import { store } from "../../models/store";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import PoolName from "../pool/components/pool-name";
import * as styles from "./pool-card.css";
import type { PoolCardProps } from "./pool-card.types";
import type { ThemeVariant } from "../../models/system.model";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function PoolCard(props: PoolCardProps) {
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
    <Box
      className={clsx(styles.container, {
        [styles.hoverStyle]: !!props.onClick,
      })}
      attributes={{
        onClick: () => props?.onClick?.(),
      }}
    >
      <Box marginBottom="$13">
        <PoolName id={props.id} coins={props.poolAssets} />
      </Box>
      <Stack
        space="$0"
        attributes={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "$4",
        }}
      >
        <Text color="$text">APR</Text>
        <Text
          color="$text"
          fontSize="$2xl"
          fontWeight="$semibold"
          wordBreak="break-word"
          attributes={{
            marginLeft: "$4",
          }}
        >
          {new BigNumber(props.apr).decimalPlaces(2).toString()}%
        </Text>
      </Stack>
      <Stack
        space="$0"
        attributes={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "$4",
        }}
      >
        <Text color="$textSecondary">Liquidity</Text>
        <Text
          color="$textSecondary"
          fontWeight="$semibold"
          wordBreak="break-word"
          attributes={{
            marginLeft: "$4",
          }}
        >
          ${store.getState().formatNumber({ value: props.liquidity })}
        </Text>
      </Stack>
      <Stack
        attributes={{
          justifyContent: "space-between",
        }}
      >
        <Text color="$textSecondary">7D Fees</Text>
        <Text
          color="$textSecondary"
          fontWeight="$semibold"
          wordBreak="break-word"
          attributes={{
            marginLeft: "$4",
          }}
        >
          ${store.getState().formatNumber({ value: props.fees7D })}
        </Text>
      </Stack>
      <Box
        width="$full"
        height="$1"
        my="$6"
        className={styles.divider[state.theme]}
      />
      <Show when={!!props.myLiquidity}>
        <Stack
          space="$0"
          attributes={{
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "$6",
          }}
        >
          <Text color="$text">Your Liquidity</Text>
          <Text color="$text" fontWeight="$semibold">
            ${store.getState().formatNumber({ value: props.myLiquidity })}
          </Text>
        </Stack>
      </Show>
      <Stack
        space="$0"
        attributes={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text color="$text">Bonded</Text>
        <Text
          color="$text"
          fontWeight="$semibold"
          wordBreak="break-word"
          attributes={{
            marginLeft: "$4",
          }}
        >
          ${store.getState().formatNumber({ value: props.unbondedBalance })}
        </Text>
      </Stack>
    </Box>
  );
}
