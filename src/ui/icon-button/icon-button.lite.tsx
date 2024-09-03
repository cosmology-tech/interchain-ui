import { useMetadata, useStore } from "@builder.io/mitosis";
import clsx from "clsx";
import Icon from "../icon";
import Button from "../button";
import * as styles from "./icon-button.css";
import type { IconButtonProps } from "./icon-button.types";

useMetadata({
  rsc: {
    componentType: "client",
  },
});

export default function IconButton(props: IconButtonProps) {
  const state = useStore({
    handleClick: (e?: any) => {
      if (props.onClick) {
        props.onClick(e);
      }
    },
  });

  return (
    <Button
      attributes={{
        ...props.attributes,
        borderRadius: props.isRound ? "$full" : undefined,
      }}
      className={clsx(styles.container, props.className)}
      variant={props.variant}
      intent={props.intent}
      size={props.size}
      disabled={props.disabled}
      onClick={state.handleClick}
    >
      <Icon name={props.icon} size={props.iconSize} />
    </Button>
  );
}
