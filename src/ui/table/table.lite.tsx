import { useMetadata, useDefaultProps } from "@builder.io/mitosis";
import clx from "clsx";
import Box from "../box";
import * as styles from "./table.css";
import type { TableProps } from "./table.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<TableProps>>({
  gridLayout: "auto",
});

export default function Table(props: TableProps) {
  return (
    <Box
      as="table"
      tableLayout={props.gridLayout === "auto" ? "auto" : "fixed"}
      py="$9"
      px="$11"
      {...props}
      className={clx(props.className, styles.table)}
    />
  );
}
