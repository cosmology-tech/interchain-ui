import * as React from "react";
import type { Story } from "@ladle/react";
import Box from "../src/ui/box";
import Text from "../src/ui/text";
import TextField from "../src/ui/text-field";
import Avatar from "../src/ui/avatar";
import {
  TextFieldIntent,
  TextFieldSize,
  TextFieldElementType,
} from "../src/ui/text-field/text-field.types";
import COSMOS_LOGO_URL from "../static/networks/Cosmos.png";

export const DefaultTextField: Story<{
  renderAs: TextFieldElementType;
  width: number;
  label: string;
  placeholder: string;
  disabled: boolean;
  size: TextFieldSize;
  intent: TextFieldIntent;
}> = (props) => {
  const [value, setValue] = React.useState("");

  return (
    <Box maxWidth={props.width ? `${props.width}px` : "unset"}>
      <TextField
        id="address"
        as={props.renderAs ?? "input"}
        label={props.label}
        placeholder={props.placeholder}
        disabled={props.disabled}
        size={props.size}
        intent={props.intent}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        startAddon={<Avatar src={COSMOS_LOGO_URL} name="cosmos" size="xs" />}
        endAddon={
          <Text fontSize="$sm" color="$textSecondary">
            Autofill
          </Text>
        }
      />

      <Box as="pre" py="$10" color="$text">
        <br />
        {JSON.stringify(props, null, 2)}
      </Box>
    </Box>
  );
};

DefaultTextField.args = {
  label: "Enter ATOM address",
  placeholder: "Your address here...",
  disabled: false,
  size: "sm",
  intent: "none",
  width: 300,
  renderAs: "input",
};

DefaultTextField.argTypes = {
  intent: {
    options: ["none", "error"] satisfies TextFieldIntent[],
    control: { type: "select" },
    defaultValue: "none",
  },
  size: {
    options: ["sm", "md"] satisfies TextFieldSize[],
    control: { type: "select" },
    defaultValue: "sm",
  },
  renderAs: {
    options: ["input", "textarea"] satisfies TextFieldElementType[],
    control: { type: "select" },
    defaultValue: "input",
  },
  width: {
    control: { type: "number" },
  },
};
