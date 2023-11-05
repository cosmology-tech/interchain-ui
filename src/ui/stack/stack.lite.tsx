import { useDefaultProps, useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import type { StackProps } from "./stack.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function Stack(props: StackProps) {
  useDefaultProps({
    as: "div",
    direction: "horizontal",
    space: "$0",
  });

  return (
    <Box
      as={props.as}
      {...props.attributes}
      ref={props.boxRef}
      display="flex"
      flexDirection={props.direction === "horizontal" ? "row" : "column"}
      gap={props.space}
      className={props.className}
      attributes={props.domAttributes}
    >
      {props.children}
    </Box>
  );
}
