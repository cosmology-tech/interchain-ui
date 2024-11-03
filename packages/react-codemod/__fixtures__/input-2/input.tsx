import * as React from "react";
import Box from "../box";
import type { StackProps } from "./stack.types";

function Stack(props: StackProps) {
  return (
    <Box
      display="flex"
      as={props.as}
      {...props.attributes}
      boxRef={props.boxRef}
      flexDirection={props.direction === "horizontal" ? "row" : "column"}
      gap={props.space}
      attributes={props.domAttributes}
      className={props.className}
    >
      {props.children}
    </Box>
  );
}

Stack.defaultProps = { as: "div", direction: "horizontal", space: "$0" };

export default Stack;
