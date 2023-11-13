import { For, useStore, onUpdate, useMetadata } from "@builder.io/mitosis";
import Stack from "../stack";
import Button from "../button";
import Box from "../box";
import TokenInput from "../token-input";
import StarText from "../star-text";
import NftFees from "../nft-fees";
import type { NftMinimumOfferProps } from "./nft-minimum-offer.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

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
        tokenIcon="stargazePixel"
        amount={props?.value}
        onAmountChange={(value) => props?.onChange?.(value)}
      />

      <Stack
        space="$0"
        attributes={{
          py: {
            mobile: "$6",
            tablet: "$10",
          },
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <For each={state.starList}>
          {(item) => (
            <StarText key={item.label} label={item.label} value={item.value} />
          )}
        </For>
      </Stack>

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
