import {
  useStore,
  onMount,
  onUnMount,
  useRef,
  useDefaultProps,
  useMetadata,
} from "@builder.io/mitosis";
import { store } from "../../models/store";
import Text from "../text";
import Box from "../box";
import Stack from "../stack";
import Avatar from "../avatar";
import Spinner from "../spinner";
import Icon from "../icon";
import TextFieldAddon from "../text-field-addon";
import TextField from "../text-field";
import { baseButton } from "../button/button.css";
import { textFieldRoot, chainItem } from "./change-chain-input.css";
import type { ChangeChainInputProps } from "./change-chain-input.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function ChangeChainInput(props: ChangeChainInputProps) {
  useDefaultProps({
    size: "md",
    placeholder: "Choose a chain",
  });

  const state = useStore({
    theme: "light",
    getIconSize: (size: ChangeChainInputProps["size"]) => {
      const sizes: Record<ChangeChainInputProps["size"], string> = {
        sm: "$sm",
        md: "$md",
      };

      return sizes[size ?? "sm"];
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
    <TextField
      type="text"
      size={props.size}
      intent={props.intent}
      id={props.id}
      label={props.label}
      value={props.value}
      placeholder={props.chainName ? undefined : props.placeholder}
      onChange={props.onChange}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      disabled={props.disabled}
      inputContainer={textFieldRoot}
      className={props.className}
      inputAttributes={props.inputAttributes}
      startAddon={
        <div className={chainItem}>
          {props.chainName ? (
            <Stack
              direction="horizontal"
              space="$4"
              attributes={{
                alignItems: "center",
                display: props.showSelectedItem ? "flex" : "none",
              }}
            >
              <Avatar
                name={props.chainName}
                getInitials={(name) => name[0]}
                size="xs"
                src={props.iconUrl}
              />
              <Text fontSize="$sm" fontWeight="$normal" color="$text">
                {props.chainName}
              </Text>
            </Stack>
          ) : null}
        </div>
      }
      endAddon={
        <TextFieldAddon
          position="end"
          divider={true}
          intent={props.intent}
          disabled={props.disabled}
        >
          <Box
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              position="absolute"
              left="-50px"
              width="$11"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              {props.isLoading ? <Spinner /> : null}
              {!props.isLoading &&
              props.isClearable &&
              (props.chainName || props.value) ? (
                <button
                  type="button"
                  className={baseButton}
                  style={{
                    backgroundColor: "transparent",
                  }}
                  onClick={() => props.onClear?.()}
                >
                  <Icon
                    name="close"
                    color="$text"
                    size={state.getIconSize(props.size)}
                  />
                </button>
              ) : null}
            </Box>

            <button
              type="button"
              className={baseButton}
              disabled={props.disabled}
              style={{
                backgroundColor: "transparent",
              }}
              onClick={() => props.onDropdownArrowClicked?.()}
            >
              <Icon
                name="arrowDropDown"
                color="$text"
                size={state.getIconSize(props.size)}
              />
            </button>
          </Box>
        </TextFieldAddon>
      }
    />
  );
}
