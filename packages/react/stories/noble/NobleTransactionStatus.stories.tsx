import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Stack from "../../src/ui/stack";
import Box from "../../src/ui/box";
import Text from "../../src/ui/text";
import useColorModeValue from "../../src/ui/hooks/use-color-mode-value";

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

const TransactionStatus = ({ children }: { children: React.ReactNode }) => (
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

          <Stack space="18px" attributes={{ alignItems: "center", mb: "$16" }}>
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
          py="$12"
          borderRadius="$2xl"
          mb="$14"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          {children}
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

export const InProgress: Story = {
  args: {},
  render: (props) => {
    return (
      <TransactionStatus>
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
          attributes={{ alignSelf: "flex-start", mb: "$9" }}
        >
          <NobleTxStepItem status="completed" step="Burn on Ethereum" />
          <NobleTxStepItem status="processing" step="Mint on Noble" />
          <NobleTxStepItem status="pending" step="Transfer to Osmosis" />
        </Stack>
      </TransactionStatus>
    );
  },
};

export const Successful: Story = {
  args: {},
  render: (props) => {
    return (
      <TransactionStatus>
        <Box mt="$7" mb="$16">
          <svg
            width="87"
            height="87"
            viewBox="0 0 87 87"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Box
              as="circle"
              fill={useColorModeValue("$gray800", "$blue300")}
              stroke={useColorModeValue("$gray700", "$blue400")}
              attributes={{ cx: "43.5", cy: "43.5", r: "43" }}
            />
            <Box
              as="path"
              fill={useColorModeValue("$gray500", "$blue600")}
              attributes={{
                d: "M24.238 42.136C25.6793 40.7448 28.0077 40.7448 29.449 42.136L37.9516 50.4022L59.3502 29.5985C60.8158 28.3758 63.0021 28.46 64.3672 29.7872C65.7324 31.1144 65.8155 33.2365 64.5612 34.6647L40.5398 58.0182H40.5363C39.095 59.4128 36.7666 59.4128 35.3253 58.0182L24.2379 47.2391C23.538 46.5654 23.1465 45.6458 23.1465 44.6892C23.1465 43.7292 23.5381 42.813 24.238 42.136Z",
              }}
            />
          </svg>
        </Box>
        <NobleButton
          variant="text"
          fontWeight="$semibold"
          rightIcon="arrowRightLine"
        >
          View transaction on Range
        </NobleButton>
      </TransactionStatus>
    );
  },
};
