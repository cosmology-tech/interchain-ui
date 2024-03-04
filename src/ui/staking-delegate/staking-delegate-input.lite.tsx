import {
  useMetadata,
  Show,
  For,
  useRef,
  useStore,
  onMount,
  onUnMount,
} from "@builder.io/mitosis";
import BigNumber from "bignumber.js";
import Box from "../box";
import Avatar from "../avatar";
import Text from "../text";
import Skeleton from "../skeleton";
import Spinner from "../spinner";
import { baseButton } from "../button/button.css";
import { breakpoints } from "../../styles/tokens";
import { toNumber } from "../../helpers/number";
import * as styles from "./staking-delegate.css";

import type { StakingDelegateInputProps } from "./staking-delegate.types";

useMetadata({
  scaffolds: ["number-field"],
  rsc: {
    componentType: "client",
  },
});

export default function StakingDelegateInput(props: StakingDelegateInputProps) {
  let cleanupRef = useRef<() => void>(null);
  let rootRef = useRef<HTMLDivElement | null>(null);
  let resizeObserver = useRef<ResizeObserver | null>(null);

  let state = useStore<{
    // ==== UI states
    isMounted: boolean;
    width: number;
    isValidNotionalValue: () => boolean;
  }>({
    isMounted: false,
    width: 0,
    isValidNotionalValue() {
      return (
        props.notionalValue &&
        new BigNumber(props.notionalValue).isGreaterThan(0)
      );
    },
  });

  onMount(() => {
    state.isMounted = true;
    resizeObserver = new ResizeObserver((entries) => {
      const rootWidth = entries[0]?.borderBoxSize[0]?.inlineSize ?? 0;
      state.width = rootWidth;
    });

    resizeObserver.observe(rootRef, { box: "border-box" });

    cleanupRef = () => {
      if (rootRef instanceof Element) {
        resizeObserver.unobserve(rootRef);
      }
    };
  });

  onUnMount(() => {
    if (typeof cleanupRef === "function") cleanupRef();
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="$6"
      boxRef={rootRef}
      {...props.attributes}
    >
      <Box
        bg="$inputBg"
        borderColor="$divider"
        borderWidth="1px"
        borderStyle="$solid"
        px={{
          mobile: "$6",
          tablet: "$8",
        }}
        py={{
          mobile: "$6",
          tablet: "$9",
        }}
        maxHeight="100px"
        borderRadius="$lg"
        display="flex"
        gap={{
          mobile: "$4",
          tablet: "$10",
        }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Avatar
          name={props.inputToken.tokenName}
          size={state.width >= breakpoints.mdMobile ? "lg" : "sm"}
          src={props.inputToken.tokenIconUrl ?? ""}
        />

        <Box flex="1">
          {/* @ts-expect-error */}
          <ScaffoldNumberField
            size="sm"
            borderless
            value={props.value}
            minValue={toNumber(props.minValue)}
            maxValue={toNumber(props.maxValue)}
            onChange={(value) => props.onValueChange?.(value)}
            onInput={(event) =>
              props.onValueInput?.((event.target as HTMLInputElement).value)
            }
            formatOptions={{
              minimumFractionDigits:
                props.formatOptions?.minimumFractionDigits ?? 0,
              maximumFractionDigits:
                props.formatOptions?.maximumFractionDigits ?? 6,
            }}
            inputClassName={
              state.width >= breakpoints.mdMobile ? "" : styles.inputSm
            }
          />
        </Box>

        <Box
          display="flex"
          flexDirection="row"
          flexShrink="0"
          gap="$2"
          alignItems="center"
        >
          <Text color="$text" fontSize="$md" fontWeight="$semibold">
            {props.inputToken.tokenName}
          </Text>

          <Show when={state.isValidNotionalValue()}>
            <Text color="$text" fontSize="$sm" fontWeight="$normal">
              ≈ ${props.notionalValue}
            </Text>
          </Show>

          <Show
            when={!state.isValidNotionalValue() && props.isLoadingNotionalValue}
          >
            <Skeleton borderRadius="$sm" width="$10" height="$7" />
          </Show>
        </Box>
      </Box>

      {/* Partials buttons */}
      <Show when={props.partials && props.partials.length > 0}>
        <Box display="flex" gap="$4" justifyContent="flex-end">
          <For each={props.partials}>
            {(item) => (
              <Box
                key={item.label}
                as="button"
                height="$11"
                width="auto"
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                p="$4"
                borderRadius="$base"
                backgroundColor="$cardBg"
                cursor={item.isLoading ? "not-allowed" : "pointer"}
                className={baseButton}
                attributes={{
                  onClick: () => {
                    if (item.isLoading) {
                      return;
                    }

                    item.onClick();
                  },
                }}
              >
                <Box display={item.isLoading ? "block" : "none"}>
                  <Spinner size="sm" color="$textPlaceholder" title="Loading" />
                </Box>

                <Text
                  as="span"
                  fontSize="$sm"
                  fontWeight="$semibold"
                  color="$textSecondary"
                  attributes={{
                    display: item.isLoading ? "none" : "block",
                  }}
                >
                  {item.label}
                </Text>
              </Box>
            )}
          </For>
        </Box>
      </Show>
    </Box>
  );
}
