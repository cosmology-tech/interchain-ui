import type { Meta, StoryObj } from "@storybook/vue3";
import Button from "../../src/ui/button/button.vue";

const meta: Meta<typeof Button> = {
  title: "Core/Button",
  component: Button,
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
    onClick: () => alert("Button clicked"),
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

export const Tertiary: Story = {
  args: {
    intent: "tertiary",
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Button</Button>',
  }),
};

export const IntentSuccess: Story = {
  args: {
    intent: "success",
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Button</Button>',
  }),
};

export const IntentWarning: Story = {
  args: {
    intent: "warning",
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Button</Button>',
  }),
};

export const IntentDanger: Story = {
  args: {
    intent: "danger",
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Button</Button>',
  }),
};

export const SecondaryGhost: Story = {
  args: {
    default: "Button",
    intent: "secondary",
    variant: "ghost",
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Button</Button>',
  }),
};

export const Outlined: Story = {
  args: {
    default: "Button",
    intent: "secondary",
    variant: "outlined",
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Button</Button>',
  }),
};

export const ConnectWallet: Story = {
  args: {
    default: "Connect Wallet",
    leftIcon: "walletFilled",
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Button</Button>',
  }),
};

export const Large: Story = {
  args: {
    default: "Button",
    size: "lg",
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Button</Button>',
  }),
};

export const Middle: Story = {
  args: {
    default: "Button",
    size: "md",
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Button</Button>',
  }),
};

export const Small: Story = {
  args: {
    default: "Button",
    size: "sm",
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Button</Button>',
  }),
};

export const Unstyled: Story = {
  args: {
    variant: "unstyled",
    default: "Unbond All",
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Button</Button>',
  }),
};

export const Text: Story = {
  args: {
    default: "100%",
    intent: "text",
    size: "xs",
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Button</Button>',
  }),
};

export const Loading: Story = {
  args: {
    default: "Loading",
    isLoading: true,
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Button</Button>',
  }),
};

export const Disabled: Story = {
  args: {
    default: "Disabled",
    disabled: true,
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Button</Button>',
  }),
};

export const FluidWidth: Story = {
  args: {
    default: "Fluid Width",
    fluidWidth: true,
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Button</Button>',
  }),
};

export const Fluid: Story = {
  args: {
    default: "Fluid",
    fluid: true,
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Button</Button>',
  }),
};

export const WithRightIcon: Story = {
  args: {
    default: "Next",
    rightIcon: "walletFilled",
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Button</Button>',
  }),
};
