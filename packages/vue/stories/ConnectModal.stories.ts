import type { Meta, StoryObj } from "@storybook/vue3";
import ConnectModal from "../src/ui/connect-modal/connect-modal.vue";
import Button from "../src/ui/button/button.vue";
import { ref } from "vue";

const meta: Meta<typeof ConnectModal> = {
  component: ConnectModal,
  title: "ConnectModal",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ConnectModal>;

export const Primary: Story = {
  args: {},
  render: (args) => ({
    components: { ConnectModal, Button },
    setup() {
      const isOpen = ref(false);
      const toggleModal = () => {
        isOpen.value = !isOpen.value;
      };
      return { args, isOpen, toggleModal };
    },
    template: `
      <div>
        <Button @click="toggleModal">Open Connect Modal</Button>
        <ConnectModal v-if="isOpen" v-bind="args" @close="toggleModal" />
      </div>
    `,
  }),
};
