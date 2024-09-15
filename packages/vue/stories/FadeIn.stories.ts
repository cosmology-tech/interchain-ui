import type { Meta, StoryObj } from "@storybook/vue3";
import FadeIn from "../src/ui/fade-in/fade-in.vue";
import Box from "../src/ui/box/box.vue";
import { ref } from "vue";

const meta: Meta<typeof FadeIn> = {
  component: FadeIn,
  title: "FadeIn",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof FadeIn>;

export const Primary: Story = {
  args: {},
  render: (args) => ({
    components: { FadeIn, Box },
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
        <FadeIn v-bind="args">
          <Box v-if="show" bg="$primary" p="$4" borderRadius="$md" mt="$4">
            This content will fade in when added
          </Box>
        </FadeIn>
      </div>
    `,
  }),
};
