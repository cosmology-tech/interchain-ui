import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Box from "../box";
import { store } from "../../models/store";

import * as styles from "./nft-mint.css";
import { NftMintProps } from "./nft-mint.types";

export default function NftMint(props: NftMintProps) {
  return (
    <Stack className={styles.nftMint} direction="vertical">
      {/* Title */}
      <Text size="xl" weight="semibold" attributes={{ marginBottom: "12" }}>
        NFT Mint
      </Text>
      {/* Detail */}
      <Stack space="10">
        <Box flex={1}>
          <Box
            as="img"
            width="full"
            height="auto"
            borderRadius="md"
            attributes={{
              src: props.imgSrc,
            }}
          />
        </Box>
        <Box flex={1}>
          <Stack direction="vertical">
            <Text
              className={styles.tip}
              color="cardBg"
              size="xs"
              weight="semibold"
              attributes={{
                width: "fit",
                backgroundColor: "text",
                px: "4",
                py: "2",
              }}
            >
              {props?.tag}
            </Text>
            <Text
              size="4xl"
              weight="semibold"
              attributes={{ marginTop: "6", marginBottom: "3" }}
            >
              {props?.name}
            </Text>
            <Text color="textSecondary">{props?.description}</Text>
            <Stack attributes={{ my: "9", justifyContent: "space-between" }}>
              <Stack direction="vertical">
                <Text color="textSecondary" weight="semibold">
                  Quantity
                </Text>
                <Text size="4xl" weight="semibold">
                  {store.getState()?.formatNumber?.({ value: props?.quantity })}
                </Text>
              </Stack>
              <Stack direction="vertical">
                <Text color="textSecondary" weight="semibold">
                  Royalties
                </Text>
                <Text size="4xl" weight="semibold">
                  {props?.royalties}%
                </Text>
              </Stack>
              <Stack direction="vertical">
                <Text color="textSecondary" weight="semibold">
                  Minted
                </Text>
                <Text size="4xl" weight="semibold">
                  {props?.minted}%
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>

      {/* Operation area */}
      <Stack space="10" attributes={{ marginTop: "10" }}>
        <Box flex={1}>
          <Stack direction="vertical">
            <Stack
              attributes={{
                marginBottom: "6",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text color="textSecondary" size="lg" weight="semibold">
                Select amount
              </Text>
              <Stack
                attributes={{
                  alignItems: "center",
                }}
              >
                <Text color="textSecondary" attributes={{ marginRight: "2" }}>
                  Available
                </Text>
                <Text color="textSecondary" weight="semibold">
                  {`${store
                    .getState()
                    ?.formatNumber?.({ value: props?.available })} STARS`}
                </Text>
              </Stack>
            </Stack>
            <input />
          </Stack>
        </Box>
        <Box flex={1}>
          <Stack direction="vertical">
            <Stack
              attributes={{
                marginBottom: "6",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Stack
                attributes={{
                  alignItems: "center",
                }}
              >
                <Text color="textSecondary" attributes={{ marginRight: "2" }}>
                  Price:
                </Text>
                <Text color="textSecondary" weight="semibold">
                  {`${store
                    .getState()
                    ?.formatNumber?.({ value: props?.price })} STARS`}
                </Text>
              </Stack>
              <Text color="textSecondary">
                {" "}
                {`Limited to ${store
                  .getState()
                  ?.formatNumber?.({ value: props?.minted })} tokens`}{" "}
              </Text>
            </Stack>
            <Button size="lg" intent="tertiary">
              Mint
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
}
