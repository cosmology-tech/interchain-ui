import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { BasicModal, Button, Text } from "../src";
// import BasicModal from '../scaffolds/modal/modal'

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
        <Button onClick={() => setIsOpen(true)}>open</Button>
        <BasicModal
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
