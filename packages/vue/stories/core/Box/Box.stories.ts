import type { Meta, StoryObj } from "@storybook/vue3";
import Box from "../../../src/ui/box/box.vue";

const meta = {
  title: "Core/Box",
  component: Box,
  tags: ["autodocs"],
  argTypes: {
    as: { control: "text" },
    className: { control: "text" },
    backgroundColor: { control: "color" },
    padding: { control: "text" },
    margin: { control: "text" },
    borderRadius: { control: "text" },
    rawCSS: { control: "object" },
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default Box",
  },
};

export const CustomElement: Story = {
  args: {
    as: "section",
    children: "Box as section",
  },
};

export const WithStyles: Story = {
  args: {
    backgroundColor: "blue",
    padding: "1rem",
    margin: "1rem",
    borderRadius: "0.5rem",
    children: "Styled Box",
  },
};

export const WithRawCSS: Story = {
  args: {
    rawCSS: { fontWeight: "bold", textDecoration: "underline" },
    children: "Box with raw CSS",
  },
};

export const WithClassName: Story = {
  args: {
    className: "custom-class",
    children: "Box with custom class",
  },
};
