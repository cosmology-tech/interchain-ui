import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Box from "../box";

import * as styles from "./nft-mint.css";
import { NftMintProps } from "./nft-mint.types";

export default function NftMint(props: NftMintProps) {
  return (
    <Stack className={styles.nftMint} direction="column">
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
              src: "https://ipfs-gw.stargaze-apis.com/ipfs/QmYqY6mW6qCCgdVA1BGRhXuvaSjKwwGdkBLZ8gZeMTn3U9/bipz.gif",
            }}
          />
        </Box>
        <Box flex={1}>
          <Stack direction="column">
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
              NOW LIVE
            </Text>
            <Text
              size="4xl"
              weight="semibold"
              attributes={{ marginTop: "6", marginBottom: "3" }}
            >
              Bipz
            </Text>
            <Text color="textSecondary">
              Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu,
              consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus.
            </Text>
            <Stack justify="space-between" attributes={{ my: "9" }}>
              <Stack direction="column">
                <Text color="textSecondary" weight="semibold">
                  Quantity
                </Text>
                <Text size="4xl" weight="semibold">
                  5,000
                </Text>
              </Stack>
              <Stack direction="column">
                <Text color="textSecondary" weight="semibold">
                  Royalties
                </Text>
                <Text size="4xl" weight="semibold">
                  10%
                </Text>
              </Stack>
              <Stack direction="column">
                <Text color="textSecondary" weight="semibold">
                  Minted
                </Text>
                <Text size="4xl" weight="semibold">
                  46%
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>

      {/* Operation area */}
      <Stack space="10" attributes={{ marginTop: "10" }}>
        <Box flex={1}>
          <Stack direction="column">
            <Stack
              justify="space-between"
              align="center"
              attributes={{ marginBottom: "6" }}
            >
              <Text color="textSecondary" size="lg" weight="semibold">
                Select amount
              </Text>
              <Stack align="center">
                <Text color="textSecondary" attributes={{ marginRight: "2" }}>
                  Available
                </Text>
                <Text color="textSecondary" weight="semibold">
                  {" "}
                  2,948 STARS
                </Text>
              </Stack>
            </Stack>
            <input />
          </Stack>
        </Box>
        <Box flex={1}>
          <Stack direction="column">
            <Stack
              justify="space-between"
              align="center"
              attributes={{ marginBottom: "6" }}
            >
              <Stack align="center">
                <Text color="textSecondary" attributes={{ marginRight: "2" }}>
                  Price:
                </Text>
                <Text color="textSecondary" weight="semibold">
                  300 STARS
                </Text>
              </Stack>
              <Text color="textSecondary">Limited to 50 tokens</Text>
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
