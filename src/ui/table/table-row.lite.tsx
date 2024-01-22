import { useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import type { TableRowProps } from "./table.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function TableRow(props: TableRowProps) {
  return <Box as="tr" {...props} />;
}
