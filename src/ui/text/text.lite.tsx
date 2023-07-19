import { useDefaultProps } from "@builder.io/mitosis";
import Box from "../box";
import { variants } from "./text.css";
import type { TextProps } from "./text.types";

export default function Text(props: TextProps) {
  useDefaultProps({
    size: "sm",
    color: "text",
    wordBreak: "break-word",
  });

  return (
    <Box
      {...props.attributes}
      as={props.as}
      className={`${variants({
        variant: props.variant,
        ellipsis: props.ellipsis ? true : undefined,
        underline: props.underline ? true : undefined,
      })} ${props.className}`}
      color={props.color}
      fontSize={props.fontSize}
      fontWeight={props.fontWeight}
      letterSpacing={props.letterSpacing}
      lineHeight={props.lineHeight}
      textAlign={props.textAlign}
      textTransform={props.textTransform}
      whiteSpace={props.whiteSpace}
      wordBreak={props.wordBreak}
    >
      {props.children}
    </Box>
  );
}
