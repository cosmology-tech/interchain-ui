import Box from "../box";
import { DividerProps } from "./divider.types";

export default function Divider(props: DividerProps) {
  return (
    <Box width="100%" height="1px" backgroundColor="$inputBorder" {...props} />
  );
}
