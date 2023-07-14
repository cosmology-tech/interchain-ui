import {
  Show,
  For,
  useStore,
  onMount,
  onUpdate,
  useDefaultProps,
  useRef,
} from "@builder.io/mitosis";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Box from "../box";
import starIcon from "../../assets/stars.png";
import StarText from "../star-text";
import NftFees from "../nft-fees";
import { NftSellNowProps } from "./nft-sell-now.types";

export default function NftSellNow(props: NftSellNowProps) {
  return (
    <Stack direction="column">
      <Text color="textSecondary" size="lg" weight="semibold">
        Best Offer
      </Text>
      <Stack align="center" attributes={{ my: "10" }}>
        <Text>{`${props.bestOffer} STARS`}</Text>
        <Box
          as="img"
          width="12"
          height="12"
          marginLeft="6"
          attributes={{ src: starIcon }}
        ></Box>
      </Stack>
      <Stack align="center" attributes={{ marginBottom: "14" }}>
        <Text color="textSecondary" size="xs">
          This offer is
        </Text>
        <Text size="xs" weight="semibold" attributes={{ mx: "3" }}>
          {`${props?.offerToFloorPriceRatio}X`}
        </Text>
        <Text color="textSecondary" size="xs">
          the floor price of
        </Text>
        <Text
          size="xs"
          weight="semibold"
          attributes={{ marginLeft: "3" }}
        >{`${props?.floorPrice} STARS`}</Text>
      </Stack>
      <NftFees listFee={0.5} royalities={0.5} fairBurn={0.5} />
      <Button intent="tertiary" size="lg" attributes={{ marginBottom: "10" }}>
        List
      </Button>
      <Button variant="unstyled" size="sm">
        Cancel
      </Button>
    </Stack>
  );
}
