import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Box from "../../src/ui/box";
import Stack from "../../src/ui/stack";
import Text from "../../src/ui/text";
import Button from "../../src/ui/button";
import Divider from "../../src/ui/divider";

import Table from "../../src/ui/table";
import TableHead from "../../src/ui/table/table-head";
import TableBody from "../../src/ui/table/table-body";
import TableRow from "../../src/ui/table/table-row";
import TableCell from "../../src/ui/table/table-cell";
import TableColumnHeaderCell from "../../src/ui/table/table-column-header-cell";
import TableRowHeaderCell from "../../src/ui/table/table-row-header-cell";

import useColorModeValue from "../../src/ui/hooks/use-color-mode-value";

import type { GridColumn } from "../../src/index";

const heroImage = `https://picsum.photos/id/237/1000/1000`;

const meta: Meta<typeof Box> = {
  component: Box,
  title: "Layouts",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const TwoColumnHeroSection: Story = {
  args: {},
  render: (props) => {
    return (
      <Box
        display={{
          mobile: "block",
          tablet: "flex",
        }}
        gap={{
          mdMobile: "$12",
          tablet: "$24",
          desktop: "$30",
        }}
        justifyContent="center"
        alignItems="flex-start"
      >
        <Stack
          direction="vertical"
          space="$4"
          attributes={{
            marginBottom: {
              mobile: "$10",
              tablet: "0",
            },
          }}
        >
          <Box>
            <Box
              bg="$background"
              display="inline-block"
              px="$4"
              py="$2"
              borderRadius="$md"
            >
              <Text fontSize="$sm" fontWeight="$semibold" as="h2">
                Introducing
              </Text>
            </Box>
          </Box>

          <Text
            fontSize={{
              mobile: "$4xl",
              tablet: "$10xl",
            }}
            fontWeight="$semibold"
            lineHeight="$short"
          >
            Meet Jane Smith
          </Text>

          <Text fontSize="$md" color="$textSecondary">
            Jane Smith is a dynamic and innovative entrepreneur with a passion
            for creating successful businesses. With over 15 years of experience
            in various industries, Jane has established a reputation for her
            ability to identify market opportunities and turn them into
            profitable ventures.Jane holds a Bachelor's degree in Business
            Administration and has completed several executive education
            programs at top-tier institutions. She is known for her strong
            leadership skills, strategic thinking, and ability to build and
            motivate high-performing teams.
          </Text>
        </Stack>

        <Box
          as="img"
          borderRadius="$lg"
          width="100%"
          objectFit="cover"
          height={{
            mobile: "400px",
            desktop: "600px",
          }}
          aspectRatio="auto 1"
          attributes={{
            src: heroImage,
            alt: "Jane Smith",
          }}
        />
      </Box>
    );
  },
};

export const TwoColumnCTAHeroSection: Story = {
  args: {},
  render: (props) => {
    return (
      <Box
        display={{
          mobile: "block",
          tablet: "flex",
        }}
        gap={{
          mdMobile: "$12",
          tablet: "$24",
          desktop: "$30",
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          direction="vertical"
          space="$4"
          attributes={{
            marginBottom: {
              mobile: "$10",
              tablet: "0",
            },
          }}
        >
          <Text
            fontSize={{
              mobile: "$4xl",
              tablet: "$12xl",
            }}
            fontWeight="$bold"
            lineHeight="$shorter"
          >
            The complete platform for building the Web
          </Text>

          <Text fontSize="$md" color="$textSecondary">
            Give your team the toolkit to stop configuring and start innovating.
            Securely build, deploy, and scale the best web experiences.
          </Text>

          <Stack
            direction="horizontal"
            space="$8"
            attributes={{
              paddingTop: "$8",
            }}
          >
            <Button variant="solid" intent="tertiary">
              Get started
            </Button>

            <Button intent="text">Contact sales</Button>
          </Stack>
        </Stack>

        <Box
          as="img"
          borderRadius="$lg"
          width="100%"
          objectFit="cover"
          height={{
            mobile: "300px",
            mdMobile: "400px",
            tablet: "500px",
            desktop: "700px",
          }}
          aspectRatio="auto 1"
          attributes={{
            src: heroImage,
            alt: "Jane Smith",
          }}
        />
      </Box>
    );
  },
};

type Table1RowDataDef = {
  field: string;
  value: string;
  onUpdate: () => void;
};

const table1 = {
  columns: [
    {
      id: "field",
      width: "200px",
      align: "left",
      label: "Field",
    },
    {
      id: "name",
      width: "400px",
      align: "left",
      label: "Name",
    },
    {
      id: "action",
      width: "200px",
      align: "center",
    },
  ] as GridColumn[],
  data: [
    {
      field: "Full name",
      value: "Tom Cook",
      onUpdate: () => {
        console.log("update Tom Cook");
      },
    },
    {
      field: "Email address",
      value: "tom.cook@example.com",
      onUpdate: () => {
        console.log("update email address");
      },
    },
    {
      field: "Job title",
      value: "Head of Marketing",
      onUpdate: () => {
        console.log("update job title");
      },
    },
  ] as Table1RowDataDef[],
};

export const DataTableWithSections: Story = {
  args: {},
  render: (props) => {
    return (
      <Stack
        direction="vertical"
        space="$8"
        attributes={{
          maxWidth: "700px",
        }}
      >
        <Box as="section">
          <Text as="h2">Profile</Text>

          <Text>
            This information will be displayed publicly so be careful what you
            share.
          </Text>

          <Divider marginY="$8" />

          <Table borderCollapse="collapse">
            <TableHead>
              <TableRow>
                {table1.columns.map((column) => (
                  <TableColumnHeaderCell
                    key={column.id}
                    width={column.width}
                    textAlign={column.align}
                  >
                    {column.label && (
                      <Text
                        fontSize="$sm"
                        fontWeight="$normal"
                        color="$textSecondary"
                      >
                        {column.label}
                      </Text>
                    )}
                  </TableColumnHeaderCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {table1.data.map((row, rowIndex) => (
                <TableRow
                  key={row.field}
                  borderBottomWidth={
                    rowIndex === table1.data.length - 1 ? "0px" : "1px"
                  }
                  borderBottomColor={useColorModeValue("$gray200", "$divider")}
                  borderBottomStyle="solid"
                >
                  <TableRowHeaderCell>
                    <Text
                      fontSize="$sm"
                      fontWeight="$semibold"
                      textAlign="left"
                    >
                      {row.field}
                    </Text>
                  </TableRowHeaderCell>

                  <TableCell>
                    <Text fontSize="$sm">{row.value}</Text>
                  </TableCell>

                  <TableCell>
                    <Box display="flex" justifyContent="flex-end">
                      <Button
                        size="sm"
                        variant="ghost"
                        intent="secondary"
                        onClick={row.onUpdate}
                      >
                        Update
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Stack>
    );
  },
};
