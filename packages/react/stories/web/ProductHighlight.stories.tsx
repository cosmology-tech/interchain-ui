import type { Meta, StoryObj } from "@storybook/react";
import { ProductHighlight } from "../../src";
import interchainUI from "../../static/interchain-ui.png";

const meta: Meta<typeof ProductHighlight> = {
  component: ProductHighlight,
  title: "web/ProductHighlight",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Interchain UI",
    description: "The Interchain Design System",
    label: {
      text: "50,000+ Downloads",
      color: "#FFF",
      backgroundColor: "#5F14C9",
    },
    onButtonClick: () => {},
    picture: interchainUI,
    width: "744px",
    pictureConfig: {
      width: "280px",
      height: "100%",
      right: "$7",
      top: 0,
    },
  },
};
