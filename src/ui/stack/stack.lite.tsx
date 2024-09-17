import { useDefaultProps, useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import type { StackProps } from "./stack.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<StackProps>>({
  as: "div",
  direction: "horizontal",
  space: "$0",
});

export default function Stack(props: StackProps) {
  return (
    <Box
      as={props.as}
      {...props.attributes}
      boxRef={props.boxRef}
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
