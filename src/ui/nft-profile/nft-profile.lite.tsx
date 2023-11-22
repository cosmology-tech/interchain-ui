import { Show, For, useMetadata } from "@builder.io/mitosis";
import Stack from "../stack";
import Text from "../text";
import Button from "../button";
import Box from "../box";
import Icon from "../icon";
import NftProfileCardList from "../nft-profile-card-list";
import type { NftProfileProps } from "./nft-profile.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function NftProfile(props: NftProfileProps) {
  return (
    <Stack
      className={props.className}
      direction="vertical"
      attributes={{ px: "$10", maxWidth: "792px", ...props.attributes }}
    >
      <Text fontSize="$lg" fontWeight="$semibold">
        {props.title}
      </Text>

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        marginTop={{
          mobile: "$6",
          tablet: "$12",
          desktop: "$12",
        }}
        marginBottom={{
          mobile: "$4",
          tablet: "$8",
          desktop: "$8",
        }}
      >
        <Stack attributes={{ alignItems: "center", flexWrap: "nowrap" }}>
          <Text
            fontSize="$4xl"
            fontWeight="$semibold"
            attributes={{ marginRight: "4" }}
          >
            {props.name}
          </Text>

          <Show when={props.isVerified}>
            <Box paddingTop="$3" paddingLeft="$3">
              <Icon name="jaggedCheck" color="$text" size="$xl" />
            </Box>
          </Show>
        </Stack>

        {/* Header button mobile */}
        <Box
          display={{
            mobile: "block",
            tablet: "none",
            desktop: "none",
          }}
        >
          <Button size="xs" intent="text" onClick={() => props.onView?.()}>
            {props.headerButtonLabel}
          </Button>
        </Box>

        {/* Header button desktop */}
        <Box
          display={{
            mobile: "none",
            tablet: "block",
            desktop: "block",
          }}
        >
          <Button size="sm" intent="text" onClick={() => props.onView?.()}>
            {props.headerButtonLabel}
          </Button>
        </Box>
      </Box>

      {/* Meta items */}
      <Box
        display={{
          mobile: "grid",
          tablet: "flex",
          desktop: "flex",
        }}
        flexWrap="wrap"
        rowGap="$2"
        columnGap="$10"
        gridTemplateColumns={{
          mobile: "repeat(auto-fit, minmax(min(100px, 100%), 1fr))",
          tablet: "unset",
          desktop: "unset",
        }}
        marginBottom={{
          mobile: "$6",
          tablet: "$12",
          desktop: "$12",
        }}
      >
        <For each={props.meta}>
          {(item) => (
            <Stack
              attributes={{ alignItems: "center", flexWrap: "nowrap" }}
              space="$4"
            >
              <Text fontSize="$xs" color="$textSecondary">
                {item.label}
              </Text>
              <Text
                fontWeight="$semibold"
                attributes={{
                  whiteSpace: "pre",
                }}
              >
                {item.value}
              </Text>
            </Stack>
          )}
        </For>
      </Box>

      <Show when={props.children == null && Array.isArray(props.list)}>
        <NftProfileCardList
          list={props.list}
          thumbnailBehavior={props.thumbnailBehavior}
        />
      </Show>

      <Show when={props.children != null}>{props.children}</Show>
    </Stack>
  );
}
