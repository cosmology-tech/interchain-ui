import { useDefaultProps, useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import Stack from "../stack";
import Text from "../text";
import { formatCurrency } from "../../helpers/number";
import { StakingAssetHeaderProps } from "./staking-asset-header.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<StakingAssetHeaderProps>>({
  totalLabel: "Total",
  availableLabel: "Available",
});

export default function StakingAssetHeader(props: StakingAssetHeaderProps) {
  return (
    <Box
      display="flex"
      justifyContent={{
        mobile: "space-between",
        tablet: "flex-start",
      }}
      flexWrap="wrap"
      gap={{
        mobile: "$8",
        tablet: "140px",
      }}
      {...props.attributes}
    >
      <Stack
        attributes={{
          flexBasis: "1/2",
          flexShrink: "0",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          as="img"
          width="$16"
          height="$16"
          marginRight="$8"
          attributes={{
            src: props.imgSrc,
            alt: `staking logo + ${props.symbol}`,
          }}
        />

        <Stack direction="vertical">
          <Text color="$textSecondary" fontWeight="$semibold">
            {props.totalLabel}
          </Text>

          <Stack
            space="$4"
            attributes={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              fontWeight="$semibold"
              fontSize="$3xl"
              whiteSpace="nowrap"
              attributes={{
                flexShrink: "0",
              }}
            >
              {props.totalAmount}
            </Text>

            <Text
              color="$textSecondary"
              fontWeight="$semibold"
              attributes={{
                flexShrink: "0",
              }}
            >
              {props.symbol}
            </Text>
          </Stack>

          <Text fontSize="$sm" fontWeight="$normal">
            ≈{" "}
            {formatCurrency(
              props.totalPrice,
              "en-US",
              props.priceformatOptions
            )}
          </Text>
        </Stack>
      </Stack>

      <Stack direction="vertical" attributes={{ flexBasis: "1/2" }}>
        <Text color="$textSecondary" fontWeight="$semibold">
          {props.availableLabel}
        </Text>

        <Stack
          space="$4"
          attributes={{ alignItems: "center", justifyContent: "center" }}
        >
          <Text fontSize="$3xl" fontWeight="$semibold">
            {props.available}
          </Text>

          <Text color="$textSecondary" fontWeight="$semibold">
            {props.symbol}
          </Text>
        </Stack>

        <Text fontSize="$sm" fontWeight="$normal">
          ≈{" "}
          {formatCurrency(
            props.availablePrice,
            "en-US",
            props.priceformatOptions
          )}
        </Text>
      </Stack>
    </Box>
  );
}
