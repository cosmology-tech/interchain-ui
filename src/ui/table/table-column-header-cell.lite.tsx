import { useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import type { TableColumnHeaderCellProps } from "./table.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function TableColumnHeaderCell(
  props: TableColumnHeaderCellProps
) {
  return <Box as="th" paddingX="$2" paddingY="$5" {...props} />;
}
