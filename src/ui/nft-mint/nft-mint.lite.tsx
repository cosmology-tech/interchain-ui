import { useStore, Show } from "@builder.io/mitosis";
import BigNumber from "bignumber.js";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Box from "../box";
import TextField from "../text-field";
import StarText from "../star-text";
import { store } from "../../models/store";

import * as styles from "./nft-mint.css";
import { NftMintProps } from "./nft-mint.types";

export default function NftMint(props: NftMintProps) {
  const state = useStore<{
    amount: string;
    starsAmount: string;
    starsAmountPrice: string;
    isAffordable: boolean;
    handleAmountChange: (Event) => void;
  }>({
    amount: "",
    starsAmount: "",
    starsAmountPrice: "",
    isAffordable: true,
    handleAmountChange(e) {
      e.target.value = e.target.value.replace(/[^0-9]*/g, "");
      let value = e.target.value;
      if (value > props.limited) {
        value = props.limited;
      }
      let starsCount: BigNumber = new BigNumber(value).multipliedBy(
        props.priceDisplayAmount
      );
      state.amount = value;
      if (value === "") {
        state.starsAmount = "";
        state.starsAmountPrice = "";
        state.isAffordable = true;
      } else {
        state.starsAmount = starsCount.decimalPlaces(2).toString();
        state.starsAmountPrice = starsCount
          .multipliedBy(props.starsPrice)
          .decimalPlaces(2)
          .toString();
        state.isAffordable = starsCount.lt(props.available);
      }
    },
  });
  return (
    <Stack className={styles.nftMint} direction="vertical">
      {/* Title */}
      <Text
        fontSize="$xl"
        fontWeight="$semibold"
        attributes={{ marginBottom: "$12" }}
      >
        NFT Mint
      </Text>

      {/* Detail */}
      <Stack space="$10">
        <Box flex="1">
          <Box
            as="img"
            width="$full"
            height="auto"
            borderRadius="$md"
            attributes={{
              src: props.imgSrc,
            }}
          />
        </Box>
        <Box flex={1}>
          <Stack direction="vertical">
            <Text
              className={styles.tip}
              color="$cardBg"
              fontSize="$xs"
              fontWeight="$semibold"
              attributes={{
                width: "fit-content",
                backgroundColor: "$text",
                px: "$4",
                py: "$2",
              }}
            >
              {props?.tag}
            </Text>
            <Text
              fontSize="$4xl"
              fontWeight="$semibold"
              attributes={{ marginTop: "$6", marginBottom: "$3" }}
            >
              {props?.name}
            </Text>
            <Text color="$textSecondary">{props?.description}</Text>
            <Stack attributes={{ my: "$9", justifyContent: "space-between" }}>
              <Stack direction="vertical">
                <Text color="$textSecondary" fontWeight="$semibold">
                  Quantity
                </Text>
                <Text fontSize="$4xl" fontWeight="$semibold">
                  {store.getState()?.formatNumber?.({ value: props?.quantity })}
                </Text>
              </Stack>
              <Stack direction="vertical">
                <Text color="$textSecondary" fontWeight="$semibold">
                  Royalties
                </Text>
                <Text fontSize="$4xl" fontWeight="$semibold">
                  {props?.royalties}%
                </Text>
              </Stack>
              <Stack direction="vertical">
                <Text color="$textSecondary" fontWeight="$semibold">
                  Minted
                </Text>
                <Text fontSize="$4xl" fontWeight="$semibold">
                  {props?.minted}%
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>

      {/* Operation area */}
      <Stack space="$10" attributes={{ marginTop: "$10" }}>
        <Box flex={1}>
          <Stack direction="vertical">
            <Stack
              attributes={{
                marginBottom: "$6",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box as="label" attributes={{ htmlFor: "nft-mint-amount" }}>
                <Text
                  color="$textSecondary"
                  fontSize="$lg"
                  fontWeight="$semibold"
                >
                  Select amount
                </Text>
              </Box>
              <Stack
                attributes={{
                  alignItems: "center",
                }}
              >
                <Text color="$textSecondary" attributes={{ marginRight: "$2" }}>
                  Available
                </Text>
                <Text color="$textSecondary" fontWeight="$semibold">
                  {`${store
                    .getState()
                    ?.formatNumber?.({ value: props?.available })} STARS`}
                </Text>
              </Stack>
            </Stack>
            <Box position="relative">
              <TextField
                id="nft-mint-amount"
                type="number"
                value={state.amount}
                onChange={(e) => state.handleAmountChange(e)}
                inputClassName={styles.baseInput}
              />

              <Stack
                className={styles.starContainer}
                attributes={{ position: "absolute" }}
              >
                <StarText label="" value={state.starsAmount} />
                <Show when={!!state.starsAmountPrice}>
                  <Text color="textSecondary">{`≈ ${state.starsAmountPrice}`}</Text>
                </Show>
              </Stack>
            </Box>
          </Stack>
        </Box>
        <Box flex="1">
          <Stack direction="vertical">
            <Stack
              attributes={{
                marginBottom: "$6",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Stack
                attributes={{
                  alignItems: "center",
                  paddingBottom: "2",
                }}
              >
                <Text color="$textSecondary" attributes={{ marginRight: "$2" }}>
                  Price:
                </Text>
                <Text color="$textSecondary" fontWeight="$semibold">
                  {`${store.getState()?.formatNumber?.({
                    value: props?.priceDisplayAmount,
                  })} STARS`}
                </Text>
              </Stack>
              <Text color="$textSecondary">
                {`Limited to ${store
                  .getState()
                  ?.formatNumber?.({ value: props?.limited })} tokens`}
              </Text>
            </Stack>
            <Button
              size="lg"
              intent="tertiary"
              disabled={!state.amount || !state.isAffordable}
            >
              {`${state.isAffordable ? "Mint" : "Insufficient Balance"}`}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
}
