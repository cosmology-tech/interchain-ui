import type { Meta, StoryObj } from "@storybook/react";
import { ProductCard } from "../../src";
import productThumbnail from "../../static/product-thumbnail.svg";

const meta: Meta<typeof ProductCard> = {
  component: ProductCard,
  title: "web/ProductCard",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Starship",
    description: "Interchain wallet adapter",
    label: "75,000+ Downloads",
    thumbnail: productThumbnail,
  },
};

export const NewProduct: Story = {
  args: {
    title: "Starship",
    description: "Interchain wallet adapter",
    label: "75,000+ Downloads",
    thumbnail: productThumbnail,
    isNew: true,
  },
};
