import { useDefaultProps } from "@builder.io/mitosis";
import Box from "../box";
import type { TextProps } from "./text.types";
import { getTextTransformStyles, getVariantStyles } from "./text.helper";

export default function Text(props: TextProps) {
  useDefaultProps({
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
      {...getVariantStyles(props.variant ?? "body")}
      {...getTextTransformStyles({
        ellipsis: props.ellipsis,
        underline: props.underline,
      })}
      className={props.className}
      color={props.color}
      fontFamily={props.fontFamily}
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
