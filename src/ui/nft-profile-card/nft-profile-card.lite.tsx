import { Show, For, useMetadata, useDefaultProps } from "@builder.io/mitosis";
import clsx from "clsx";
import Stack from "../stack";
import Box from "../box";
import Text from "../text";
import StarText from "../star-text";

import type { NftProfileCardProps } from "./nft-profile-card.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

useDefaultProps<Partial<NftProfileCardProps>>({
  thumbnailBehavior: "contain",
});

export default function NftProfileCard(props: NftProfileCardProps) {
  return (
    <Box
      className={clsx(props.className)}
      cursor={typeof props.onClick === "function" ? "pointer" : "default"}
      attributes={{
        ...props.attributes,
        onClick: (event) => props.onClick?.(event),
      }}
    >
      <Stack direction="vertical" space="$4">
        <Show when={props.thumbnailBehavior === "full"}>
          {/* Show full image dimensions within the image component */}
          <Box position="relative" width="$full" height="$30" flexGrow="0">
            {/* Border background in case the image dimension doesn't fit */}
            <Box
              position="absolute"
              left="0"
              right="0"
              top="0"
              bottom="0"
              borderRadius="$md"
              borderColor="$gray200"
              borderStyle="$solid"
              borderWidth="1px"
            />
            <Box
              width="$full"
              height="$30"
              borderRadius="$md"
              backgroundImage={`url(${props.imgSrc})`}
              backgroundSize="contain"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              zIndex="0"
            />
          </Box>
        </Show>

        {/* Show crop-to-fit image dimensions, forced aspect ratio */}
        <Show when={props.thumbnailBehavior === "contain"}>
          <Box width="$full">
            <Box
              width="$full"
              height="auto"
              aspectRatio="1"
              as="img"
              borderRadius="$md"
              attributes={{ src: props.imgSrc, alt: props.name }}
            />
          </Box>
        </Show>

        <Text fontWeight="$semibold">{props.name}</Text>

        <For each={props.priceItems}>
          {(priceItem, index) => (
            <StarText
              key={`${priceItem.label}-${index}`}
              label={priceItem.label}
              tokenName={priceItem.tokenName}
              value={priceItem.value}
              iconSrc={priceItem.iconSrc}
              onClick={priceItem.onClick}
            />
          )}
        </For>
      </Stack>
    </Box>
  );
}
