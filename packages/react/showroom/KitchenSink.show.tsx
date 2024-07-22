import * as React from "react";
import type { Story } from "@ladle/react";
import Box from "../src/ui/box";
import Stack from "../src/ui/stack";
import Button from "../src/ui/button";

export const KitchenSink: Story = () => (
  <Box>
    <Button intent="none" variant="primary" size="sm">
      Button
    </Button>
    <Button intent="none" variant="secondary" size="sm">
      Button
    </Button>
    <Button intent="none" variant="unstyled" size="sm">
      Button
    </Button>
  </Box>
);
