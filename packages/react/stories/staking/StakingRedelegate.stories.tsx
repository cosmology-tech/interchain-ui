import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { asset_list, assets } from "@chain-registry/osmosis";
import { getAssetByDenom } from "@chain-registry/utils";
import { Asset as OsmosisAsset } from "@chain-registry/types";

import Box from "../../src/ui/box";
import Text from "../../src/ui/text";
import Stack from "../../src/ui/stack";
import TextField from "../../src/ui/text-field";
import TextFieldAddon from "../../src/ui/text-field-addon";
import BasicModal from "../../src/ui/basic-modal";
import Button from "../../src/ui/button";
import Callout from "../../src/ui/callout";
import StakingDelegate from "../../src/ui/staking-delegate";

const meta: Meta = {
  title: "staking/StakingRedelegate",
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

const osmosisAssets: OsmosisAsset[] = [...assets.assets, ...asset_list.assets];

const OSMO = getAssetByDenom(osmosisAssets, "uosmo");

const SectionLabel = (props: {
  title: string;
  value: string;
  attributes?: any;
}) => {
  return (
    <Stack
      direction="horizontal"
      space="$4"
      attributes={{
        justifyContent: "flex-start",
        alignItems: "center",
        ...props.attributes,
      }}
    >
      <Text color="$textSecondary" fontSize="$sm" fontWeight="$normal">
        {props.title}
      </Text>

      <Text color="$text" fontSize="$md" fontWeight="$semibold">
        {props.value}
      </Text>
    </Stack>
  );
};

export const Primary: Story = {
  args: {},
  render: (props) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [value, setValue] = React.useState<string>("0");

    const handleChange = (e) => {
      console.log(e);
      setValue(e.target.value);
    };

    const handleMax = () => {
      setValue("2334.56");
    };

    return (
      <BasicModal
        closeOnClickaway
        renderTrigger={(triggerProps = {}) => (
          <Button {...triggerProps} onClick={() => setIsOpen(true)}>
            Open redelegate modal
          </Button>
        )}
        isOpen={isOpen}
        title="Redelegate"
        onClose={() => setIsOpen(false)}
      >
        <Box width="500px" p="$6" textAlign="left">
          <SectionLabel title="From" value="STC Capital" />

          <Box
            bg="$cardBg"
            borderRadius="$md"
            borderColor="$inputBorder"
            borderWidth="1px"
            borderStyle="solid"
            p="$10"
            my="$6"
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Text fontSize="$lg" fontWeight="$medium">
              Your delegation
            </Text>

            <Stack
              direction="horizontal"
              space="$4"
              attributes={{
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <Text fontSize="$lg" fontWeight="$semibold">
                2334.56
              </Text>
              <Text fontSize="$sm" fontWeight="$normal" color="$textSecondary">
                JUNO
              </Text>
            </Stack>
          </Box>

          <SectionLabel
            title="To"
            value="DAO DAO"
            attributes={{
              marginTop: "$12",
            }}
          />

          <Box
            bg="$cardBg"
            borderRadius="$md"
            borderColor="$inputBorder"
            borderWidth="1px"
            borderStyle="solid"
            p="$10"
            my="$6"
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Stack
              direction="horizontal"
              space="$4"
              attributes={{
                width: "100%",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <TextField
                size="md"
                id="redelegate-amount"
                label="Amount to redelegate"
                placeholder="Please enter amount"
                onChange={handleChange}
                value={value}
                attributes={{
                  flex: "1",
                  width: "100%",
                }}
                endAddon={
                  <TextFieldAddon
                    size="md"
                    position="end"
                    divider={true}
                    intent="default"
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      gap="$6"
                    >
                      <Button
                        size="xs"
                        variant="solid"
                        intent="primary"
                        onClick={handleMax}
                      >
                        Max
                      </Button>

                      <Text
                        fontSize="$sm"
                        fontWeight="$normal"
                        color="$textSecondary"
                      >
                        JUNO
                      </Text>
                    </Box>
                  </TextFieldAddon>
                }
              />
            </Stack>
          </Box>

          <Callout
            title="Note"
            intent="info"
            iconName="lock"
            attributes={{
              width: "100%",
              marginBottom: "$6",
            }}
          >
            You will need to undelegate in order for your staked assets to be
            liquid again. This process will take 14 days to complete.
          </Callout>

          <Box display="flex" justifyContent="flex-end">
            <Button variant="solid" intent="tertiary">
              Redelegate
            </Button>
          </Box>
        </Box>
      </BasicModal>
    );
  },
};
