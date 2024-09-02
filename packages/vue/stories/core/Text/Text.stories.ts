import type { Meta, StoryObj } from "@storybook/vue3";
import Text from "../../../src/ui/text/text.vue";

const meta: Meta<typeof Text> = {
  title: "Core/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "select",
      options: ["p", "span", "div", "h1", "h2", "h3", "h4", "h5", "h6"],
    },
    variant: {
      control: "select",
      options: ["body", "heading"],
    },
    fontFamily: { control: "text" },
    ellipsis: { control: "boolean" },
    underline: { control: "boolean" },
    color: { control: "color" },
    fontSize: { control: "text" },
    fontWeight: { control: "text" },
    letterSpacing: { control: "text" },
    lineHeight: { control: "text" },
    textAlign: {
      control: "select",
      options: ["left", "center", "right", "justify"],
    },
    textTransform: {
      control: "select",
      options: ["none", "capitalize", "uppercase", "lowercase"],
    },
    wordBreak: {
      control: "select",
      options: ["normal", "break-all", "keep-all", "break-word"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    components: { Text },
    setup() {
      return { args };
    },
    template: '<Text v-bind="args">This is a sample text</Text>',
  }),
};

export const Heading: Story = {
  args: {
    as: "h1",
    variant: "heading",
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args };
    },
    template: '<Text v-bind="args">This is a heading</Text>',
  }),
};

export const Ellipsis: Story = {
  args: {
    ellipsis: true,
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args };
    },
    template:
      '<Text v-bind="args">This is a very long text that will be truncated with an ellipsis</Text>',
  }),
};

export const Underline: Story = {
  args: {
    underline: true,
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args };
    },
    template: '<Text v-bind="args">This text is underlined</Text>',
  }),
};

export const CustomColor: Story = {
  args: {
    color: "$textDanger",
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args };
    },
    template:
      '<Text v-bind="args">This text is red (you can provide any CSS colors or theme tokens)</Text>',
  }),
};

export const CustomFontSize: Story = {
  args: {
    fontSize: "$10xl",
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args };
    },
    template: '<Text v-bind="args">This text has a custom font size</Text>',
  }),
};

export const CustomAlignment: Story = {
  args: {
    textAlign: "center",
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args };
    },
    template: '<Text v-bind="args">This text is center-aligned</Text>',
  }),
};
