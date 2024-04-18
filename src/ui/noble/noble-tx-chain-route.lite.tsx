import {
  useMetadata,
  useStore,
  useRef,
  onMount,
  onUnMount,
} from "@builder.io/mitosis";
import Box from "../box";
import Icon from "../icon";
import { store } from "../../models/store";
import { NobleTxChainRouteProps } from "./noble.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function NobleTxChainRoute(props: NobleTxChainRouteProps) {
  const state = useStore({
    theme: "light",
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

  return (
    <Box display="flex" alignItems="center" gap="5px" {...props.containerProps}>
      <Box
        as="img"
        attributes={{
          src: props.srcChainLogoUrl,
          alt: props.srcChainLogoAlt ?? "source chain logo",
        }}
        width="$9"
        height="$9"
      />

      <Icon name="arrowRightLine" color="$textSecondary" size="$xs" />

      <Box
        as="img"
        attributes={{
          src: props.destChainLogoUrl,
          alt: props.destChainLogoAlt ?? "dest chain logo",
        }}
        width="$9"
        height="$9"
      />
    </Box>
  );
}
