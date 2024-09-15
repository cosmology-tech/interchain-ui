import type { Meta, StoryObj } from "@storybook/vue3";
import Toast from "../src/ui/toast/toast.vue";
import Button from "../src/ui/button/button.vue";
import { ref } from "vue";

const meta: Meta<typeof Toast> = {
  component: Toast,
  title: "Toast",
  tags: ["autodocs"],
  argTypes: {
    message: { control: "text" },
    type: {
      control: "select",
      options: ["info", "success", "warning", "error"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Primary: Story = {
  args: {
    message: "This is a toast message",
    type: "info",
  },
  render: (args) => ({
    components: { Toast, Button },
    setup() {
      const showToast = ref(false);
      const toggleToast = () => {
        showToast.value = !showToast.value;
      };
      return { args, showToast, toggleToast };
    },
    template: `
      <div>
        <Button @click="toggleToast">Toggle Toast</Button>
        <Toast v-if="showToast" v-bind="args" />
      </div>
    `,
  }),
};
