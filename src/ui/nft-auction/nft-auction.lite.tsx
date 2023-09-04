import { For, useStore, onUpdate } from "@builder.io/mitosis";
import Stack from "../stack";
import Button from "../button";
import TokenInput from "../token-input";
import StarText from "../star-text";
import NftFees from "../nft-fees";
import Box from "../box";
import { NftAuctionProps } from "./nft-auction.types";

export default function NftAuction(props: NftAuctionProps) {
  const state = useStore<{
    starList: { label: string; value: string }[];
  }>({
    starList: [
      {
        label: "Floor Price",
        value: "",
      },
      {
        label: "Highest Offer",
        value: "",
      },
    ],
  });

  onUpdate(() => {
    state.starList = state.starList.map((item, index) => {
      let value = index === 0 ? props?.floorPrice : props?.highestOffer;
      return {
        label: item.label,
        value: `${value}`,
      };
    });
  }, [props?.floorPrice, props?.highestOffer]);
  return (
    <Box>
      <TokenInput
        title="Minimum Offer"
        hasProgressBar={false}
        symbol="STARS"
        tokenIcon="stargazePixel"
      />
      <Stack
        space="$0"
        attributes={{ my: "$10", justifyContent: "space-between" }}
      >
        <For each={state.starList}>
          {(item) => (
            <StarText key={item.label} label={item.label} value={item.value} />
          )}
        </For>
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
