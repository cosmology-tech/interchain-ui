import { useStore, Show, useMetadata } from "@builder.io/mitosis";
import BigNumber from "bignumber.js";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Icon from "../icon";
import Box from "../box";
import { store } from "../../models/store";
import { toNumber } from "../../helpers/number";

import * as styles from "./nft-mint.css";
import { NftMintProps } from "./nft-mint.types";

useMetadata({
  isAttachedToShadowDom: true,
  scaffolds: ["number-field"],
});

export default function NftMint(props: NftMintProps) {
  const state = useStore<{
    amount: number;
    starsAmount: string;
    starsAmountPrice: string;
    isAffordable: boolean;
    isMintLoading: boolean;
    handleAmountChange: (value: number) => void;
  }>({
    amount: 0,
    starsAmount: "",
    starsAmountPrice: "",
    isAffordable: true,
    isMintLoading: false,
    handleAmountChange(value: number) {
      let starsCount: BigNumber = new BigNumber(value).multipliedBy(
        props.priceDisplayAmount
      );
      props?.onChange?.(value);
      state.amount = value;
      if (new BigNumber(value || 0).eq(0)) {
        state.starsAmount = "";
        state.starsAmountPrice = "";
        state.isAffordable = true;
      } else {
        state.starsAmount = starsCount.decimalPlaces(2).toString();
        state.starsAmountPrice = store.getState().formatNumber({
          value: starsCount
            .multipliedBy(props.starsPrice)
            .decimalPlaces(2)
            .toString(),
        });
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
                  {props?.quantity}
                </Text>
              </Stack>
              <Stack direction="vertical">
                <Text color="$textSecondary" fontWeight="$semibold">
                  Royalties
                </Text>
                <Text fontSize="$4xl" fontWeight="$semibold">
                  {new BigNumber(props?.royalties).decimalPlaces(2).toString()}%
                </Text>
              </Stack>
              <Stack direction="vertical">
                <Text color="$textSecondary" fontWeight="$semibold">
                  Minted
                </Text>
                <Text fontSize="$4xl" fontWeight="$semibold">
                  {new BigNumber(props?.minted).decimalPlaces(2).toString()}%
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
                  {`${props?.available} STARS`}
                </Text>
              </Stack>
            </Stack>
            <Box position="relative">
              {/* @ts-expect-error */}
              <ScaffoldNumberField
                size="md"
                id="nft-mint-amount"
                minValue={0}
                maxValue={toNumber(props.limited)}
                value={state.amount}
                onChange={(value) => state.handleAmountChange(value)}
                inputClassName={styles.baseInput}
              />

              <Stack
                className={styles.starContainer}
                attributes={{ position: "absolute", alignItems: "center" }}
              >
                <Icon
                  name="stargazePixel"
                  size="$5xl"
                  attributes={{
                    borderRadius: "$full",
                    backgroundColor: "$black",
                  }}
                />
                <Text
                  fontWeight="$semibold"
                  attributes={{
                    marginLeft: "$6",
                    marginRight: "$4",
                  }}
                >{`${state.starsAmount} STARS`}</Text>
                <Show when={!!state.starsAmountPrice}>
                  <Text color="textSecondary">{`≈ $${state.starsAmountPrice}`}</Text>
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
                  paddingBottom: "$1",
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
              disabled={
                new BigNumber(state.amount).lte(0) || !state.isAffordable
              }
              onClick={() => props?.onMint?.()}
              isLoading={state.isMintLoading}
            >
              {`${state.isAffordable ? "Mint" : "Insufficient Balance"}`}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
}
