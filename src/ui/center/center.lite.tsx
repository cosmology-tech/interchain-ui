import { useDefaultProps } from "@builder.io/mitosis";
import Box from "../box";
import type { CenterProps } from "./center.types";
import { getAxisStyles } from "./center.helper";

useDefaultProps<Partial<CenterProps>>({
  as: "div",
  axis: "both",
});

export default function Center(props: CenterProps) {
  return (
    <Box {...props} {...getAxisStyles(props.axis)}>
      {props.children}
    </Box>
  );
}
