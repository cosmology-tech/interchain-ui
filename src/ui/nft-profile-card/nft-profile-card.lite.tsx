import { useMetadata } from "@builder.io/mitosis";
import clsx from "clsx";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import StarText from "../star-text";

import * as styles from "./nft-profile-card.css";
import type { NftProfileCardProps } from "./nft-profile-card.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function NftProfileCard(props: NftProfileCardProps) {
  return (
    <Box
      className={clsx(styles.nftProfileCard, {
        [styles.hoverStyle]: !!props.onClick,
      })}
      attributes={{ onClick: () => props?.onClick?.() }}
    >
      <Stack direction="vertical" space="$4">
        <Box width="$full">
          <Box
            width="$full"
            height="auto"
            as="img"
            borderRadius="$md"
            attributes={{ src: props?.imgSrc }}
          ></Box>
        </Box>
        <Text fontWeight="$semibold">{props?.name}</Text>
        <StarText label="Highest offer" value={props?.highestOffer} />
        <StarText label="List price" value={props?.listPrice} />
      </Stack>
    </Box>
  );
}
