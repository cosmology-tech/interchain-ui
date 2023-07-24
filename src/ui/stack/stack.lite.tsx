import { useDefaultProps } from "@builder.io/mitosis";
import Box from "../box";
import type { StackProps } from "./stack.types";

export default function Stack(props: StackProps) {
  useDefaultProps({
    as: "div",
    direction: "horizontal",
    space: "$4",
  });

  return (
    <Box
      as={props.as}
      {...props.attributes}
      display="flex"
      flex={props.flex}
      flexDirection={props.direction === "horizontal" ? "row" : "column"}
      flexWrap={props.flexWrap}
      alignItems={props.align}
      gap={props.space}
      className={props.className}
    >
      {props.children}
    </Box>
  );
}
