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
      <Stack attributes={{ py: "$9", alignItems: "center" }} space="$6">
        <Text
          fontSize={{
            mobile: "$md",
            tablet: "$lg",
          }}
          fontWeight="$semibold"
        >{`${props.bestOffer} STARS`}</Text>
        <Icon
          name="stargazePixel"
          size="$7xl"
          attributes={{ borderRadius: "$full", backgroundColor: "$black" }}
        />
      </Stack>

      <Box as="p">
        <Text as="span" color="$textSecondary" fontSize="$xs">
          This offer is
        </Text>
        <Text
          as="span"
          fontSize="$xs"
          fontWeight="$semibold"
          attributes={{
            px: "$2",
          }}
        >
          {`${props?.offerToFloorPriceRatio}`}
        </Text>
        <Text as="span" color="$textSecondary" fontSize="$xs">
          the floor price of
        </Text>
        <Text
          as="span"
          fontSize="$xs"
          fontWeight="$semibold"
          attributes={{
            px: "$2",
          }}
        >{`${props?.floorPrice} STARS`}</Text>
      </Box>

      <NftFees
        symbol="STARS"
        title="Fee"
        listFee={props?.fees?.listFee}
        royalities={props?.fees?.royalities}
        fairBurn={props?.fees?.fairBurn}
        proceeds={props?.fees?.proceeds}
      />

      <Box
        pt={{
          mobile: "$4",
          tablet: "$9",
        }}
      >
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
    </Box>
  );
}
