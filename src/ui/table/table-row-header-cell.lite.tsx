import { useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import type { TableRowHeaderCellProps } from "./table.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function TableRowHeaderCell(props: TableRowHeaderCellProps) {
  return <Box as="th" paddingX="$2" paddingY="$5" {...props} />;
}
