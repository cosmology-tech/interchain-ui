import { useDefaultProps, useMetadata, useStore } from "@builder.io/mitosis";
import clsx from "clsx";
import omit from "lodash/omit";
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
  useDefaultProps({
    as: DEFAULT_VALUES.as,
  });

  const state = useStore<{
    boxStyles: {
      className: string;
      style: Record<string, unknown>;
      passThroughProps: Record<string, unknown>;
    };
    _passThroughProps: Record<string, unknown>;
  }>({
    get _passThroughProps() {
      return state.boxStyles.passThroughProps;
    },
    get boxStyles() {
      const sprinklesObj = rainbowSprinkles({
        ...omit(props, ["attributes", "as", "boxRef"]),
        ...props.attributes,
        ...props.rawCSS,
      });

      return {
        className: clsx(sprinklesObj.className, props.className),
        style: sprinklesObj.style,
        passThroughProps: sprinklesObj.otherProps,
      };
    },
  });

  return (
    <props.as
      className={state.boxStyles.className}
      style={state.boxStyles.style}
      {...state._passThroughProps}
      ref={props.boxRef}
    >
      {props.children}
    </props.as>
  );
}
