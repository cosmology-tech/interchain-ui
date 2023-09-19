import { useStore, onMount, onUnMount, useRef } from "@builder.io/mitosis";
import clx from "clsx";
import { store } from "../../models/store";
import ListItem from "../list-item";
import Text from "../text";
import Stack from "../stack";
import Avatar from "../avatar";
import { changeChainListItem } from "./change-chain-list-item.css";
import type { AvatarSize } from "../avatar/avatar.types";
import type { ChangeChainListItemProps } from "./change-chain-list-item.types";

export default function ChangeChainListItem(props: ChangeChainListItemProps) {
  const state = useStore({
    theme: "light",
    avatarSize() {
      const sizeMap = {
        sm: "xs",
        md: "sm",
      };
      return sizeMap[props.size ?? "sm"] as AvatarSize;
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
    <ListItem
      isActive={props.isActive}
      size={props.size}
      attributes={props.attributes}
      itemRef={props.itemRef}
      className={clx(changeChainListItem, props.className)}
    >
      <Stack
        direction="horizontal"
        space="$4"
        attributes={{ alignItems: "center" }}
      >
        <Avatar
          name={props.chainName}
          getInitials={(name) => name[0]}
          size={state.avatarSize()}
          src={props.iconUrl}
          fallbackMode="bg"
        />
        <Text fontSize="$lg" fontWeight="$normal" color="$text">
          {props.chainName}
        </Text>
      </Stack>
    </ListItem>
  );
}
