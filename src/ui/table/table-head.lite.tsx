import { useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import type { TableHeadProps } from "./table.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function TableHead(props: TableHeadProps) {
  return <Box as="thead" {...props} />;
}
