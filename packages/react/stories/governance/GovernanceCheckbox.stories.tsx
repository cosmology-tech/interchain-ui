import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Stack from "../../src/ui/stack";
import GovernanceCheckbox from "../../src/ui/governance-checkbox";

const meta: Meta<typeof GovernanceCheckbox> = {
  component: GovernanceCheckbox,
  title: "Governance/GovernanceCheckbox",
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
      <Stack direction="vertical" space="$4">
        <GovernanceCheckbox isIndeterminate>Pending</GovernanceCheckbox>
        <GovernanceCheckbox isSelected>Passed</GovernanceCheckbox>
        <GovernanceCheckbox isRejected>Rejected</GovernanceCheckbox>
      </Stack>
    );
  },
};
