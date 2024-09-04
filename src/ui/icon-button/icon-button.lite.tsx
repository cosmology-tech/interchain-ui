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
    get eventHandlers() {
      const handlers: Record<string, (event: any) => void> = {};
      const eventProps = [
        "onClick",
        "onDoubleClick",
        "onMouseDown",
        "onMouseUp",
        "onMouseEnter",
        "onMouseLeave",
        "onMouseMove",
        "onMouseOver",
        "onMouseOut",
        "onKeyDown",
        "onKeyUp",
        "onKeyPress",
        "onFocus",
        "onBlur",
        "onInput",
        "onChange",
        "onSubmit",
        "onReset",
        "onScroll",
        "onWheel",
        "onDragStart",
        "onDrag",
        "onDragEnd",
        "onDragEnter",
        "onDragLeave",
        "onDragOver",
        "onDrop",
        "onTouchStart",
        "onTouchMove",
        "onTouchEnd",
        "onTouchCancel",
      ];

      eventProps.forEach((eventName) => {
        if (props[eventName]) {
          handlers[eventName] = (event: any) => props[eventName](event);
        }
      });

      return handlers;
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
      {...state.eventHandlers}
    >
      <Icon name={props.icon} size={props.iconSize} />
    </Button>
  );
}
