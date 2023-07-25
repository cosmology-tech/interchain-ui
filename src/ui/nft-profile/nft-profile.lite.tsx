import { Show } from "@builder.io/mitosis";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Box from "../box";
import Icon from "../icon";
import NftProfileCardList from "../nft-profile-card-list";
import * as styles from "./nft-profile.css";
import { NftProfileProps } from "./nft-profile.types";

export default function NftProfile(props: NftProfileProps) {
  return (
    <Stack
      className={styles.nftProfile}
      direction="column"
      attributes={{ px: "10" }}
    >
      <Text size="lg" weight="semibold">
        Profile
      </Text>
      <Stack
        justify="space-between"
        align="center"
        attributes={{ marginTop: "12", marginBottom: "8" }}
      >
        <Stack align="center">
          <Text size="4xl" weight="semibold" attributes={{ marginRight: "4" }}>
            {props?.name}
          </Text>
          <Show when={props?.isNameVerified}>
            <Box paddingTop="5">
              <Icon name="jaggedCheck" color="text" size="xl" />
            </Box>
          </Show>
        </Stack>
        <Button intent="text">View on Stargaze</Button>
      </Stack>
      <Stack space="10" attributes={{ marginBottom: "12" }}>
        <Stack align="center" space="4">
          <Text size="xs" color="textSecondary">
            Collections
          </Text>
          <Text weight="semibold">{props?.collections}</Text>
        </Stack>
        <Stack align="center" space="4">
          <Text size="xs" color="textSecondary">
            NFTs
          </Text>
          <Text weight="semibold">{props?.nfts}</Text>
        </Stack>
        <Stack align="center" space="4">
          <Text size="xs" color="textSecondary">
            Listed on marketplace
          </Text>
          <Text weight="semibold">{props?.listedForSale}</Text>
        </Stack>
      </Stack>
      <NftProfileCardList list={props?.list} />
    </Stack>
  );
}
