import {
  useStore,
  useDefaultProps,
  useRef,
  onUpdate,
  onMount,
  onUnMount,
  useMetadata,
  Show,
} from "@builder.io/mitosis";
import { store } from "../../models/store";
import Box from "../box";
import Button from "../button";
import Icon from "../icon";
import Text from "../text";
import StatusRing from "./wallet-connector-status-ring.lite";
import * as styles from "./wallet-connector.css";
import type { WalletConnectorStatusProps } from "./wallet-connector.types";
import type { ThemeVariant } from "../../models/system.model";

export default function WalletConnectorStatus(
  props: WalletConnectorStatusProps,
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
      className="wallet-connector-status"
      maxWidth="220px"
      attributes={{
        "data-status": props.status,
      }}
    >
      <Show when={props.status === "Connecting"}>
        <Box
          display="flex"
          flexDirection="column"
          gap="$8"
          justifyContent="center"
          alignItems="center"
          attributes={{
            "data-part-id": "wallet-connector-status-connecting",
          }}
        >
          <div className={styles.statusConnectingSpinner}>
            <svg
              viewBox="0 0 100 100"
              className={styles.statusConnectingSpinnerBorder}
            >
              <circle
                className={styles.statusConnectingSpinnerCircle}
                cx="50"
                cy="50"
                r="48"
                stroke-width="2"
                fill="none"
              />
            </svg>

            <img
              src={props.wallet.logo}
              alt="spinner"
              className={styles.statusConnectingSpinnerIcon}
            />
          </div>

          <Text fontSize="$md" fontWeight="$bold">
            {props.state.Connecting?.title}
          </Text>
          <Text fontSize="$xs" fontWeight="$normal">
            {props.state.Connecting?.description}
          </Text>
        </Box>
      </Show>

      <Show when={props.status === "NotExist"}>
        <Box
          display="flex"
          flexDirection="column"
          gap="$8"
          justifyContent="center"
          alignItems="center"
          attributes={{
            "data-part-id": "wallet-connector-status-not-exist",
          }}
        >
          <StatusRing
            wallet={props.wallet}
            status={props.status}
            popoverAction={props.state.NotExist.popoverAction}
          />

          <Text fontSize="$md" fontWeight="$bold" textAlign="center">
            {props.state.NotExist?.title}
          </Text>
          <Text fontSize="$xs" fontWeight="$normal" textAlign="center">
            {props.state.NotExist?.description}
          </Text>

          <Button variant="secondary">
            <Icon
              name="arrowDownload"
              size="$md"
              attributes={{
                marginRight: "$2",
              }}
            />

            <Text fontWeight="$medium">
              {props.state.NotExist?.installButtonLabel}
            </Text>
          </Button>
        </Box>
      </Show>
    </Box>
  );
}
