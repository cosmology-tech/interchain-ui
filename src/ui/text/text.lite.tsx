import { useDefaultProps } from "@builder.io/mitosis";
import Box from "../box";
import { variants } from "./text.css";
import type { TextProps } from "./text.types";

export default function Text(props: TextProps) {
  useDefaultProps({
    color: "gray700",
  });

  return (
    <Box
      as={props.as}
      className={`${variants({
        variant: props.variant,
        ellipsis: props.ellipsis ? true : undefined,
        underline: props.underline ? true : undefined,
      })} ${props.className}`}
      color={props.color}
      fontSize={props.size}
      fontWeight={props.weight}
      letterSpacing={props.letterSpacing}
      lineHeight={props.lineHeight}
      textAlign={props.align}
      textTransform={props.transform}
      whiteSpace={props.whiteSpace}
      wordBreak={props.wordBreak}
      marginTop={props.marginTop}
      marginRight={props.marginRight}
      marginLeft={props.marginLeft}
      marginBottom={props.marginBottom}
    >
      {props.children}
    </Box>
  );
}
