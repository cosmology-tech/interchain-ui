import { Show, useDefaultProps, useStore } from "@builder.io/mitosis";
import Box from "../box";
import { avatarName } from "./avatar.css";
import type { AvatarNameProps } from "./avatar.types";

useDefaultProps<Partial<AvatarNameProps>>({ showInitials: true });

export default function AvatarName(props: AvatarNameProps) {
  const state = useStore({
    initials(name: string) {
      if (typeof props.getInitials === "function") {
        return props.getInitials(props.name);
      }

      const names = name.split(" ");
      const firstName = names[0] ?? "";
      const lastName = names.length > 1 ? names[names.length - 1] : "";
      return firstName && lastName
        ? `${firstName.charAt(0)}${lastName.charAt(0)}`
        : firstName.charAt(0);
    },
  });

  return (
    <Box
      fontFamily="$body"
      fontWeight="$normal"
      attributes={{
        role: "img",
        "aria-label": props.name,
      }}
      className={avatarName}
      ref={props.ref}
    >
      <Show when={!!props.name && props.showInitials}>
        {state.initials(props.name)}
      </Show>
    </Box>
  );
}
