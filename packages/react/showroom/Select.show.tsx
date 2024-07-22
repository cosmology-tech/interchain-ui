import * as React from "react";
import type { Story } from "@ladle/react";
import Box from "../src/ui/box";
import Select from "../src/ui/select";
import SelectOption from "../src/ui/select-option/select-option";
import { SelectProps } from "../src/ui/select/select";
import SelectButton from "../src/ui/select-button";
import { SelectButtonProps } from "../src/ui/select-button/select-button.types";

export const DefaultSelectButton: Story<{
  width: number;
  placeholder: string;
  disabled: boolean;
  active: boolean;
  intent: SelectButtonProps["intent"];
  size: SelectButtonProps["size"];
}> = (props) => (
  <Box>
    <Box width={`${props.width}px`}>
      <SelectButton
        placeholder={props.placeholder}
        disabled={props.disabled}
        active={props.active}
        intent={props.intent}
        size={props.size}
      />
    </Box>

    <Box as="pre" py="$10" color="$text">
      <br />
      {JSON.stringify(props, null, 2)}
    </Box>
  </Box>
);

DefaultSelectButton.args = {
  placeholder: "Select a name option",
  disabled: false,
  size: "sm",
  intent: "none",
};

DefaultSelectButton.argTypes = {
  width: {
    control: { type: "number" },
    defaultValue: 200,
  },
  intent: {
    options: ["none", "warning", "success", "danger"] as Array<
      SelectButtonProps["intent"]
    >,
    control: { type: "select" },
    defaultValue: "none",
  },
  size: {
    options: ["xs", "sm", "md", "lg"] as Array<SelectButtonProps["size"]>,
    control: { type: "select" },
    defaultValue: "sm",
  },
};

export const DefaultSelect: Story<{
  width: number;
  placeholder: string;
  disabled: boolean;
  intent: SelectButtonProps["intent"];
  size: SelectButtonProps["size"];
}> = (props) => (
  <Box>
    <Select
      width={props.width}
      optionsWidth={props.width}
      label="Favorite Animal"
    >
      <SelectOption optionKey="Red Panda" label="Red Panda">
        Red Panda
      </SelectOption>
      <SelectOption optionKey="Cat" label="Cat" isDisabled>
        Cat
      </SelectOption>
      <SelectOption optionKey="Dog" label="Dog">
        Dog
      </SelectOption>
      <SelectOption optionKey="Aardvark" label="Aardvark">
        Aardvark
      </SelectOption>
      <SelectOption optionKey="Kangaroo" label="Kangaroo">
        Kangaroo
      </SelectOption>
      <SelectOption optionKey="Snake" label="Snake">
        Snake
      </SelectOption>
    </Select>

    <Box as="pre" py="$10" color="$text">
      <br />
      {JSON.stringify(props, null, 2)}
    </Box>
  </Box>
);

DefaultSelect.args = {
  placeholder: "Select a name option",
  disabled: false,
  size: "sm",
  intent: "none",
};

DefaultSelect.argTypes = {
  width: {
    control: { type: "number" },
    defaultValue: 200,
  },
  intent: {
    options: ["none", "warning", "success", "danger"] as Array<
      SelectButtonProps["intent"]
    >,
    control: { type: "select" },
    defaultValue: "none",
  },
  size: {
    options: ["xs", "sm", "md", "lg"] as Array<SelectButtonProps["size"]>,
    control: { type: "select" },
    defaultValue: "sm",
  },
};
