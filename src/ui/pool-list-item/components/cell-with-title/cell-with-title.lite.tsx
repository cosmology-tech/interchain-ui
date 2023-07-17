import Stack from "../../../stack";
import Text from "../../../text";

export default function CellWithTitle(props: {
  title: string;
  className?: string;
  innerClassName?: string;
  children?: any;
}) {
  return (
    <Stack
      className={props.className}
      direction="vertical"
      attributes={{
        justifyContent: "center",
      }}
    >
      <Text
        color="textSecondary"
        className={props.innerClassName}
        wordBreak="break-word"
        attributes={{
          marginRight: "4",
          marginBottom: "2",
        }}
      >
        {props.title}
      </Text>
      {props.children}
    </Stack>
  );
}
