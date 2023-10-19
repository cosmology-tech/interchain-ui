import React, { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import ProgressBar from "../src/ui/progress-bar";

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  title: "ProgressBar",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary ProgressBar */
export const Primary: Story = {
  args: {
    progress: 50,
  },
  render: (props) => {
    const [progress, setProgress] = useState(props.progress);

    useEffect(() => {
      setProgress(props.progress);
    }, [props.progress]);

    return (
      <ProgressBar
        progress={progress}
        onProgressChange={(v) => setProgress(v)}
      />
    );
  },
};
