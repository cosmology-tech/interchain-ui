import { useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import clx from "clsx";
import { baseButton } from "../button/button.css";
import { meshThemeClass } from "../../styles/themes.css";
import type { MeshTagButtonProps } from "./mesh-staking.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function MeshTagButton(props: MeshTagButtonProps) {
  return (
    <Box
      as="button"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg={{
        base: "$gray600",
        hover: "$gray500",
      }}
      color="$text"
      fontSize="$sm"
      py="$2"
      px="$6"
      borderRadius="$md"
      height="$11"
      {...props}
      {...props.attributes}
      className={clx(meshThemeClass, baseButton, props.className)}
      attributes={{
        ...props.domAttributes,
        onClick: (event) => props.onClick?.(event),
      }}
    >
      {props.children}
    </Box>
  );
}
