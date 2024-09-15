import type { Meta, StoryObj } from "@storybook/vue3";
import AnimateLayout from "../src/ui/animate-layout/animate-layout.vue";
import Box from "../src/ui/box/box.vue";
import { ref } from "vue";

const meta: Meta<typeof AnimateLayout> = {
  component: AnimateLayout,
  title: "AnimateLayout",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AnimateLayout>;

export const Primary: Story = {
  args: {},
  render: (args) => ({
    components: { AnimateLayout, Box },
    setup() {
      const show = ref(true);
      const toggle = () => {
        show.value = !show.value;
      };
      return { args, show, toggle };
    },
    template: `
      <div>
        <button @click="toggle">Toggle</button>
        <AnimateLayout v-bind="args">
          <Box v-if="show" bg="$primary" p="$4" borderRadius="$md" mt="$4">
            This content will animate when added or removed
          </Box>
        </AnimateLayout>
      </div>
    `,
  }),
};
