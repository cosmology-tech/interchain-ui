import {
  useMetadata,
  useStore,
  useRef,
  onMount,
  onUnMount,
} from "@builder.io/mitosis";
import Box from "../box";
import Text from "../text";
import Icon from "../icon";
import NobleTxChainRoute from "./noble-tx-chain-route.lite";
import { store } from "../../models/store";
import { NobleTxEstimateProps } from "./noble.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function NobleTxEstimate(props: NobleTxEstimateProps) {
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
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      gap="5px"
      {...props.containerProps}
    >
      <Box display="flex" alignItems="center" gap="$4">
        <NobleTxChainRoute
          srcChainLogoUrl={props.srcChainLogoUrl}
          srcChainLogoAlt={props.srcChainLogoAlt}
          destChainLogoUrl={props.destChainLogoUrl}
          destChainLogoAlt={props.destChainLogoAlt}
        />

        <Box display="flex" gap="$3" alignItems="center">
          <Icon name="timeLine" color="$textSecondary" size="$8" />
          <Text color="$textSecondary" fontSize="$sm" fontWeight="$normal">
            {props.timeEstimateLabel}
          </Text>
        </Box>
      </Box>

      <Text color="$textSecondary" fontSize="$sm" fontWeight="$normal">
        {props.feeEstimateLabel}
      </Text>
    </Box>
  );
}
