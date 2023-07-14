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
import TokenInput from "../token-input";
import starIcon from "../../assets/stars.png";
import StarText from "../star-text";
import NftFees from "../nft-fees";
import { NftFixedPriceProps } from "./nft-fixed-price.types";

export default function NftFixedPrice(props: NftFixedPriceProps) {
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
    <Stack direction="column">
      <TokenInput
        title="Minimum Offer"
        hasProgressBar={false}
        symbol="STARS"
        imgSrc={starIcon}
      />
      <Stack justify="space-between" attributes={{ my: "10" }}>
        <For each={state.starList}>
          {(item) => (
            <StarText key={item.label} label={item.label} value={item.value} />
          )}
        </For>
      </Stack>
      <NftFees listFee={0.5} royalities={0.5} fairBurn={0.5} proceeds={-0.5} />
      <Button intent="tertiary" size="lg" attributes={{ marginBottom: "10" }}>
        List
      </Button>
      <Button variant="unstyled" size="sm">
        Cancel
      </Button>
    </Stack>
  );
}
