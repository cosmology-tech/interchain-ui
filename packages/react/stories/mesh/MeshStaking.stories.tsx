import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Box from "../../src/ui/box";
import Icon from "../../src/ui/icon";
import Stack from "../../src/ui/stack";
import Button from "../../src/ui/button";
import Text from "../../src/ui/text";
import Slider from "../../src/ui/slider";
import Divider from "../../src/ui/divider";
import { useMockData } from "../stub/mock-data-client";
import { formatNumeric } from "../../src/helpers/number";
import useColorModeValue from "../../src/ui/hooks/use-color-mode-value";

// ==== Mesh components
import MeshButton from "../../src/ui/mesh-staking/mesh-button";
import MeshTagButton from "../../src/ui/mesh-staking/mesh-tag-button";
import MeshModal from "../../src/ui/mesh-modal";
import MeshFooterInfoItem from "../../src/ui/mesh-staking/mesh-footer-info-item";
import MeshStakingSliderInfo from "../../src/ui/mesh-staking/mesh-staking-slider-info";
import MeshProvider from "../../src/ui/mesh-staking/mesh-provider";

const meta: Meta<typeof MeshModal> = {
  component: MeshModal,
  title: "mesh/MeshStaking",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

const MeshSlider = () => {
  const TOTAL_TOKENS = 5422;
  const [value, setValue] = React.useState<number | number[]>(25);

  const onMax = () => {
    setValue(100);
  };

  return (
    <Slider
      name="osmosis"
      value={value}
      onChange={setValue}
      width={{
        mobile: "100%",
        tablet: "500px",
      }}
      renderLabel={({ labelProps, outputProps, valuePercent }) => (
        <Box
          display="flex"
          gap="$2"
          alignItems="center"
          justifyContent="space-between"
          pb="$4"
        >
          <Box
            display="flex"
            gap="$2"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              as="output"
              color="$text"
              fontSize="$md"
              attributes={outputProps}
            >
              {`${formatNumeric(valuePercent * TOTAL_TOKENS, 2)}`}
            </Box>

            <Text
              as="label"
              color={useColorModeValue("$textSecondary", "$textPlaceholder")}
              fontSize="$sm"
              fontWeight="$light"
              attributes={labelProps}
            >
              OSMO
            </Text>
          </Box>

          <MeshTagButton onClick={onMax}>Max</MeshTagButton>
        </Box>
      )}
    />
  );
};

const MeshStakingHeader = (props) => (
  <Stack
    direction="vertical"
    space="$14"
    attributes={{
      width: "100%",
    }}
  >
    <Box display="flex" gap="$8">
      <Box
        as="img"
        width="50px"
        height="50px"
        attributes={{
          src: props.asset?.imgSrc ?? "",
          alt: "osmosis logo",
        }}
      />

      <Stack direction="vertical">
        <Stack
          direction="horizontal"
          space="$4"
          attributes={{
            justifyContent: "center",
            alignItems: "baseline",
          }}
        >
          <Text color="$text" fontSize="$3xl" fontWeight="$medium">
            1,258.02
          </Text>
          <Text
            color={useColorModeValue("$textSecondary", "$textPlaceholder")}
            fontSize="$sm"
            fontWeight={"$light"}
          >
            {props.asset?.symbol ?? "OSMO"}
          </Text>
        </Stack>

        <Text color="$textSecondary" fontSize="$sm">
          $671.39
        </Text>
      </Stack>
    </Box>

    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
    >
      <Stack
        space="$3"
        attributes={{
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Text as="p" color="$textSecondary" fontSize="$md">
          Select the amount to stake on each chain
        </Text>

        <Box as="span" color="$textSecondary">
          <Icon name="informationLine" size="$md" color="inherit" />
        </Box>
      </Stack>

      <Stack
        space="$2"
        attributes={{
          alignItems: "center",
        }}
      >
        <Text
          fontSize="$md"
          color={useColorModeValue("$text", "$textPlaceholder")}
          fontWeight="$semibold"
        >
          1,258.02 OSMO
        </Text>
        <Text
          fontSize="$sm"
          color={useColorModeValue("$text", "$textPlaceholder")}
          fontWeight="$light"
        >
          available
        </Text>
      </Stack>
    </Box>
  </Stack>
);

// Just a mock data generator for the story
const useStakingState = () => {
  const [stakingState, setStakingState] = useState<
    Record<string, { amountStaked: number }>
  >({
    OSMO: {
      amountStaked: 0,
    },
    JUNO: {
      amountStaked: 12345,
    },
    LVN: {
      amountStaked: 55434.1,
    },
    STARS: {
      amountStaked: 0,
    },
  });

  return [stakingState, setStakingState] as const;
};

export const InterchainUITheme: Story = {
  args: {},
  render: (props) => {
    const { isReady, assets } = useMockData();
    const [stakingState] = useStakingState();
    // console.log("all assets", assets);

    if (!isReady) {
      return <Text>Loading...</Text>;
    }

    const osmosis = assets.find((asset) => asset.symbol === "OSMO");
    const juno = assets.find((asset) => asset.symbol === "JUNO");
    const levana = assets.find((asset) => asset.symbol === "LVN");
    const stargaze = assets.find((asset) => asset.symbol === "STARS");

    return (
      <Box
        borderRadius="$lg"
        p="$10"
        backgroundColor="$cardBg"
        maxWidth="$containerMd"
      >
        <MeshStakingHeader asset={osmosis} />

        <Stack
          direction="vertical"
          space="$14"
          attributes={{
            paddingTop: "44px",
            paddingBottom: "38px",
          }}
        >
          {[osmosis, juno, stargaze, levana].map((asset, index) => {
            if (!asset) return null;
            return (
              <Stack
                space="$14"
                attributes={{
                  rowGap: {
                    mobile: "$6",
                  },
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <MeshStakingSliderInfo
                  key={asset.name}
                  tokenName={asset.name}
                  tokenImgSrc={asset.imgSrc}
                  tokenSymbol={asset.symbol}
                  tokenAPR="12.25% APR"
                  isActive={stakingState[asset.symbol].amountStaked > 0}
                />

                <MeshSlider />
              </Stack>
            );
          })}
        </Stack>

        <Divider />

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          pt="$10"
        >
          <Box
            display="grid"
            textAlign="center"
            pb="$10"
            gap={{
              mobile: "$4",
              mdMobile: "$10",
              tablet: "$21",
            }}
            gridTemplateColumns={{
              mobile: "1fr",
              mdMobile: "repeat(3, 1fr)",
            }}
          >
            <MeshFooterInfoItem
              title="43.4%"
              description="APR"
              subDescription="+43.4%"
            />
            <MeshFooterInfoItem
              title="$32.25"
              description="Daily reward"
              subDescription="+$32.25"
            />
            <MeshFooterInfoItem title="27 days" description="Unbonding time" />
          </Box>

          <Button>
            <Text
              color="inherit"
              as="span"
              attributes={{
                width: "264px",
              }}
            >
              Next
            </Text>
          </Button>
        </Box>
      </Box>
    );
  },
};

export const MeshUICustomTheme: Story = {
  args: {},
  render: (props) => {
    const { isReady, assets } = useMockData();

    // console.log("all assets", assets);
    if (!isReady) {
      return <Text>Loading...</Text>;
    }

    const osmosis = assets.find((asset) => asset.symbol === "OSMO");
    const juno = assets.find((asset) => asset.symbol === "JUNO");
    const levana = assets.find((asset) => asset.symbol === "LVN");
    const stargaze = assets.find((asset) => asset.symbol === "STARS");

    return (
      <MeshProvider>
        <Box
          borderRadius="$lg"
          p="$10"
          backgroundColor="$cardBg"
          maxWidth="$containerMd"
        >
          <MeshStakingHeader asset={osmosis} />

          <Stack
            direction="vertical"
            space="$14"
            attributes={{
              paddingTop: "44px",
              paddingBottom: "38px",
            }}
          >
            {[osmosis, juno, stargaze, levana].map((asset, index) => {
              if (!asset) return null;
              return (
                <Stack
                  space="$14"
                  attributes={{
                    rowGap: {
                      mobile: "$6",
                    },
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <MeshStakingSliderInfo
                    key={asset.name}
                    tokenName={asset.name}
                    tokenImgSrc={asset.imgSrc}
                    tokenSymbol={asset.symbol}
                    tokenAPR="12.25% APR"
                    isActive={(index + 1) % 2 === 0}
                  />

                  <MeshSlider />
                </Stack>
              );
            })}
          </Stack>

          <Divider />

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            pt="$10"
          >
            <Box
              display="grid"
              textAlign="center"
              pb="$10"
              gap={{
                mobile: "$4",
                mdMobile: "$10",
                tablet: "$21",
              }}
              gridTemplateColumns={{
                mobile: "1fr",
                mdMobile: "repeat(3, 1fr)",
              }}
            >
              <MeshFooterInfoItem
                title="43.4%"
                description="APR"
                subDescription="+43.4%"
              />
              <MeshFooterInfoItem
                title="$32.25"
                description="Daily reward"
                subDescription="+$32.25"
              />
              <MeshFooterInfoItem
                title="27 days"
                description="Unbonding time"
              />
            </Box>

            <MeshButton width="264px">Next</MeshButton>
          </Box>
        </Box>
      </MeshProvider>
    );
  },
};

export const ModalView: Story = {
  args: {},
  render: (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const { isReady, assets } = useMockData();

    // console.log("all assets", assets);
    if (!isReady) {
      return <Text>Loading...</Text>;
    }

    const osmosis = assets.find((asset) => asset.symbol === "OSMO");
    const juno = assets.find((asset) => asset.symbol === "JUNO");
    const levana = assets.find((asset) => asset.symbol === "LVN");
    const stargaze = assets.find((asset) => asset.symbol === "STARS");

    return (
      <div>
        <MeshModal
          renderTrigger={(triggerProps = {}) => {
            const { ref, ...buttonProps } = triggerProps;
            return (
              <Button
                buttonRef={ref}
                {...buttonProps}
                onClick={() => setIsOpen(true)}
              >
                open
              </Button>
            );
          }}
          isOpen={isOpen}
          title={<MeshStakingHeader asset={osmosis} />}
          onClose={() => setIsOpen(false)}
        >
          <Box overflow="hidden" maxWidth="752px">
            <Stack
              direction="vertical"
              space="$14"
              attributes={{
                paddingTop: "44px",
                paddingBottom: "38px",
              }}
            >
              {[osmosis, juno, stargaze, levana].map((asset, index) => {
                if (!asset) return null;
                return (
                  <Stack
                    space="$14"
                    attributes={{
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <MeshStakingSliderInfo
                      key={asset.name}
                      tokenName={asset.name}
                      tokenImgSrc={asset.imgSrc}
                      tokenSymbol={asset.symbol}
                      tokenAPR="12.25% APR"
                      isActive={(index + 1) % 2 === 0}
                    />

                    <MeshSlider />
                  </Stack>
                );
              })}
            </Stack>

            <Divider />

            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              pt="$10"
            >
              <Stack
                direction="horizontal"
                space="$21"
                attributes={{
                  paddingBottom: "$10",
                }}
              >
                <MeshFooterInfoItem
                  title="43.4%"
                  description="APR"
                  subDescription="+43.4%"
                />
                <MeshFooterInfoItem
                  title="$32.25"
                  description="Daily reward"
                  subDescription="+$32.25"
                />
                <MeshFooterInfoItem
                  title="27 days"
                  description="Unbonding time"
                />
              </Stack>

              <MeshButton width="264px">Next</MeshButton>
            </Box>
          </Box>
        </MeshModal>

        <Text
          attributes={{
            mt: "$10",
          }}
        >
          Some other text to test transparent modal background
        </Text>
      </div>
    );
  },
};
