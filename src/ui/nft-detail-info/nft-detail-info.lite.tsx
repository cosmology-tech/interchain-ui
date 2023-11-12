import { useMetadata } from "@builder.io/mitosis";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import Icon from "../icon";
import StarText from "../star-text";
import type { NftDetailInfoProps } from "./nft-detail-info.type";
import isNumber from "lodash/isNumber";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function NftDetailInfo(props: NftDetailInfoProps) {
  return (
    <Stack direction="vertical" space="$7">
      <Text fontSize="$xl" fontWeight="$semibold">
        Info
      </Text>

      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(100px, 1fr))"
        rowGap={{
          mobile: "$4",
          tablet: "$6",
          desktop: "$6",
        }}
        columnGap={{
          mobile: "$10",
          tablet: "$14",
          desktop: "$14",
        }}
      >
        <Stack space="$0" direction="vertical">
          <Text fontSize="$xs" color="$textSecondary">
            Price
          </Text>
          <StarText value={props?.price} />
        </Stack>

        <Stack direction="vertical" space="$0">
          <Text fontSize="$xs" color="$textSecondary">
            Last sale
          </Text>
          <Text fontWeight="$semibold">
            {`${
              isNumber(props?.lastSale) ? `${props?.lastSale} STARS` : "---"
            }`}
          </Text>
        </Stack>

        <Stack direction="vertical" space="0">
          <Text fontSize="$xs" color="$textSecondary">
            Owner
          </Text>
          <Stack attributes={{ alignItems: "center" }} space="$0">
            <Text fontWeight="$semibold" attributes={{ marginRight: "$3" }}>
              {props?.owner}
            </Text>
            <Icon
              attributes={{
                transform: "translateY(1px)",
              }}
              name="jaggedCheck"
              size="$md"
              color="$text"
            />
          </Stack>
        </Stack>

        <Stack direction="vertical" space="0">
          <Text fontSize="$xs" color="$textSecondary">
            Top offer
          </Text>
          <StarText value={props?.topOffer} />
        </Stack>

        <Stack direction="vertical" space="$0">
          <Text fontSize="$xs" color="$textSecondary">
            Floor price
          </Text>
          <StarText value={props?.floorPrice} />
        </Stack>
      </Box>
    </Stack>
  );
}
