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
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* logo + input */}
        <Stack
          attributes={{
            flex: "1",
            alignItems: props.value && props.label ? "center" : "flex-start",
          }}
          direction="horizontal"
          space="$7"
        >
          {/* Still need to show the icon even props.value is empty string */}
          <Box
            width={props.size === "md" ? "50px" : "28px"}
            height={props.size === "md" ? "50px" : "28px"}
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
            flex={props.size === "sm" ? "1 0 1px" : undefined}
            width={props.size === "sm" ? "$full" : undefined}
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
              <Box maxWidth={props.value ? "100px" : "166px"}>
                <input
                  value={props.value}
                  placeholder={props.placeholder}
                  className={chainSwapInput[props.size]}
                  data-input-value={!!props.value}
                  {...props.inputAttributes}
                />
              </Box>

              <Box style={{ display: !!props.value ? "block" : "none" }}>
                <button
                  type="button"
                  className={baseButton}
                  onClick={() => props.onDropdownArrowClicked?.()}
                  style={{
                    backgroundColor: "transparent",
                    maxHeight: "24px",
                  }}
                >
                  <Icon
                    color="$textSecondary"
                    attributes={{
                      width: "36px",
                      height: "36px",
                    }}
                    name="arrowDropDown"
                  />
                </button>
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
          <Box style={{ display: !props.value ? "block" : "none" }}>
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
