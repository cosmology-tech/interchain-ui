import { useDefaultProps, Show, useStore } from "@builder.io/mitosis";
import clx from "clsx";
import Box from "../box";
import Text from "../text";
import type { BreadcrumbItemProps } from "./breadcrumb.types";
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
      as={props.as ?? "a"}
      display="flex"
      alignItems="center"
      gap={props.gapLeft}
      fontWeight="$medium"
      lineHeight="$normal"
      textDecoration="none"
      attributes={{
        href: props.href,
        download: props.download,
        ref: props.linkRef,
        target: props.target,
        type: props.type,
      }}
    >
      <Box
        as="span"
        className={clx({
          [styles.lineClamp]: props.isLast,
        })}
        whiteSpace={props.isLast ? "normal" : "nowrap"}
      >
        <Text
          as="span"
          color={{
            //@ts-expect-error
            base: props.isLast ? props.primaryColor : props.secondaryColor,
            //@ts-expect-error
            hover: props.primaryColor,
          }}
          className={clx({
            [styles.pointer]: props.isLast,
          })}
          fontSize="$md"
        >
          {props.name}
        </Text>
      </Box>

      <Show when={!props.isLast}>
        <Text color={props.secondaryColor} fontSize="$md">
          {props.separator}
        </Text>
      </Show>
    </Box>
  );
}
