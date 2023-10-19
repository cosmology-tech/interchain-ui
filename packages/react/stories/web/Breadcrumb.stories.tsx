import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Box from "../../src/ui/box";
import Breadcrumb from "../../src/ui/breadcrumb";
import { BreadcrumbLink } from "../../src/ui/breadcrumb/breadcrumb.types";

const meta: Meta<typeof Breadcrumb> = {
  component: Breadcrumb,
  title: "web/Breadcrumb",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

const links: BreadcrumbLink[] = [
  { name: "Home", href: "/home" },
  { name: "Learn", href: "/home/learn" },
  { name: "Build a web3 app in 5 minutes", href: "" },
];

export const Default: Story = {
  args: {
    links,
    primaryColor: "#453558",
    onItemClick: (href) => {
      if (!href) return;
      alert(href);
    },
  },
};

export const Responsive: Story = {
  render: () => {
    return (
      <Box
        width="380px"
        height="40px"
        px="$4"
        display="flex"
        alignItems="center"
        borderWidth="4px"
        borderColor="$black"
        borderStyle="$solid"
      >
        <Breadcrumb links={links} onItemClick={() => {}} width="100%" />
      </Box>
    );
  },
};
