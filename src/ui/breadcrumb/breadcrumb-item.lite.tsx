import { useDefaultProps } from "@builder.io/mitosis";

import Box from "../box";
import Text from "../text";
import { BreadcrumbItemProps } from "./breadcrumb.types";
import * as styles from "./breadcrumb.css";

useDefaultProps<Partial<BreadcrumbItemProps>>({
  isLast: false,
  gapLeft: "16px",
  primaryColor: "$text",
  secondaryColor: "$textSecondary",
  separator: "/",
});

export default function BreadcrumbItem(props: BreadcrumbItemProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={props.gapLeft}
      fontWeight="$medium"
      lineHeight="$normal"
    >
      <Box
        attributes={{ onClick: () => props.onItemClick(props.href) }}
        className={props.isLast ? styles.lineClamp : ""}
        whiteSpace={props.isLast ? "normal" : "nowrap"}
      >
        <Text
          color={{
            //@ts-expect-error
            base: props.isLast ? props.primaryColor : props.secondaryColor,
            //@ts-expect-error
            hover: props.primaryColor,
          }}
          className={props.isLast ? "" : styles.pointer}
          fontSize="$md"
        >
          {props.name}
        </Text>
      </Box>
      {!props.isLast && (
        <Text color={props.secondaryColor} fontSize="$md">
          {props.separator}
        </Text>
      )}
    </Box>
  );
}
