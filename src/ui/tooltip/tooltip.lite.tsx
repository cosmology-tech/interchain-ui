import { useStore, useDefaultProps } from "@builder.io/mitosis";
import clsx from "clsx";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import { variants } from "./tooltip.css";

import * as styles from "./tooltip.css";
import { TooltipProps } from "./tooltip.types";

export default function Tooltip(props: TooltipProps) {
  useDefaultProps({
    placement: "top",
  });
  const state = useStore<{
    hovered: boolean;
  }>({
    hovered: false,
  });
  return (
    <Box
      className={styles.tooltip}
      attributes={{
        onMouseEnter: () => (state.hovered = true),
        onMouseLeave: () => (state.hovered = false),
      }}
    >
      {props?.children}
      <Stack
        justify="center"
        align="center"
        attributes={{ width: "full" }}
        className={clsx(
          styles.tooltiptext,
          variants({
            placement: props.placement,
          }),
          {
            [styles.hovered]: state.hovered,
          }
        )}
      >
        <Box p="3" backgroundColor="text" borderRadius="md">
          <Text color="progressBg">{props.title}</Text>
        </Box>
      </Stack>
    </Box>
  );
}
