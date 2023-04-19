import Box from "../box";
import type { StackProps } from "./stack.types";

export default function Stack(props: StackProps) {
  return (
    <Box
      alignItems={props.align}
      as={props.as}
      display="flex"
      flex={props.flex}
      flexDirection={props.flexDirection}
      flexWrap={props.flexWrap}
      gap={props.space}
      justifyContent={props.justify}
    >
      {props.children}
    </Box>
  );
}
