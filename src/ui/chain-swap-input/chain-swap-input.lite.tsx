import {
  useStore,
  onMount,
  onUnMount,
  useRef,
  useDefaultProps,
  useMetadata,
} from "@builder.io/mitosis";
import clx from "clsx";
import { store } from "../../models/store";
import Text from "../text";
import Box from "../box";
import Stack from "../stack";
import Icon from "../icon";
import { baseButton } from "../button/button.css";
import {
  container,
  chainSwapInput,
  chainSwapLogo,
  logoMd,
  logoSm,
} from "./chain-swap-input.css";
import type { ThemeVariant } from "../../models/system.model";
import type { ChainSwapInputProps } from "./chain-swap-input.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function ChainSwapInput(props: ChainSwapInputProps) {
  useDefaultProps({
    size: "md",
    placeholder: "Select a token",
  });

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
    <div className={clx(container, props.className)} ref={props.containerRef}>
      <Box
        width="$full"
        display="grid"
        gridTemplateColumns={{
          mobile: "repeat(2, minmax(0, 1fr))",
          tablet: "repeat(2, minmax(0, 1fr))",
        }}
      >
        {/* logo + input */}
        <Stack
          attributes={{
            alignItems:
              props.value && props.label ? "flex-start" : "flex-start",
            zIndex: "1",
          }}
          direction="horizontal"
          space="$7"
        >
          {/* ==== Placeholder skeleton */}
          {/* Still need to show the icon even props.value is empty string */}
          <Box
            flexShrink="0"
            position="relative"
            className={props.size === "md" ? logoMd : logoSm}
          >
            <Box
              display={!props.value || !props.iconUrl ? "block" : "none"}
              width="$full"
              height="$full"
              borderRadius="$full"
              backgroundColor="$skeletonBg"
            />

            <Box display={props.value && props.iconUrl ? "block" : "none"}>
              <img
                src={props.iconUrl}
                className={chainSwapLogo[props.size]}
                alt={props.label}
              />
            </Box>
          </Box>

          <Box
            flex={{
              mobile: "1",
              tablet: props.size === "sm" ? "1 0 1px" : undefined,
            }}
            width={props.size === "sm" ? "$full" : undefined}
            attributes={{
              "data-part-id": "input-container",
            }}
          >
            <Stack
              direction="horizontal"
              space="$2"
              attributes={{
                justifyContent:
                  props.size === "sm" ? "space-between" : "flex-start",
                alignItems: "center",
              }}
            >
              <Box display="block" position="relative" maxWidth="100%">
                <input
                  value={props.value}
                  placeholder={props.placeholder}
                  className={clx(
                    chainSwapInput[props.size],
                    props.inputClassName
                  )}
                  data-input-value={!!props.value}
                  data-part-id="chain-swap-input"
                  {...props.inputAttributes}
                />

                {/* === Arrow dropdown button */}
                <Box
                  position="absolute"
                  top="0"
                  right="0"
                  zIndex="1"
                  width="$12"
                  height="$12"
                  display={!!props.value ? "block" : "none"}
                >
                  <button
                    type="button"
                    className={baseButton}
                    onClick={() => props.onDropdownArrowClicked?.()}
                    style={{
                      backgroundColor: "transparent",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <Icon
                      color="$textSecondary"
                      size="$6xl"
                      name="arrowDropDown"
                    />
                  </button>
                </Box>
              </Box>
            </Stack>

            <Box
              height="$11"
              style={{
                visibility:
                  props.value && props.label && props.size === "md"
                    ? "visible"
                    : "hidden",
              }}
            >
              <Text
                as="p"
                color="$text"
                fontWeight="$normal"
                fontSize="$xs"
                textAlign="left"
                ellipsis={true}
                attributes={{
                  maxWidth: props.value ? "100px" : "166px",
                  display: "block",
                }}
                domAttributes={{
                  title: props.label,
                }}
              >
                {props.label}
              </Text>
            </Box>
          </Box>
        </Stack>

        {/* Numbers */}
        <Box style={{ display: props.size === "md" ? "block" : "none" }}>
          {/* === Empty skeleton */}
          <Box
            display={!props.value ? "flex" : "none"}
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-end"
            pr="$4"
          >
            <Stack direction="vertical" space="$4">
              <Box
                backgroundColor="$skeletonBg"
                borderRadius="$base"
                width="60px"
                height="18px"
              />
              <Box
                backgroundColor="$skeletonBg"
                borderRadius="$base"
                width="60px"
                height="9px"
              />
            </Stack>
          </Box>

          <Box
            style={{
              display:
                props.value &&
                props.notionalValue &&
                props.amount &&
                !props.endAddon
                  ? "block"
                  : "none",
            }}
          >
            <Stack direction="vertical" space="$0">
              <Text
                color="$text"
                fontWeight="$semibold"
                fontSize="$20"
                textAlign="right"
              >
                {props.amount}
              </Text>
              <Text
                color="$text"
                fontWeight="$normal"
                fontSize="$xs"
                textAlign="right"
              >
                {props.notionalValue}
              </Text>
            </Stack>
          </Box>

          <Box
            style={{
              display: props.endAddon && !!props.value ? "block" : "none",
            }}
          >
            {props.endAddon}
          </Box>
        </Box>
      </Box>
    </div>
  );
}
