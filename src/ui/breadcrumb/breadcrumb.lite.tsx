import { useDefaultProps, useMetadata } from "@builder.io/mitosis";

import Box from "../box";
import BreadcrumbItem from "./breadcrumb-item.lite";
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
      {props.links.map(({ name, href }, i) => (
        <BreadcrumbItem
          key={href}
          name={name}
          href={href}
          isLast={i === props.links.length - 1}
          onItemClick={props.onItemClick}
          gapLeft={props.gapLeft}
          primaryColor={props.primaryColor}
          secondaryColor={props.secondaryColor}
          separator={props.separator}
        />
      ))}
    </Box>
  );
}
