import { Show } from "@builder.io/mitosis";
import Box from "../box";
import allIcons from "./icons.svg";
import { IconProps } from "./icon.types";

export default function Icon(props: IconProps) {
  return (
    <Box
      as="svg"
      width="1em"
      height="1em"
      fill="currentColor"
      fontSize={props.size}
      color={props.color}
      className={props.className}
      {...props.attributes}
    >
      <Show when={!!props.title}>
        <title>{props.title}</title>
      </Show>
      {/* @ts-expect-error */}
      <use xlinkHref={`${allIcons}#${props.name}`} />
    </Box>
  );
}
