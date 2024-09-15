import type { Meta, StoryObj } from "@storybook/vue3";
import FieldLabel from "../src/ui/field-label/field-label.vue";

const meta: Meta<typeof FieldLabel> = {
  component: FieldLabel,
  title: "FieldLabel",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof FieldLabel>;

export const Primary: Story = {
  args: {
    label: "Username",
    htmlFor: "username-input",
  },
  render: (args) => ({
    components: { FieldLabel },
    setup() {
      return { args };
    },
    template: `
      <div>
        <FieldLabel v-bind="args" />
        <input id="username-input" type="text" />
      </div>
    `,
  }),
};
