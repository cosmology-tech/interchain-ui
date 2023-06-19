import Icon from "../icon";
import Button from "../button";
import * as styles from "./icon-button.css";
import { IconButtonProps } from "./icon-button.types";

export default function IconButton(props: IconButtonProps) {
  return (
    <Button
      className={styles.container}
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
