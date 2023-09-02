import type { Meta, StoryObj } from "@storybook/react";
import { VideoCard } from "../../src";
import thumbnail from "../../src/assets/video-thumbnail.png";

const meta: Meta<typeof VideoCard> = {
  component: VideoCard,
  title: "web/VideoCard",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    thumbnail,
    duration: "7 minutes",
    title: "Create a Cosmos App with create-cosmos-app",
    onClick: () => {},
  },
};

export const Small: Story = {
  args: {
    thumbnail,
    duration: "7 minutes",
    title: "Create a Cosmos App with create-cosmos-app",
    onClick: () => {},
    size: "sm",
  },
};
