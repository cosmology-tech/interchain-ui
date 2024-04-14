import { useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import clx from "clsx";
import { baseButton } from "../button/button.css";
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
        base: "$tagButtonBg",
        hover: "$tagButtonBgHovered",
      }}
      color="$tagButtonText"
      fontSize="$sm"
      py="$2"
      px="$6"
      borderRadius="$md"
      height="$11"
      width="44px"
      {...props}
      {...props.attributes}
      className={clx(baseButton, props.className)}
      attributes={{
        ...props.domAttributes,
        onClick: (event) => props.onClick?.(event),
      }}
    >
      {props.children}
    </Box>
  );
}
