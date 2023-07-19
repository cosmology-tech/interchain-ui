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
              src: "https://ipfs-gw.stargaze-apis.com/ipfs/QmYqY6mW6qCCgdVA1BGRhXuvaSjKwwGdkBLZ8gZeMTn3U9/bipz.gif",
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
              <Text
                color="$textSecondary"
                fontSize="$lg"
                fontWeight="$semibold"
              >
                Select amount
              </Text>
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
            <input />
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
                }}
              >
                <Text color="$textSecondary" attributes={{ marginRight: "$2" }}>
                  Price:
                </Text>
                <Text color="$textSecondary" fontWeight="$semibold">
                  {`${store
                    .getState()
                    ?.formatNumber?.({ value: props?.price })} STARS`}
                </Text>
              </Stack>
              <Text color="$textSecondary">
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
