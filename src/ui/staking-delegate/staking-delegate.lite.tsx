import {
  useDefaultProps,
  useMetadata,
  useStore,
  useRef,
  onMount,
  onUnMount,
  Show,
  For,
} from "@builder.io/mitosis";
import Box from "../box";
import Stack from "../stack";
import Avatar from "../avatar";
import Text from "../text";
import Skeleton from "../skeleton";
import Spinner from "../spinner";
import { baseButton } from "../button/button.css";
import { breakpoints } from "../../styles/tokens";
import BigNumber from "bignumber.js";
import { toNumber } from "../../helpers/number";
import * as styles from "./staking-delegate.css";
import type { StakingDelegateProps } from "./staking-delegate.types";

useMetadata({
  scaffolds: ["number-field"],
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<StakingDelegateProps>>({});

export default function StakingDelegate(props: StakingDelegateProps) {
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
        props.inputNotionalValue &&
        new BigNumber(props.inputNotionalValue).isGreaterThan(0)
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
      gap="$12"
      {...props.attributes}
      ref={rootRef}
      className={props.className}
    >
      {/* header */}
      <Stack
        direction="horizontal"
        space="$8"
        attributes={{
          alignItems: "center",
        }}
      >
        <Avatar
          name={props.header?.title ?? "Staking validator avatar"}
          size="lg"
          src={props.header?.avatarUrl ?? ""}
        />
        <Stack direction="vertical" space="$2">
          <Show when={!!props.header?.title}>
            <Text fontSize="$lg" fontWeight="$semibold" color="$text">
              {props.header?.title}
            </Text>
          </Show>
          <Show when={!!props.header?.subtitle}>
            <Text fontSize="$md" fontWeight="$normal" color="$textSecondary">
              {props.header?.subtitle}
            </Text>
          </Show>
        </Stack>
      </Stack>

      {/* Header extra */}
      <Show when={props.headerExtra}>{props.headerExtra}</Show>

      {/* Delegation card list */}
      <Show when={props.delegationItems && props.delegationItems.length > 0}>
        <Box display="flex" alignItems="center" gap="$10" flexWrap="wrap">
          <For each={props.delegationItems}>
            {(item) => (
              <Stack
                direction="vertical"
                space="$4"
                key={item.label}
                attributes={{
                  p: "$10",
                  height: "104px",
                  flexGrow: "1",
                  borderRadius: "$lg",
                  backgroundColor: "$cardBg",
                  alignItems: "flex-start",
                }}
              >
                <Text fontSize="$md" fontWeight="$semibold" color="$text">
                  {item.label}
                </Text>

                <Show when={!item.isLoading}>
                  <Stack
                    direction="horizontal"
                    space="$2"
                    attributes={{
                      alignItems: "center",
                    }}
                  >
                    <Text
                      fontSize="$lg"
                      fontWeight="$semibold"
                      color={
                        new BigNumber(item.tokenAmount).isEqualTo(0)
                          ? "$textSecondary"
                          : "$text"
                      }
                    >
                      {item.tokenAmount}
                    </Text>
                    <Text
                      fontSize="$md"
                      fontWeight="$normal"
                      color="$textSecondary"
                    >
                      {item.tokenName}
                    </Text>
                  </Stack>
                </Show>

                <Show when={item.isLoading}>
                  <Stack
                    direction="horizontal"
                    space="$2"
                    attributes={{
                      alignItems: "center",
                    }}
                  >
                    <Skeleton borderRadius="$sm" width="$18" height="$10" />
                    <Skeleton borderRadius="$sm" width="$16" height="$10" />
                  </Stack>
                </Show>
              </Stack>
            )}
          </For>
        </Box>
      </Show>

      <Box display="flex" flexDirection="column" gap="$6">
        {/* Number input */}
        <Box
          bg="$inputBg"
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
              value={props.inputValue}
              minValue={toNumber(props.inputMinValue)}
              maxValue={toNumber(props.inputMaxValue)}
              onChange={(value) => props.onValueChange?.(value)}
              onInput={(rawValue) => props.onValueInput?.(rawValue)}
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
                ≈ ${props.inputNotionalValue}
              </Text>
            </Show>

            <Show
              when={
                !state.isValidNotionalValue() && props.isLoadingNotionalValue
              }
            >
              <Skeleton borderRadius="$sm" width="$10" height="$7" />
            </Show>
          </Box>
        </Box>

        {/* Partials buttons */}
        <Show when={props.inputPartials && props.inputPartials.length > 0}>
          <Box display="flex" gap="$4" justifyContent="flex-end">
            <For each={props.inputPartials}>
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
                  <Show
                    when={!item.isLoading}
                    else={
                      <Spinner
                        size="sm"
                        color="$textPlaceholder"
                        title="Loading"
                      />
                    }
                  >
                    <Text
                      as="span"
                      fontSize="$sm"
                      fontWeight="$semibold"
                      color="$textSecondary"
                    >
                      {item.label}
                    </Text>
                  </Show>
                </Box>
              )}
            </For>
          </Box>
        </Show>
      </Box>

      {/* Footer */}
      <Show when={props.footer}>{props.footer}</Show>
    </Box>
  );
}
