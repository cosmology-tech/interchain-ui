import { useMetadata } from "@builder.io/mitosis";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Box from "../box";
import Icon from "../icon";
import NftFees from "../nft-fees";
import { NftSellNowProps } from "./nft-sell-now.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function NftSellNow(props: NftSellNowProps) {
  return (
    <Box>
      <Text color="$textSecondary" fontSize="$lg" fontWeight="$semibold">
        Best Offer
      </Text>
      <Stack attributes={{ my: "$10", alignItems: "center" }} space="$6">
        <Text>{`${props.bestOffer} STARS`}</Text>
        <Icon
          name="stargazePixel"
          size="$7xl"
          attributes={{ borderRadius: "$full", backgroundColor: "$black" }}
        />
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
