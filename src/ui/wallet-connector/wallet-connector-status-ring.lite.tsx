import {
  useStore,
  useRef,
  onMount,
  onUnMount,
  Show,
} from "@builder.io/mitosis";
import clx from "clsx";
import Box from "../box";
import Text from "../text";
import Tooltip from "../tooltip";
import Button from "../button";
import Icon from "../icon";
import * as styles from "./wallet-connector.css";

import { store } from "../../models/store";
import type { ThemeVariant } from "../../models/system.model";
import type { WalletConnectorStatusRingProps } from "./wallet-connector.types";

export default function WalletConnectorStatusRing(
  props: WalletConnectorStatusRingProps,
) {
  const state = useStore<{
    theme: ThemeVariant;
  }>({
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
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      className={clx(
        props.className,
        "wallet-connector-status-ring",
        styles.walletConnectorStatusRing,
      )}
      attributes={{
        ...props.attributes,
        "data-status": props.status,
      }}
    >
      <img
        src={props.wallet.logo}
        alt={props.wallet.name}
        className={styles.walletConnectorStatusRingImg}
      />

      <div
        className={styles.walletConnectorStatusRingActionPseudo}
        aria-hidden="true"
        data-status={props.status}
      />

      <div
        className={styles.walletConnectorStatusRingAction}
        data-status={props.status}
      >
        <Show
          when={props.popoverAction}
          else={<Icon name="informationSimpleLine" color="inherit" />}
        >
          <Tooltip
            title={
              <Text fontSize="$xs" color="$textSecondary" fontWeight="$medium">
                {props.popoverAction.label}
              </Text>
            }
          >
            <Button
              onClick={() => props.popoverAction.onClick?.()}
              variant="unstyled"
              domAttributes={{
                style: {
                  color: "inherit",
                  padding: "0",
                  minWidth: "unset",
                },
              }}
            >
              <Icon name="reload" color="inherit" />
            </Button>
          </Tooltip>
        </Show>
      </div>
    </Box>
  );
}
