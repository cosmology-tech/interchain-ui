import * as React from "react";
import type { Story } from "@ladle/react";
import Box from "../src/ui/box";
import Tooltip from "../src/ui/tooltip";
import Text from "../src/ui/text";
import Button from "../src/ui/button";
import type { TooltipProps } from "../src/ui/tooltip/tooltip.types";

export const DefaultTooltip: Story<{
  title: string;
  placement: TooltipProps["placement"];
  offset: TooltipProps["offset"];
  surroundPadding: TooltipProps["surroundPadding"];
}> = (props) => {
  const { title, ...rest } = props;
  return (
    <Box>
      <Tooltip
        title={
          <Text color="$text" fontSize="$sm" fontWeight="$normal">
            {props.title}
          </Text>
        }
        {...rest}
      >
        <Button>Hover me</Button>
      </Tooltip>
    </Box>
  );
};

// DefaultTooltip.meta = {
//   component: "Tooltip",
// };

DefaultTooltip.args = {
  placement: "top",
  title: "Hello world",
};

DefaultTooltip.argTypes = {
  placement: {
    options: [
      "bottom",
      "bottom-end",
      "bottom-start",
      "left",
      "left-end",
      "left-start",
      "right",
      "right-end",
      "right-start",
      "top",
      "top-end",
      "top-start",
    ] as TooltipProps["placement"][],
    control: { type: "select" },
    defaultValue: "bottom",
  },
};
