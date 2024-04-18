import {
  useMetadata,
  useStore,
  useRef,
  onMount,
  onUnMount,
} from "@builder.io/mitosis";

import Box from "../box";
import Text from "../text";
import NobleButton from "./noble-button.lite";
import { store } from "../../models/store";
import * as styles from "./noble.css";
import type { NobleSelectWalletButtonProps } from "./noble.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function NobleSelectWalletButton(
  props: NobleSelectWalletButtonProps,
) {
  const state = useStore({
    theme: "light",
    get buttonProps() {
      const { logoUrl, logoAlt, title, subTitle, ...otherProps } = props;
      return otherProps;
    },
    get textColor() {
      return props.disabled ? "inherit" : "$text";
    },
  });

  let cleanupRef = useRef<(() => void) | null>(null);

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
    <NobleButton
      {...state.buttonProps}
      variant="outlined"
      size="xl"
      width="168px"
      height="152px"
    >
      <Box display="flex" flexDirection="column" alignItems="center" gap="$4">
        <Box
          className={styles.walletImgContainer}
          attributes={{
            "data-disabled": !!props.disabled,
          }}
        >
          <Box
            as="img"
            width="42px"
            height="42px"
            className={styles.walletImg}
            attributes={{
              src: props.logoUrl,
              alt: props.logoAlt,
            }}
          />
        </Box>

        <Text fontSize="$md" fontWeight="$semibold" color={state.textColor}>
          {props.title}
        </Text>

        <Text fontSize="$xs" fontWeight="$medium" color={state.textColor}>
          {props.subTitle}
        </Text>
      </Box>
    </NobleButton>
  );
}
