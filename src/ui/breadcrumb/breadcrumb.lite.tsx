import { useDefaultProps, useMetadata } from "@builder.io/mitosis";

import Box from "../box";
import { BreadcrumbProps } from "./breadcrumb.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<BreadcrumbProps>>({
  width: { tablet: "90%", desktop: "80%" },
  gapRight: "22px",
});

export default function Breadcrumb(props: BreadcrumbProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={props.gapRight}
      width={props.width}
      mt={props.mt}
      mb={props.mb}
    >
      {props.children}
    </Box>
  );
}
