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
import Button from "../button";
import Icon from "../icon";
import * as styles from "./wallet-connector.css";

import { store } from "../../models/store";
import type { ThemeVariant } from "../../models/system.model";
import type { WalletConnectorHeadProps } from "./wallet-connector.types";

export default function WalletConnectorHead(props: WalletConnectorHeadProps) {
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
      {...props.attributes}
      className={clx(props.className, "wallet-connector-head")}
    >
      <Show when={props.hasBackButton}>
        <Button
          variant="unstyled"
          size="sm"
          className={styles.walletConnectorHeadAction}
          onClick={() => {
            props.onBack?.();
          }}
        >
          <Icon name="arrowLeftSLine" size="$xl" color="inherit" />
        </Button>
      </Show>

      <Text
        fontSize="$8"
        fontWeight="$semibold"
        domAttributes={{
          id: props.id,
        }}
      >
        {props.title}
      </Text>

      <Show when={props.hasCloseButton}>
        <Button
          variant="unstyled"
          size="sm"
          className={styles.walletConnectorHeadAction}
          onClick={() => {
            props.onClose?.();
          }}
        >
          <Icon name="closeFilled" size="$xl" color="inherit" />
        </Button>
      </Show>
    </Box>
  );
}
