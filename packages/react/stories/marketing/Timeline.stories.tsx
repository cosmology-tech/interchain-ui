import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Box from "../../src/ui/box";
import Timeline from "../../src/ui/timeline";

const meta: Meta<typeof Timeline> = {
  component: Timeline,
  title: "marketing/Timeline",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render() {
    return (
      <Box height="1200px">
        <Timeline
          events={[
            {
              timestamp: "2017-2018",
              title: "Cosmology project initiated",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae diam eget risus varius blandit sit amet non magna.",
            },
            {
              timestamp: "July - Sept, 2019",
              title:
                "Cosmology participates in Based Chads Accelerator Of The Century",
            },
            {
              timestamp: "Nov 2019 - Mar 2021",
              title:
                "Cosmology CHAD token is created and distributed to Based Chads",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae diam eget risus varius blandit sit amet non magna.",
            },
            {
              timestamp: "Jan 2021",
              title:
                "Cosmology created the first ever NFT based on the CHAD token",
            },
            {
              timestamp: "June 2022",
              title: "Launch of $CHAD token on the Osmosis swap platform",
            },
          ]}
        />
      </Box>
    );
  },
};
