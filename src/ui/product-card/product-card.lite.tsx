import { useDefaultProps, Show } from "@builder.io/mitosis";

import Box from "../box";
import Text from "../text";
import Stack from "../stack";
import Label from "../label/label.lite";
import { ProductCardProps } from "./product-card.types";

useDefaultProps<Partial<ProductCardProps>>({
  isNew: false,
  width: "360px",
  height: "158px",
});

export default function ProductCard(props: ProductCardProps) {
  return (
    <Box
      py="$12"
      px="30px"
      maxWidth={props?.width}
      height={props?.height}
      borderRadius="$4xl"
      backgroundColor="$cardBg"
    >
      <Stack
        space="18px"
        direction="horizontal"
        attributes={{ alignItems: "flex-start", marginBottom: "$9" }}
      >
        <Box
          as="img"
          attributes={{ src: props.thumbnail }}
          width="52px"
          height="52px"
        />
        <Stack direction="vertical" space="$4">
          <Stack
            space="$6"
            direction="horizontal"
            attributes={{ alignItems: "center" }}
          >
            <Text
              color="$text"
              fontSize="$xl"
              fontWeight="$semibold"
              lineHeight="$normal"
            >
              {props.title}
            </Text>
            <Show when={props?.isNew}>
              <Box
                p="$4"
                borderRadius="$base"
                backgroundColor="#7310FF"
                height="$10"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text color="$white" fontSize="$xs" fontWeight="$semibold">
                  NEW
                </Text>
              </Box>
            </Show>
          </Stack>
          <Text
            color="$textSecondary"
            fontSize="$md"
            fontWeight="$normal"
            lineHeight="$short"
          >
            {props.description}
          </Text>
        </Stack>
      </Stack>
      <Label text={props.label} />
    </Box>
  );
}
