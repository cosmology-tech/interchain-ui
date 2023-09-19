import Stack from "../stack";
import Text from "../text";
import Box from "../box";

export default function CellWithTitle(props: {
  title: string;
  className?: string;
  innerClassName?: string;
  children?: any;
}) {
  return (
    <Box className={props.className} width="$full">
      <Stack
        direction="vertical"
        space="$2"
        attributes={{
          justifyContent: "center",
          width: "$full",
        }}
      >
        <Text
          color="$textSecondary"
          className={props.innerClassName}
          wordBreak="break-word"
          attributes={{
            marginRight: "$4",
          }}
        >
          {props.title}
        </Text>
        {props.children}
      </Stack>
    </Box>
  );
}
