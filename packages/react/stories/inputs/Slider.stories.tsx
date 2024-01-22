import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Box from "../../src/ui/box";
import Text from "../../src/ui/text";
import Slider from "../../src/ui/slider";
import MeshTagButton from "../../src/ui/mesh-staking/mesh-tag-button";
import { meshThemeClass } from "../../src/styles/themes.css";
import { formatNumeric } from "../../src/helpers/number";
import { baseButton } from "../../src/ui/button/button.css";

const meta: Meta<typeof Slider> = {
  component: Slider,
  title: "Slider",
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (props) => {
    const TOTAL_TOKENS = 5422;
    const [value, setValue] = React.useState<number | number[]>(25);
    const [value2, setValue2] = React.useState<number | number[]>(25);
    const [value3, setValue3] = React.useState<number | number[]>(25);

    const onMax = () => {
      setValue(100);
    };

    const onMax2 = () => {
      setValue2(100);
    };

    const onMax3 = () => {
      setValue3(100);
    };
    return (
      <Box
        bg="rgb(16, 16, 18)"
        height="400px"
        padding="$10"
        display="flex"
        flexDirection="column"
        gap="$10"
        className={meshThemeClass}
      >
        <Slider
          name="osmosis"
          value={value}
          onChange={setValue}
          width="300px"
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
                  color="$textPlaceholder"
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

        {/* With different preview track colors */}
        <Slider
          name="osmo"
          value={value2}
          onChange={setValue2}
          width="300px"
          thumbTrackColor="$text"
          previewPercent={20}
          previewTrackColor="$textDanger"
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
                  color="$textPlaceholder"
                  fontSize="$sm"
                  fontWeight="$light"
                  attributes={labelProps}
                >
                  OSMO
                </Text>
              </Box>

              <MeshTagButton onClick={onMax2}>Max</MeshTagButton>
            </Box>
          )}
        />

        {/* With different preview track colors */}
        <Slider
          name="osmo"
          value={value3}
          onChange={setValue3}
          width="300px"
          thumbTrackColor="$text"
          previewPercent={35}
          previewTrackColor="$inputBorder"
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
                  color="$textPlaceholder"
                  fontSize="$sm"
                  fontWeight="$light"
                  attributes={labelProps}
                >
                  OSMO
                </Text>
              </Box>

              <MeshTagButton onClick={onMax3}>Max</MeshTagButton>
            </Box>
          )}
        />

        <Text
          color="$white"
          fontSize="$xs"
          attributes={{
            mt: "$10",
          }}
        >
          NOTE: this component theme is first designed to be used in a dark
          background (Mesh theme) <br /> TBD: light theme
        </Text>
      </Box>
    );
  },
};
