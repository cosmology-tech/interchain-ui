import {
  useStore,
  useMetadata,
  useDefaultProps,
  useRef,
  onMount,
  onUnMount,
} from "@builder.io/mitosis";

import Box from "../box";
import Text from "../text";
import Icon from "../icon";
import { store } from "../../models/store";
import { NobleTxHistoryOverviewItemProps, NobleTxStatus } from "./noble.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<NobleTxHistoryOverviewItemProps>>({
  mainLogoSrc:
    "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdc.svg",
  amountUnit: "USDC",
  isExpanded: false,
});

export default function NobleTxHistoryOverviewItem(
  props: NobleTxHistoryOverviewItemProps,
) {
  const state = useStore({
    theme: "light",
    get statusText() {
      const statusTextMap: Record<NobleTxStatus, string> = {
        processing: "Processing",
        successful: "Successful",
      };
      return props?.customStatus?.text ?? statusTextMap[props.status];
    },
    get statusColor() {
      const statusColorMap: Record<NobleTxStatus, string> = {
        processing: state.theme === "light" ? "$blue500" : "$blue700",
        successful: "$textSuccess",
      };
      return props?.customStatus?.color ?? statusColorMap[props.status];
    },
    get chevronColor() {
      return state.theme === "light" ? "$gray400" : "$blue500";
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
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      cursor="pointer"
    >
      <Box display="flex" alignItems="center" gap="$9">
        <Box
          as="img"
          borderRadius="$full"
          attributes={{ src: props.mainLogoSrc, alt: "main logo" }}
          width="$13"
          height="$13"
        />
        <Box display="flex" alignItems="center" gap="5px">
          <Box
            as="img"
            borderRadius="$full"
            attributes={{
              src: props.sourceChainLogoSrc,
              alt: "from chain logo",
            }}
            width="$9"
            height="$9"
          />
          <svg
            width="16"
            height="11"
            viewBox="0 0 16 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Box
              as="path"
              fill="$blue700"
              attributes={{
                d: "M15.2156 4.91559L10.4101 0.241548C10.079 -0.0805161 9.54355 -0.0805161 9.22844 0.241548C8.89732 0.563613 8.89732 1.08441 9.22844 1.3909L12.6159 4.68572L1.33518 4.68572C0.878514 4.68572 0.5 5.05327 0.5 5.49805C0.5 5.94223 0.877883 6.31039 1.33518 6.31039L12.6005 6.31039L9.22844 9.6052C8.89732 9.92727 8.89732 10.4481 9.22844 10.7546C9.38599 10.9078 9.60632 11 9.82728 11C10.0476 11 10.2526 10.9234 10.4261 10.7546L15.2477 6.06489C15.4052 5.91164 15.5 5.69734 15.5 5.48242C15.468 5.28368 15.3731 5.06884 15.2156 4.91559Z",
              }}
            />
          </svg>
          <Box
            as="img"
            borderRadius="$full"
            attributes={{
              src: props.destinationChainLogoSrc,
              alt: "to chain logo",
            }}
            width="$9"
            height="$9"
          />
        </Box>
      </Box>
      <Box display="flex" alignItems="center" gap="$9">
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <Text
            color="$text"
            fontSize="$md"
            fontWeight="$semibold"
            lineHeight="1.4"
          >
            {`${props.amount} ${props.amountUnit}`}
          </Text>
          <Text color={state.statusColor} fontSize="$sm" lineHeight="1.4">
            {state.statusText}
          </Text>
        </Box>

        <Icon
          name="arrowDropDown"
          color={state.chevronColor}
          size="$4xl"
          attributes={{
            transform: `rotate(${props.isExpanded ? 180 : 0}deg)`,
          }}
        />
      </Box>
    </Box>
  );
}
