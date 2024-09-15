import { useDefaultProps, useMetadata, useStore } from "@builder.io/mitosis";
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

  const state = useStore({
    get spreadAttributes() {
      return Object.assign(
        {
          margin: "$0",
          as: props.as,
          className: props.className,
        },
        props.attributes,
        props.domAttributes,
        getVariantStyles(props.variant ?? "body", props.fontFamily),
        getTextTransformStyles({
          ellipsis: props.ellipsis,
          underline: props.underline,
        }),
        {
          color: props.color,
          fontSize: props.fontSize,
          fontWeight: props.fontWeight,
          letterSpacing: props.letterSpacing,
          lineHeight: props.lineHeight,
          textAlign: props.textAlign,
          textTransform: props.textTransform,
          wordBreak: props.wordBreak,
        },
      );
    },
  });

  return <Box {...state.spreadAttributes}>{props.children}</Box>;
}
