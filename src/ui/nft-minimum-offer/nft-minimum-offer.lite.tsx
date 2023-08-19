import { For, useStore, onUpdate } from "@builder.io/mitosis";
import Stack from "../stack";
import Button from "../button";
import Box from "../box";
import TokenInput from "../token-input";
import starIcon from "../../assets/stars.png";
import StarText from "../star-text";
import NftFees from "../nft-fees";
import { NftMinimumOfferProps } from "./nft-minimum-offer.types";

export default function NftMinimumOffer(props: NftMinimumOfferProps) {
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
        imgSrc={starIcon}
        onAmountChange={(value) => props?.onChange?.(value)}
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
