import type { Meta, StoryObj } from "@storybook/react";
import { asset_list, assets } from "@chain-registry/osmosis";
import { getAssetByDenom } from "@chain-registry/utils";
import { Asset as OsmosisAsset } from "@chain-registry/types";

import StakingAssetHeader from "../../src/ui/staking-asset-header";

const osmosisAssets: OsmosisAsset[] = [...assets.assets, ...asset_list.assets];
const OSMO = getAssetByDenom(osmosisAssets, "uosmo");

const meta: Meta<typeof StakingAssetHeader> = {
  component: StakingAssetHeader,
  title: "staking/StakingAssetHeader",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    imgSrc: OSMO.logo_URIs?.png,
    symbol: OSMO.symbol,
    totalAmount: 232.2898,
    totalPrice: 1013,
    available: 89.231,
  },
};
