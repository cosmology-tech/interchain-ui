import React, { useMemo, useState } from "react";
import random from "lodash/random";
import { useMockData } from "../stub/mock-data-client";
// @ts-expect-error
import strideLogo from "../../static/stride-logo.png";

import type { Meta, StoryObj } from "@storybook/react";
import ThemeProvider from "../../src/ui/theme-provider";
import Box from "../../src/ui/box";
import LiquidStaking from "../../src/ui/liquid-staking";
import { LiquidStakingProps } from "../../src/ui/liquid-staking/liquid-staking.types";
import BasicModal from "../../src/ui/basic-modal";
import Button from "../../src/ui/button";
import Text from "../../src/ui/text";
import Stack from "../../src/ui/stack";
import Icon from "../../src/ui/icon";

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
    const [stakeToken, setStakeToken] = useState<
      LiquidStakingProps["stakeToken"] | null
    >(null);

    const [reward, setReward] = useState<LiquidStakingProps["reward"] | null>(
      null
    );

    const { isReady, assets } = useMockData({
      onReady: (assets) => {
        console.log("onready");
        const stride = assets.find((item) => item.symbol === "STRD");

        setStakeToken({
          ...assets[0],
          available: 440.22,
        });
        console.log("stire", stride, assets);

        setReward({
          imgSrc: stride?.imgSrc ?? "",
          name: `Staked ${stride?.symbol ?? "STRD"}`,
          symbol: `${stride?.symbol}`,
          rewardAmount: 0,
          priceDisplayAmount: 0.234,
          available: 320.22,
        });
      },
    });

    const [stakedAmount, setStakedAmount] = useState<number>(0);

    if (!isReady || !reward) return <div>Loading ...</div>;

    return (
      <Box>
        <LiquidStaking
          stakeAmount={stakedAmount}
          stakeToken={stakeToken}
          reward={reward}
          precision={6}
          bottomLink={{
            href: "https://cosmology.zone/",
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
          onChange={(stakeAmount) => {
            console.log("staked", stakeAmount);
            setStakedAmount(stakeAmount);
            setReward((prevReward) => {
              // This is just mock reward calculation
              const amt = random(100, 1000, true);
              const notional = random(500, 20000, true);

              return {
                ...prevReward,
                symbol: prevReward?.symbol ?? "",
                imgSrc: prevReward?.imgSrc ?? "",
                name: prevReward?.name ?? "",
                rewardAmount: amt,
                priceDisplayAmount: notional,
              };
            });
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
              `Staked [${stakeToken?.symbol}]: amt ${stakedAmount} rward ${reward.rewardAmount}`
            );
          }}
        />
      </Box>
    );
  },
};

const customThemeDefs = [
  {
    name: "dydx",
    vars: {
      colors: {
        accent: "#7774FF",
        accentText: "#0E0E0F",
        primary: "#7774FF",
        black: "#131313",
        body: "#1E1E1F",
        background: "#1E1E2B",
        text: "#FAFAFA",
        textSecondary: "#CACACE",
        textPlaceholder: `#888891`,
        textSuccess: "#1AFFB9",
        rewardBg: "#2F4139",
        rewardContent: "#AEFFAB",
        cardBg: "#212130",
        inputBorder: "#3D3D42",
        inputBorderFocus: "#D1D6DD",
        inputBg: "#29293C",
        inputDangerBorder: "#FFD0D0",
        inputDangerBg: "#E35B5B",
        inputDisabledBg: "#A7B4C2",
        inputDisabledText: "#697584",
        progressBg: `#1AFFB9`,
        progressValue: `#A7B4C2`,
        progressCursor: `#EEF2F8`,
        divider: "#201E25",
        menuItemBg: `#1D2024`,
        menuItemBgSelected: `#2e3339`,
        menuItemBgHovered: `#25292E`,
        menuItemBgActive: `#2C3137`,
        skeletonBg: `#3B434D`,
        trackBg: `#49525E`,
      },
    },
  },
];

export const CustomTheme: Story = {
  args: {},
  render: (props) => {
    const [stakeToken, setStakeToken] = useState<
      LiquidStakingProps["stakeToken"] | null
    >(null);

    const [reward, setReward] = useState<LiquidStakingProps["reward"] | null>(
      null
    );

    const { isReady, assets } = useMockData({
      onReady: (assets) => {
        console.log("onready");
        const stride = assets.find((item) => item.symbol === "STRD");

        setStakeToken({
          ...assets[0],
          available: 440.22,
        });
        console.log("stire", stride, assets);

        setReward({
          imgSrc: stride?.imgSrc ?? "",
          name: `Staked ${stride?.symbol ?? "STRD"}`,
          symbol: `${stride?.symbol}`,
          rewardAmount: 0,
          priceDisplayAmount: 0.234,
          available: 320.22,
        });
      },
    });

    const [stakedAmount, setStakedAmount] = useState<number>(0);

    if (!isReady || !reward) return <div>Loading ...</div>;

    return (
      <ThemeProvider themeDefs={customThemeDefs} customTheme="dydx">
        <LiquidStaking
          stakeAmount={stakedAmount}
          stakeToken={stakeToken}
          reward={reward}
          precision={6}
          bottomLink={{
            href: "https://cosmology.zone/",
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
          onChange={(stakeAmount) => {
            console.log("staked", stakeAmount);
            setStakedAmount(stakeAmount);
            setReward((prevReward) => {
              // This is just mock reward calculation
              const amt = random(100, 1000, true);
              const notional = random(500, 20000, true);

              return {
                ...prevReward,
                symbol: prevReward?.symbol ?? "",
                imgSrc: prevReward?.imgSrc ?? "",
                name: prevReward?.name ?? "",
                rewardAmount: amt,
                priceDisplayAmount: notional,
              };
            });
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
          submitButtonProps={{
            intent: "primary",
            variant: "solid",
          }}
          onSubmit={() => {
            alert(
              `Staked [${stakeToken?.symbol}]: amt ${stakedAmount} rward ${reward.rewardAmount}`
            );
          }}
        />
      </ThemeProvider>
    );
  },
};
