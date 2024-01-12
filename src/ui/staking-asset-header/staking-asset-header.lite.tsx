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
    >
      <Stack attributes={{ flexBasis: "1/2", flexShrink: "0" }}>
        <Box
          as="img"
          width="$16"
          height="$16"
          marginRight="$8"
          attributes={{
            src: props.imgSrc,
            alt: "staking logo",
          }}
        />

        <Stack direction="vertical">
          <Text color="$textSecondary" fontWeight="$semibold">
            {props.totalLabel}
          </Text>

          <Stack
            space="$5"
            attributes={{
              marginTop: "$2",
              marginBottom: "$3",
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
          <Stack attributes={{ alignItems: "center" }}>
            <Text fontSize="$xs" color="$rewardContent" fontWeight="$medium">
              ≈ {formatCurrency(props.totalPrice)}
            </Text>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="vertical" space="$2" attributes={{ flexBasis: "1/2" }}>
        <Text color="$textSecondary" fontWeight="$semibold">
          {props.availableLabel}
        </Text>
        <Stack space="$5" attributes={{ alignItems: "center" }}>
          <Text fontSize="$3xl" fontWeight="$semibold">
            {props.available}
          </Text>
          <Text color="$textSecondary" fontWeight="$semibold">
            {props.symbol}
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}
