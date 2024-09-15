import type { Meta, StoryObj } from "@storybook/vue3";
import Button from "../src/ui/button/button.vue";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Button",
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

export const Primary: Story = {
  args: {
    intent: "primary",
    variant: "solid",
  },
  render: (args) => ({
    components: { Button },
    setup() {
      const handleClick = () => {
        alert("Button clicked");
      };
      return { args, handleClick };
    },
    template: '<Button v-bind="args" @click="handleClick">Button</Button>',
  }),
};

export const Secondary: Story = {
  args: {
    intent: "secondary",
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Button</Button>',
  }),
};

// Add more stories for other button variants and states...
