import * as React from "react";
import type { Story } from "@ladle/react";
import Box from "../src/ui/box";
import Button from "../src/ui/button";
import {
  ButtonSize,
  ButtonVariant,
  ButtonIntent,
} from "../src/ui/button/button.types";

export const DefaultButton: Story<{
  label: string;
  disabled: boolean;
  size: ButtonSize;
  variant: ButtonVariant;
  intent: ButtonIntent;
}> = (props) => (
  <Box>
    <Button
      intent={props.intent}
      variant={props.variant}
      size={props.size}
      disabled={props.disabled}
    >
      {props.label}
    </Button>

    <Box as="pre" py="$10" color="$text">
      <br />
      {JSON.stringify(props, null, 2)}
    </Box>
  </Box>
);

DefaultButton.args = {
  label: "Hello world",
  disabled: false,
  size: "md",
  variant: "primary",
  intent: "none",
};

DefaultButton.argTypes = {
  variant: {
    options: ["primary", "secondary", "unstyled"] as ButtonVariant[],
    control: { type: "select" },
    defaultValue: "primary",
  },
  intent: {
    options: ["none", "warning", "success", "danger"] as ButtonIntent[],
    control: { type: "select" },
    defaultValue: "none",
  },
  size: {
    options: ["xs", "sm", "md", "lg"] as ButtonSize[],
    control: { type: "select" },
    defaultValue: "md",
  },
};