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
    <Box as="pre" py="$10">
      {JSON.stringify(props, null, 2)}
    </Box>
  </Box>
);

DefaultButton.args = {
  label: "Hello world",
  disabled: false,
  size: "md",
  variant: "solid",
  intent: "primary",
};

DefaultButton.argTypes = {
  variant: {
    options: ["solid", "outlined", "link", "ghost", "unstyled"],
    control: { type: "select" },
    defaultValue: "solid",
  },
  intent: {
    options: ["primary", "secondary", "text", "warning", "success", "danger"],
    control: { type: "select" },
    defaultValue: "primary",
  },
  size: {
    options: ["xs", "sm", "md", "lg"],
    control: { type: "select" },
    defaultValue: "md",
  },
};
