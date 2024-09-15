import type { Meta, StoryObj } from "@storybook/vue3";
import AvatarBadge from "../src/ui/avatar-badge/avatar-badge.vue";
import Avatar from "../src/ui/avatar/avatar.vue";

const meta: Meta<typeof AvatarBadge> = {
  component: AvatarBadge,
  title: "AvatarBadge",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof AvatarBadge>;

export const Primary: Story = {
  args: {
    attributes: {
      backgroundColor: "$green400",
    },
  },
  render: (args) => ({
    components: { AvatarBadge, Avatar },
    setup() {
      return { args };
    },
    template: `
      <Avatar name="User" size="md" src="https://picsum.photos/id/237/200/200">
        <AvatarBadge v-bind="args" />
      </Avatar>
    `,
  }),
};
