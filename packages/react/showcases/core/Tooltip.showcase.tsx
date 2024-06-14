import * as React from "react";
import type { Story, StoryDefault } from "@ladle/react";

import Tooltip from "../../src/ui/tooltip";
import Button from "../../src/ui/button";
import Text from "../../src/ui/text";
import Stack from "../../src/ui/stack";

export default {
  title: "Tooltip",
  meta: {},
} satisfies StoryDefault;

export const DefaultTooltip: Story<{
  title?: string;
}> = ({ title }) => (
  <Stack justify="center" attributes={{ p: "8" }}>
    <Tooltip title={<Text color="$textInverse">{title ?? "Hello"}</Text>}>
      <Button>Hover on me</Button>
    </Tooltip>
  </Stack>
);

DefaultTooltip.argTypes = {
  title: {
    type: "string",
    control: {
      type: "text",
    },
  },
};
