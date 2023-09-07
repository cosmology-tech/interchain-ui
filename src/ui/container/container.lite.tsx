import { useDefaultProps } from "@builder.io/mitosis";
import Box from "../box";
import type { ContainerProps } from "./container.types";

export default function Container(props: ContainerProps) {
  useDefaultProps({
    maxWidth: "prose",
  });

  return (
    <Box
      width="$full"
      maxWidth={props.maxWidth}
      marginX="auto"
      paddingX="$8"
      attributes={props.attributes}
    >
      {props.children}
    </Box>
  );
}
