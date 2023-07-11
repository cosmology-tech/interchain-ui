import clsx from "clsx";
import Icon from "../icon";
import Button from "../button";
import * as styles from "./icon-button.css";
import { IconButtonProps } from "./icon-button.types";

export default function IconButton(props: IconButtonProps) {
  return (
    <Button
      className={clsx(
        styles.container,
        styles.variants({
          round: props.isRound ? true : undefined,
        }),
        props.className
      )}
      variant={props.variant}
      intent={props.intent}
      size={props.size}
      disabled={props.disabled}
      onClick={(e) => props.onClick?.(e)}
    >
      <Icon name={props.icon} size={props.iconSize} />
    </Button>
  );
}
