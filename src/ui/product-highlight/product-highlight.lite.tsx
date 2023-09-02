import { useDefaultProps, Show } from "@builder.io/mitosis";

import Box from "../box";
import Text from "../text";
import Label from "../label/label.lite";
import Button from "../button/button.lite";
import { ProductHighlightProps } from "./product-highlight.types";
import * as styles from "./product-highlight.css";

useDefaultProps<Partial<ProductHighlightProps>>({
  width: "100%",
  height: "248px",
  buttonText: "Start Building",
  pictureConfig: {
    height: "auto",
    width: "auto",
    top: 0,
    right: 0,
  },
});

const DEFAULT_BG: ProductHighlightProps["bgVariant"] = "purple";

export default function ProductHighlight(props: ProductHighlightProps) {
  return (
    <Box
      maxWidth={props?.width}
      height={props?.height}
      borderRadius="$4xl"
      className={styles.background[props?.bgVariant || DEFAULT_BG]}
      fontFamily="$body"
      position="relative"
      overflow="hidden"
      px="$12"
      py="$10"
    >
      <Text
        color="$white"
        fontSize="$5xl"
        fontWeight="$semibold"
        lineHeight="$normal"
        attributes={{ marginBottom: "$2" }}
      >
        {props.title}
      </Text>
      <Text
        color="$white"
        fontSize="$md"
        fontWeight="$normal"
        lineHeight="$short"
        attributes={{ marginBottom: "$5" }}
      >
        {props.description}
      </Text>
      <Label {...props.label} />
      <Button className={styles.button} onClick={() => props?.onButtonClick()}>
        {props.buttonText}
      </Button>
      <Show when={props?.picture}>
        <Box
          as="img"
          attributes={{ src: props.picture }}
          position="absolute"
          {...props?.pictureConfig}
        />
      </Show>
    </Box>
  );
}
