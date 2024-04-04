import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Stack from "../../src/ui/stack";
import Box from "../../src/ui/box";
import Text from "../../src/ui/text";

// ==== Noble components
import NobleProvider from "../../src/ui/noble/noble-provider";
import NobleTxProgressBar from "../../src/ui/noble/noble-tx-progress-bar";
import NobleTxDirectionCard from "../../src/ui/noble/noble-tx-direction-card";
import NobleTxStepItem from "../../src/ui/noble/noble-tx-step-item";
import NobleButton from "../../src/ui/noble/noble-button";

const meta: Meta<typeof NobleProvider> = {
  component: NobleProvider,
  title: "noble/NobleTransactionStatus",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

const USDC_LOGO_URL =
  "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdc.svg";
const ETH_LOGO_URL =
  "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/eth-white.svg";
const OSMO_LOGO_URL =
  "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png";

export const InProgress: Story = {
  args: {},
  render: (props) => {
    return (
      <NobleProvider>
        <Box bg="$body" py="$20">
          <Box width="552px" mx="$auto">
            <Box display="flex" flexDirection="column" alignItems="center">
              <Text
                color="$text"
                fontSize="$xl"
                fontWeight="$semibold"
                attributes={{ mb: "$14" }}
              >
                Transaction in progress
              </Text>

              <Stack
                space="18px"
                attributes={{ alignItems: "center", mb: "$16" }}
              >
                <Box
                  as="img"
                  width="$15"
                  height="$15"
                  attributes={{ src: USDC_LOGO_URL, alt: "USDC" }}
                />
                <Text
                  color="$text"
                  fontSize="$3xl"
                  fontWeight="$semibold"
                  letterSpacing="-2%"
                >
                  1,000 USDC
                </Text>
              </Stack>

              <Stack space="$18" attributes={{ mx: "$auto", mb: "$13" }}>
                <NobleTxDirectionCard
                  direction="From"
                  chainName="Ethereum Mainnet"
                  address="0x1f9090...e676c326"
                  logoUrl={ETH_LOGO_URL}
                />
                <NobleTxDirectionCard
                  direction="To"
                  chainName="Osmosis"
                  address="osmo1w59t7...pl4rsz0d"
                  logoUrl={OSMO_LOGO_URL}
                />
              </Stack>
            </Box>

            <Box
              bg="$cardBg"
              px="$14"
              pt="$13"
              pb="$16"
              borderRadius="$2xl"
              mb="$14"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Text
                color="$text"
                fontSize="$sm"
                fontWeight="$semibold"
                attributes={{ mb: "$8" }}
              >
                ~12 minutes remaining
              </Text>
              <NobleTxProgressBar progress={50} mb="$12" />
              <Stack
                direction="vertical"
                space="14px"
                attributes={{ alignSelf: "flex-start" }}
              >
                <NobleTxStepItem status="completed" step="Burn on Ethereum" />
                <NobleTxStepItem status="processing" step="Mint on Noble" />
                <NobleTxStepItem status="pending" step="Transfer to Osmosis" />
              </Stack>
            </Box>

            <Box display="flex" flexDirection="column" alignItems="center">
              <NobleButton attributes={{ mb: "18px" }}>
                Start another transaction
              </NobleButton>
              <NobleButton variant="text">
                You can close this window now
              </NobleButton>
            </Box>
          </Box>
        </Box>
      </NobleProvider>
    );
  },
};
