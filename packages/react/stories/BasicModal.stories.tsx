import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import BasicModal from "../src/ui/basic-modal";
import Button from "../src/ui/button";
import Text from "../src/ui/text";

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
          <Text fontSize="$4xl" fontWeight="$semibold">
            content
          </Text>
        </BasicModal>
      </div>
    );
  },
};
