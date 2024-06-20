import { useMetadata, useStore } from "@builder.io/mitosis";
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
  const state = useStore<{
    comp: string;
    boxStyles: {
      className: string;
      style: Record<string, unknown>;
      passThroughProps: Record<string, unknown>;
    };
    finalPassThroughProps: Record<string, unknown>;
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
        className: clsx(sprinklesObj.className, props.className),
        style: sprinklesObj.style,
        passThroughProps: omit(sprinklesObj.otherProps, [
          "attributes",
          "style",
          "rawCSS",
          "colorScheme",
        ]),
      };
    },
  });

  return (
    <state.comp
      className={state.boxStyles.className}
      style={{
        ...state.boxStyles.style,
        ...props.attributes?.style,
        ...props.rawCSS,
      }}
      {...state.finalPassThroughProps}
      ref={props.boxRef}
    >
      {props.children}
    </state.comp>
  );
}
