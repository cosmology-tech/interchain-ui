import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Box from "../../src/ui/box";
import Timeline from "../../src/ui/timeline";
import Avatar from "../../src/ui/avatar";

const meta: Meta<typeof Timeline> = {
  component: Timeline,
  title: "marketing/Timeline",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

const dimensions = {
  one: {
    width: 320,
    height: 180,
  },
  two: {
    width: 240,
    height: 120,
  },
};

const SecondaryContent = () => {
  const randomDimension = Math.random() < 0.5 ? dimensions.one : dimensions.two;

  return (
    <Box
      as="img"
      width={randomDimension.width}
      height={randomDimension.height}
      borderRadius="$md"
      display="flex"
      justifyContent="center"
      alignItems="center"
      attributes={{
        src: `https://picsum.photos/${randomDimension.width}/${randomDimension.height}`,
        alt: "Random image",
        "data-testid": "secondary-content",
      }}
    />
  );
};

export const Default: Story = {
  render() {
    return (
      <Box paddingBottom="$24">
        <Timeline
          events={[
            {
              timestamp: "2017-2018",
              title: "Cosmology project initiated",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae diam eget risus varius blandit sit amet non magna.",
              secondaryContent: <SecondaryContent />,
            },
            {
              timestamp: "July - Sept, 2019",
              title:
                "Cosmology participates in Based Chads Accelerator Of The Century",
              secondaryContent: <SecondaryContent />,
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
              secondaryContent: <SecondaryContent />,
            },
            {
              timestamp: "June 2022",
              secondaryContent: <SecondaryContent />,
              title: "Launch of $CHAD token on the Osmosis swap platform",
            },
            {
              timestamp: "June 2023",
              customContent: (
                <Box
                  display="flex"
                  gap="$8"
                  justifyContent="center"
                  alignItems="center"
                >
                  <span>Custom content render</span>
                  <Avatar
                    name="Abu Da"
                    size="sm"
                    src="https://picsum.photos/id/237/200/200"
                  />
                </Box>
              ),
            },
            {
              timestamp: "Sept 2023",
              title: "Cosmology introduces AI-powered trading algorithms",
              description:
                "Revolutionary machine learning models optimize trading strategies for $CHAD token holders.",
              secondaryContent: <SecondaryContent />,
            },
            {
              timestamp: "Feb 2024",
              title:
                "Launch of Cosmology DEX: The first interplanetary decentralized exchange",
              description:
                "Enabling seamless crypto transactions across Earth, Mars, and beyond.",
              secondaryContent: <SecondaryContent />,
            },
          ]}
        />
      </Box>
    );
  },
};
