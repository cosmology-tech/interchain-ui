import {
  useStore,
  useRef,
  onMount,
  onUnMount,
  useMetadata,
  Show,
} from "@builder.io/mitosis";
import copy from "copy-to-clipboard";
import Box from "../box";
import Icon from "../icon";
import Button from "../button";
import Text from "../text";
import { store } from "../../models/store";
import { truncateTextMiddle } from "../../helpers/string";

import * as styles from "./wallet-connector.css";
import * as sharedStyles from "../shared/shared.css";
import type { WalletConnectorInfoProps } from "./wallet-connector.types";
import type { ThemeVariant } from "../../models/system.model";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function WalletConnectorInfo(props: WalletConnectorInfoProps) {
  const state = useStore<{
    idle: boolean;
    theme: ThemeVariant;
    handleOnCopy: () => void;
  }>({
    idle: true,
    theme: "light",
    handleOnCopy: () => {
      const success = copy(props.address);

      if (success) {
        props.onCopyAddress?.();
        state.idle = false;

        setTimeout(() => {
          state.idle = true;
        }, 1000);
      }
    },
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
      bg="$background"
      borderRadius="$lg"
      display="flex"
      gap="$9"
      px="$5"
      py="$5"
      className={styles.walletConnectorInfo[state.theme ?? "light"]}
    >
      <Box display="flex" gap="$5">
        <img
          src={props.iconSrc}
          alt={props.address}
          width={20}
          height={20}
          className={styles.walletConnectorInfoImg}
        />

        <Text as="span" fontSize="$sm" fontWeight="$normal" color="$neutral600">
          {truncateTextMiddle(props.address, props.truncateLength ?? 15)}
        </Text>
      </Box>

      <Box display="flex" gap="$5">
        <Button
          variant="unstyled"
          onClick={() => state.handleOnCopy()}
          size="xs"
          domAttributes={{
            style: {
              minWidth: "unset",
            },
          }}
        >
          <Show
            when={state.idle}
            else={
              <Icon
                color="$textSuccess"
                name="copied"
                size="$md"
                attributes={{
                  fontSize: "$xl",
                }}
                className={sharedStyles.standardTransitionProperties}
              />
            }
          >
            <Icon
              name="copy"
              color="$neutral600"
              attributes={{
                fontSize: "$xl",
              }}
              className={sharedStyles.standardTransitionProperties}
            />
          </Show>
        </Button>

        <Button
          variant="unstyled"
          onClick={props.onDisconnect}
          size="xs"
          domAttributes={{
            style: {
              minWidth: "unset",
            },
          }}
        >
          <Icon
            name="logout"
            color="$neutral600"
            attributes={{
              fontSize: "$xl",
            }}
          />
        </Button>
      </Box>
    </Box>
  );
}
