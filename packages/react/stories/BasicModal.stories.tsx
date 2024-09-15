import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import BasicModal from "../src/ui/basic-modal";
import Box from "../src/ui/box";
import Button from "../src/ui/button";
import Text from "../src/ui/text";
import Select from "../src/ui/select";
import SelectOption from "../src/ui/select-option";

const meta: Meta<typeof BasicModal> = {
  component: BasicModal,
  title: "BasicModal",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <BasicModal
          closeOnClickaway
          renderTrigger={(triggerProps = {}) => (
            <Button {...triggerProps} onClick={() => setIsOpen(true)}>
              open
            </Button>
          )}
          isOpen={isOpen}
          title="List for Sale"
          onClose={() => setIsOpen(false)}
        >
          <Box>
            <Text fontSize="$4xl" fontWeight="$semibold">
              content
            </Text>
          </Box>
        </BasicModal>
      </div>
    );
  },
};

export const WithOverlayElements: Story = {
  args: {},
  render: (props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <BasicModal
          closeOnClickaway
          renderTrigger={(triggerProps = {}) => (
            <Button {...triggerProps} onClick={() => setIsOpen(true)}>
              open
            </Button>
          )}
          isOpen={isOpen}
          title="Open form"
          onClose={() => setIsOpen(false)}
        >
          <Text fontSize="$4xl" fontWeight="$semibold">
            Form content
          </Text>

          <Select width={300} optionsWidth={500} label="Favorite Animal">
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
        </BasicModal>
      </div>
    );
  },
};
