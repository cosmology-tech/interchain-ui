import React, { useMemo, useState } from "react";
import random from "lodash/random";
import { getTransferList } from "../stub/assetData";
import strideLogo from "../../static/stride-logo.png";

import type { Meta, StoryObj } from "@storybook/react";

import {
  Box,
  LiquidStaking,
  LiquidStakingProps,
  BasicModal,
  Button,
  Text,
  Stack,
  Icon,
} from "../../src";

const meta: Meta<typeof LiquidStaking> = {
  component: LiquidStaking,
  title: "staking/LiquidStaking",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

/* This is primary SwapToken */
export const Primary: Story = {
  args: {},
  render: (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropDownList = useMemo(() => getTransferList(), []);

    const [stakeToken, setStakeToken] = useState<
      LiquidStakingProps["stakeToken"] | null
    >(dropDownList[0]);

    const [reward, setReward] = useState<LiquidStakingProps["reward"]>({
      ...dropDownList[0],
      denom: `Staked ${dropDownList[0].denom}`,
      symbol: `st${dropDownList[0].symbol}`,
      apr: "19.42",
      rewardAmount: "0",
    });

    const [stakedAmount, setStakedAmount] = useState<string>("0");

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Liquid stake</Button>
        <BasicModal
          isOpen={isOpen}
          title={
            <Stack
              direction="horizontal"
              space="$4"
              attributes={{
                alignItems: "center",
              }}
            >
              <Text fontSize="$xl" fontWeight="$semibold">
                Liquid Staking {stakeToken?.denom}
              </Text>
              <Icon name="informationLine" size="$md" color="$textSecondary" />
            </Stack>
          }
          onClose={() => setIsOpen(false)}
        >
          <LiquidStaking
            stakeToken={stakeToken}
            reward={reward}
            options={dropDownList}
            precision={2}
            bottomLink={{
              href: "https://cosmology.tech/",
              label: "Learn more",
            }}
            timeEstimateLabel="30 seconds"
            descriptionList={[
              {
                title: "Rewards",
                subtitle: "19.42%",
                desc: "Rewards on Stride are similar to native staking rewards. However, they accumulate in the background, which reflects in the price of the stToken continually appreciating compared to the native token, while you can still move the stToken around the ecosystem freely.",
              },
              {
                title: "Fees",
                subtitle: "Low",
                desc: "Strides 10% fee is only applied to rewards you earn. The tokens you stake (aka principal) and transactions are fee-free!",
              },
              {
                title: "Unbonding",
                subtitle: "21-24 days",
                desc: "Unstaking on Stride requires an unbonding period before you can withdraw your tokens. If you don't want to wait, you can sell stATOM directly on an exchange.",
              },
              {
                title: "Value of 1 stATOM",
                subtitle: "1.204 ATOM",
                desc: "The value of 1 stATOM if redeemed through the Stride protocol redemption rate grows predictably as staking rewards accrue.",
              },
              {
                title: "Total Value Locked",
                subtitle: "$24.7m",
                desc: "The total value of ATOM locked on Stride.",
              },
            ]}
            onChange={({
              stakeToken: payloadToken,
              stakeAmount: payloadStakedAmount,
            }) => {
              if (payloadToken) {
                console.log("selected", payloadToken);
                setStakedAmount(payloadStakedAmount);
                setStakeToken(payloadToken);

                setReward((prevReward) => {
                  const amt = String(random(100, 1000, true));
                  const notional = String(random(500, 20000, true));

                  return {
                    ...prevReward,
                    // Mock reward calculation
                    rewardAmount: amt,
                    priceDisplayAmount: notional,
                  };
                });
              }
            }}
            footerLabel={
              <Stack
                direction="horizontal"
                space="$4"
                attributes={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text fontWeight="$normal" fontSize="$sm" color="#A7B4C2">
                  Powered by
                </Text>
                <Box
                  as="img"
                  height="$8"
                  width="auto"
                  attributes={{
                    src: strideLogo,
                    alt: "Stride",
                  }}
                />
              </Stack>
            }
            onSubmit={() => {
              alert(
                `Staked [${stakeToken?.denom}]: amt ${stakedAmount} rward ${reward.rewardAmount}`
              );
            }}
          />
        </BasicModal>
      </>
    );
  },
};
