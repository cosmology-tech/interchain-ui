import type { Meta, StoryObj } from "@storybook/vue3";
import Container from "../src/ui/container/container.vue";
import Box from "../src/ui/box/box.vue";

const meta: Meta<typeof Container> = {
  component: Container,
  title: "Core/Container",
  tags: ["autodocs"],
  argTypes: {
    maxWidth: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl", "full"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Primary: Story = {
  args: {
    maxWidth: "md",
  },
  render: (args) => ({
    components: { Container, Box },
    setup() {
      return { args };
    },
    template: `
      <Container v-bind="args">
        <Box bg="$primary" p="$4" borderRadius="$md">
          This content is inside a container
        </Box>
      </Container>
    `,
  }),
};
