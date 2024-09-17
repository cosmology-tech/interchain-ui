import type { Meta, StoryObj } from "@storybook/vue3";
import Button from "../src/ui/button/button.vue";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Core/Button",
  tags: ["autodocs"],
  argTypes: {
    intent: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "success",
        "warning",
        "danger",
        "text",
      ],
    },
    variant: {
      control: "select",
      options: ["solid", "ghost", "outlined", "unstyled"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    isLoading: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    fluidWidth: {
      control: "boolean",
    },
    fluid: {
      control: "boolean",
    },
    leftIcon: {
      control: "text",
    },
    rightIcon: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

const handleClick = () => {
  alert("Button clicked");
};

export const Primary: Story = {
  args: {
    intent: "primary",
    variant: "solid",
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args, handleClick };
    },
    template:
      '<Button v-bind="args" @onClick="handleClick">Primary Button</Button>',
  }),
};

export const Secondary: Story = {
  args: {
    intent: "secondary",
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args, handleClick };
    },
    template:
      '<Button v-bind="args" @click="handleClick">Secondary Button</Button>',
  }),
};

export const Tertiary: Story = {
  args: {
    intent: "tertiary",
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args, handleClick };
    },
    template:
      '<Button v-bind="args" @click="handleClick">Tertiary Button</Button>',
  }),
};

export const Success: Story = {
  args: {
    intent: "success",
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args, handleClick };
    },
    template:
      '<Button v-bind="args" @click="handleClick">Success Button</Button>',
  }),
};

export const Warning: Story = {
  args: {
    intent: "warning",
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args, handleClick };
    },
    template:
      '<Button v-bind="args" @click="handleClick">Warning Button</Button>',
  }),
};

export const Danger: Story = {
  args: {
    intent: "danger",
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args, handleClick };
    },
    template:
      '<Button v-bind="args" @click="handleClick">Danger Button</Button>',
  }),
};

export const Text: Story = {
  args: {
    intent: "text",
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args, handleClick };
    },
    template: '<Button v-bind="args" @click="handleClick">Text Button</Button>',
  }),
};
