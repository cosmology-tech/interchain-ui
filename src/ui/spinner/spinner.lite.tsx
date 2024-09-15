import { useMetadata, useStore } from "@builder.io/mitosis";
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
  const state = useStore<{
    combinedClassName: string;
  }>({
    get combinedClassName() {
      return clx(loader, props.className);
    },
  });

  return (
    <Icon
      className={state.combinedClassName}
      name="loaderLine"
      size={props.size}
      title={props.title}
      color={props.color}
      attributes={props.attributes}
    />
  );
}
