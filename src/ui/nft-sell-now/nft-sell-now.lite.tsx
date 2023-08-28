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
          {`${props?.offerToFloorPriceRatio}`}
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
      <NftFees
        listFee={props?.fees?.listFee}
        royalities={props?.fees?.royalities}
        fairBurn={props?.fees?.fairBurn}
        proceeds={props?.fees?.proceeds}
      />
      <Button
        intent="tertiary"
        size="lg"
        attributes={{ marginBottom: "$10", width: "$full" }}
        onClick={() => props.onList?.()}
      >
        List
      </Button>
      <Button
        variant="unstyled"
        size="sm"
        attributes={{ width: "$full" }}
        onClick={() => props.onCancel?.()}
      >
        Cancel
      </Button>
    </Box>
  );
}
