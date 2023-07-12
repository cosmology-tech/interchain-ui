import Stack from "../../../stack";
import Text from "../../../text";
import Icon from "../../../icon";

export default function APR(props: {
  className?: string;
  apr: number;
  innerClassName: string;
}) {
  return (
    <Stack className={props.className} justify="space-between" align="center">
      <Text
        color="text"
        weight="semibold"
        attributes={{
          marginRight: "4",
        }}
      >
        {props.apr}%
      </Text>
      <Stack
        className={props.innerClassName}
        justify="center"
        align="center"
      >
        {/* TODO: Replace with IconButton later */}
        <Icon name="verticalMore" color="text" />
      </Stack>
    </Stack>
  );
}
