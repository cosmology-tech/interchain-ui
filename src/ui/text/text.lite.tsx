import { useDefaultProps } from "@builder.io/mitosis";
import Box from "../box";
import { variants } from "./text.css";
import type { TextProps } from "./text.types";

export default function Text(props: TextProps) {
  useDefaultProps({
    color: "text",
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
      mx={props.mx}
      my={props.my}
      px={props.px}
      py={props.py}
      marginBottom={props.marginBottom}
      marginTop={props.marginTop}
      marginLeft={props.marginLeft}
      marginRight={props.marginRight}
      paddingBottom={props.paddingBottom}
      paddingTop={props.paddingTop}
      paddingLeft={props.paddingLeft}
      paddingRight={props.paddingRight}
      width={props.width}
      maxWidth={props.maxWidth}
      height={props.height}
      maxHeight={props.maxHeight}
    >
      {props.children}
    </Box>
  );
}
