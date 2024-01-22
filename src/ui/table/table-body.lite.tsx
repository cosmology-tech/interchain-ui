import { useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import type { TableBodyProps } from "./table.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function TableBody(props: TableBodyProps) {
  return <Box as="tbody" {...props} />;
}
