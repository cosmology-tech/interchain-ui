import { Show } from "@builder.io/mitosis";
import clsx from "clsx";
import allIcons from "./icons.svg";
import { IconProps } from "./icon.types";
import { sprinkles as s } from "../../styles/sprinkles.css";

export default function Icon(props: IconProps) {
  return (
    <svg
      width="1em"
      height="1em"
      fill="currentColor"
      className={clsx(
        s({
          fontSize: props.size,
          color: props.color,
        }),
        props.className
      )}
    >
      <Show when={!!props.title}>
        <title>{props.title}</title>
      </Show>
      {/* @ts-expect-error */}
      <use xlinkHref={`${allIcons}#${props.name}`} />
    </svg>
  );
}
