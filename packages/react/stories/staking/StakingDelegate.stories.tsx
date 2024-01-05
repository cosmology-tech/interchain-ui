import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { asset_list, assets } from "@chain-registry/osmosis";
import { getAssetByDenom } from "@chain-registry/utils";
import { Asset as OsmosisAsset } from "@chain-registry/types";

import Box from "../../src/ui/box";
import Button from "../../src/ui/button";
import Stack from "../../src/ui/stack";
import Callout from "../../src/ui/callout";
import StakingDelegate from "../../src/ui/staking-delegate";
// import StakingAssetHeader from "../../src/ui/staking-asset-header";
// import StakingClaimHeader from "../../src/ui/staking-claim-header";
// import ValidatorList from "../../src/ui/validator-list";

const meta: Meta = {
  title: "staking/StakingDelegate",
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

const osmosisAssets: OsmosisAsset[] = [...assets.assets, ...asset_list.assets];

const OSMO = getAssetByDenom(osmosisAssets, "uosmo");

export const Primary: Story = {
  args: {},
  render: (props) => {
    const PRICE_PER_TOKEN = 1.5;
    const MAX = 1000;
    const MIN = 0;

    const [tokenAmount, setTokenAmount] = React.useState<number>(0);
    const [notionalValue, setNotionalValue] = React.useState<number>(0);

    return (
      <Box maxWidth="640px">
        <StakingDelegate
          header={{
            title: "Polkachu",
            subtitle: "Commission 100% | APR 22.08%",
            avatarUrl:
              "data:image/svg+xml,%3Csvg class='w-6 h-6' viewBox='0 0 44.426 44.424' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%237c3aed' d='M28.272 25.817c1.006-.551 1.754-1.306 2.24-2.268.486-.96.73-2.065.73-3.314 0-1.247-.244-2.346-.73-3.296-.486-.949-1.236-1.691-2.25-2.223-1.013-.533-2.314-.799-3.905-.799h-5.839V26.64h5.873c1.58 0 2.873-.274 3.881-.823z'%3E%3C/path%3E%3Cpath fill='%237c3aed' d='M22.213 0C9.945 0 0 9.945 0 22.213c0 7.366 3.588 13.892 9.109 17.933.264.103.544.171.844.171a2.364 2.364 0 0 0 2.363-2.363l.004-2.257V8.594h13.014c2.702 0 4.972.504 6.809 1.511 1.838 1.008 3.229 2.39 4.173 4.146.944 1.757 1.417 3.752 1.417 5.983 0 2.256-.476 4.259-1.426 6.011-.95 1.75-2.354 3.127-4.207 4.128-1.853 1.001-4.138 1.502-6.851 1.502h-6.606l-.014 9.086a3.59 3.59 0 0 0 2.559 3.437c.34.016.682.026 1.025.026 12.269 0 22.213-9.944 22.213-22.213C44.426 9.945 34.482 0 22.213 0Z'%3E%3C/path%3E%3C/svg%3E",
          }}
          headerExtra={
            <Callout
              title="Staking will lock your funds for 14 days"
              intent="error"
              iconName="errorWarningLine"
            >
              You will need to undelegate in order for your staked assets to be
              liquid again. This process will take 14 days to complete.
            </Callout>
          }
          delegationItems={[
            {
              label: "Delegated amount",
              tokenAmount: "100,4558.444",
              tokenName: OSMO.symbol ?? "OSMO",
            },
            {
              label: "Available to Delegate",
              tokenAmount: "0",
              tokenName: OSMO.symbol ?? "OSMO",
              isLoading: true,
            },
          ]}
          inputToken={{
            tokenName: OSMO.symbol ?? "OSMO",
            tokenIconUrl: OSMO.logo_URIs?.png ?? "",
          }}
          inputMaxValue={MAX}
          inputMinValue={MIN}
          inputValue={tokenAmount}
          inputNotionalValue={notionalValue}
          // ==== Toggle this to see loading state
          // isLoadingNotionalValue={true}
          onValueChange={(value) => {
            setTokenAmount(value);
            setNotionalValue(value * PRICE_PER_TOKEN);
          }}
          inputPartials={[
            {
              label: "1/2",
              onClick: () => {
                console.log("1/2 change");
                setTokenAmount(MAX / 2);
                setNotionalValue((MAX / 2) * PRICE_PER_TOKEN);
              },
            },
            {
              label: "1/3",
              onClick: () => {
                console.log("1/3 change");
                setTokenAmount(MAX / 3);
                setNotionalValue((MAX / 3) * PRICE_PER_TOKEN);
              },
            },
            {
              label: "Max",
              // isLoading: true,
              onClick: () => {
                console.log("Max change");
                setTokenAmount(MAX);
                setNotionalValue(MAX * PRICE_PER_TOKEN);
              },
            },
          ]}
          footer={
            <Button fluidWidth variant="solid" intent="tertiary">
              Delegate
            </Button>
          }
        />
      </Box>
    );
  },
};
