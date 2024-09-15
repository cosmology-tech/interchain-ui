import type { Meta, StoryObj } from "@storybook/vue3";
import Reveal from "../src/ui/reveal/reveal.vue";
import Box from "../src/ui/box/box.vue";

const meta: Meta<typeof Reveal> = {
  component: Reveal,
  title: "Reveal",
  tags: ["autodocs"],
  argTypes: {
    showMoreLabel: { control: "text" },
    showLessLabel: { control: "text" },
    hideThresholdHeight: { control: "number" },
  },
};

export default meta;

type Story = StoryObj<typeof Reveal>;

export const Primary: Story = {
  args: {
    showMoreLabel: "Show more",
    showLessLabel: "Show less",
    hideThresholdHeight: 100,
  },
  render: (args) => ({
    components: { Reveal, Box },
    setup() {
      return { args };
    },
    template: `
      <Reveal v-bind="args">
        <Box bg="$primary" p="$4" borderRadius="$md" height="200px">
          This is a long content that will be revealed
        </Box>
      </Reveal>
    `,
  }),
};
