import { useDefaultProps, useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import { DividerProps } from "./divider.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<DividerProps>({
  orientation: "horizontal",
});

export default function Divider(props: DividerProps) {
  return (
    <Box
      width={props?.orientation === "horizontal" ? "100%" : "1px"}
      height={props?.orientation === "horizontal" ? "1px" : "100%"}
      backgroundColor="$inputBorder"
      {...props}
    />
  );
}
