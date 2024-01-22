import { useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import type { TableCellProps } from "./table.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function TableCell(props: TableCellProps) {
  return <Box as="td" paddingX="$2" paddingY="$5" {...props} />;
}
