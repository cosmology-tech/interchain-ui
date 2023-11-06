import { useDefaultProps, useMetadata } from "@builder.io/mitosis";
import clx from "clsx";
import Box from "../box";
import type { LinkProps } from "./link.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<LinkProps>>({
  as: "a",
  underline: true,
  rel: "noopener noreferrer",
});

export default function Link(props: LinkProps) {
  return (
    <Box
      as={props.as}
      className={clx(props.className)}
      fontFamily="$body"
      fontSize="$sm"
      backgroundColor={props.background ? "$cardBg" : undefined}
      p={props.background ? "$2" : undefined}
      borderRadius={props.background ? "$md" : undefined}
      color={
        props.color
          ? props.color
          : {
              base: "$link",
              hover: "$link",
            }
      }
      textDecoration={{
        base: "none",
        hover: props.underline ? "underline" : "none",
      }}
      attributes={{
        ...props.attributes,
        href: props.href,
        target: props.target,
        rel: props.rel,
      }}
    >
      {props.children}
    </Box>
  );
}
