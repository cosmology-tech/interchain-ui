import { useMetadata, useDefaultProps } from "@builder.io/mitosis";
import Box from "../box";
import clx from "clsx";
import { baseButton } from "../button/button.css";
import { meshThemeClass } from "../../styles/themes.css";
import type { MeshTabProps } from "./mesh-staking.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<MeshTabProps>>({
  isActive: false,
});

export default function MeshTab(props: MeshTabProps) {
  return (
    <Box
      position="relative"
      attributes={{
        "data-testid": "mesh-tab-container",
      }}
    >
      <Box
        as="button"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg="transparent"
        color="$textPlaceholder"
        fontSize="$sm"
        fontWeight="$medium"
        py="$8"
        px="$3"
        borderRadius="$md"
        filter={props.isActive ? undefined : "grayscale(60%) opacity(40%)"}
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

      <Box
        height="1px"
        width="100%"
        bg="$textSuccess"
        bottom="$0"
        opacity={props.isActive ? 1 : 0}
        transition="250ms opacity"
      />
    </Box>
  );
}
