import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Box from "../box";
import starIcon from "../../assets/stars.png";
import NftFees from "../nft-fees";
import { NftSellNowProps } from "./nft-sell-now.types";

export default function NftSellNow(props: NftSellNowProps) {
  return (
    <Box>
      <Text color="$textSecondary" fontSize="$lg" fontWeight="$semibold">
        Best Offer
      </Text>
      <Stack attributes={{ my: "$10", alignItems: "center" }}>
        <Text>{`${props.bestOffer} STARS`}</Text>
        <Box
          as="img"
          width="$12"
          height="$12"
          marginLeft="$6"
          borderRadius="$full"
          attributes={{ src: starIcon }}
        ></Box>
      </Stack>
      <Stack attributes={{ marginBottom: "$14", alignItems: "center" }}>
        <Text color="$textSecondary" fontSize="$xs">
          This offer is
        </Text>
        <Text fontSize="$xs" fontWeight="$semibold" attributes={{ mx: "$3" }}>
          {`${props?.offerToFloorPriceRatio}X`}
        </Text>
        <Text color="$textSecondary" fontSize="$xs">
          the floor price of
        </Text>
        <Text
          fontSize="$xs"
          fontWeight="$semibold"
          attributes={{ marginLeft: "$3" }}
        >{`${props?.floorPrice} STARS`}</Text>
      </Stack>
      <NftFees listFee={0.5} royalities={0.5} fairBurn={0.5} />
      <Button
        intent="tertiary"
        size="lg"
        attributes={{ marginBottom: "$10", width: "$full" }}
      >
        List
      </Button>
      <Button variant="unstyled" size="sm" attributes={{ width: "$full" }}>
        Cancel
      </Button>
    </Box>
  );
}
