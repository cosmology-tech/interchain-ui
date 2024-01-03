import { useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import clx from "clsx";
import { baseButton } from "../button/button.css";
import { meshThemeClass } from "../../styles/themes.css";
import type { MeshButtonProps } from "./mesh-staking.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function MeshButton(props: MeshButtonProps) {
  return (
    <Box
      as="button"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg={{
        base: "$text",
        hover: "$textPlaceholder",
      }}
      color="$accentText"
      fontSize="$sm"
      fontWeight="$medium"
      py="$5"
      px="$9"
      borderRadius="$md"
      height="$14"
      width={props.width}
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
