import type { Meta, StoryObj } from "@storybook/vue3";
import Toast from "../src/ui/toast/toast.vue";
import Button from "../src/ui/button/button.vue";
import { ref } from "vue";

const meta: Meta<typeof Toast> = {
  component: Toast,
  title: "Core/Toast",
  tags: ["autodocs"],
  argTypes: {
    intent: {
      control: "select",
      options: ["info", "success", "warning", "error"],
    },
    title: { control: "text" },
    description: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Primary: Story = {
  args: {
    intent: "info",
    title: "Toast Title",
    description: "This is a toast message",
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
