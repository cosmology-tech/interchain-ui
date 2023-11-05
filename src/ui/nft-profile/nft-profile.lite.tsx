import { Show, useMetadata } from "@builder.io/mitosis";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Box from "../box";
import Icon from "../icon";
import NftProfileCardList from "../nft-profile-card-list";
import * as styles from "./nft-profile.css";
import type { NftProfileProps } from "./nft-profile.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function NftProfile(props: NftProfileProps) {
  return (
    <Stack
      className={styles.nftProfile}
      direction="vertical"
      attributes={{ px: "$10" }}
    >
      <Text fontSize="$lg" fontWeight="$semibold">
        Profile
      </Text>
      <Stack
        attributes={{
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "$12",
          marginBottom: "$8",
        }}
      >
        <Stack attributes={{ alignItems: "center" }}>
          <Text
            fontSize="$4xl"
            fontWeight="$semibold"
            attributes={{ marginRight: "4" }}
          >
            {props?.name}
          </Text>
          <Show when={props?.isNameVerified}>
            <Box paddingTop="$3" paddingLeft="$3">
              <Icon name="jaggedCheck" color="$text" size="$xl" />
            </Box>
          </Show>
        </Stack>
        <Button intent="text" onClick={() => props?.onView?.()}>
          View on Stargaze
        </Button>
      </Stack>
      <Stack space="$10" attributes={{ marginBottom: "$12" }}>
        <Stack attributes={{ alignItems: "center" }} space="$4">
          <Text fontSize="$xs" color="$textSecondary">
            Collections
          </Text>
          <Text fontWeight="$semibold">{props?.collections}</Text>
        </Stack>
        <Stack attributes={{ alignItems: "center" }} space="$4">
          <Text fontSize="$xs" color="$textSecondary">
            NFTs
          </Text>
          <Text fontWeight="$semibold">{props?.nfts}</Text>
        </Stack>
        <Stack attributes={{ alignItems: "center" }} space="$4">
          <Text fontSize="$xs" color="$textSecondary">
            Listed on marketplace
          </Text>
          <Text fontWeight="$semibold">{props?.listedForSale}</Text>
        </Stack>
      </Stack>
      <NftProfileCardList list={props?.list} />
    </Stack>
  );
}
