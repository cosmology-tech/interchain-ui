import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import MeshModal from "../../src/ui/mesh-modal";
import Button from "../../src/ui/button";
import Text from "../../src/ui/text";

const meta: Meta<typeof MeshModal> = {
  component: MeshModal,
  title: "mesh/MeshModal",
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
        <MeshModal
          renderTrigger={(triggerProps = {}) => (
            <Button {...triggerProps} onClick={() => setIsOpen(true)}>
              open
            </Button>
          )}
          isOpen={isOpen}
          title="Mesh security"
          onClose={() => setIsOpen(false)}
        >
          <Text fontSize="$4xl" fontWeight="$semibold">
            content
          </Text>
        </MeshModal>
      </div>
    );
  },
};
