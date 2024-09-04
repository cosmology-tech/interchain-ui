import { useMetadata, useStore } from "@builder.io/mitosis";
import clsx from "clsx";
import { omit } from "lodash";
import { rainbowSprinkles } from "../../styles/rainbow-sprinkles.css";
import type { BoxProps } from "./box.types";
import { DEFAULT_VALUES } from "./box.types";

useMetadata({
  isAttachedToShadowDom: true,
  rsc: {
    componentType: "client",
  },
});

export default function Box(props: BoxProps) {
  const state = useStore<{
    comp: string;
    boxStyles: {
      combinedClassName: string;
      style: Record<string, unknown>;
      passThroughProps: Record<string, unknown>;
    };
    finalPassThroughProps: Record<string, unknown>;
    eventHandlers: Record<string, (event: any) => void>;
  }>({
    get comp() {
      return props.as ?? DEFAULT_VALUES.as;
    },
    get finalPassThroughProps() {
      return state.boxStyles.passThroughProps;
    },
    get boxStyles() {
      const sprinklesObj = rainbowSprinkles({
        ...omit(props, ["attributes", "as", "boxRef"]),
        ...props.attributes,
      });

      return {
        combinedClassName: clsx(sprinklesObj.className, props.className),
        style: sprinklesObj.style,
        passThroughProps: omit(sprinklesObj.otherProps, [
          "attributes",
          "style",
          "rawCSS",
          "colorScheme",
        ]),
      };
    },
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
    <state.comp
      className={state.boxStyles.combinedClassName}
      style={{
        ...state.boxStyles.style,
        ...props.attributes?.style,
        ...props.rawCSS,
      }}
      {...state.finalPassThroughProps}
      {...state.eventHandlers}
      ref={props.boxRef}
    >
      {props.children}
    </state.comp>
  );
}
