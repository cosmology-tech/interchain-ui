import {
  useStore,
  onMount,
  onUnMount,
  useRef,
  useDefaultProps,
  Show,
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
    console.log("props", props)

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
          <Show when={!props.value}>
            <Box
              width={props.size === "md" ? "50px" : "28px"}
              height={props.size === "md" ? "50px" : "28px"}
              borderRadius="$full"
              backgroundColor="$skeletonBg"
            />
          </Show>

          <Show when={props.value}>
            <img
              src={props.iconUrl}
              className={chainSwapLogo[props.size]}
              alt={props.label}
            />
          </Show>

          <Box>
            <Stack
              direction="horizontal"
              space="$2"
              attributes={{
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

              <Show when={!!props.value}>
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
              </Show>
            </Stack>

            <Show when={props.value && props.label && props.size === "md"}>
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
              >
                {props.label}
              </Text>
            </Show>
          </Box>
        </Stack>

        {/* Numbers */}
        <Show when={props.size === "md"}>
          <Show when={!props.value}>
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
          </Show>

          <Show when={props.value && props.notionalValue && props.amount && !props.endAddon}>
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
          </Show>

          <Show when={props.endAddon && !!props.value}>
            {props.endAddon}
          </Show>
        </Show>
      </Box>
    </div>
  );
}
