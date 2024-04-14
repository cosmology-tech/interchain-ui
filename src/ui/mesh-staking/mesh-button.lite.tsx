import { useMetadata, useDefaultProps, Show } from "@builder.io/mitosis";
import Box from "../box";
import clx from "clsx";
import { baseButton } from "../button/button.css";
import type { MeshButtonProps } from "./mesh-staking.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<MeshButtonProps>>({
  variant: "solid",
  colorScheme: "primary",
});

export default function MeshButton(props: MeshButtonProps) {
  return (
    <>
      <Show when={props.variant === "solid"}>
        <Box
          as="button"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg={
            props.colorScheme === "primary"
              ? {
                  base: "$meshButtonSolidPrimaryBg",
                  hover: "$meshButtonSolidPrimaryBgHovered",
                }
              : {
                  base: "$meshButtonSolidSecondaryBg",
                  hover: "$meshButtonSolidSecondaryBgHovered",
                }
          }
          color={
            props.colorScheme === "primary"
              ? "$meshButtonSolidPrimaryText"
              : "$meshButtonSolidSecondaryText"
          }
          fontSize="$sm"
          fontWeight="$medium"
          py={props.px ?? "$5"}
          px={props.py ?? "$9"}
          borderRadius={props.borderRadius ?? "$md"}
          height={props.height ?? "$14"}
          width={props.width}
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
      </Show>

      <Show when={props.variant === "text"}>
        <Box
          as="button"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg="transparent"
          color={
            props.color
              ? props.color
              : {
                  base: "$meshButtonGhostText",
                  hover: "$meshButtonGhostTextHovered",
                }
          }
          fontSize="$sm"
          fontWeight="$normal"
          py="$6"
          px="$9"
          borderRadius="$md"
          height={props.height ?? "$14"}
          width={props.width}
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
      </Show>
    </>
  );
}
