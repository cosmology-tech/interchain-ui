import {
  useStore,
  onMount,
  onUnMount,
  useRef,
  useDefaultProps,
  Show,
} from "@builder.io/mitosis";
import ListItem from "../list-item";
import Box from "../box";
import Text from "../text";
import Stack from "../stack";
import { store } from "../../models/store";
import { chainLogoSizes } from "./chain-list-item.css";
import type { ThemeVariant } from "../../models/system.model";
import type { ChainListItemProps } from "./chain-list-item.types";

export default function ChainListItem(props: ChainListItemProps) {
  useDefaultProps({
    isActive: false,
    size: "sm",
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
    <ListItem
      itemRef={props.itemRef}
      isActive={props.isActive}
      isSelected={props.isSelected}
      size={props.size}
      attributes={props.attributes}
      className={props.className}
    >
      <Box
        height="$full"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Left: logo + name */}
        <Stack
          direction="horizontal"
          space="$6"
          attributes={{
            alignItems: "center",
          }}
        >
          <img
            src={props.iconUrl}
            className={chainLogoSizes[props.size]}
            alt={props.tokenName}
          />
          <Stack direction="vertical" space="$0">
            <Show when={props.size === "md"}>
              <Text color="$text" fontWeight="$semibold" fontSize="$20">
                {props.tokenName}
              </Text>
            </Show>

            <Show when={props.size === "md"}>
              <Text color="$text" fontWeight="$normal" fontSize="$xs">
                {props.name}
              </Text>
            </Show>

            <Show when={props.size === "sm"}>
              <Text color="$text" fontWeight="$normal" fontSize="$sm">
                {props.name}
              </Text>
            </Show>
          </Stack>
        </Stack>

        {/* Right: numbers */}
        <Show
          when={
            props.amount !== null &&
            props.notionalValue !== null &&
            props.size !== "sm"
          }
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
        </Show>
      </Box>
    </ListItem>
  );
}
