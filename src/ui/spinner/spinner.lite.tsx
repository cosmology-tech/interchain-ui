import {
  useDefaultProps,
  onMount,
  onUnMount,
  Show,
  useMetadata,
  useStore,
  useRef,
} from "@builder.io/mitosis";
import Icon from "../icon";

import { loader } from "./spinner.css";
import { SpinnerProps } from "./spinner.types";

export default function Spinner(props: SpinnerProps) {
  useDefaultProps({
    name: "loaderLine",
  });
  return (
    <Icon
      className={loader}
      name={props.name}
      size={props.size}
      title={props.title}
      color={props.color}
      attributes={props.attributes}
    />
  );
}
