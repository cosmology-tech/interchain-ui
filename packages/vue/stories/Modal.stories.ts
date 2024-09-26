import type { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import Modal from "../scaffolds/modal/modal.vue";
import useTheme from "../src/ui/hooks/use-theme/use-theme";

const meta: Meta<typeof Modal> = {
  title: "Core/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    isOpen: { control: "boolean" },
    initialOpen: { control: "boolean" },
    onOpen: { action: "opened" },
    onClose: { action: "closed" },
    closeOnClickaway: { control: "boolean" },
    preventScroll: { control: "boolean" },
    role: { control: "select", options: ["dialog", "alertdialog"] },
    className: { control: "text" },
    themeClassName: { control: "text" },
    contentClassName: { control: "text" },
    backdropClassName: { control: "text" },
    childrenClassName: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const DefaultTemplate: Story = {
  render: (args) => ({
    components: { Modal },
    setup() {
      const isOpen = ref(false);
      const { themeClass, toggleColorMode } = useTheme();
      return { args, isOpen, themeClass, toggleColorMode };
    },
    template: `
      <div :class="themeClass">
        <Modal v-bind="args" v-model:isOpen="isOpen" :themeClassName="themeClass">
          <template #trigger="{ open }">
            <button @click="open">Open Modal</button>
          </template>
          <template #header="{ close }">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <h2>Modal Header</h2>
              <button @click="close">Close</button>
            </div>
          </template>
          <p>This is the modal content.</p>
          <button @click="toggleColorMode">Toggle Theme</button>
        </Modal>
      </div>
    `,
  }),
};

export const Default: Story = {
  ...DefaultTemplate,
  args: {
    closeOnClickaway: true,
    preventScroll: true,
    role: "dialog",
  },
};

export const InitiallyOpen: Story = {
  ...DefaultTemplate,
  args: {
    ...Default.args,
    initialOpen: true,
  },
};

export const CustomStyles: Story = {
  ...DefaultTemplate,
  args: {
    ...Default.args,
    className: "custom-modal",
    contentClassName: "custom-content",
    backdropClassName: "custom-backdrop",
    childrenClassName: "custom-children",
    contentStyles: {
      backgroundColor: "#f0f0f0",
      padding: "20px",
      borderRadius: "8px",
    },
  },
};

export const AlertDialog: Story = {
  ...DefaultTemplate,
  args: {
    ...Default.args,
    role: "alertdialog",
  },
};
