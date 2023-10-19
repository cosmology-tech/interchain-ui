import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import BondingMore from "../../../src/ui/bonding-more";
import BasicModal from "../../../src/ui/basic-modal";
import Button from "../../../src/ui/button";

const meta: Meta<typeof BondingMore> = {
  component: BondingMore,
  title: "Pool/PoolDetail/BondingMore",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    available: "2.1792",
    bondingName: "ATOM / OSMO",
    onBond() {
      console.log("onBond");
    },
    onChange(value) {
      console.log("onChange", value);
    },
  },
  render: (props) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <BasicModal
        renderTrigger={(triggerProps) => (
          <Button {...triggerProps} onClick={() => setIsOpen(true)}>
            Bond more
          </Button>
        )}
        isOpen={isOpen}
        title="Bond more"
        onClose={() => setIsOpen(false)}
      >
        <BondingMore {...props} />
      </BasicModal>
    );
  },
};
