import { useDefaultProps, useMetadata } from "@builder.io/mitosis";
import Box from "../box";
import type { TextProps } from "./text.types";
import { getTextTransformStyles, getVariantStyles } from "./text.helper";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function Text(props: TextProps) {
  useDefaultProps<Partial<TextProps>>({
    as: "p",
    fontSize: "$sm",
    color: "$text",
    variant: "body",
    wordBreak: "break-word",
    ellipsis: false,
    underline: false,
  });

  return (
    <Box
      margin="$0"
      {...props.attributes}
      {...props.domAttributes}
      as={props.as}
      {...getVariantStyles(props.variant ?? "body", props.fontFamily)}
      {...getTextTransformStyles({
        ellipsis: props.ellipsis,
        underline: props.underline,
      })}
      className={props.className}
      color={props.color}
      fontSize={props.fontSize}
      fontWeight={props.fontWeight}
      letterSpacing={props.letterSpacing}
      lineHeight={props.lineHeight}
      textAlign={props.textAlign}
      textTransform={props.textTransform}
      wordBreak={props.wordBreak}
    >
      {props.children}
    </Box>
  );
}
