import type { Meta, StoryObj } from "@storybook/react";
import { LinkCard } from "../../src";

const meta: Meta<typeof LinkCard> = {
  component: LinkCard,
  title: "web/LinkCard",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Discord",
    icon: "discord",
    description: "Join the community",
    iconColor: "#453558",
    url: "https://discord.com/invite/xh3ZwHj2qQ",
  },
};
