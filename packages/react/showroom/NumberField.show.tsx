import * as React from "react";
import type { Story } from "@ladle/react";
import Box from "../src/ui/box";
import Button from "../src/ui/button";
import Text from "../src/ui/text";
import NumberField from "../src/ui/number-field";
import Avatar from "../src/ui/avatar";
import {
  NumberFieldIntent,
  NumberFieldSize,
  NumberFieldTextAlignment,
} from "../src/ui/number-field/number-field.types";

export const DefaultNumberField: Story<{
  width: number;
  borderless?: boolean;
  canIncrement?: boolean;
  canDecrement?: boolean;
  clampValueOnBlur?: boolean;
  minValue: number;
  maxValue: number;
  textAlign: NumberFieldTextAlignment;
  label: string;
  placeholder: string;
  disabled: boolean;
  size: NumberFieldSize;
  intent: NumberFieldIntent;
}> = (props) => {
  const [value, setValue] = React.useState(0);

  return (
    <Box maxWidth={props.width ? `${props.width}px` : "unset"}>
      <NumberField
        id="my-num-input1"
        label={props.label}
        placeholder={props.placeholder}
        disabled={props.disabled}
        size={props.size}
        intent={props.intent}
        value={value}
        canDecrement={props.canDecrement}
        canIncrement={props.canIncrement}
        borderless={props.borderless}
        textAlign={props.textAlign}
        clampValueOnBlur={props.clampValueOnBlur}
        decrementButton={
          <Button
            size="xs"
            variant="unstyled"
            leftIcon="minusRound"
            onClick={() => setValue(value - 1)}
          />
        }
        incrementButton={
          <Button
            size="xs"
            variant="unstyled"
            leftIcon="plusRound"
            onClick={() => setValue(value + 1)}
          />
        }
        onChange={(value) => {
          console.log("[sb1] Change", value);
          setValue(value);
        }}
      />

      <Box as="pre" py="$10" color="$text">
        <br />
        {JSON.stringify(props, null, 2)}
      </Box>
    </Box>
  );
};

DefaultNumberField.args = {
  label: "Enter ATOM amount you want to stake",
  placeholder: "Your amount",
  disabled: false,
  size: "sm",
  intent: "none",
  width: 300,
  minValue: 0,
  maxValue: 2000,
  borderless: false,
  canIncrement: true,
  canDecrement: true,
  textAlign: "right",
};

DefaultNumberField.argTypes = {
  intent: {
    options: ["none", "error"] satisfies NumberFieldIntent[],
    control: { type: "select" },
    defaultValue: "none",
  },
  size: {
    options: ["sm", "md"] satisfies NumberFieldSize[],
    control: { type: "select" },
    defaultValue: "sm",
  },
  textAlign: {
    options: ["left", "center", "right"] satisfies NumberFieldTextAlignment[],
    control: { type: "select" },
    defaultValue: "right",
  },
  borderless: {
    control: { type: "boolean" },
    defaultValue: false,
  },
  canDecrement: {
    control: { type: "boolean" },
    defaultValue: false,
  },
  canIncrement: {
    control: { type: "boolean" },
    defaultValue: false,
  },
  clampValueOnBlur: {
    control: { type: "boolean" },
    defaultValue: true,
  },
  width: {
    control: { type: "number" },
  },
};
