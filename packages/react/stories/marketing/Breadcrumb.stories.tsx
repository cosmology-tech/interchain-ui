import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Box from "../../src/ui/box";
import Breadcrumb from "../../src/ui/breadcrumb";
import BreadcrumbItem from "../../src/ui/breadcrumb/breadcrumb-item";
import {
  BreadcrumbLink,
  BreadcrumbItemProps,
} from "../../src/ui/breadcrumb/breadcrumb.types";

const meta: Meta<typeof Breadcrumb> = {
  component: Breadcrumb,
  title: "marketing/Breadcrumb",
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
  render: () => {
    return (
      <Breadcrumb width="100%">
        {links.map((link, index) => (
          <BreadcrumbItem
            key={link.href}
            name={link.name}
            href={link.href}
            isLast={index === links.length - 1}
            onClick={() => {
              console.log("clicked", link.href);
            }}
          />
        ))}
      </Breadcrumb>
    );
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
        <Breadcrumb width="100%">
          {links.map((link, index) => (
            <BreadcrumbItem
              key={link.href}
              name={link.name}
              href={link.href}
              isLast={index === links.length - 1}
              onClick={() => {
                console.log("clicked", link.href);
              }}
            />
          ))}
        </Breadcrumb>
      </Box>
    );
  },
};

const LinkWrapper = ({ ...otherProps }: BreadcrumbItemProps) => {
  return (
    <p
      style={{
        border: "1px solid red",
      }}
    >
      <BreadcrumbItem
        key={otherProps.href}
        name={otherProps.name}
        href={otherProps.href}
        isLast={otherProps.isLast}
        onClick={() => {
          console.log("clicked", otherProps.href);
        }}
      />
    </p>
  );
};

export const DecoratedLink: Story = {
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
        <Breadcrumb width="100%">
          {links.map((link, index) => (
            <LinkWrapper
              key={link.href}
              name={link.name}
              href={link.href}
              isLast={index === links.length - 1}
              onClick={() => {
                console.log("clicked", link.href);
              }}
            />
          ))}
        </Breadcrumb>
      </Box>
    );
  },
};
