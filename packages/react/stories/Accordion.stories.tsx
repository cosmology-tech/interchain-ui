import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Text from "../src/ui/text";
import Accordion from "../src/ui/accordion";
import Box from "../src/ui/box";
import Icon from "../src/ui/icon";

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  title: "Accordion",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

const Trigger = ({ isExpanded = false }: { isExpanded?: boolean }) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    bg={{ base: "transparent", hover: "$cardBg" }}
    p="$6"
    cursor="pointer"
  >
    <Text fontWeight="$semibold">Section 1 title</Text>
    <Icon
      name="arrowRightRounded"
      size="$xs"
      color="$text"
      attributes={{ transform: `rotate(${isExpanded ? -90 : 90}deg)` }}
    />
  </Box>
);

const Content = () => (
  <Text attributes={{ p: "$6" }}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat.
  </Text>
);

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <Box
    width="360px"
    borderWidth="1px"
    borderStyle="$solid"
    borderColor="$inputBorder"
    borderLeftWidth={0}
    borderRightWidth={0}
  >
    {children}
  </Box>
);

export const Default: Story = {
  args: {},
  render: () => (
    <Wrapper>
      <Accordion renderTrigger={<Trigger />} renderContent={<Content />} />
    </Wrapper>
  ),
};

export const Controlled: Story = {
  args: {},
  render: () => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    return (
      <Wrapper>
        <Accordion
          renderTrigger={<Trigger />}
          renderContent={<Content />}
          isExpanded={isExpanded}
          onToggle={() => setIsExpanded((prev) => !prev)}
        />
      </Wrapper>
    );
  },
};

export const AccessInternalState: Story = {
  args: {},
  render: () => {
    return (
      <Wrapper>
        <Accordion
          renderTrigger={({ isExpanded }) => (
            <Trigger isExpanded={isExpanded} />
          )}
          renderContent={<Content />}
        />
      </Wrapper>
    );
  },
};
