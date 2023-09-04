import { useDefaultProps } from "@builder.io/mitosis";
import Box from "../box";
import Text from "../text";
import { LabelProps } from "./label.types";

useDefaultProps<Partial<LabelProps>>({
  color: "$text",
  backgroundColor: "#DDE3EB",
});

export default function Label(props: LabelProps) {
  return (
    <Box
      p="$4"
      borderRadius="$base"
      backgroundColor={props.backgroundColor}
      width="fit-content"
      height="$10"
      display="flex"
      justifyContent="center"
      alignItems="center"
      fontFamily="$body"
    >
      <Text
        color={props.color}
        fontSize="$xs"
        fontWeight="$semibold"
        lineHeight="$normal"
      >
        {props.text}
      </Text>
    </Box>
  );
}
