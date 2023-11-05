import { useMetadata } from "@builder.io/mitosis";
import clx from "clsx";
import Icon from "../icon";
import { loader } from "./spinner.css";
import type { SpinnerProps } from "./spinner.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function Spinner(props: SpinnerProps) {
  return (
    <Icon
      className={clx(loader, props.className)}
      name="loaderLine"
      size={props.size}
      title={props.title}
      color={props.color}
      attributes={props.attributes}
    />
  );
}
