import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Stack from "../../src/ui/stack";
import GovernanceRadio from "../../src/ui/governance-radio";
import GovernanceRadioGroup from "../../src/ui/governance-radio-group";

const meta: Meta<typeof GovernanceRadio> = {
  component: GovernanceRadio,
  title: "Governance/GovernanceRadio",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (props) => {
    const [value, setValue] = useState<string | undefined>(undefined);

    return (
      <GovernanceRadioGroup
        value={value}
        defaultValue="noWithVeto"
        isDisabled
        onChange={(selected) => {
          console.log("selected", selected);
          setValue(selected);
        }}
      >
        <Stack direction="horizontal" space="$6">
          <GovernanceRadio value="yes">Yes</GovernanceRadio>
          <GovernanceRadio value="no">No</GovernanceRadio>
          <GovernanceRadio value="noWithVeto">No with veto</GovernanceRadio>
          <GovernanceRadio value="abstain">Abstain</GovernanceRadio>
        </Stack>
      </GovernanceRadioGroup>
    );
  },
};
