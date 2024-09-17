import type { Meta, StoryObj } from "@storybook/vue3";
import ClipboardCopyText from "../src/ui/clipboard-copy-text/clipboard-copy-text.vue";

const meta: Meta<typeof ClipboardCopyText> = {
  component: ClipboardCopyText,
  title: "Core/ClipboardCopyText",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ClipboardCopyText>;

export const Primary: Story = {
  args: {
    text: "Copy this text to clipboard",
  },
  render: (args) => ({
    components: { ClipboardCopyText },
    setup() {
      return { args };
    },
    template: '<ClipboardCopyText v-bind="args" />',
  }),
};
