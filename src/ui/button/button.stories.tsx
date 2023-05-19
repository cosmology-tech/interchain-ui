import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'AAA',
  argTypes: {

  }
}
// async viteFinal(config) {
//   return mergeConfig(config, {
//     plugins: [require("@vanilla-extract/vite-plugin").vanillaExtractPlugin()]
//   });
// }

export default meta;

type Story = StoryObj<typeof meta>;

export const Baseaaa: Story = {};

export const CustomerButtonbbb: Story = {
  render: (args) => <Button {...args}>Customer Button</Button>
}
