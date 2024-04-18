import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Stack from "../../src/ui/stack";
import Box from "../../src/ui/box";
import Text from "../../src/ui/text";
import Icon from "../../src/ui/icon";
import Accordion from "../../src/ui/accordion";
import Divider from "../../src/ui/divider";

// ==== Noble components
import NobleProvider from "../../src/ui/noble/noble-provider";
import NobleButton from "../../src/ui/noble/noble-button";
import NobleTokenAvatar from "../../src/ui/noble/noble-token-avatar";
import NobleSelectTokenButton from "../../src/ui/noble/noble-select-token-button";
import NobleSelectWalletButton from "../../src/ui/noble/noble-select-wallet-button";
import NobleInput from "../../src/ui/noble/noble-input";
import NobleTxProgressBar from "../../src/ui/noble/noble-tx-progress-bar";
import NobleTxDirectionCard from "../../src/ui/noble/noble-tx-direction-card";
import NobleTxStepItem from "../../src/ui/noble/noble-tx-step-item";
import NobleTxHistoryOverviewItem from "../../src/ui/noble/noble-tx-history-overview-item";
import NoblePageTitleBar from "../../src/ui/noble/noble-page-title-bar";
import type { NobleTxStatus } from "../../src/ui/noble/noble.types";

const meta: Meta<typeof NobleProvider> = {
  component: NobleProvider,
  title: "noble/NobleBaseComponents",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

const USDC_LOGO_URL =
  "https://raw.githubusercontent.com/cosmos/chain-registry/master/_non-cosmos/ethereum/images/usdc.svg";
const OSMO_LOGO_URL =
  "https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.png";

export const Primary: Story = {
  args: {},
  render: (props) => {
    const [inputValue, setInputValue] = React.useState<string>("");
    const [inputValue2, setInputValue2] = React.useState<string>("");
    const [inputValue3, setInputValue3] = React.useState<string>(
      "osmo1yvejj22t78s2vfk7slty2d7fs5lkc8rnmszznw",
    );

    return (
      <NobleProvider>
        <Box bg="$body" p="$12" display="flex" gap="$12" flexDirection="column">
          <Box display="flex" gap="$4" flexDirection="column" maxWidth="466px">
            <Text>NobleButton</Text>

            <NobleButton variant="outlined" size="xl">
              variant: outlined, size: xl
            </NobleButton>

            <Stack space="$4">
              <NobleButton variant="tag" size="xs">
                125
              </NobleButton>
              <NobleButton variant="tag" size="xs">
                500
              </NobleButton>
              <NobleButton variant="tag" size="xs" isActive>
                1000
              </NobleButton>
              <NobleButton variant="tag" size="xs">
                Max
              </NobleButton>
              <NobleButton variant="tag" size="xs" disabled>
                Half (disabled)
              </NobleButton>
            </Stack>
          </Box>

          <Box display="flex" gap="$4" flexDirection="column" maxWidth="466px">
            <Text>NobleTokenAvatar</Text>

            <NobleTokenAvatar
              mainLogoUrl={USDC_LOGO_URL}
              mainLogoAlt="USDC"
              subLogoUrl={OSMO_LOGO_URL}
              subLogoAlt="USDC"
            />
          </Box>

          <Box display="flex" gap="$4" flexDirection="column" maxWidth="466px">
            <Text>NobleSelectTokenButton</Text>

            <NobleSelectTokenButton
              size="xl"
              token={{
                mainLogoUrl: USDC_LOGO_URL,
                mainLogoAlt: "USDC",
                subLogoUrl: OSMO_LOGO_URL,
                subLogoAlt: "USDC",
                symbol: "USDC",
                network: "On Ethereum",
                tokenAmount: "1,052.51",
                notionalValue: "≈ $1,052",
              }}
            />
          </Box>

          <Box display="flex" gap="$4" flexDirection="column" maxWidth="466px">
            <Text>NobleSelectWalletButton</Text>

            <NobleSelectWalletButton
              logoUrl={USDC_LOGO_URL}
              logoAlt="USDC"
              title="USDC"
              subTitle="Connect"
            />

            <NobleSelectWalletButton
              logoUrl={USDC_LOGO_URL}
              logoAlt="USDC"
              title="USDC"
              subTitle="Connect (disabled)"
              disabled
            />
          </Box>

          <Box display="flex" gap="$4" flexDirection="column" maxWidth="466px">
            <Text>NobleInput</Text>

            <NobleInput
              id="token-amount"
              size="md"
              label="Select amount"
              placeholder="Enter amount"
              value={inputValue}
              onChange={(e) => {
                console.log("Change: ", e.target.value);
                setInputValue(e.target.value);
              }}
              inputTextAlign="right"
              startAddon={
                <Box display="flex" gap="$8">
                  <NobleTokenAvatar
                    mainLogoUrl={USDC_LOGO_URL}
                    mainLogoAlt="USDC"
                    subLogoUrl={OSMO_LOGO_URL}
                    subLogoAlt="USDC"
                  />

                  <Box display="flex" flexDirection="column">
                    <Text
                      as="span"
                      color="$text"
                      fontSize="$xl"
                      fontWeight="$semibold"
                    >
                      USDC
                    </Text>
                    <Text
                      as="span"
                      color="$textSecondary"
                      fontSize="$sm"
                      fontWeight="$normal"
                    >
                      On Ethereum
                    </Text>
                  </Box>
                </Box>
              }
              labelContainerProps={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              labelExtra={
                <Stack space="$4">
                  <NobleButton variant="tag" size="xs">
                    125
                  </NobleButton>
                  <NobleButton variant="tag" size="xs">
                    500
                  </NobleButton>
                  <NobleButton variant="tag" size="xs" isActive>
                    1000
                  </NobleButton>
                  <NobleButton variant="tag" size="xs">
                    Half
                  </NobleButton>
                  <NobleButton variant="tag" size="xs">
                    Max
                  </NobleButton>
                </Stack>
              }
              helperText={
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text
                    color="$textSecondary"
                    fontSize="$sm"
                    fontWeight="$normal"
                  >
                    Available: 1,052.51
                  </Text>
                  <Text
                    color="$textSecondary"
                    fontSize="$sm"
                    fontWeight="$normal"
                  >
                    ≈ $0
                  </Text>
                </Box>
              }
            />

            <NobleInput
              id="address"
              size="sm"
              label="Destination"
              placeholder="Paste address"
              value={inputValue2}
              onChange={(e) => {
                console.log("Change address: ", e.target.value);
                setInputValue2(e.target.value);
              }}
              inputContainerProps={{
                // Space for the button
                paddingRight: "150px",
              }}
              endAddon={
                <Box position="absolute" right="$4" top="$4">
                  <NobleButton variant="solid" size="sm">
                    Connect wallet
                  </NobleButton>
                </Box>
              }
            />

            <NobleInput
              id="address2"
              size="sm"
              label="Destination"
              intent="success"
              placeholder="Paste address"
              readonly
              value={inputValue3}
              onChange={(e) => {
                console.log("Change address: ", e.target.value);
                setInputValue3(e.target.value);
              }}
              endAddon={
                <Box
                  position="absolute"
                  right="$4"
                  top="50%"
                  transform="translateY(-50%)"
                >
                  <NobleButton variant="text">
                    <Text as="span" fontSize="$2xl" color="$textSecondary">
                      <Icon name="xCircle" />
                    </Text>
                  </NobleButton>
                </Box>
              }
            />
          </Box>
        </Box>
      </NobleProvider>
    );
  },
};
